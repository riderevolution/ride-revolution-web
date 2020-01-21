<template>
    <div class="buy_rides inner">
        <section id="banner"></section>
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" />
        </transition>
        <section id="payments" :class="`${(!$store.state.proTipStatus) ? 'dismiss' : ''}`">
            <h1 class="header_title">Buy Class Package</h1>
            <div class="wrapper">
                <div class="left">
                    <div class="header">
                        <h2>10 Class Package</h2>
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
                        <div class="default_btn">Use Store Credits</div>
                        <div class="default_btn_img">
                            <div class="btn_wrapper">
                                <span class="img"><img src="/icons/paypal-icon.png" /></span><span>Pay Now</span>
                            </div>
                        </div>
                    </div>
                    <nuxt-link to="/buy-rides" class="default_btn_blk">Back</nuxt-link>
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
                me.message = 'Please Enter a promo code'
                me.$store.state.buyRidesPromptStatus = true
            }
        },
        mounted () {
            const me = this
            me.$store.state.proTipStatus = true
        }
    }
</script>
