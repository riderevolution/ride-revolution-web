<template>
    <div id="pro_tip" :class="`${($store.state.articleAlertStatus) ? 'adjust' : ''}`">
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
            }
        },
        mounted () {
            const me = this
            me.$axios.get('api/pro-tips/random').then((res) => {
                if (res.data) {
                    me.res = res.data.proTip[0]
                }
            })
        }
    }
</script>
