<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title alt">Add a Card</h2>
                    <h3 class="form_subtitle">NOTE: The cards you add here can only be used for non-subscription payments</h3>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_flex">
							<div class="form_group">
								<label for="number">Card Number <span>*</span></label>
								<input type="text" id="number" class="input_text" placeholder="4111111111111111" name="card_number" v-validate="{ required: true, credit_card: true }">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('card_number')">{{ properFormat(errors.first('card_number')) }}</span></transition>
							</div>
							<div class="form_group">
								<div class="form_flex three">
									<div class="form_group">
										<label for="month">Month <span>*</span></label>
										<input type="text" id="month" class="input_text" placeholder="MM" name="card_month" v-validate="{ required: true, date_format: 'MM' }">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('card_month')">{{ properFormat(errors.first('card_month')) }}</span></transition>
									</div>
									<div class="form_group">
										<label for="year">Year <span>*</span></label>
										<input type="text" id="year" class="input_text" placeholder="YYYY" name="card_year" v-validate="{ required: true, date_format: 'yyyy' }">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('card_year')">{{ properFormat(errors.first('card_year')) }}</span></transition>
									</div>
									<div class="form_group">
										<label for="cvv">CVV <span>*</span></label>
										<input type="text" id="cvv" class="input_text" placeholder="123" name="card_cvv" v-validate="{ required: true, numeric: true, min: 3, max: 3 }">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('card_cvv')">{{ properFormat(errors.first('card_cvv')) }}</span></transition>
									</div>
								</div>
							</div>
						</div>
                        <div class="form_button cnt">
                            <button type="submit" class="default_btn">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import aes from 'crypto-js/aes'
    import encHex from 'crypto-js/enc-hex'
    import padZeroPadding from 'crypto-js/pad-zeropadding'
    export default {
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    me.loader(true)
					let formData = new FormData(document.getElementById('default_form'))
                    if (me.$route.query.token) {
                        formData.append('in_app', 1)
                        formData.append('current_route', me.$route.path)
                    }

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
					me.$axios.post('api/paymaya/cards', {
						dt: encrypted
					}, {
						headers: {
					        Authorization: `Bearer ${token}`
					    }
					}).then(res => {
                        setTimeout( () => {
                            location.href = res.data.verificationUrl
                        }, 500)
                        me.toggleClose()
					}).catch(err => {
                        me.$store.state.errorOverlayPromptStatus = true
                        me.$store.state.errorPromptStatus = true
						me.$store.state.errorList = err.response.data.errors
					}).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                        }, 500)
                    })
                })
            },
            toggleClose () {
                const me = this
                me.$parent.add_card = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            document.body.classList.add('no_scroll')
        }
    }
</script>
