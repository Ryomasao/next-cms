import { visit } from 'unist-util-visit'

/**
 * 以下のようなmarkdownのcodeblockをhtmlにする際にファイル名fooをnodeに追加する
 * ```js title=foo
 * console.log(hey);
 * ```
 * https://unifiedjs.com/learn/guide/create-a-plugin/#plugin
 * @param {*} options
 */

export default function addFileName() {
  return transformer

  function transformer(tree) {
    visit(tree, 'element', visitor)
  }

  function visitor(node, index, parent) {
    // pre > code 以外のnodeは対象外
    if (
      !parent ||
      node.tagName !== 'pre' ||
      node.children[0].tagName !== 'code'
    ) {
      return
    }

    const code = node.children[0]
    if (code.properties.title) {
      const fileName = code.properties.title
      node.children = [createFileNameNode(fileName), ...node.children]
    }
  }

  function createFileNameNode(fileName) {
    return {
      type: 'element',
      tagName: 'span',
      properties: {
        className: ['file-name'],
      },
      children: [{ type: 'text', value: fileName }],
    }
  }
}
