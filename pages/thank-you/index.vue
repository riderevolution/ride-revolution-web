<template>
    <div class="error_page">
    	<div class="container alternate">
            <div class="logo">
                <img src="/footer-logo.svg" />
            </div>
    		<h1 class="header_title">Thank you for coming back!</h1>
        	<h2 class="header_subtitle alt">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h2>
        	<div class="default_btn" @click="loginUser()"><span>Click Here to Login</span></div>
    	</div>
    </div>
</template>

<script>
	export default {
        methods: {
            loginUser () {
                const me = this
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
            }
        }
	}
</script>
