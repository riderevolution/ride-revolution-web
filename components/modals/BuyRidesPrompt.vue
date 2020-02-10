<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_image">
                <img src="/oops-meme.jpeg" v-if="!status" />
                <img src="/success-meme.png" v-else />
            </div>
            <div class="confirmation_text">
                {{ message }}
            </div>
            <div class="button_group alt">
                <div class="flex default_btn" @click.once="toggleClose()">Confirm</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: null
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.buyRidesPromptStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
