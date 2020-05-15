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
				let member_id = this.$route.params.slug
				this.$axios.post('api/extras/validate-member-id', {
					member_id: member_id
				}).then(res => {
					this.$cookies.set('referrer_member_id', member_id)
					setTimeout(() => {
						this.$store.state.loginSignUpStatus = true
					}, 100)
				}).catch(err => {
					this.$store.state.loginSignUpStatus = false
					console.log(err)
				})
			}
		},
		mounted () {
			this.validateMemberID()
		}
	}
</script>