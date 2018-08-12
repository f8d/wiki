<template>
  <component :is="template">
    <wiki-partial
      :wiki="wiki"
      :top-level="true"
    ></wiki-partial>
  </component>
</template>
<script>
import Wiki from '@/engine/Wiki'

import WikiPartial from '@/components/WikiPartial'

const templates = {
  'wiki': () => import('@/templates/Wiki'),
  'full-width': () => import('@/templates/FullWidth'),
  'home': () => import('@/templates/Home')
}

export default {
  components: Object.assign({ WikiPartial }, templates),
  asyncComputed: {
    wiki () {
      return Wiki.getByScopeAndName(this.$route.params.scope, this.$route.params.name)
    }
  },
  computed: {
    template () {
      if (this.wiki) return templates[this.wiki.template] || 'wiki'
      return 'wiki'
    }
  },
  metaInfo () {
    return {
      title: this.wiki ? this.wiki.title : 'Loading'
    }
  }
}
</script>
