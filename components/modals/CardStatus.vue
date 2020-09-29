<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click.once="toggleClose(false)"></div>
            <div class="confirmation_text">
                Please setup first your payment card in order to proceed.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose(true)">{{ ($route.query.token) ? 'Add Card' : 'Go to My Cards' }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    if (me.$route.query.token) {
                        me.$parent.add_card = true
                    } else {
                        me.$router.push('/my-profile/update-profile#card')
                    }
                }
                me.$parent.checker = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            document.body.classList.add('no_scroll')
        }
    }
</script>
