<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title alt">Paymaya</h2>
                    <h3 class="form_subtitle">Please fill up this form to continue</h3>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_group">
                            <div class="paymaya-checkout"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            payment_type: {
                type: String,
                default: 'class-package'
            }
        },
        methods: {
            initiatePaymaya () {
                const me = this
                me.loader(true)
                setTimeout(() => {
                    let targetHTMLElement = document.querySelector('.paymaya-checkout')

                    PayMayaSDK.init('pk-3yJqfuy3fKZLcLSG9ksmpH4rYsPrHVk9fURYWLVGiLq', true)
                    PayMayaSDK.createCreditCardForm(targetHTMLElement, {
                        buttonText: 'Submit'
                    }).addTransactionHandler((paymentTokenId) => {
                        me.payment(me.$parent, null, me.payment_type, paymentTokenId)
                    })
                    me.loader(false)
                }, 1000)
            },
            toggleClose () {
                const me = this
                me.$parent.paymayaStatus = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            const me = this
            document.body.classList.add('no_scroll')
            me.initiatePaymaya()
        }
    }
</script>
