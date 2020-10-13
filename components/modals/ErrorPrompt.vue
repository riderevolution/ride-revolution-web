<template>
    <div class="default_modal error">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                <div class="text error" v-for="(error, key) in $store.state.errorList" :key="key">{{ error }}</div>
            </div>
            <div class="button_group alt">
                <div class="default_btn" @click.once="toggleClose()">OK</div>
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
                    me.$store.state.errorPromptStatus = false
                } else {
                    me.$store.state.errorPromptStatus = false
                    document.body.classList.remove('no_scroll')
                }
                me.$store.state.errorOverlayPromptStatus = false
            }
        },
        mounted () {
            document.body.classList.add('no_scroll')
        }
    }
</script>
