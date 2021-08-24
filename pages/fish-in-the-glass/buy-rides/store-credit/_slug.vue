<template>
    <transition name="fade">
        <div class="buy_rides inner fish" v-if="loaded">
            <section id="payments" :class="`${($store.state.buyRidesSuccessStatus) ? 'success' : ''}`">
                <div id="step_1" :class="`step ${(step != 1) ? 'overlay' : ''}`">
                    <transition name="slideX">
                        <div v-if="step == 1">
                            <h1 class="header_title">Buy Store Credits</h1>
                            <div class="wrapper">
                                <div class="left">
                                    <div class="header">
                                        <h2>{{ res.name }}</h2>
                                        <h2>Php {{ totalCount(res.amount) }}</h2>
                                    </div>
                                    <div class="content" v-html="res.description">
                                    </div>
                                </div>
                                <div class="right">
                                    <form id="default_form">
                                        <div class="form_flex alt_2">
                                            <div class="form_group">
                                                <label>Qty</label>
                                                <div :class="`form_qty ${(promoApplied) ? 'disabled' : ''}`">
                                                    <input type="text" name="quantity" id="quantity" :class="`input_text ${(promoApplied) ? 'disabled' : ''} number`" maxlength="2" autocomplete="off" v-model="form.quantity" v-validate="'numeric|min_value:1|max_value:99'">
                                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity')">{{ properFormat(errors.first('quantity')) }}</span></transition>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="breakdown_list">
                                        <!-- <div class="item">
                                        <p>Quantity</p>
                                        <p>{{ form.quantity }}</p>
                                    </div> -->
                                    <!-- <div class="item">
                                    <p>Subtotal</p>
                                    <p>Php {{ computeTotal(res.amount * form.quantity) }}</p>
                                </div> -->
                                        <div class="total">
                                            <p>You Pay</p>
                                            <p>Php {{ computeTotal(res.amount * form.quantity) }}</p>
                                        </div>
                                    </div>
                                    <div class="breakdown_actions alt" v-if="!$store.state.isMobile">
                                        <nuxt-link :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}`" class="default_btn_blk" v-if="!$store.state.isMobile">Back</nuxt-link>
                                        <div class="default_btn_blue" @click="proceedToPayment('paynow')">Pay Now</div>
                                    </div>
                                    <div class="action_mobile" v-else>
                                        <div class="m_left">
                                            <nuxt-link :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}`" class="default_btn_blk_alt"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></nuxt-link>
                                        </div>
                                        <div class="m_right">
                                            <div class="default_btn_blue" @click="proceedToPayment('paynow')">Pay Now</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div id="step_2" :class="`step ${(step != 2) ? 'overlay' : ''}`">
                    <transition name="slideX">
                        <div v-if="step == 2" class="preview_payment">
                            <h2 class="header_title">Let’s make sure we got this right.</h2>
                            <div class="preview">
                                <div class="item">
                                    <h3>{{ res.name }}</h3>
                                    <p>Php {{ totalCount(res.amount) }}</p>
                                </div>
                                <div class="item">
                                    <h3>Quantity</h3>
                                    <p>{{ form.quantity }}</p>
                                </div>
                                <div class="total">
                                    <p>You Pay</p>
                                    <p>Php {{ totalCount(form.total) }}</p>
                                </div>
                                <div class="preview_actions" v-if="!$store.state.isMobile">
                                    <div class="left">
                                        <div class="default_btn_blk" @click="stepBack()">Back</div>
                                    </div>
                                    <div class="right">
                                        <div class="default_btn_blue" @click="paymaya()">Debit/Credit Card</div>
                                        <br><br>
                                        <div class="default_btn_blue" @click="gcash()">
                                            <span>
                                                <img src="/gcash-logo.png" />
                                            </span>
                                            <span>GCash</span>
                                        </div>
                                        <div id="paypal-button-container"></div>
                                    </div>
                                </div>
                                <div class="paypal_disclaimer" v-if="!$store.state.isMobile">
                                    <p>Note: Paypal account not needed</p>
                                    <div class="wrapper">
                                        <img src="/icons/paypal.svg" />
                                        <img src="/icons/visa.svg" />
                                        <img src="/icons/mastercard.svg" />
                                    </div>
                                </div>
                                <div class="action_mobile" v-if="$store.state.isMobile">
                                    <div class="left">
                                        <div class="default_btn_blk_alt" @click="stepBack()"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></div>
                                    </div>
                                    <div class="right">
                                        <div class="default_btn_blue" @click="paymaya()">Debit/Credit Card</div>
                                        <br><br>
                                        <div class="default_btn_blue" @click="gcash()">
                                            <span>
                                                <img src="/gcash-logo.png" />
                                            </span>
                                            <span>GCash</span>
                                        </div>
                                        <div id="paypal-button-container"></div>
                                        <div class="paypal_disclaimer">
                                            <p>Note: Paypal account not needed</p>
                                            <div class="wrapper">
                                                <img src="/icons/paypal.svg" />
                                                <img src="/icons/visa.svg" />
                                                <img src="/icons/mastercard.svg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div id="step_3" :class="`step ${(step != 3) ? 'overlay' : ''}`">
                    <transition :name="`${(step == 0) ? 'fade' : 'slideX'}`">
                        <div v-if="step == 3">
                            <paymaya-checkout :type="'store-credit-page'"/>
                        </div>
                    </transition>
                </div>
            </section>
            <transition name="fade">
                <card-status v-if="checker" />
            </transition>
            <transition name="fade">
                <buy-rides-prompt :message="message" v-if="$store.state.buyRidesPromptStatus" :status="promoApplied" />
            </transition>
            <transition name="fade">
                <buy-rides-success v-if="$store.state.buyRidesSuccessStatus" :summary="summary" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import PaymayaCheckout from '../../../../components/PaymayaCheckout'
    import CardStatus from '../../../../components/modals/CardStatus'
    import BuyRidesPrompt from '../../../../components/modals/BuyRidesPrompt'
    import BuyRidesSuccess from '../../../../components/modals/BuyRidesSuccess'
    export default {
        layout: 'fish',
        components: {
            PaymayaCheckout,
            CardStatus,
            BuyRidesPrompt,
            BuyRidesSuccess
        },
        data () {
            return {
                summary: {
                    res: '',
                    total: 0,
                    discount: 0,
                    quantity: 0,
                    type: ''
                },
                res: [],
                type: '',
                paymentType: '',
                storeCredits: 50,
                step: 1,
                checker: false,
                loaded: false,
                paypal: false,
                paymayaStatus: false,
                message: '',
                promoApplied: false,
                promo: false,
                form: {
                    promo: '',
                    quantity: 1,
                    total: 0
                },
                paymongoData: null
            }
        },
        methods: {
            gcash () {
                const me = this
                let token = me.$route.query.token
                me.loader(true)
                me.form.url = location.href
                me.$axios.post(`api/paymongo/sources`, me.form, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    me.paymongoData = res.data.source.data
                    me.payment(me, null, 'store-credit', 0, null, true)
                }).catch(err => {
                    me.$store.state.loginSignUpStatus = true
                    document.body.classList.add('no_scroll')
                    me.$nuxt.error({ statusCode: 403, message: 'Something Went Wrong' })
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            paymaya () {
                const me = this
                let token = me.$route.query.token
                me.loader(true)
                me.$axios.get('api/paymaya/cards', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data.cards.length <= 0) {
                        me.checker = true
                    } else {
                        me.step += 1
                    }
                }).catch((err) => {
                    setTimeout( () => {
                        document.body.classList.add('no_scroll')
                        me.$store.state.errorList = err.response.data.errors
                        me.$store.state.errorPromptStatus = true
                    }, 500)
                    setTimeout( () => {
                        me.$router.push(`/fish-in-the-glass/buy-rides?token=${token}`)
                    }, 1000)
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            computeTotal (total) {
                const me = this
                me.form.total = total
                me.summary.res = me.res
                me.summary.total = total
                me.summary.discount = me.form.discount
                me.summary.quantity = me.form.quantity
                me.summary.type = 'store-credit-page'
                return me.totalCount(total)
            },
            stepBack () {
                const me = this
                if (me.step == 2) {
                    me.step = 1
                    me.paypal = false
                }
            },
            addCount () {
                const me = this
                let data
                data = parseInt(me.form.quantity)
                if (data != 99) {
                    data != 0 && (me.form.quantity = 0)
                    me.form.quantity = (data += 1)
                }
            },
            subtractCount () {
                const me = this
                let data
                data = parseInt(me.form.quantity)
                data > 1 && (me.form.quantity = (data -= 1))

            },
            proceedToPayment (type) {
                const me = this
                me.type = type
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        switch (type) {
                            case 'store-credits':
                                me.paymentType = type
                                me.step = 2
                            break
                            case 'paynow':
                                me.paypal = true
                                me.step = 2
                                me.renderPaypal()
                            break
                        }
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
                            offset: -250
                        })
                    }
                })
            },
            renderPaypal () {
                let me = this
                setTimeout(() => {
                    paypal.Buttons({
                        style: {
                            layout: 'vertical',
                            color: 'blue',
                            size: 'responsive',
                            fundingicons: true
                        },
                        funding: {
                            allowed: [ paypal.FUNDING.CARD ]
                        },
                        createOrder: function(data, actions) {
                          // This function sets up the details of the transaction, including the amount and line item details.
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: me.form.total
                                    }
                                }]
                            })
                        },
                        onApprove: function(data, actions) {
                          // This function captures the funds from the transaction.
                            me.loader(true)
                            return actions.order.capture().then(function(details) {
                                me.paymentType = 'paypal'
                                me.payment(me, JSON.stringify(details), 'store-credit', 0)
                            })
                        }
                    }).render('#paypal-button-container')
                }, 500)
            }
        },
        mounted () {
            const me = this
            me.$store.state.proTipStatus = true
        },
        async asyncData ({ $axios, params, store, error }) {
            return await $axios.get(`api/packages/web/store-credits/${params.slug}`).then(res => {
                if (res.data) {
                    return {
                        res: res.data.storeCredit,
                        storeCredits: (store.state.user.store_credits === null) ? 0 : store.state.user.store_credits.amount,
                        loaded: true
                    }
                }
            }).catch(err => {
                error({ statusCode: 404, message: 'Page not found' })
            })
        }
    }
</script>
