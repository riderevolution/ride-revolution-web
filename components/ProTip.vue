<template>
    <div id="pro_tip">
        <div class="tip">
            PRO TIP: Classes start on time and late-comers will not be allowed to ride. No exceptions!
        </div>
        <div class="tip_btn" @click="dismissProTip()">Dismiss</div>
    </div>
</template>

<script>
    export default {
        methods: {
            dismissProTip () {
                const me = this
                me.$store.state.proTipStatus = false
            }
        }
    }
</script>
