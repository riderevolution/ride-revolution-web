<template>
    <div class="buy_rides inner">
        <breadcrumb :overlay="false" />
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" />
        </transition>
        <section id="payments" :class="`${(!$store.state.proTipStatus) ? 'dismissed' : 'dismiss'} ${($store.state.buyRidesSuccessStatus) ? 'success' : ''}`">
            <div id="step_1" :class="`step ${(step != 1) ? 'overlay' : ''}`">
                <transition name="slideX">
                    <div v-if="step == 1">
                        <h1 class="header_title">Buy Store Credits</h1>
                        <div class="wrapper">
                            <div class="left">
                                <div class="header">
                                    <h2>{{ replacer($route.params.slug) }}</h2>
                                    <h2>Php 1,000.00</h2>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li>1,000 worth of store credits that can be used to purchase class packages and Ride Revolution merchandise.</li>
                                        <li>This can’t be used to purchase more store credits.</li>
                                        <li>This is not transferrable or sharable to other Ride Rev members.</li>
                                        <li>This is not convertible to cash.</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="right">
                                <form id="default_form">
                                    <div class="form_flex with_btn alt">
                                        <div class="form_group qty">
                                            <label>Qty</label>
                                            <div :class="`form_qty ${(errors.has('quantity')) ? 'disabled' : ''}`">
                                                <input type="text" name="quantity" id="quantity" class="input_text number" maxlength="2" autocomplete="off" v-model="form.quantity" v-validate="'numeric|min_value:1'">
                                                <div class="up" @click="addCount()"></div>
                                                <div class="down" @click="subtractCount()"></div>
                                                <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity')">The qty field is required</span></transition>
                                            </div>
                                        </div>
                                        <div class="form_group">
                                            <label for="promo_code">Promo Code</label>
                                            <input type="text" id="promo_code" name="promo_code" class="input_text" autocomplete="off" placeholder="Enter a Promo Code" v-model="form.promo">
                                        </div>
                                        <div class="form_button">
                                            <button type="button" class="default_btn_out" @click="applyPromo()"><span>Apply</span></button>
                                        </div>
                                    </div>
                                </form>
                                <div class="breakdown_list">
                                    <div class="item">
                                        <p>Subtotal</p>
                                        <p>Php 9,500.00</p>
                                    </div>
                                    <div class="item">
                                        <p>Discount</p>
                                        <p>Php 0.00</p>
                                    </div>
                                    <div class="total">
                                        <p>You Pay</p>
                                        <p>Php 9,500.00</p>
                                    </div>
                                </div>
                                <div class="breakdown_actions alt">
                                    <nuxt-link to="/buy-rides" class="default_btn_blk" v-if="!$parent.$parent.isMobile">Back</nuxt-link>
                                    <div class="default_btn_img" @click="proceedToPayment('credit')">
                                        <div class="btn_wrapper">
                                            <span class="img"><img src="/icons/paypal-logo.svg" /></span><span>Pay Now</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="action_mobile" v-if="$parent.$parent.isMobile">
                                    <nuxt-link to="/buy-rides" class="default_btn_blk_alt"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></nuxt-link>
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
                                <h3>{{ replacer($route.params.slug) }}</h3>
                                <p>Php 9,500.00</p>
                            </div>
                            <div class="item">
                                <h3>Rides</h3>
                                <p>10</p>
                            </div>
                            <div class="item">
                                <h3>Discount</h3>
                                <p>Php 500.00</p>
                            </div>
                            <div class="total">
                                <p>You Pay</p>
                                <p>Php 9,000.00</p>
                            </div>
                            <div class="preview_actions">
                                <div class="default_btn_blk" @click="stepBack()" v-if="!$parent.$parent.isMobile">Back</div>
                                <div class="default_btn_img" @click="paymentSuccess()">
                                    <div class="btn_wrapper">
                                        <span class="img"><img src="/icons/paypal-logo.svg" /></span><span>Pay Now</span>
                                    </div>
                                </div>
                            </div>
                            <div class="paypal_disclaimer">
                                <p>Note: Paypal account not needed</p>
                                <div class="wrapper">
                                    <img src="/icons/paypal.svg" />
                                    <img src="/icons/visa.svg" />
                                    <img src="/icons/mastercard.svg" />
                                </div>
                            </div>
                            <div class="action_mobile" @click="stepBack()" v-if="$parent.$parent.isMobile">
                                <div class="default_btn_blk_alt"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </section>
        <transition name="fade">
            <buy-rides-prompt :message="message" v-if="$store.state.buyRidesPromptStatus" />
        </transition>
        <transition name="fade">
            <buy-rides-success v-if="$store.state.buyRidesSuccessStatus" />
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
                type: '',
                storeCredits: 50,
                step: 1,
                paypal: false,
                message: '',
                promoApplied: false,
                promo: false,
                form: {
                    promo: '',
                    quantity: 1
                }
            }
        },
        methods: {
            paymentSuccess () {
                const me = this
                me.step = 0
                me.$store.state.buyRidesSuccessStatus = true
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
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        switch (type) {
                            case 'store-credit':
                            me.step = 2
                            break
                            case 'credit':
                            me.paypal = true
                            me.step = 2
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
            applyPromo () {
                const me = this
                me.message = 'You’ve entered an invalid promo code.'
                me.$store.state.buyRidesPromptStatus = true
            }
        },
        mounted () {
            const me = this
            me.$store.state.proTipStatus = true
        }
    }
</script>
