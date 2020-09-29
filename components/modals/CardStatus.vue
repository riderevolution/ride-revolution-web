<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click.once="toggleClose(false)"></div>
            <div class="confirmation_text">
                Please setup your credit/debit card first in order to proceed.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose(true)">Go to My Cards</div>
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
                    me.$router.push('/my-profile/update-profile#card')
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
