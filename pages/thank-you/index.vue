<template>
    <div class="error_page" v-if="loaded">
    	<div class="container alternate">
            <div class="logo">
                <img src="/footer-logo.svg" />
            </div>
    		<h1 class="header_title">{{ ($store.state.oldUser) ? "You're all set!" : "You're all set!" }}</h1>
        	<h2 class="header_subtitle alt" v-if="$store.state.oldUser">Your NEW password has been updated. And now it's time to start your Revolution. Let's Ride!</h2>
        	<h2 class="header_subtitle alt" v-else>Your ACCOUNT has been created. And now it's time to start your Revolution. Let's Ride!</h2>
        	<div class="default_btn" @click="loginUser()" v-if="!$store.state.oldUser && !$store.state.newUser"><span>Click Here to Login</span></div>
        	<nuxt-link to="/my-profile" class="default_btn" v-else-if="$store.state.oldUser && !$store.state.newUser"><span>Go To My Profile</span></nuxt-link>
        	<nuxt-link to="/my-profile" class="default_btn" v-else-if="!$store.state.oldUser && $store.state.newUser"><span>Go To My Profile</span></nuxt-link>
    	</div>
    </div>
</template>

<script>
	export default {
        data () {
            return {
                loaded: false
            }
        },
        methods: {
            loginUser () {
                const me = this
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
            }
        },
        mounted () {
            const me = this
            me.loader(true)
            let form = {
                rWD5WfJ2GntpsREKyR4R: me.$route.query.rWD5WfJ2GntpsREKyR4R
            }
            me.$axios.post('api/extras/validate-onboarding', form).then(res => {
                console.log('</3');
            }).catch(err => {
                me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
            }).then(() => {
                setTimeout( () => {
                    me.loaded = true
                    me.loader(false)
                }, 500)
            })
        }
	}
</script>
