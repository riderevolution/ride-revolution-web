<template>
	<transition name="fade">
        <div class="comment" v-if="loaded">
            <breadcrumb :overlay="false" />
            <section id="content">
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

						<div class="form_button">
                            <button type="submit" class="default_btn">Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </transition>
</template>

<script>
	import Breadcrumb from '../../../../components/Breadcrumb'
	export default {
		components: {
			Breadcrumb
		},
		data () {
			return {
				loaded: false,
				user: null,
				classPackage: {}
			}
		},
		methods: {
			submit (e) {
				recurly.token(e.target, (err, token) => {
					if (err) {
						console.log(err)
					} else {
						let form = {
							token: token,
							user_id: this.user.id,
							plan_code: this.classPackage.plan_code
						}
						this.$axios.post(`api/recurly/subscribe`, form).then(res => {
							console.log(res.data)
						}).catch(err => {
							console.log(err)
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
				let token = this.$cookies.get('70hokc3hhhn5')
				if (token != null || token != undefined) {
					this.$axios.get('api/check-token', {
					    headers: {
					        Authorization: `Bearer ${token}`
					    }
					}).then(res => {
						this.user = res.data.user
						this.loaded = true
						setTimeout(() => {
							this.initializeRecurly()
						}, 500)
					}).catch(err => {
						console.log(err)
					})
				}
			},
			fetchClassPackage () {
				this.$axios.get(`api/packages/web/class-packages/${this.$route.params.slug}`).then(res => {
					this.classPackage = res.data.classPackage
	            }).catch(err => {
	            	console.log(err)
	            })
			}
		},
		mounted () {
			this.checkToken()
			this.fetchClassPackage()
		},
		head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `Subscribe | Ride Revolution`,
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
