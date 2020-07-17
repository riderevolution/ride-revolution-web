<template>
    <div id="pro_tip">
        <p class="tip">
            PRO TIP: {{ res.label }}
        </p>
        <div class="tip_btn" @click="dismissProTip()">Dismiss</div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                res: []
            }
        },
        methods: {
            dismissProTip () {
                const me = this
                me.$store.state.proTipStatus = false
                if (document.querySelector('.buy_rides.inner') || document.querySelector('.book_a_bike.inner')) {
                    if (me.$store.state.articleAlertStatus && !me.$store.state.proTipStatus) {
                        document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('pro_tip').scrollHeight}px`
                    } else if (!me.$store.state.articleAlertStatus && me.$store.state.proTipStatus) {
                        document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('article_alert').scrollHeight}px`
                    } else {
                        document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight}px`
                    }
                }
            },
            checkAdvisory () {
				const me = this
				if (me.$store.state.articleAlertStatus && me.$store.state.proTipStatus) {
					document.getElementById('pro_tip').style.top = `${document.getElementById('article_alert').scrollHeight + document.getElementById('header').scrollHeight}px`
				} else if (me.$store.state.articleAlertStatus && !me.$store.state.proTipStatus) {
					document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('pro_tip').scrollHeight}px`
				} else if (!me.$store.state.articleAlertStatus && me.$store.state.proTipStatus) {
					document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('article_alert').scrollHeight}px`
				} else {
					document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight}px`
				}
			}
        },
        mounted () {
            const me = this
            me.$axios.get('api/pro-tips/random').then((res) => {
                if (res.data) {
                    me.res = res.data.proTip[0]
                    me.checkAdvisory()
                }
            })
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
