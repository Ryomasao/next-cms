require "bundler/inline"
require "pathname"
require "time"
require "uri"

abort "[USAGE]: hatena2md <exported file> <output dir>" if ARGV.length < 2
exported_file_path = ARGV[0]
output_dir = Pathname.new(ARGV[1])
output_dir.mkpath unless output_dir.exist?

gemfile do
  source "https://rubygems.org"

  gem "nokogiri"
  gem "reverse_markdown"
end

Article = Struct.new("Article", :title, :time, :document) do
  def self.generate(entry)
    metadata, body = entry.split("-----\nBODY:\n").take(2)
    metadata = metadata.split("\n").map { |line| line.split(": ", 2) }
    metadata = Hash[metadata]
    metadata.transform_keys! { |key| key.downcase.to_sym }
    metadata.filter! { |key, _| %i[title date].include?(key) }

    date =  metadata.delete(:date)
    time = Time.strptime(date, "%m/%d/%Y %H:%M:%S")
    document = Nokogiri::HTML(body)

    Article.new(metadata[:title], time, document)
  end

  def write_to_file(output_dir:)
    filename = time.strftime("%Y-%m-%d-%H%M.md")
    output_path = output_dir.join(filename)

    File.write(output_path, <<~TEXT)
      ---
      title: #{title}
      time: #{time.strftime("%Y-%m-%d %H:%M")}
      ---

      #{markdown}
    TEXT
  end

  def html_in_body
    document.search('body').inner_html
  end

  def markdown
    @markdown ||= ReverseMarkdown.convert(html_in_body, github_flavored: true).strip
  end

  def remove_keyword_links
    document.search('a.keyword').each do |node|
      node.add_next_sibling(node.text)
      node.remove
    end
    self
  end

  def wrap_snippets_with_code
    document.search("pre.code").each do |node|
      code = Nokogiri::XML::Node.new("code", document)
      code.children = node.children
      node.children = code
    end
    self
  end

  def remove_spans_for_syntax_highlight
    document.search("pre span").each do |node|
      next unless /syn.+/.match? node["class"]
      node.add_next_sibling(node.text)
      node.remove
    end
    self
  end

  def replace_tabs_with_spaces_in_snippets
    document.search("code pre").each do |node|
      node.content = node.text.gsub(/\t/) { " " * 2 }
    end
    self
  end

  def replace_iframes_with_links
    document.search("iframe.embed-card").each do |node|
      a = Nokogiri::XML::Node.new("a", document)
      a.content = node["title"]

      src_uri = URI.parse(node["src"])
      src_query = URI.decode_www_form(src_uri.query).to_h
      original_url = src_query["url"]
      a["href"] = original_url

      node.add_next_sibling(a)
      node.remove
    rescue
      next
    end
    self
  end
end

File.read(exported_file_path)
  .split("-----\n--------\n")
  .map { |entry| Article.generate(entry) }
  .map(&:remove_keyword_links)
  .map(&:wrap_snippets_with_code)
  .map(&:remove_spans_for_syntax_highlight)
  .map(&:replace_tabs_with_spaces_in_snippets)
  .map(&:replace_iframes_with_links)
  .each { |article| article.write_to_file(output_dir: output_dir) }