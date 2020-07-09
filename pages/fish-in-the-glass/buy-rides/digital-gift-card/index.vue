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
                                        <select class="input_select" name="class_package" v-validate="'required'" v-model="form.classPackage" @change="getPackage($event)">
                                            <option value="0" disabled selected>Please select a class package</option>
                                            <option :value="data.id" v-for="(data, key) in classPackages">{{ data.name }}</option>
                                        </select>
                                    </div>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('class_package')">{{ errors.first('class_package') | properFormat }}</span></transition>
                                </div>
                                <div class="form_disclaimer alt">
                                    Note: You can buy physical gift cards in any of our studios.
                                </div>
                                <div class="form_group">
                                    <label for="from_sender">From <span>*</span></label>
                                    <input type="text" name="from_sender" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}" v-model="form.from" placeholder="Enter a name">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('from_sender')">{{ errors.first('from_sender') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="to_sender">To <span>*</span></label>
                                    <input type="text" name="to_sender" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}" v-model="form.to" placeholder="Enter a name">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('to_sender')">{{ errors.first('to_sender') | properFormat }}</span></transition>
                                </div>
                                <div :class="`form_group select ${(other) ? 'disclaimer' : ''}`">
                                    <label for="title">Title <span>*</span></label>
                                    <div class="select">
                                        <select class="input_select" name="title" v-validate="'required'" @change="getTitle($event)" v-model="form.title">
                                            <option value="" disabled selected>Please select a title</option>
                                            <option :value="predefinedTitle.title" v-for="(predefinedTitle, key) in predefinedTitles" :key="key">{{ predefinedTitle.title }}</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('title')">{{ errors.first('title') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group" v-if="other">
                                    <input type="text" name="other_title" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\'|\,|\.|\?|\!|\:|\;|\&]*$', max: 50}" placeholder="Enter your own title" v-model="form.other">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('other_title')">{{ errors.first('other_title') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="personal_message">Personal Message <span>*</span></label>
                                    <textarea name="personal_message" class="input_text" rows="5" maxlength="200" @input="getCount($event)" placeholder="Please type here" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\'|\,|\.|\?|\!|\@|\:|\;|\&|\r|\n|\u00f1]*$', max: 200}" v-model="form.message"></textarea>
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
                                    <input type="email" name="recipient_email" class="input_text" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}" v-model="form.recipientEmail" placeholder="Enter a recipient's email">
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
                                    <h2>{{ selectedPackage.name }}</h2>
                                    <h2 :class="`${(selectedPackage.is_promo == 1) ? 'discount' : ''}`" >Php {{ totalCount(selectedPackage.package_price) }}</h2>
                                    <h2 v-if="selectedPackage.is_promo == 1">Php {{ totalCount(selectedPackage.discounted_price) }}</h2>
                                </div>
                                <div class="content" v-html="selectedPackage.description">
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
                                            <button type="button" :class="`default_btn_out ${(promoApplied) ? 'disabled' : ''}`" @click="applyPromo(selectedPackage.id)"><span>Apply</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="breakdown_list">
                                    <div class="item">
                                        <p>Subtotal</p>
                                        <p>Php {{ totalCount((selectedPackage.is_promo == 1) ? selectedPackage.discounted_price : selectedPackage.package_price) }}</p>
                                    </div>
                                    <div class="item">
                                        <p>Discount</p>
                                        <p>Php {{ computeDiscount((promoApplied) ? selectedPackage.package_price - selectedPackage.final_price : '0.00') }}</p>
                                    </div>
                                    <div class="total">
                                        <p>You Pay</p>
                                        <p>Php {{ computeTotal((promoApplied) ? selectedPackage.final_price : (selectedPackage.is_promo == 1 ? selectedPackage.discounted_price : selectedPackage.package_price)) }}</p>
                                    </div>
                                </div>
                                <div class="breakdown_actions" v-if="!$store.state.isMobile">
                                    <div class="default_btn" @click="proceedToPayment('store-credits')">Use Store Credits</div>
                                    <div class="default_btn_blue" @click="proceedToPayment('paynow')">Pay Now</div>
                                </div>
                                <div class="default_btn_blk" @click="stepBack()" v-if="!$store.state.isMobile">Back</div>
                                <div class="action_mobile" v-else>
                                    <div class="m_left">
                                        <div class="default_btn_blk_alt" @click="stepBack()"><img src="/icons/back-arrow-icon.svg" /> <span>Back</span></div>
                                    </div>
                                    <div class="m_right">
                                        <div class="default_btn" @click="proceedToPayment('store-credits')">Use Store Credits</div>
                                        <div class="default_btn_blue" @click="proceedToPayment('paynow')">Pay Now</div>
                                    </div>
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
                                <h3>{{ selectedPackage.name }}</h3>
                                <p>Php {{ totalCount((selectedPackage.is_promo == 1) ? selectedPackage.discounted_price : selectedPackage.package_price) }}</p>
                            </div>
                            <div class="item">
                                <h3>Rides</h3>
                                <p>{{ selectedPackage.class_count }}</p>
                            </div>
                            <div class="item">
                                <h3>Discount</h3>
                                <p>Php {{ computeDiscount((promoApplied) ? selectedPackage.package_price - selectedPackage.final_price : '0.00') }}</p>
                            </div>
                            <div class="available" v-if="!paypal">
                                <div :class="`available_item ${(parseInt(storeCredits) <= parseInt((promoApplied) ? selectedPackage.final_price : (selectedPackage.is_promo == 1 ? selectedPackage.discounted_price : selectedPackage.package_price))) ? 'insufficient' : ''}`">
                                    <h3>Available Store Credits</h3>
                                    <p class="store_credits">{{ totalItems(storeCredits) }}</p>
                                    <transition name="slide">
                                        <div class="unavailable" v-if="(parseInt(storeCredits) <= parseInt((promoApplied) ? selectedPackage.final_price : (selectedPackage.is_promo == 1 ? selectedPackage.discounted_price : selectedPackage.package_price)))">
                                            <nuxt-link :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}#storecredits`">Buy Credits</nuxt-link>
                                            <p>*Your store credits are insufficient.</p>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="total">
                                <p>You Pay</p>
                                <p>{{ (type == 'store-credits') ? '' : 'Php' }} {{ computeTotal((promoApplied) ? selectedPackage.final_price : (selectedPackage.is_promo == 1 ? selectedPackage.discounted_price : selectedPackage.package_price)) }} {{ (type == 'store-credits') ? 'Credits' : '' }}</p>
                            </div>
                            <div class="preview_actions" v-if="!$store.state.isMobile">
                                <div class="left">
                                    <div class="default_btn_blk" @click="stepBack()">Back</div>
                                </div>
                                <div class="right">
                                    <div :class="`default_btn_blue ${(parseInt(storeCredits) <= parseInt((promoApplied) ? selectedPackage.final_price : (selectedPackage.is_promo == 1 ? selectedPackage.discounted_price : selectedPackage.package_price))) ? 'disabled' : ''}`" v-if="type == 'store-credits'" @click="paymentSuccess()">Pay Now</div>
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
                                    <div :class="`default_btn_blue ${(parseInt(storeCredits) <= parseInt((promoApplied) ? selectedPackage.final_price : (selectedPackage.is_promo == 1 ? selectedPackage.discounted_price : selectedPackage.package_price))) ? 'disabled' : ''}`" v-if="type == 'store-credits'" @click="paymentSuccess()">Pay Now</div>
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
        </section>
        <transition name="fade">
            <buy-rides-prompt :message="message" v-if="$store.state.buyRidesPromptStatus" :status="promoApplied" />
        </transition>
        <transition name="fade">
            <buy-rides-success v-if="$store.state.buyRidesSuccessStatus" :type="'digital-gift-card'" :title="'You’ve successfully sent a giftcard!'" :summary="summary" />
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
                summary: {
                    res: '',
                    total: 0,
                    discount: 0,
                    quantity: 0,
                    type: ''
                },
                count: 200,
                dashOffset: 0,
                normalizedRadius: 0,
                circumference: 0,
                type: '',
                paymentType: '',
                storeCredits: 55,
                step: 1,
                paypal: false,
                message: '',
                promoApplied: false,
                promo: false,
                other: false,
                form: {
                    classPackage: '0',
                    to: '',
                    from: '',
                    title: '',
                    other: '',
                    message: '',
                    recipientEmail: '',
                    recipientMobileNo: '',
                    promo: '',
                    discount: 0,
                    total: 0
                },
                res: [],
                classPackages: [],
                predefinedTitles: [],
                selectedPackage: null
            }
        },
        filters: {
            properFormat (value) {
                let newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
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
					if (message[0].split('file').length > 1) {
                        message = message[0].split('file')[1]
                        return `The ${newValue} field${message}`
                    } else {
                        return `The ${newValue}`
                    }
                }
            }
        },
        methods: {
            paymaya () {
                const me = this
                me.paymentType = 'paymaya'
                me.payment(me, null, 'digital-gift-card', 1)
            },
            paymentSuccess () {
                const me = this
                me.payment(me, null, 'digital-gift-card', 0)
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
                me.summary.res = me.selectedPackage
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
            getPackage (event) {
                const me = this
                let value = event.target.value
                me.$axios.get(`api/packages/class-packages/${value}`).then(res => {
                    if (res.data) {
                        me.selectedPackage = res.data.classPackage
                    }
                })
            },
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
                } else {
                    me.other = false
                }
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
                    case 'store-credits':
                        me.step = 3
                        break
                    case 'paynow':
                        me.step = 3
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
                            me.selectedPackage = res.data.classPackage
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
                            color: 'blue'
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
                            // me.loader(true)
                            return actions.order.capture().then(function(details) {
                                me.paymentType = 'paypal'
                                me.payment(me, JSON.stringify(details), 'digital-gift-card', 0)
                            })
                        }
                    }).render('#paypal-button-container')
                }, 500)
            }
        },
        mounted () {
            const me = this
            me.normalizedRadius = 15 - 3 * 2
            me.circumference = me.normalizedRadius * 2 * Math.PI
            me.dashOffset = me.circumference
            me.$store.state.proTipStatus = true
            me.$axios.get('api/extras/gift-card-titles').then(res => {
                me.predefinedTitles = res.data.giftCardTitles
            })
            setTimeout( () => {
                me.classPackages = me.res.classPackages
            }, 10)
            let token = me.$route.query.token
            if ((token == null || token == undefined) && !me.$store.state.isAuth) {
                me.$store.state.loginCheckerStatus = true
                document.body.classList.add('no_scroll')
                me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
            }
        },
        async asyncData ({ $axios, params, store, error }) {
            return await $axios.get('api/extras/class-packages-for-gift-cards').then(res => {
                if (res.data) {
                    return {
                        res: res.data,
                        storeCredits: (store.state.user.store_credits === null) ? 0 : store.state.user.store_credits.amount
                    }
                }
            }).catch(err => {
                error({ statusCode: 403, message: 'Page not found' })
            })
        }
    }
</script>
