<template>
    <section id="referral" :class="`${($route.path == '/my-profile') ? 'alt' : ''}`">
        <div class="wrapper">
            <div v-html="subtitle"></div>
            <div class="link" v-if="isWebBased">
                <label>Referral Link</label>
                <a class="refer_link" href="http://riderev/refer-a-friend">http://riderev/refer-a-friend</a>
            </div>
            <form id="default_form" @submit.prevent="submissionSuccess()">
                <div class="form_flex with_btn">
                    <div class="form_group">
                        <input type="email" id="email" name="email" class="input_text email" autocomplete="off" placeholder="Enter your email address" v-validate="'required|email'">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">The email field is required</span></transition>
                    </div>
                    <div class="form_button">
                        <button type="submit" class="default_btn"><span>Send Referral Link</span></button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            subtitle: {
                default: '<h2>Refer a friend, get a free ride!</h2><h3>Earn a single class for referrals who buy our 2-week unlimited first-timer package. Enter your email below to start referring!</h3>'
            }
        },
        data () {
            return {
                isWebBased: false
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#referral',
							offset: -250
						})
                    }
                })
            }
        },
        mounted () {
            const me = this
            if (me.$route.fullPath.match(/\bfish-in-the-glass/ig)) {
                me.isWebBased = true
            } else {
                me.isWebBased = false
            }
        }
    }
</script>
