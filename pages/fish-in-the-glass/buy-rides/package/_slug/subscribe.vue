<template>
	<div class="buy_rides inner" v-if="loaded">
        <div class="comment alt" v-if="step != 0">
            <section id="content">
				<div class="bck">
					<nuxt-link :to="`/fish-in-the-glass/buy-rides/package/${classPackage.slug}?token=${$route.query.token}`" class="default_btn_blk alt"><img src="/icons/back-arrow-icon.svg" /> <span>Go Back</span></nuxt-link>
				</div>
                <form id="default_form" @submit.prevent="submit($event)" v-if="user != null" enctype="multipart/form-data">
					<!-- hidden fields -->
					<input type="hidden" data-recurly="plan_quantity" id="plan-quantity" value="1">
					<input type="hidden" data-recurly="token" name="recurly-token">
					<!-- end hidden fields -->
                    <div class="form_main_group">
                        <div class="form_header">
                            <label>Card Information</label>
                        </div>
						<div class="form_flex">
							<div class="form_group">
								<label for="first_name">First Name <span>*</span></label>
								<input type="text" data-recurly="first_name" id="first_name" name="first-name" autocomplete="off" class="input_text" placeholder="Enter your first name" v-model="user.first_name" v-validate="{required: true}">
								<transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ properFormat(errors.first('first_name')) }}</span></transition>
							</div>
							<div class="form_group">
								<label for="last_name">Last Name <span>*</span></label>
								<input type="text" data-recurly="last_name" id="last_name" name="last-name" autocomplete="off" class="input_text" placeholder="Enter your last name" v-model="user.last_name" v-validate="{required: true}">
								<transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ properFormat(errors.first('last_name')) }}</span></transition>
							</div>
						</div>
						<div class="form_flex">
							<div class="form_group">
								<label for="number">Card Number <span>*</span></label>
								<div data-recurly="number" id="number" class="recurly-element-number"></div>
							</div>
							<div class="form_group">
								<div class="form_flex three">
									<div class="form_group">
										<label for="month">Month <span>*</span></label>
										<div data-recurly="month" id="month" class="recurly-element-month"></div>
									</div>
									<div class="form_group">
										<label for="year">Year <span>*</span></label>
										<div data-recurly="year" id="year" class="recurly-element-year"></div>
									</div>
									<div class="form_group">
										<label for="cvv">CVV <span>*</span></label>
										<div data-recurly="cvv" id="cvv" class="recurly-element-cvv"></div>
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
                                <input type="text" autocomplete="off" id="state"  class="input_text" data-recurly="state" name="state" v-model="user.customer_details.ba_state" placeholder="Enter your state" v-validate="{required: true}">
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
		<transition name="fade">
            <buy-rides-success v-if="$store.state.buyRidesSuccessStatus" :summary="summary" />
        </transition>
	</div>
</template>

<script>
	import BuyRidesSuccess from '~/components/modals/BuyRidesSuccess'
	import VueRecaptcha from 'vue-recaptcha'
	export default {
		layout: 'fish',
		components: {
			BuyRidesSuccess,
			VueRecaptcha
		},
		data () {
			return {
				step: 1,
				summary: {
                    res: '',
                    total: 0,
                    discount: 0,
                    quantity: 0,
                    type: ''
                },
				loaded: false,
				user: null,
				classPackage: {
					name: 'Class Package'
				}
			}
		},
		methods: {
			submit (e) {
				const me = this
				me.loader(true)
				me.$store.state.errorList = []
				recurly.token(e.target, (err, token) => {
					if (err) {
						err.details.forEach((item, ket) => {
							switch (item.field) {
								case 'number':
									item.field = 'Card Number'
									break
								case 'month':
									item.field = 'Month'
									break
								case 'year':
									item.field = 'Year'
									break
								case 'cvv':
									item.field = 'CVV'
									break
							}
							me.$store.state.errorList.push(`${item.field} ${item.messages[0]}`)
						})
						me.$store.state.errorPromptStatus = true
						me.loader(false)
					} else {
						me.$validator.validateAll().then(valid => {
		                    if (valid && grecaptcha.getResponse().length > 0) {
		                        let captcha = grecaptcha.getResponse()
		                        me.$axios.post('api/verify-captcha', { captcha: captcha }).then(verify => {
		                            let formData = new FormData(document.getElementById('default_form'))
		                            if (verify) {
										let form = {
											token: token,
											user_id: me.user.id,
											plan_code: me.classPackage.plan_code
										}
										me.$axios.post(`api/recurly/subscribe`, form).then(res => {
											setTimeout( () => {
												me.summary.res = me.classPackage
    							                me.summary.total = res.data.payment.total
    							                me.summary.discount = 0
												me.summary.quantity = 1
    							                me.summary.type = 'paynow'
												me.step = 0
												me.$store.state.buyRidesSuccessStatus = true
												window.scrollTo({ top: 0, behavior: 'smooth' })
										    }, 500)
										}).catch(err => {
											me.$store.state.errorList = err.response.data.errors
				                            me.$store.state.errorPromptStatus = true
										}).then(() => {
				                            setTimeout( () => {
				                                me.loader(false)
				                            }, 500)
				                        })
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
					}
				})
			},
			initializeRecurly () {
				recurly.configure({
                	publicKey: 'ewr1-IeGOwa2IupbnSdFc9IRwpc',
                	style: {
						all: {
							fontSmoothing: 'auto',
							fontFamily: 'Roboto',
							fontSize: '18px',
							fontWeight: 'normal',
							fontColor: '#171717',
							placeholder: {
								color: '#A8A8A8'
							}
						},
						number: {
							placeholder: {
								content: 'Enter Your Card Number'
							}
						},
						month: {
							placeholder: {
								content: 'MM'
							}
						},
						year: {
							placeholder: {
								content: 'YYYY'
							}
						},
						cvv: {
							placeholder: {
								content: 'CVV'
							}
						}
					}
				})
			},
			checkToken () {
				const me = this
				let token = me.$route.query.token
				if (token != null || token != undefined) {
					me.$axios.get('api/check-token', {
					    headers: {
					        Authorization: `Bearer ${token}`
					    }
					}).then(res => {
						me.user = res.data.user
						me.loaded = true
						setTimeout(() => {
							me.initializeRecurly()
						}, 500)
					}).catch(err => {
						console.log(err)
					})
				}
			},
			fetchClassPackage () {
				const me = this
				me.$axios.get(`api/packages/web/class-packages/${me.$route.params.slug}`).then(res => {
					me.classPackage = res.data.classPackage
	            })
			}
		},
		mounted () {
			const me = this
			me.checkToken()
			me.fetchClassPackage()
		}
	}
</script>
