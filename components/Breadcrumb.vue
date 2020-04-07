<template>
	<div id="breadcrumb" :class="`${(hasPadding) ? 'has_padding' : (overlay ? 'overlay' : '')} ${(!$store.state.proTipStatus && !$store.state.completeProfileStatus) ? '' : 'dismiss'}`">
		<ul itemtype="http://schema.org/BreadcrumbList">
			<li v-for="(crumb, key) in crumbs" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<nuxt-link itemprop="item" :to="crumb.url">
					<span itemprop="name" v-if="crumb.url == '/'" class="front">Homepage</span>
					<span v-else itemprop="name" class="crumb">{{ (crumb.NAME == 'faqs') ? 'FAQS' : crumb.NAME }}</span>
					<meta itemprop="position" :content="key + 1" />
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
			},
			overlay: {
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
