<template>
	<div id="breadcrumb" :class="`${(hasPadding) ? '' : (overlay ? 'overlay' : '')}`">
		<ul itemtype="http://schema.org/BreadcrumbList">
			<li v-for="(crumb, key) in crumbs" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<nuxt-link itemprop="item" :to="crumb.url">
					<span itemprop="name" v-if="crumb.url == '/'" class="front">Homepage</span>
					<span v-else itemprop="name" class="crumb">{{ checkSlug(crumb.NAME) }}</span>
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
			},
			booker: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				crumbs: [],
				loaded: false
			}
		},
		methods: {
			checkSlug (slug) {
				const me = this
				let result = ''
				if (slug == 'faqs') {
					result = 'FAQS'
				} else {
					if (slug.match(/^[0-9]+$/) && me.booker) {
						result = 'Reservation'
					} else {
						result = slug
					}
				}
				return result
			},
			checkAdvisory () {
				const me = this
				setTimeout( () => {
					if (!me.overlay) {
						if (document.getElementById('instructors_nav')) {
							if (me.$store.state.articleAlertStatus) {
								document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('article_alert').scrollHeight + document.getElementById('instructors_nav').scrollHeight}px`
								document.getElementById('instructors_nav').style.top = `${document.getElementById('header').scrollHeight + document.getElementById('article_alert').scrollHeight}px`
							} else {
								document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('instructors_nav').scrollHeight}px`
							}
						} else {
							if (document.getElementById('complete_profile')) {
								if (me.$store.state.articleAlertStatus) {
									document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('article_alert').scrollHeight + document.getElementById('complete_profile').scrollHeight}px`
								} else {
									document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('complete_profile').scrollHeight}px`
								}
							} else {
								if (document.querySelector('.buy_rides.inner') || document.querySelector('.book_a_bike.inner') || document.querySelector('.comment')) {
									if (me.$store.state.articleAlertStatus && me.$store.state.proTipStatus) {
										if (document.getElementById('pro_tip') && document.getElementById('article_alert')) {
											document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('article_alert').scrollHeight + document.getElementById('header').scrollHeight + document.getElementById('pro_tip').scrollHeight}px`
										}
									} else if (me.$store.state.articleAlertStatus && !me.$store.state.proTipStatus) {
										if (document.getElementById('pro_tip')) {
											document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('pro_tip').scrollHeight}px`
										} else {
											if (document.querySelector('.buy_rides.transaction')) {
												if (me.$store.state.articleAlertStatus) {
													if (document.getElementById('article_alert')) {
														document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('article_alert').scrollHeight + document.getElementById('header').scrollHeight}px`
													}
								                } else {
								                    document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight}px`
								                }
											}
										}
									} else if (!me.$store.state.articleAlertStatus && me.$store.state.proTipStatus) {
										document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('pro_tip').scrollHeight}px`
									} else {
										document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight}px`
									}
								} else {
									if (me.$store.state.articleAlertStatus) {
										document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('article_alert').scrollHeight}px`
									} else {
										document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight}px`
									}
								}
							}
						}
					}
				}, 100)
			}
		},
		mounted() {
            const me = this
            me.crumbs = breadcrumb($nuxt.$route.path)
			me.checkAdvisory()
        },
		beforeMount () {
            window.addEventListener('load', this.checkAdvisory)
            window.addEventListener('resize', this.checkAdvisory)
            window.addEventListener('scroll', this.checkAdvisory)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.checkAdvisory)
            window.removeEventListener('resize', this.checkAdvisory)
            window.removeEventListener('scroll', this.checkAdvisory)
        }
	}
</script>
