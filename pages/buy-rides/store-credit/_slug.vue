<template>
    <div class="buy_rides inner">
        <breadcrumb :overlay="false" />
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" :page="'buy-rides'" />
        </transition>
        <section id="payments" :class="`${(!$store.state.proTipStatus) ? 'dismissed' : 'dismiss'} ${($store.state.buyRidesSuccessStatus) ? 'success' : ''}`">
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
                                    <nuxt-link rel="canonical" to="/buy-rides" class="default_btn_blk">Back</nuxt-link>
                                    <div class="default_btn_blue" @click="proceedToPayment('paynow')">Pay Now</div>
                                </div>
                                <div class="action_mobile" v-else>
                                    <div class="m_left">
                                        <nuxt-link rel="canonical" to="/buy-rides" class="default_btn_blk_alt"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></nuxt-link>
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
                                    <div class="default_btn_blue" @click="paymaya()">Paymaya</div>
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
                                    <div class="default_btn_blue" @click="paymaya()">Paymaya</div>
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
        </section>
        <transition name="fade">
            <buy-rides-prompt :message="message" v-if="$store.state.buyRidesPromptStatus" :status="promoApplied" />
        </transition>
        <transition name="fade">
            <buy-rides-success v-if="$store.state.buyRidesSuccessStatus" :summary="summary" />
        </transition>
    </div>
</template>

<script>
    import ProTip from '../../../components/ProTip'
    import Breadcrumb from '../../../components/Breadcrumb'
    import BuyRidesPrompt from '../../../components/modals/BuyRidesPrompt'
    import BuyRidesSuccess from '../../../components/modals/BuyRidesSuccess'
    export default {
        components: {
            ProTip,
            Breadcrumb,
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
                paypal: false,
                message: '',
                promoApplied: false,
                promo: false,
                form: {
                    promo: '',
                    quantity: 1,
                    total: 0
                }
            }
        },
        methods: {
            paymaya () {
                const me = this
                me.paymentType = 'paymaya'
                me.payment(me, null, 'store-credit', 1)
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
            let token = me.$cookies.get('70hokc3hhhn5')
            if ((token == null || token == undefined) && !me.$store.state.isAuth) {
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
                me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
            }
        },
        async asyncData ({ $axios, params, store, error }) {
            return await $axios.get(`api/packages/web/store-credits/${params.slug}`).then(res => {
                if (res.data) {
                    return {
                        res: res.data.storeCredit
                    }
                }
            }).catch(err => {
                error({ statusCode: 404, message: 'Page not found' })
            })
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `${me.res.name} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ],
                meta: [
                    { hid: 'og:title', property: 'og:title', content: `${me.res.name}` },
                    { hid: 'og:description', property: 'og:description', content: `${me.res.description}` },
                    { hid: 'og:url', property: 'og:url', content: `${host}/${me.$route.fullPath}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
