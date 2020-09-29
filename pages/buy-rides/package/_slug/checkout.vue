<template>
	<div class="buy_rides inner" v-if="loaded">
		<breadcrumb :overlay="false" />
        <div class="comment alt" v-if="step != 0">
            <section id="content">
				<div class="bck">
					<nuxt-link :to="`/buy-rides/package/${classPackage.slug}`" class="default_btn_blk alt"><img src="/icons/back-arrow-icon.svg" /> <span>Go Back</span></nuxt-link>
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
							<div v-for="(card, key) in cards">
								<input type="radio" name="payment_token_id" :value="card.cardTokenId" :id="`card_option_${key}`">
								<label :for="`card_option_${key}`">**** **** **** {{ card.last4 }}</label>
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
		<transition name="fade">
            <buy-rides-success v-if="$store.state.buyRidesSuccessStatus" :summary="summary" />
        </transition>
	</div>
</template>

<script>
	import Breadcrumb from '../../../../components/Breadcrumb'
	import BuyRidesSuccess from '../../../../components/modals/BuyRidesSuccess'
	import VueRecaptcha from 'vue-recaptcha'
	import aes from 'crypto-js/aes'
	import encHex from 'crypto-js/enc-hex'
	import padZeroPadding from 'crypto-js/pad-zeropadding'

	export default {
		components: {
			Breadcrumb,
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
				},
				cards: []
			}
		},
		methods: {
			submit (e) {
				const me = this
				// me.loader(true)
				me.$validator.validateAll().then(valid => {
					let formData = new FormData(document.querySelector('#default_form'))
					formData.append('user_id', me.user.id)
					formData.append('class_package_id', me.classPackage.id)

					/* encrypt form */
					let object = {}
					formData.forEach((value, key) => {
						object[key] = value
					})

					let key = encHex.parse('43e3b0f3405b2b7707e398f0171a91a2')
					let iv = encHex.parse('91bc845cbd4076fb9a0fdc2ad37e425d')
					let textData = JSON.stringify(object)

					let encrypted = aes.encrypt(textData, key, {iv: iv, padding: padZeroPadding}).toString()
					/* end form encrpytion */

					let token = me.$cookies.get('70hokc3hhhn5')
					me.$axios.post(`api/paymaya-checkout`, {
						dt: encrypted
					}, {
						headers: {
					        Authorization: `Bearer ${token}`
					    }
					}).then(res => {
						console.log(res.data)
						// setTimeout( () => {
						// 	me.summary.res = me.classPackage
			   //              me.summary.total = res.data.payment.total
			   //              me.summary.discount = 0
						// 	me.summary.quantity = 1
			   //              me.summary.type = 'paynow'
						// 	me.step = 0
						// 	me.$store.state.buyRidesSuccessStatus = true
						// 	window.scrollTo({ top: 0, behavior: 'smooth' })
					 //    }, 500)
					}).catch(err => {
						me.$store.state.errorList = err.response.data.errors
                        me.$store.state.errorPromptStatus = true
					}).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                        }, 500)
                    })


      //               if (valid && grecaptcha.getResponse().length > 0) {
      //                   let captcha = grecaptcha.getResponse()
      //                   me.$axios.post('api/verify-captcha', { captcha: captcha }).then(verify => {
      //                       let formData = new FormData(document.getElementById('default_form'))
      //                       if (verify) {
						// 		let form = {
						// 			token: token,
						// 			user_id: me.user.id,
						// 			plan_code: me.classPackage.plan_code
						// 		}
						// 		me.$axios.post(`api/recurly/subscribe`, form).then(res => {
						// 			setTimeout( () => {
						// 				me.summary.res = me.classPackage
			// 			                me.summary.total = res.data.payment.total
			// 			                me.summary.discount = 0
						// 				me.summary.quantity = 1
			// 			                me.summary.type = 'paynow'
						// 				me.step = 0
						// 				me.$store.state.buyRidesSuccessStatus = true
						// 				window.scrollTo({ top: 0, behavior: 'smooth' })
						// 		    }, 500)
						// 		}).catch(err => {
						// 			me.$store.state.errorList = err.response.data.errors
		    //                         me.$store.state.errorPromptStatus = true
						// 		}).then(() => {
		    //                         setTimeout( () => {
		    //                             me.loader(false)
		    //                         }, 500)
		    //                     })
      //                       }
      //                   }).catch(err => {
						// 	me.$store.state.errorList = err.response.data.errors
      //                       	me.$store.state.errorPromptStatus = true
      //                   })
      //               } else {
						// if (grecaptcha.getResponse().length <= 0) {
						// 	me.$store.state.errorList = ['Please verify that you are not a robot']
						// 	me.$store.state.errorPromptStatus = true
						// } else {
						// 	me.$scrollTo('.validation_errors', {
	     //                        offset: -250
	     //                    })
						// }
						// me.loader(false)
      //               }
                })
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
						console.log(err)
					})
				}
			},
			fetchClassPackage () {
				const me = this
				me.$axios.get(`api/packages/web/class-packages/${me.$route.params.slug}`).then(res => {
					me.classPackage = res.data.classPackage
	            })
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
                        res.data.cards[i].toggled = false
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
			me.fetchClassPackage()
			me.getCards()
		},
		head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `Subscribe to ${me.classPackage.name} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ]
            }
        }
	}
</script>
