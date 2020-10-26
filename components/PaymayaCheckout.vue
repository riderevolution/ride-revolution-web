<template>
	<div class="buy_rides inner" v-if="loaded">
        <div class="comment alt">
            <section id="content">
				<div class="bck">
					<div @click.once="$parent.proceedToPayment('paynow')" class="default_btn_blk alt"><img src="/icons/back-arrow-icon.svg" /> <span>Go Back</span></div>
				</div>
                <form id="default_form" @submit.prevent="submit($event)" v-if="user != null" enctype="multipart/form-data">
                    <div class="form_main_group">
                        <div class="form_header">
                            <label>Card Information</label>
                        </div>
						<div class="form_flex">
							<div class="form_group">
								<label for="first_name">First Name <span>*</span></label>
								<input type="text" data-recurly="first_name" id="first_name" name="first_name" autocomplete="off" class="input_text" placeholder="Enter your first name" v-model="user.first_name" v-validate="{required: true}">
								<transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ properFormat(errors.first('first_name')) }}</span></transition>
							</div>
							<div class="form_group">
								<label for="last_name">Last Name <span>*</span></label>
								<input type="text" data-recurly="last_name" id="last_name" name="last_name" autocomplete="off" class="input_text" placeholder="Enter your last name" v-model="user.last_name" v-validate="{required: true}">
								<transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ properFormat(errors.first('last_name')) }}</span></transition>
							</div>
						</div>
						<div class="form_flex">
                            <div class="form_custom_checkbox">
                                <div :id="`card_${key}`" class="custom_checkbox" :class="{ active: data.toggled }" v-for="(data, key) in cards" :key="key" @click="toggleCard(data, key)">
                                    <div class="c_type" v-html="cardType(data)"></div>
                                    <label>**** **** **** {{ data.last4 }}</label>
                                    <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                        <g transform="translate(-804.833 -312)">
                                            <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                            <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                        </g>
                                    </svg>
                                    <div class="info">
                                        <p>Exp. {{ data.expiry_month }}/{{ $moment(data.expiry_year, 'YYYY').format('YY') }}</p>
                                    </div>
                                </div>
                            </div>
						</div>
                    </div>
					<div class="form_main_group">
                        <div class="form_header">
                            <label>Billing Information</label>
                        </div>
						<div class="form_flex">
							<div class="form_group">
								<label for="billing_first_name">Billing First Name <span>*</span></label>
								<input type="text" data-recurly="first_name" id="billing_first_name" name="billing_first_name" autocomplete="off" class="input_text" placeholder="Enter your billing first name" v-model="user.first_name" v-validate="{required: true}">
								<transition name="slide"><span class="validation_errors" v-if="errors.has('billing_first_name')">{{ properFormat(errors.first('billing_first_name')) }}</span></transition>
							</div>
							<div class="form_group">
								<label for="billing_last_name">Billing Last Name <span>*</span></label>
								<input type="text" data-recurly="last_name" id="billing_last_name" name="billing_last_name" autocomplete="off" class="input_text" placeholder="Enter your billing last name" v-model="user.last_name" v-validate="{required: true}">
								<transition name="slide"><span class="validation_errors" v-if="errors.has('billing_last_name')">{{ properFormat(errors.first('billing_last_name')) }}</span></transition>
							</div>
						</div>
						<div class="form_group">
							<label for="phone">Phone Number <span>*</span></label>
							<input type="text" id="phone" data-recurly="phone" name="phone" v-model="user.customer_details.co_contact_number" autocomplete="off" class="input_text" placeholder="Enter your phone number" v-validate="{required: true}">
							<transition name="slide"><span class="validation_errors" v-if="errors.has('phone')">{{ properFormat(errors.first('phone')) }}</span></transition>
						</div>
						<div class="form_group">
                            <label for="billing_address_1">Address Line 1 <span>*</span></label>
                            <input name="billing_address_1" id="billing_address_1" data-recurly="address1" placeholder="Enter your address line 1" class="input_text" v-validate="{required: true}" v-model="user.customer_details.ba_address"/>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('billing_address_1')">{{ properFormat(errors.first('billing_address_1')) }}</span></transition>
                        </div>
						<div class="form_group">
                            <label for="billing_address_2">Address Line 2</label>
                            <input name="billing_address_2" id="billing_address_2" data-recurly="address2" placeholder="Enter your address line 2" class="input_text" v-model="user.customer_details.ba_address_2"/>
                        </div>
						<div class="form_flex">
                            <div class="form_group select">
                                <label for="country">Country <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" id="country" name="country" data-recurly="country" v-validate="'required'">
										<option value="PH" :selected="user.customer_details.billing_country == 'Philippines'">Philippines</option>
										<option value="US">United States</option>
										<option value="GB">Great Britain</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('country')">{{ properFormat(errors.first('country')) }}</span></transition>
                            </div>
                            <div class="form_group select">
								<label for="state">State <span>*</span></label>
                                <input type="text" autocomplete="off" id="state"  class="input_text" data-recurly="state" name="state" v-model="user.customer_details.billing_state" placeholder="Enter your state" v-validate="{required: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('state')">{{ properFormat(errors.first('state')) }}</span></transition>
                            </div>
                        </div>
						<div class="form_flex">
                            <div class="form_group">
                                <label for="city">City <span>*</span></label>
                                <input type="text" autocomplete="off" id="city" class="input_text" data-recurly="city" name="city" v-model="user.customer_details.ba_city" placeholder="Enter your city" v-validate="{required: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('city')">{{ properFormat(errors.first('city')) }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="postal_code">Postal Code <span>*</span></label>
                                <input type="text" data-recurly="postal_code" name="postal_code" id="postal_code" autocomplete="off" class="input_text" v-model="user.customer_details.ba_zip_code" placeholder="Enter your postal code" v-validate="{required: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('postal_code')">{{ properFormat(errors.first('postal_code')) }}</span></transition>
                            </div>
                        </div>
						<div class="form_flex captcha">
                            <vue-recaptcha class="captcha" sitekey="6Ld4_doUAAAAACiRAQf1JQlro_fxvTSZxgxi5jxk"></vue-recaptcha>
                            <div class="form_button nmt">
                                <button type="submit" class="default_btn">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
	</div>
</template>

<script>
	import VueRecaptcha from 'vue-recaptcha'
	export default {
		components: {
			VueRecaptcha
		},
		props: {
			type: {
				type: String
			},
		},
		data () {
			return {
				loaded: false,
				user: null,
                selected_card: [],
				cards: []
			}
		},
		methods: {
			submit (e) {
				const me = this
				me.$validator.validateAll().then(valid => {
					if (valid && grecaptcha.getResponse().length > 0) {
						let captcha = grecaptcha.getResponse()
						me.$axios.post('api/verify-captcha', { captcha: captcha }).then(verify => {
							if (verify) {
								me.payment(me.$parent, null, me.type, me.selected_card.cardTokenId)
							}
						}).catch(err => {
							me.$store.state.errorList = err.response.data.errors
							me.$store.state.errorPromptStatus = true
						})
					} else {
						if (grecaptcha.getResponse().length <= 0) {
							me.$store.state.errorList = ['Please verify that you are not a robot']
							me.$store.state.errorPromptStatus = true
						} else {
							me.$scrollTo('.validation_errors', {
								offset: -250
							})
						}
						me.loader(false)
					}
				})
			},
            toggleCard (data, unique) {
                const me = this
                me.selected_card = data
                document.getElementById(`card_${unique}`).classList.add('active')
                for (let i = 0, len = me.cards.length; i < len; i++) {
                    if (unique != i) {
                        if (document.getElementById(`card_${i}`)) {
                            document.getElementById(`card_${i}`).classList.remove('active')
                        }
                    }
                }
            },
			checkToken () {
				const me = this
				let token = me.$cookies.get('70hokc3hhhn5')
				if (token != null || token != undefined) {
					me.$axios.get('api/check-token', {
					    headers: {
					        Authorization: `Bearer ${token}`
					    }
					}).then(res => {
						me.user = res.data.user
						me.loaded = true
					}).catch(err => {
						me.$store.state.needLogin = true
		                me.$store.state.errorOverlayPromptStatus = true
		                me.$store.state.errorList = err.response.data.errors
		                me.$store.state.errorPromptStatus = true
					})
				}
			},
			getCards () {
                const me = this
                let token = me.$cookies.get('70hokc3hhhn5')
                me.loader(true)
                me.$axios.get('api/paymaya/cards', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    for (let i = 0, len = res.data.cards.length; i < len; i++) {
						if (res.data.cards[i].default) {
							res.data.cards[i].toggled = true
							me.selected_card = res.data.cards[i]
						} else {
							res.data.cards[i].toggled = false
						}
                    }
                    me.cards = res.data.cards
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
		},
		mounted () {
			const me = this
			me.checkToken()
			me.getCards()
		}
	}
</script>
