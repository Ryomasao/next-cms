/*eslint-env node*/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const visit = require('unist-util-visit')

/**
 * 以下のようなmarkdownのcodeblockをhtmlにする際にファイル名fooをnodeに追加する
 * ```js title=foo
 * console.log(hey);
 * ```
 * https://unifiedjs.com/learn/guide/create-a-plugin/#plugin
 * @param {*} options
 */

export default function addFileName(options) {
  const settings = options || {}

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
      const fileNameNode = createFileNameNode(fileName)
      parent.children = parent.children.map((node) =>
        node.tagName === 'pre'
          ? wrap(node, fileNameNode, settings.attributes)
          : node,
      )
    }
  }

  function createFileNameNode(fileName) {
    return {
      type: 'element',
      tagName: 'p',
      properties: {
        className: ['file-name'],
      },
      children: [{ type: 'text', value: fileName }],
    }
  }

  /**
   * divでwrapする
   * @param {*} node
   * @param {*} fileNameNode
   * @param {*} attributes
   * @returns
   */
  function wrap(node, fileNameNode, attributes = {}) {
    return {
      type: 'element',
      tagName: settings.tagName || 'div',
      properties: Object.assign(
        {},
        {
          className: ['code-container'],
        },
        attributes,
      ),
      children: [fileNameNode, node],
    }
  }
}
