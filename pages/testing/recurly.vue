<template>
	<div>
		<form method="post" id="recurly-form" style="padding: 40px 0" @submit.prevent="submit($event)" v-if="user != null">
			<label for="plan">Plan</label>
			<select id="plan" data-recurly="plan">
        		<option value="testplan" selected>Test Plan</option>
			</select>

			<!-- hidden fields -->
			<input type="hidden" data-recurly="plan_quantity" id="plan-quantity" value="1">
			<input type="text" data-recurly="token" name="recurly-token">
			<!-- end hidden fields -->

			<label for="first_name">First Name</label>
			<input type="text" data-recurly="first_name" id="first_name" name="first-name" v-model="user.first_name">
			<label for="last_name">Last Name</label>
			<input type="text" data-recurly="last_name" id="last_name" name="last-name" v-model="user.last_name">
			<label for="number">Card Number</label>
			<div data-recurly="number" id="number"></div>
			<label for="month">Month</label>
			<div data-recurly="month" id="month"></div>
			<label for="year">Year</label>
			<div data-recurly="year" id="year"></div>
			<label for="cvv">CVV</label>
			<div data-recurly="cvv" id="cvv"></div>

			<p>Billing Information</p>
			<label for="billing_first_name">First Name</label>
			<input id="billing_first_name" type="text" data-recurly="first_name" name="billing_first_name" v-model="user.first_name">
			<label for="billing_last_name">Last Name</label>
			<input id="billing_last_name" type="text" data-recurly="last_name" name="billing_last_name" v-model="user.last_name">
			<label for="billing_phone">Phone Number</label>
			<input id="billing_phone" type="text" data-recurly="phone" name="phone" v-model="user.customer_details.co_contact_number">
			<label for="billing_address_1">Address 1</label>
			<input id="billing_address_1" type="text" data-recurly="address1" name="billing_address_1" v-model="user.customer_details.ba_address">
			<label for="billing_address_2">Address 2</label>
			<input id="billing_address_2" type="text" data-recurly="address2" name="billing_address_2" v-model="user.customer_details.ba_address_2">
			<label for="billing_city">City</label>
			<input id="billing_city" type="text" data-recurly="city" name="city" v-model="user.customer_details.ba_city">
			<label for="billing_state">State</label>
			<input id="billing_state" type="text" data-recurly="state" name="state" v-model="user.customer_details.ba_state">
			<label for="billing_postal_code">Postal Code</label>
			<input type="text" data-recurly="postal_code" id="billing_postal_code">
			<label for="billing_country">Country</label>
			<select id="billing_country" data-recurly="country">
				<option value="PH">Philippines</option>
				<option value="US">United States</option>
				<option value="GB">Great Britain</option>
			</select>

			<div id="errors"></div>
			<button id="submit">Submit</button>
		</form>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				user: null,
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
							plan_code: this.$route.query.plan_code
						}
						this.$axios.post(`api/testing`, form).then(res => {
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
							fontFamily: 'Open Sans',
							fontSize: '1rem',
							fontWeight: 'bold',
							fontColor: '#2c0730'
						},
						number: {
							placeholder: 'Card number'
						},
						month: {
							placeholder: 'MM'
						},
						year: {
							placeholder: 'YYYY'
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
						setTimeout(() => {
							this.initializeRecurly()
						}, 500)
					}).catch(err => {
						console.log(err)
					})
				}
			}
		},
		mounted () {
			this.checkToken()
		}
	}
</script>