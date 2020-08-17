<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title alt">Change Password</h2>
                    <h3 class="form_subtitle">Change your password or recover your current one.</h3>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_group">
                            <label for="current_password">Current Password <span>*</span></label>
                            <input type="password" id="current_password" name="current_password" class="input_text" autocomplete="off" placeholder="Please enter your current password" v-validate="{required: true, min: 8, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="form.current_password">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('current_password')">{{ properFormat(errors.first('current_password')) }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="new_password">New Password <span>*</span></label>
                            <input type="password" id="new_password" name="new_password" class="input_text" ref="new_password" autocomplete="off" placeholder="Please enter your new password" v-validate="{required: true, min: 8, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="form.new_password">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('new_password')">{{ properFormat(errors.first('new_password')) }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="verify_password">Verify Password <span>*</span></label>
                            <input type="password" id="verify_password" name="verify_password" class="input_text" autocomplete="off" placeholder="Please enter your verify password" v-validate="{required: true, min: 8, confirmed: 'new_password', regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="form.new_password_confirmation">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('verify_password')">{{ properFormat(errors.first('verify_password')) }}</span></transition>
                        </div>
                        <div class="form_button">
                            <button type="submit" class="default_btn">Save Changes</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: '',
                    _method: 'PATCH'
                }
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let token = me.$cookies.get('70hokc3hhhn5')
                        me.loader(true)
                        me.$axios.post(`api/user/update-password`, me.form, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            me.$store.state.changePasswordStatus = false
                            me.$store.state.buyRidesPromptStatus = true
                            me.$parent.message = "You've successfully changed your password."
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                            me.validateToken()
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
							offset: -250
						})
                    }
                })
            },
            toggleClose () {
                const me = this
                me.$store.state.changePasswordStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
