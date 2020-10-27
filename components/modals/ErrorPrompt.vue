<template>
    <div class="default_modal error">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text" v-if="!$store.state.needLogin">
                <div class="text error" v-for="(error, key) in $store.state.errorList" :key="key">{{ error }}</div>
            </div>
            <div class="confirmation_text" v-else>
                Session expired, please login.
            </div>
            <div class="button_group alt">
                <div class="default_btn" @click.once="toggleClose()" v-if="!$store.state.needLogin">OK</div>
                <div class="default_btn" @click.once="toggleClose()" v-else>Login</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                if (me.$store.state.errorOverlayPromptStatus) {
                    if (me.$store.state.needLogin) {
                        me.$store.state.loginSignUpStatus = true
                        me.$store.state.needLogin = false
                        me.$store.state.errorPromptStatus = false
                    } else {
                        me.$store.state.errorPromptStatus = false
                    }
                } else {
                    if (me.$store.state.needLogin) {
                        me.$store.state.loginSignUpStatus = true
                        me.$store.state.needLogin = false
                        me.$store.state.errorPromptStatus = false
                        document.body.classList.remove('no_scroll')
                    } else {
                        me.$store.state.errorPromptStatus = false
                        document.body.classList.remove('no_scroll')
                    }
                }
                me.$store.state.errorOverlayPromptStatus = false
            }
        },
        mounted () {
            document.body.classList.add('no_scroll')
        }
    }
</script>
