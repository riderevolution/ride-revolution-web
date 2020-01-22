<template>
    <div class="buy_rides inner">
        <section id="banner"></section>
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" />
        </transition>
        <section id="payments" :class="`${(!$store.state.proTipStatus) ? 'dismiss' : ''}`">
            <div id="step_1" :class="`step ${(step != 1) ? 'overlay' : ''}`">
                <transition name="slideX">
                    <div v-if="step == 1">
                        <h1 class="header_title">Buy Class Package</h1>
                        <div class="wrapper">
                            <div class="left">
                                <div class="header">
                                    <h2>{{ replacer($route.params.slug) }}</h2>
                                    <h2>Php 9,500.00</h2>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li>You’ll have <strong>10 ride credits</strong> that can be booked in any of our studios in metro manila.</li>
                                        <li>Inclusive of one <strong>(1) free Bare Manila Class</strong>. Just show the e-receipt at Bare Manila to claim your free class.</li>
                                        <li>Transferable or sharable to other Ride Revolution members.</li>
                                        <li>This package is valid for 3 months upon activation. (A package is activated when a first class is booked.) You’ll have 30 days to activate this package.</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="right">
                                <form id="default_form">
                                    <div class="form_flex with_btn">
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
                                <div class="breakdown_actions">
                                    <div class="default_btn" @click="proceedToPayment('store-credit')">Use Store Credits</div>
                                    <div class="default_btn_img" @click="proceedToPayment('credit')">
                                        <div class="btn_wrapper">
                                            <span class="img"><img src="/icons/paypal-icon.png" /></span><span>Pay Now</span>
                                        </div>
                                    </div>
                                </div>
                                <nuxt-link to="/buy-rides" class="default_btn_blk">Back</nuxt-link>
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
                            <div class="available">
                                <div :class="`available_item ${(storeCredits <= 50) ? 'insufficient' : ''}`">
                                    <h3>Available Store Credits</h3>
                                    <p class="store_credits">65</p>
                                    <transition name="slide">
                                        <div class="unavailable" v-if="storeCredits <= 50">
                                            <nuxt-link to="/buy-rides#store-credits">Buy Rides</nuxt-link>
                                            <label>*Your store credits are insufficient.</label>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="total">
                                <p>You Pay</p>
                                <p>Php 9,000.00</p>
                            </div>
                            <div class="preview_actions">
                                <div class="default_btn_blk" @click="stepBack()">Back</div>
                                <div class="default_btn_img">
                                    <div class="btn_wrapper">
                                        <span class="img"><img src="/icons/paypal-icon.png" /></span><span>Pay Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </section>
        <transition name="fade">
            <buy-rides-prompt :message="message" v-if="$store.state.buyRidesPromptStatus" />
        </transition>
    </div>
</template>

<script>
    import ProTip from '../../../components/ProTip'
    import BuyRidesPrompt from '../../../components/modals/BuyRidesPrompt'
    export default {
        components: {
            ProTip,
            BuyRidesPrompt
        },
        data () {
            return {
                storeCredits: 50,
                step: 1,
                message: '',
                promoApplied: false,
                promo: false,
                form: {
                    promo: ''
                }
            }
        },
        methods: {
            stepBack () {
                const me = this
                if (me.step == 2) {
                    me.step = 1
                } else if (me.step == 3) {
                    me.step = 2
                }
            },
            proceedToPayment (type) {
                const me = this
                switch (type) {
                    case 'store-credit':
                        me.step = 2
                        break
                    case 'credit':
                        me.step = 3
                        break
                }
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
