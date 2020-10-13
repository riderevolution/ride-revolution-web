<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_text">
                {{ message }}
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose()">OK</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: ''
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$parent.card_success = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            document.body.classList.remove('no_scroll')
        }
    }
</script>
