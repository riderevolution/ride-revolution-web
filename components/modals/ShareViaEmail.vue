<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Share this article via email</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_flex with_btn alt_2">
                            <div class="form_group">
                                <label for="email_address">Email Address <span>*</span></label>
                                <input type="text" name="email_address" autocomplete="off" placeholder="Enter your email address" class="input_text" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('email_address')">{{ properFormat(errors.first('email_address')) }}</span></transition>
                            </div>
                            <div class="form_button alt">
                                <button type="submit" class="default_btn">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.$store.state.shareEmailStatus = false
                        document.body.classList.remove('no_scroll')
                    //     let token = me.$cookies.get('70hokc3hhhn5')
                    //     me.loader(true)
                    //     me.$axios.post(`api/user/update-password`, me.form, {
                    //         headers: {
                    //             Authorization: `Bearer ${token}`
                    //         }
                    //     }).then(res => {
                    //         me.$store.state.changePasswordStatus = false
                    //         me.$store.state.buyRidesPromptStatus = true
                    //         me.$parent.message = "You've successfully changed your password."
                    //     }).catch(err => {
                    //         me.$store.state.errorList = err.response.data.errors
                    //         me.$store.state.errorPromptStatus = true
                    //     }).then(() => {
                    //         setTimeout( () => {
                    //             me.loader(false)
                    //         }, 500)
                    //         me.validateToken()
                    //     })
                    // } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
							offset: -250
						})
                    }
                })
            },
            toggleClose () {
                const me = this
                me.$store.state.shareEmailStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
