import fm from 'front-matter'
import { safeLoad as parseYml } from 'js-yaml'
import mitFactory from 'markdown-it'
import mitV from 'laosb-markdown-it-v'

const defaultWikiFM = {
  template: 'default',
  tags: [],
  scope: 'wiki',
  privileged: false,
  isPartial: false,
  name: '',
  title: ''
}

const defaultPartialAttrs = {}

const mitOpts = {
  linkify: true,
  highlightNoWrappingEls: true,
  highlight (content, lang, slf) {
    if (lang === '_p') {
      const attrs = Object.assign({}, defaultPartialAttrs, parseYml(content))
      let scope = 'wiki'
      let partial = attrs.partial
      if (attrs[':']) partial = attrs[':']
      /* ':' is an alias of 'partial', so you can ref a partial like:
       *
       *  ```_p
       *  :: special:login
       *  ```
       *
       * This makes the whole thing easier and cooler.
       */
      const parsedName = partial.split(':')
      if (parsedName[1]) {
        scope = parsedName[0]
        partial = parsedName[1]
      }
      slf.sDom.openTag('WikiPartial', { scope, partial, attrs })
      slf.sDom.closeTag()
    }
    return slf.sDom
  }
}

const mit = mitFactory(Object.assign({ html: false }, mitOpts))
const mitPrivileged = mitFactory(Object.assign({ html: true }, mitOpts))
mit.use(mitV)
mitPrivileged.use(mitV)

const renderWiki = content => {
  const { attributes: opts, body: mdContent } = fm(content)
  return {
    opts: Object.assign({}, defaultWikiFM, opts),
    sdom: opts.privileged ? mit.render(mdContent) : mitPrivileged.render(mdContent)
  }
}

export default renderWiki
