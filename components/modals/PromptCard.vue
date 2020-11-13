<template>
    <div class="default_modal alt">
        <div class="background"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_title">
                Read before continuing
            </div>
            <div class="confirmation_text">
                To verify that your credit card is active, PayMaya will be charging your card Php 10.00.
                Once verification is done, the Php 10.00 will be immediately reversed. Expect the reversal
                within a few minutes.
                <br />
                <br />
                Your credit card details will be saved by PayMaya to make your transactions more seamless.
                If you wish to delete your details, you may do so through your Account Settings.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose()">OK</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$parent.prompt_card = false
                me.$parent.add_card = true
            }
        },
        mounted () {
            const me = this
            document.body.classList.add('no_scroll')
        }
    }
</script>
