import Parse from 'parse'
import renderWiki from './renderWiki'

class Wiki extends Parse.Object {
  constructor () {
    super('Wiki')
  }
  get isPartial () { return this.get('isPartial') }
  get content () { return this.get('content') }
  get template () { return this.get('template') }
  get title () { return this.get('title') }
  render () {
    return renderWiki(this.content)
  }
  static getByScopeAndName (scope, name) {
    const query = new Parse.Query(Wiki)
    query.equalTo('name', name)
    query.equalTo('scope', scope || 'wiki')
    return query.first()
  }
}
Parse.Object.registerSubclass('Wiki', Wiki)

export default Wiki
