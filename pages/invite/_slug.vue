<template>
	<div class="invite-page">
		<transition name="fade">
            <login-sign-up v-if="$store.state.loginSignUpStatus" />
        </transition>
	</div>
</template>

<script>
	import LoginSignUp from '../../components/modals/LoginSignUp'

	export default {
		components: {
			LoginSignUp
		},
		methods: {
			validateMemberID () {
				const me = this
				me.loader(true)
				let member_id = this.$route.params.slug
				me.$axios.post('api/extras/validate-member-id', {
					member_id: member_id
				}).then(res => {
					this.$cookies.set('referrer_member_id', member_id)
					setTimeout(() => {
						this.$store.state.loginSignUpStatus = true
					}, 500)
				}).catch(err => {
					this.$store.state.loginSignUpStatus = false
					document.body.classList.add('no_scroll')
					me.$store.state.errorList = err.response.data.errors
					me.$store.state.errorPromptStatus = true
				}).then(() => {
					setTimeout( () => {
						me.loader(false)
					}, 500)
				})
			}
		},
		mounted () {
			const me = this
			me.validateMemberID()
		}
	}
</script>
