<template>
    <div class="buy_rides inner">
        <section id="banner"></section>
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" />
        </transition>
        <section id="payments" :class="`${(!$store.state.proTipStatus) ? 'dismiss' : ''}`">
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
                            <p>Php 1,000.00</p>
                        </div>
                        <div class="item">
                            <p>Discount</p>
                            <p>Php 0.00</p>
                        </div>
                        <div class="total">
                            <p>You Pay</p>
                            <p>Php 1,000.00</p>
                        </div>
                    </div>
                    <div class="breakdown_actions">
                        <nuxt-link to="/buy-rides" class="default_btn_blk">Back</nuxt-link>
                        <div class="default_btn_img">
                            <div class="btn_wrapper">
                                <span class="img"><img src="/icons/paypal-icon.png" /></span><span>Pay Now</span>
                            </div>
                        </div>
                    </div>
                </div>
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
                message: '',
                promoApplied: false,
                promo: false,
                form: {
                    promo: ''
                }
            }
        },
        methods: {
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
