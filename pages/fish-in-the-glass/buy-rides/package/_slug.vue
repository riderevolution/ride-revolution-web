<template>
    <div class="buy_rides inner fish">
        <section id="payments" :class="`${($store.state.buyRidesSuccessStatus) ? 'success' : ''}`">
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
                                <div id="default_form">
                                    <div class="form_flex with_btn">
                                        <div class="form_group">
                                            <label for="promo_code">Promo Code</label>
                                            <input type="text" id="promo_code" name="promo_code" :class="`input_text ${(promoApplied) ? 'disabled' : ''}`" autocomplete="off" placeholder="Enter a Promo Code" v-validate="{regex: '^[a-zA-Z0-9-|\-|\_]*$'}" v-model="form.promo">
                                            <transition name="slide"><span class="validation_errors" v-if="errors.has('promo_code')">{{ errors.first('promo_code') | properFormat }}</span></transition>
                                        </div>
                                        <div class="form_button">
                                            <button type="button" :class="`default_btn_out ${(promoApplied) ? 'disabled' : ''}`" @click="applyPromo(res.id)"><span>Apply</span></button>
                                        </div>
                                    </div>
                                </div>
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
                                        <p>Php {{ computeTotal((promoApplied) ? totalCount(res.final_price) : (res.is_promo == 1 ? res.discounted_price : res.package_price)) }}</p>
                                    </div>
                                </div>
                                <div class="breakdown_actions">
                                    <div class="default_btn" @click="proceedToPayment('store-credits')">Use Store Credits</div>
                                    <div class="default_btn_img" @click="proceedToPayment('paypal')" v-if="!$parent.$parent.isMobile">
                                        <div class="btn_wrapper">
                                            <span class="img"><img src="/icons/paypal-logo.svg" /></span><span>Pay Now</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="action_mobile">
                                    <nuxt-link :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}`" class="back"><span>Back</span></nuxt-link>
                                    <div class="default_btn_img" @click="proceedToPayment('paypal')" v-if="$parent.$parent.isMobile">
                                        <div class="btn_wrapper">
                                            <span class="img"><img src="/icons/paypal-logo.svg" /></span><span>Pay Now</span>
                                        </div>
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
                                    <p class="store_credits">{{ storeCredits }}</p>
                                    <transition name="slide">
                                        <div class="unavailable" v-if="(parseInt(storeCredits) < parseInt((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price)))">
                                            <nuxt-link rel="canonical" :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}#storecredits`">Buy Rides</nuxt-link>
                                            <label>*Your store credits are insufficient.</label>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="total">
                                <p>You Pay</p>
                                <p>Php {{ computeTotal((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price)) }}</p>
                            </div>
                            <div class="preview_actions">
                                <div class="default_btn_blk" @click="stepBack()" v-if="!$parent.$parent.isMobile">Back</div>
                                <div id="paypal-button-container"></div>
                                <div :class="`default_btn_blue ${(parseInt(storeCredits) < parseInt((promoApplied) ? res.final_price : (res.is_promo == 1 ? res.discounted_price : res.package_price))) ? 'disabled' : ''}`" v-if="type == 'store-credits'" @click="paymentSuccess(res)">Pay Now</div>
                            </div>
                            <div class="paypal_disclaimer" v-if="type == 'paypal'">
                                <p>Note: Paypal account not needed</p>
                                <div class="wrapper">
                                    <img src="/icons/paypal.svg" />
                                    <img src="/icons/visa.svg" />
                                    <img src="/icons/mastercard.svg" />
                                </div>
                            </div>
                            <div class="back_wrapper">
                                <div class="back" @click="stepBack()" v-if="$parent.$parent.isMobile"><span>Back</span></div>
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
            <buy-rides-success v-if="$store.state.buyRidesSuccessStatus" />
        </transition>
    </div>
</template>

<script>
    import BuyRidesPrompt from '../../../../components/modals/BuyRidesPrompt'
    import BuyRidesSuccess from '../../../../components/modals/BuyRidesSuccess'
    export default {
        layout: 'fish',
        components: {
            BuyRidesPrompt,
            BuyRidesSuccess
        },
        data () {
            return {
                type: '',
                storeCredits: 0,
                step: 1,
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
        filters: {
            properFormat: function (value) {
                let newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                }else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
                let message = value.split('The ')[1].split(' field')
                if (message.length > 1) {
                    message = message[1]
                    return `The ${newValue} field${message}`
                } else {
                    if (message[0].split('image[]').length > 1) {
                        message = message[0].split('image[]')[1]
                        return `The ${newValue} field${message}`
                    } else {
                        return `The ${newValue}`
                    }
                }
            }
        },
        methods: {
            paymentSuccess (data, paypal_details = null) {
                const me = this
                let token = me.$route.query.token
                let formData = new FormData()
                formData.append('type', 'class-package')
                formData.append('class_package_id', data.id)
                formData.append('price', data.package_price)
                formData.append('promo_code', me.form.promo)
                formData.append('quantity', 1)
                formData.append('discount', me.form.discount)
                formData.append('total', me.form.total)
                formData.append('payment_method', me.type)
                if (paypal_details != null) {
                    formData.append('paypal_details', JSON.stringify(paypal_details))
                }
                me.loader(true)
                me.$axios.post('api/web/pay', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        me.$store.state.buyRidesSuccessStatus = true
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                }).then(() => {
                    me.step = 0
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            computeTotal (total) {
                const me = this
                me.form.total = total
                return me.totalCount(total)
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
                        me.step = 2
                        break
                    case 'paypal':
                        me.step = 2
                        me.paypal = true
                        me.renderPaypal()
                        break
                }
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
                                me.paymentSuccess(me.res, JSON.stringify(details))
                            })
                        }
                    }).render('#paypal-button-container')
                }, 500)
            }
        },
        mounted () {
            const me = this
            let token = me.$route.query.token
            me.$axios.get('api/check-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    me.storeCredits = res.data.user.store_credits.amount
                }
            }).catch(err => {
                console.log(err)
            })
            me.$store.state.proTipStatus = true
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
        }
    }
</script>
