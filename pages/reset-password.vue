<template>
    <div class="reset_password">
        <section id="banner" class="mt"></section>
        <div class="reset_done" v-if="resetDone">
            <p>Password changed successfully. Click <div class="link" @click="loginUser()"> here </div> to login.</p>
        </div>
        <form id="default_form" @submit.prevent="submissionResetSuccess()" v-if="validToken == 1 && !resetDone">
            <div class="form_main_group">
                <div class="form_header">
                    <label>Reset Password</label>
                </div>
                <div class="form_group">
                    <label for="password">New Password</label>
                    <input type="password" id="password" name="password" ref="password" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, min: 8, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="resetPasswordForm.password">
                    <transition name="fade">
                        <div class="pw_icon" @click="togglePassword(showPassword)" v-if="!showPassword"><img src="/icons/hide-pw.svg" /></div>
                    </transition>
                    <transition name="fade">
                        <div class="pw_icon" @click="togglePassword(showPassword)" v-if="showPassword"><img src="/icons/show-pw.svg" /></div>
                    </transition>
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('password')">{{ errors.first('password') | properFormat }}</span></transition>
                </div>
                <div class="form_group">
                    <label for="password_confirmation">Confirm Password</label>
                    <input type="password" id="password_confirmation" name="password_confirmation" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, min: 8, confirmed: 'password', regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="resetPasswordForm.password_confirmation">
                    <transition name="fade">
                        <div class="pw_icon" @click="toggleConfirmPassword(showConfirmPassword)" v-if="!showConfirmPassword"><img src="/icons/hide-pw.svg" /></div>
                    </transition>
                    <transition name="fade">
                        <div class="pw_icon" @click="toggleConfirmPassword(showConfirmPassword)" v-if="showConfirmPassword"><img src="/icons/show-pw.svg" /></div>
                    </transition>
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') | properFormat }}</span></transition>
                </div>
            </div>
            <div class="form_button">
                <button type="submit" class="default_btn">Submit</button>
            </div>
        </form>
        <div class="invalid_token" v-if="validToken != 1 && !resetDone">
            {{ validToken }}
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                showPassword: false,
                showConfirmPassword: false,
                resetPasswordForm: {
                    password: '',
                    password_confirmation: '',
                    _method: 'PATCH',
                    token: null
                },
                res: null,
                validToken: 1,
                resetDone: false
            }
        },
        filters: {
            properFormat: function (value) {
                let newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                }else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
                let message = value.split('The ')[1].split(' field')
                if (message.length > 1) {
                    message = message[1]
                    return `The ${newValue} field${message}`
                } else {
                    return `The ${newValue}`
                }
            }
        },
        methods: {
            loginUser () {
                const me = this
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
            },
            submissionResetSuccess () {
                let me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.loader(true)
                        me.$axios.post('api/forgot-password', me.resetPasswordForm).then(res => {
                            me.resetDone = true
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout(() => {
                                me.loader(false)
                            }, 500)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
                            offset: -250
                        })
                    }
                })
            },
            /**
             * Toggling of Show/Hide password */
            togglePassword (status) {
                const me = this
                if (status) {
                    me.showPassword = false
                    document.getElementById('password').type = 'password'
                } else {
                    me.showPassword = true
                    document.getElementById('password').type = 'text'
                }
            },
            /**
             * Toggling of Show/Hide confirm password */
            toggleConfirmPassword (status) {
                const me = this
                if (status) {
                    me.showConfirmPassword = false
                    document.getElementById('password_confirmation').type = 'password'
                } else {
                    me.showConfirmPassword = true
                    document.getElementById('password_confirmation').type = 'text'
                }
            },
            validateResetPasswordToken () {
                this.$axios.get(`api/reset-password/validate-token/${this.$route.query.resetToken}`).then(res => {
                    this.validToken = 1
                    this.resetPasswordForm.token = this.$route.query.resetToken
                }).catch(err => {
                    console.log(err)
                    this.validToken = err.response.data.errors[0]
                })
            }
        },
        mounted () {
            this.validateResetPasswordToken()
        },
    }
</script>
