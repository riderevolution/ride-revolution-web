<template>
	<div id="breadcrumb" :class="`${(hasPadding) ? 'has_padding' : ''}`">
		<ul>
			<li v-for="(crumb, key) in crumbs" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
				<nuxt-link itemprop="url" :to="crumb.url">
					<span v-if="crumb.url == '/'" class="home">Homepage</span>
					<span v-else class="crumb">{{ crumb.NAME }}</span>
				</nuxt-link>
				<span class="slash">
					{{ (crumbs.length == key + 1) ? '' : '/' }}
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import breadcrumb from 'url-breadcrumb'
	export default {
		props: {
			hasPadding: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				crumbs: []
			}
		},
		mounted() {
            const me = this
            me.crumbs = breadcrumb($nuxt.$route.path )
        },
	}
</script>
