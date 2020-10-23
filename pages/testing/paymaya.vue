<template>
	<div>
		<div class="paymaya-checkout"></div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				paymayaObject: {}
			}
		},
		methods: {
			initiatePaymaya () {
				let targetHTMLElement = document.querySelector('.paymaya-checkout')

				PayMayaSDK.init('pk-3yJqfuy3fKZLcLSG9ksmpH4rYsPrHVk9fURYWLVGiLq', true)
				PayMayaSDK.createCreditCardForm(targetHTMLElement, {
					buttonText: 'Submit'
				}).addTransactionHandler((paymentTokenId) => {
					console.log(paymentTokenId)
				})
			}
		},
		mounted () {
			this.initiatePaymaya()
		}
	}
</script>

<style lang="stylus">
	.paymaya-checkout 
		width: 100%
</style>