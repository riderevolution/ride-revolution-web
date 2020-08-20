<template>
    <div id="pro_tip">
        <div class="tip" v-if="res !== null">
            <span>PRO TIP:</span>
            <div class="text" v-html="res.label"></div>
        </div>
        <div class="tip_btn" @click="dismissProTip()" v-if="res !== null">Dismiss</div>
    </div>
</template>

<script>
    export default {
        props: {
            page: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                res: []
            }
        },
        methods: {
            dismissProTip () {
                const me = this
                me.$store.state.proTipStatus = false
                if (document.querySelector('.buy_rides.inner') || document.querySelector('.book_a_bike.inner') || document.querySelector('.comment')) {
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
            me.$axios.get(`api/pro-tips/random?page=${me.page}`).then((res) => {
                if (res.data) {
                    me.res = res.data.proTip
                    me.checkAdvisory()
                    if (me.res === null) {
                        me.$store.state.proTipStatus = false
                    }
                }
            })
        },
		beforeMount () {
            window.addEventListener('load', this.checkAdvisory)
            window.addEventListener('scroll', this.checkAdvisory)
            window.addEventListener('resize', this.checkAdvisory)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.checkAdvisory)
            window.removeEventListener('scroll', this.checkAdvisory)
            window.removeEventListener('resize', this.checkAdvisory)
        }
    }
</script>
