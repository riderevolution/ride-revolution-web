<template>
    <div class="buy_rides inner fish">
        <section id="payments" :class="`${($store.state.buyRidesSuccessStatus) ? 'success' : ''}`">
            <div id="step_1" :class="`step ${(step != 1) ? 'overlay' : ''}`">
                <transition name="slideX">
                    <div v-if="step == 1">
                        <form id="initial_form">
                            <div class="form_content alt">
                                <div class="form_header">
                                    <h1 class="header_title">Buy a Digital Gift Card</h1>
                                </div>
                                <div class="form_group select disclaimer">
                                    <div class="select">
                                        <select class="input_select" name="class_package" v-validate="'required'" v-model="form.classPackage">
                                            <option value="" disabled selected>Please select a class package</option>
                                            <option value="1">Sample Package</option>
                                        </select>
                                    </div>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('class_package')">{{ errors.first('class_package') | properFormat }}</span></transition>
                                </div>
                                <div class="form_disclaimer alt">
                                    Note: You can buy physical gift cards in any of our studios.
                                </div>
                                <div class="form_group">
                                    <label for="from_sender">From <span>*</span></label>
                                    <input type="text" name="from_sender" class="input_text" v-validate="'required|email'" v-model="form.from" placeholder="Enter an email">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('from_sender')">{{ errors.first('from_sender') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="to_sender">To <span>*</span></label>
                                    <input type="text" name="to_sender" class="input_text" v-validate="'required|email'" v-model="form.to" placeholder="Enter an email">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('to_sender')">{{ errors.first('to_sender') | properFormat }}</span></transition>
                                </div>
                                <div :class="`form_group select ${(other) ? 'disclaimer' : ''}`">
                                    <label for="title">Title <span>*</span></label>
                                    <div class="select">
                                        <select class="input_select" name="title" v-validate="'required'" @change="getTitle($event)" v-model="form.title">
                                            <option value="" disabled selected>Please select a title</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('title')">{{ errors.first('title') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group" v-if="other">
                                    <input type="text" name="other_title" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ ]*$', max: 50}" placeholder="Enter your own title" v-model="form.other">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('other_title')">{{ errors.first('other_title') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="personal_message">Personal Message <span>*</span></label>
                                    <textarea name="personal_message" class="input_text" rows="5" maxlength="200" @input="getCount($event)" placeholder="Please type here" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1|\']*$', max: 200}" v-model="form.message"></textarea>
                                    <div class="limit_wrapper">
                                        <div class="limit"><span class="count">{{ count }}</span> characters left</div>
                                        <svg class="progress" width="30" height="30"> <circle class="inner_ring" :r="normalizedRadius" cx="15" cy="15"/> <circle class="outer_ring" :stroke-dasharray="`${circumference} ${circumference}`" :stroke-dashoffset="dashOffset" :r="normalizedRadius" cx="15" cy="15"/> </svg>
                                    </div>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('personal_message')">{{ errors.first('personal_message') | properFormat }}</span></transition>
                                </div>
                            </div>
                            <div class="form_content">
                                <div class="form_header">
                                    <h2 class="header_title">Recipient's Details</h2>
                                </div>
                                <div class="form_group">
                                    <label for="recipient_email">Recipient's Email <span>*</span></label>
                                    <input type="text" name="recipient_email" class="input_text" v-validate="'required|email'" v-model="form.recipientEmail" placeholder="Enter a recipient's email">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('recipient_email')">{{ errors.first('recipient_email') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="recipient_mobile_no">Recipient's Mobile No. <span>*</span></label>
                                    <input type="text" name="recipient_mobile_no" class="input_text" v-validate="'required|numeric|min:11|max:11'" v-model="form.recipientMobileNo" placeholder="Enter a recipient's mobile no.">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('recipient_mobile_no')">{{ errors.first('recipient_mobile_no') | properFormat }}</span></transition>
                                </div>
                            </div>
                            <div class="form_action">
                                <button type="button" class="default_btn" @click="proceedToPreview()">Next</button>
                            </div>
                        </form>
                    </div>
                </transition>
            </div>
            <div id="step_2" :class="`step ${(step != 2) ? 'overlay' : ''}`">
                <transition name="slideX">
                    <div v-if="step == 2">
                        <h1 class="header_title">Buy a Digital Gift Card</h1>
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
                                            <input type="text" id="promo_code" name="promo_code" :class="`input_text ${(promoApplied) ? 'disabled' : ''}`" autocomplete="off" placeholder="Enter a Promo Code" v-model="form.promo">
                                        </div>
                                        <div class="form_button">
                                            <button type="button" :class="`default_btn_out ${(promoApplied) ? 'disabled' : ''}`" @click="applyPromo()"><span>Apply</span></button>
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
                                            <span class="img"><img src="/icons/paypal-logo.svg" /></span><span>Pay Now</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="default_btn_blk" v-if="!$parent.$parent.isMobile" @click="stepBack()">Back</div>
                                <div class="action_mobile" v-else>
                                    <div class="default_btn_blk_alt" @click="stepBack()"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div id="step_3" :class="`step ${(step != 3) ? 'overlay' : ''}`">
                <transition :name="`${(step == 0) ? 'fade' : 'slideX'}`">
                    <div v-if="step == 3" class="preview_payment">
                        <h2 class="header_title">Let’s make sure we got this right.</h2>
                        <div class="preview">
                            <div class="item">
                                <h3>10 Class Package</h3>
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
                            <div class="available" v-if="!paypal">
                                <div :class="`available_item ${(storeCredits <= 50) ? 'insufficient' : ''}`">
                                    <h3>Available Store Credits</h3>
                                    <p class="store_credits">65</p>
                                    <transition name="slide">
                                        <div class="unavailable" v-if="storeCredits <= 50">
                                            <nuxt-link to="/buy-rides#store_credits">Buy Rides</nuxt-link>
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
                                <div class="default_btn_blk" @click="stepBack()" v-if="!$parent.$parent.isMobile">Back</div>
                                <div :class="`default_btn_img ${(storeCredits <= 50) ? 'disabled' : ''}`" v-if="type == 'credit'" @click="paymentSuccess()">
                                    <div class="btn_wrapper">
                                        <span class="img"><img src="/icons/paypal-logo.svg" /></span><span>Pay Now</span>
                                    </div>
                                </div>
                                <div :class="`default_btn_blue ${(storeCredits <= 50) ? 'disabled' : ''}`" v-else @click="paymentSuccess()">Pay Now</div>
                            </div>
                            <div class="paypal_disclaimer" v-if="type == 'credit'">
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
                count: 200,
                dashOffset: 0,
                normalizedRadius: 0,
                circumference: 0,
                type: '',
                storeCredits: 55,
                step: 1,
                paypal: false,
                message: '',
                promoApplied: false,
                promo: false,
                other: false,
                form: {
                    classPackage: '',
                    to: '',
                    from: '',
                    title: '',
                    other: '',
                    message: '',
                    recipientEmail: '',
                    recipientMobileNo: '',
                    promo: ''
                }
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
                    return `The ${newValue}`
                }
            }
        },
        methods: {
            getCount (event) {
                const me = this
                let target = event.target
                let total = 200
                if (target.value.length <= 200) {
                    me.dashOffset = me.circumference - (target.value.length / 200) * me.circumference
                    me.count = total - target.value.length
                }
            },
            proceedToPreview () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.step = 2
                        me.$scrollTo('#payments', {
                            offset: -250
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            offset: -250
                        })
                    }
                })
            },
            getTitle (event) {
                const me = this
                let target = event.target
                if (target.value == 'other') {
                    me.other = true
                }
            },
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
                } else if (me.step == 3) {
                    me.step = 2
                    me.paypal = false
                }
            },
            proceedToPayment (type) {
                const me = this
                me.type = type
                switch (type) {
                    case 'store-credit':
                        me.step = 3
                        break
                    case 'credit':
                        me.step = 3
                        me.paypal = true
                        break
                }
            },
            applyPromo () {
                const me = this
                if (!me.promoApplied) {
                    if (me.form.promo == 'asdasd') {
                        me.promoApplied = true
                        me.message = 'Cheers! You’ve entered a valid promo code.'
                    } else {
                        me.message = 'You’ve entered an invalid promo code.'
                    }
                    me.$store.state.buyRidesPromptStatus = true
                }
            }
        },
        mounted () {
            const me = this
            me.normalizedRadius = 15 - 3 * 2
            me.circumference = me.normalizedRadius * 2 * Math.PI
            me.dashOffset = me.circumference
        }
    }
</script>
