import Wiki from '@/engine/Wiki'

const WikiPartial = {
  name: 'WikiPartial',
  render (h) {
    return h('div', null, [
      this.warning ? h('WikiPartial', this.warning) : null,
      this.sdom ? this.sdom.toVue(h) : h('h1', 'Loading')
    ])
  },
  props: {
    partial: String,
    scope: String,
    attrs: Object,
    wiki: Object, // Only used on top-level; an instance of Wiki.
    topLevel: Boolean
  },
  data () {
    return {
      warning: false
    }
  },
  asyncComputed: {
    async sdom () {
      let wiki = this.topLevel
        ? this.wiki
        : await Wiki.getByScopeAndName(this.scope, this.partial)
      if (!wiki) wiki = await Wiki.getByScopeAndName('special', this.topLevel ? 'not_found' : 'partial_not_found')
      if (!wiki.isPartial && !this.topLevel) wiki = await Wiki.getByScopeAndName('special', 'not_a_partial')
      if (wiki.isPartial && this.topLevel) {
        this.warning = { scope: 'special', partial: 'partial_page' }
      } else this.warning = false
      return wiki.render().sdom
    }
  }
}

export default WikiPartial
