<template>
  <wiki-partial
    :wiki="wiki"
    :top-level="true"
  ></wiki-partial>
</template>
<script>
import Wiki from '@/engine/Wiki'

import WikiPartial from '@/components/WikiPartial'

export default {
  components: { WikiPartial },
  asyncComputed: {
    wiki () {
      return Wiki.getByScopeAndName(this.$route.params.scope, this.$route.params.name)
    }
  },
  metaInfo () {
    return {
      title: this.wiki ? this.wiki.title : 'Loading'
    }
  }
}
</script>
