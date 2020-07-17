<template>
    <div id="complete_profile">
        <div class="profile_text">
            <span>Profile Progress 30%</span>
            <div class="wrapper">
                <div :class="`rec ${(n <= 3) ? 'active' : ''}`" v-for="n in 10"></div>
            </div>
            <span class="complete" @click="toggleSteps()">Complete your profile now</span>
            <span>,&nbsp;so you can book your first ride.</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleSteps () {
                const me = this
                me.$store.state.completeProfileStepsStatus = true
                document.body.classList.add('no_scroll')
            },
            checkAdvisory () {
				const me = this
				if (me.$store.state.articleAlertStatus) {
					document.getElementById('complete_profile').style.top = `${document.getElementById('article_alert').scrollHeight + document.getElementById('header').scrollHeight}px`
				} else {
					document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight}px`
				}
			}
        },
        mounted () {
            const me = this
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
