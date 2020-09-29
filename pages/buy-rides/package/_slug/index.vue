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
                        <h1 class="header_title">Buy Class Package</h1>
                        <div class="wrapper">
                            <div class="left">
                                <div class="header">
                                    <h2>{{ res.name }}</h2>
                                    <h2 :class="`${(res.is_promo == 1) ? 'discount' : ''}`" >Php {{ totalCount(res.package_price) }}</h2>
                                    <h2 v-if="res.is_promo == 1">Php {{ totalCount(res.discounted_price) }}</h2>
                                </div>
                                <div class="content" v-html="res.description">
                                </div>
                            </div>
                            <div class="right">
                                <form id="default_form">
                                    <div class="form_flex with_btn">
                                        <div class="form_group">
                                            <label for="promo_code">Promo Code</label>
                                            <input type="text" id="promo_code" name="promo_code" :class="`input_text ${(promoApplied) ? 'disabled' : ''}`" autocomplete="off" placeholder="Enter a Promo Code" v-validate="{regex: '^[a-zA-Z0-9-|\-|\_]*$'}" v-model="form.promo">
                                            <transition name="slide"><span class="validation_errors" v-if="errors.has('promo_code')">{{ properFormat(errors.first('promo_code')) }}</span></transition>
                                        </div>
                                        <div class="form_button">
                                            <button type="button" :class="`default_btn_out ${(promoApplied) ? 'disabled' : ''}`" @click="applyPromo(res.id)"><span>Apply</span></button>
                                        </div>
                                    </div>
                                </form>
                                <div class="breakdown_list">
                                    <div class="item">
                                        <p>Subtotal</p>
                                        <p>Php {{ totalCount((res.is_promo == 1) ? res.discounted_price : res.package_price) }}</p>
                                    </div>
                                    <div class="item">
                                        <p>Discount</p>
                                        <p>Php {{ computeDiscount((promoApplied) ? res.package_price - res.final_price : '0.00') }}</p>
                                    </div>
                                    <div class="total">
                                        <p>You Pay</p>
                                        <p>Php {{ computeTotal((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price)) }}</p>
                                    </div>
                                </div>
                                <div class="breakdown_actions" v-if="!$store.state.isMobile && !res.recurring">
                                    <div class="default_btn" @click="proceedToPayment('store-credits')">Use Store Credits</div>
                                    <div class="default_btn_blue" @click="proceedToPayment('paynow')">Pay Now</div>
                                </div>
                                <div class="breakdown_actions" v-if="!$store.state.isMobile && res.recurring">
                                    <nuxt-link rel="canonical" to="/buy-rides" class="default_btn_blk" v-if="!$store.state.isMobile && res.recurring">Back</nuxt-link>
                                    <nuxt-link class="default_btn_blue" :to="`/buy-rides/package/${res.slug}/subscribe`">Subscribe</nuxt-link>
                                </div>
                                <nuxt-link rel="canonical" to="/buy-rides" class="default_btn_blk" v-if="!$store.state.isMobile && !res.recurring">Back</nuxt-link>
                                <div class="action_mobile" v-if="$store.state.isMobile && !res.recurring">
                                    <div class="m_left">
                                        <nuxt-link rel="canonical" to="/buy-rides" class="default_btn_blk_alt"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></nuxt-link>
                                    </div>
                                    <div class="m_right">
                                        <div class="default_btn" @click="proceedToPayment('store-credits')">Use Store Credits</div>
                                        <div class="default_btn_blue" @click="proceedToPayment('paynow')">Pay Now</div>
                                    </div>
                                </div>
                                <div class="action_mobile" v-if="$store.state.isMobile && res.recurring">
                                    <div class="m_left">
                                        <nuxt-link rel="canonical" to="/buy-rides" class="default_btn_blk_alt"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></nuxt-link>
                                    </div>
                                    <div class="m_right">
                                        <nuxt-link class="default_btn_blue" :to="`/buy-rides/package/${res.slug}/subscribe`">Subscribe</nuxt-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div id="step_2" :class="`step ${(step != 2) ? 'overlay' : ''}`">
                <transition :name="`${(step == 0) ? 'fade' : 'slideX'}`">
                    <div v-if="step == 2" class="preview_payment">
                        <h2 class="header_title">Let’s make sure we got this right.</h2>
                        <div class="preview">
                            <div class="item">
                                <h3>{{ res.name }}</h3>
                                <p>Php {{ totalCount((res.is_promo == 1) ? res.discounted_price : res.package_price) }}</p>
                            </div>
                            <div class="item">
                                <h3>Rides</h3>
                                <p>{{ res.class_count }}</p>
                            </div>
                            <div class="item">
                                <h3>Discount</h3>
                                <p>Php {{ computeDiscount((promoApplied) ? res.package_price - res.final_price : '0.00') }}</p>
                            </div>
                            <div class="available" v-if="!paypal">
                                <div :class="`available_item ${(parseInt(storeCredits) < parseInt((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price))) ? 'insufficient' : ''}`">
                                    <h3>Available Store Credits</h3>
                                    <p class="store_credits">{{ totalItems(storeCredits) }}</p>
                                    <transition name="slide">
                                        <div class="unavailable" v-if="(parseInt(storeCredits) < parseInt((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price)))">
                                            <nuxt-link rel="canonical" to="/buy-rides#storecredits">Buy Credits</nuxt-link>
                                            <p>*Your store credits are insufficient.</p>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="total">
                                <p>You Pay</p>
                                <p>{{ (type == 'store-credits') ? '' : 'Php' }} {{ computeTotal((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price)) }} {{ (type == 'store-credits') ? 'Credits' : '' }}</p>
                            </div>
                            <div class="preview_actions" v-if="!$store.state.isMobile">
                                <div class="left">
                                    <div class="default_btn_blk" @click="stepBack()">Back</div>
                                </div>
                                <div class="right">
                                    <div :class="`default_btn_blue ${(parseInt(storeCredits) < parseInt((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price))) ? 'disabled' : ''}`" v-if="type == 'store-credits'" @click="paymentSuccess()">Pay Now</div>
                                    <div class="default_btn_blue" @click="paymaya()" v-if="type == 'paynow'">Paymaya</div>
                                    <div id="paypal-button-container" v-if="type == 'paynow'"></div>
                                </div>
                            </div>
                            <div class="paypal_disclaimer" v-if="type == 'paynow' && !$store.state.isMobile">
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
                                    <div :class="`default_btn_blue ${(parseInt(storeCredits) < parseInt((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price))) ? 'disabled' : ''}`" v-if="type == 'store-credits'" @click="paymentSuccess()">Pay Now</div>
                                    <div class="default_btn_blue" @click="paymaya()" v-if="type == 'paynow'">Paymaya</div>
                                    <div id="paypal-button-container" v-if="type == 'paynow'"></div>
                                    <div class="paypal_disclaimer" v-if="type == 'paynow'">
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
                        <paymaya-checkout :summary="summary" />
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
</template>

<script>
    import PaymayaCheckout from '../../../../components/PaymayaCheckout'
    import ProTip from '../../../../components/ProTip'
    import Breadcrumb from '../../../../components/Breadcrumb'
    import CardStatus from '../../../../components/modals/CardStatus'
    import BuyRidesPrompt from '../../../../components/modals/BuyRidesPrompt'
    import BuyRidesSuccess from '../../../../components/modals/BuyRidesSuccess'
    export default {
        components: {
            PaymayaCheckout,
            ProTip,
            Breadcrumb,
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
                type: '',
                paymentType: '',
                step: 1,
                checker: false,
                paypal: false,
                message: '',
                promoApplied: false,
                promo: false,
                form: {
                    promo: '',
                    discount: 0,
                    total: 0
                },
                res: []
            }
        },
        methods: {
            paymaya () {
                const me = this
                let token = me.$cookies.get('70hokc3hhhn5')
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
                    me.$store.state.loginSignUpStatus = true
                    document.body.classList.add('no_scroll')
                    me.$nuxt.error({ statusCode: 403, message: 'Something Went Wrong' })
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            paymentSuccess () {
                const me = this
                me.payment(me, null, 'class-package', 0)
            },
            computeTotal (total) {
                const me = this
                let result = 0
                if (me.type == 'store-credits') {
                    result = me.totalItems(total)
                } else {
                    result = me.totalCount(total)
                }
                me.form.total = total
                me.summary.res = me.res
                me.summary.total = total
                me.summary.discount = me.form.discount
                me.summary.type = me.type
                return result
            },
            computeDiscount (discount) {
                const me = this
                me.form.discount = discount
                return me.totalCount(discount)
            },
            stepBack () {
                const me = this
                if (me.step == 2) {
                    me.step = 1
                    me.paypal = false
                }
            },
            proceedToPayment (type) {
                const me = this
                me.type = type
                switch (type) {
                    case 'store-credits':
                        me.paymentType = type
                        me.step = 2
                        break
                    case 'paynow':
                        me.step = 2
                        me.paypal = true
                        me.renderPaypal()
                        break
                }
                me.$scrollTo('#payments', {
                    offset: -250
                })
            },
            applyPromo (id) {
                const me = this
                if (!me.promoApplied) {
                    let formData = new FormData()
                    formData.append('promo_code', me.form.promo)
                    formData.append('class_package_id', id)
                    me.loader(true)
                    me.$axios.post('api/apply-promo', formData).then(res => {
                        if (res.data) {
                            me.res = res.data.classPackage
                            me.promoApplied = true
                            me.message = 'Cheers! You’ve entered a valid promo code.'
                        }
                    }).catch(err => {
                        me.message = err.response.data.errors[0]
                    }).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                            me.$store.state.buyRidesPromptStatus = true
                            document.body.classList.add('no_scroll')
                        }, 500)
                    })
                }
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
                                me.payment(me, JSON.stringify(details), 'class-package', 0)
                            })
                        }
                    }).render('#paypal-button-container')
                }, 500)
            }
        },
        mounted () {
            const me = this
            me.loader(true)
            let token = me.$cookies.get('70hokc3hhhn5')
            if ((token == null || token == undefined) && !me.$store.state.isAuth) {
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
                me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                me.loader(false)
            } else {
                me.$axios.get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        let formData = new FormData()
                        formData.append('class_package_id', me.res.id)
                        me.$axios.post('api/extras/check-package-validity', formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            me.$store.state.proTipStatus = true
                        }).catch(err => {
                            setTimeout( () => {
                                document.body.classList.add('no_scroll')
                                me.$store.state.errorList = err.response.data.errors
                                me.$store.state.errorPromptStatus = true
                            }, 500)
                            setTimeout( () => {
                                me.$router.push('/buy-rides')
                            }, 1000)
                        })
                        me.storeCredits = (res.data.user.store_credits == null) ? 0 : res.data.user.store_credits.amount
                    }
                }).catch((err) => {
                    console.log(err);
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        },
        async asyncData ({ $axios, params, store, error }) {
            return await $axios.get(`api/packages/web/class-packages/${params.slug}`).then(res => {
                if (res.data) {
                    return {
                        res: res.data.classPackage
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
