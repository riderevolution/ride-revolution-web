<template>
    <transition name="fade">
        <div class="reset_password" v-if="loaded">
            <section id="banner"></section>
            <div class="reset_done" v-if="resetDone && !oldUser">
                <p>Password changed successfully. Click <div class="link" @click="loginUser()"> here </div> to login.</p>
            </div>
            <div class="reset_done" v-if="resetDone && oldUser">
                <p>Profile Updated successfully. Click <div class="link" @click="loginUser()"> here </div> to login.</p>
            </div>
            <form id="default_form" @submit.prevent="submissionResetSuccess()" v-if="validToken == 1 && !resetDone">
                <div class="form_main_group">
                    <div class="form_header">
                        <h1>{{ (oldUser) ? 'Update Profile' : 'Reset Password' }}</h1>
                    </div>
                    <div class="form_group disclaimer" v-if="oldUser">
                        <label for="username">Username <span>*</span></label>
                        <input type="text" @input="checkValidity('username', $event)" name="username" autocomplete="off" class="input_text" v-model="oldUserForm.username" placeholder="Enter your username" v-validate="{required: true, regex: '^[a-zA-Z0-9|\@|\#|\_|\.]*$', min: 6, max: 100}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('username') && !checkUsernameValidity">{{ properFormat(errors.first('username')) }}</span></transition>
                        <transition name="slide"><span class="validation_errors" v-if="checkUsernameValidity">Username is already taken</span></transition>
                    </div>
                    <div class="form_group_disclaimer" v-if="oldUser">
                        <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>Username cannot be changed once saved.</span></div>
                    </div>
                    <div class="form_group" v-if="oldUser">
                        <label for="contact_number">Contact Number <span>*</span></label>
                        <input type="text" name="contact_number" autocomplete="off" v-model="oldUserForm.contact_number" placeholder="Enter your contact number" class="input_text" v-validate="'required|numeric|min:7|max:11'">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('contact_number')">{{ properFormat(errors.first('contact_number')) }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="password">New Password</label>
                        <input type="password" id="password" name="password" ref="password" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, min: 8, regex: '^[a-zA-Z0-9|\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="resetPasswordForm.password">
                        <transition name="fade">
                            <div class="pw_icon" @click="togglePassword(showPassword)" v-if="!showPassword"><img src="/icons/hide-pw.svg" /></div>
                        </transition>
                        <transition name="fade">
                            <div class="pw_icon" @click="togglePassword(showPassword)" v-if="showPassword"><img src="/icons/show-pw.svg" /></div>
                        </transition>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('password')">{{ properFormat(errors.first('password')) }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="password_confirmation">Confirm Password</label>
                        <input type="password" id="password_confirmation" name="password_confirmation" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, min: 8, confirmed: 'password', regex: '^[a-zA-Z0-9|\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="resetPasswordForm.password_confirmation">
                        <transition name="fade">
                            <div class="pw_icon" @click="toggleConfirmPassword(showConfirmPassword)" v-if="!showConfirmPassword"><img src="/icons/hide-pw.svg" /></div>
                        </transition>
                        <transition name="fade">
                            <div class="pw_icon" @click="toggleConfirmPassword(showConfirmPassword)" v-if="showConfirmPassword"><img src="/icons/show-pw.svg" /></div>
                        </transition>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('password_confirmation')">{{ properFormat(errors.first('password_confirmation')) }}</span></transition>
                    </div>
                </div>
                <div class="form_button" v-if="!oldUser">
                    <button type="submit" class="default_btn">Submit</button>
                </div>
                <div class="form_button" v-else>
                    <button type="submit" :class="`default_btn ${(checkUsernameValidity) ? 'disabled' : ''}`">Submit</button>
                </div>
            </form>
            <div class="invalid_token" v-if="validToken != 1 && !resetDone">
                <div class="logo">
                    <img src="/footer-logo.svg" />
                </div>
                {{ validToken }}
            </div>
        </div>
    </transition>
</template>

<script>
    import Banner from '../components/Banner'
    export default {
        components: {
            Banner
        },
        data () {
            return{
                loaded: false,
                showPassword: false,
                showConfirmPassword: false,
                checkUsernameValidity: false,
                resetPasswordForm: {
                    password: '',
                    password_confirmation: '',
                    token: null
                },
                oldUserForm: {
                    username: '',
                    contact_number: '',
                },
                res: null,
                validToken: 1,
                oldUser: false,
                resetDone: false
            }
        },
        methods: {
            checkValidity (type, event) {
                const me = this
                let value = event.target.value
                let formData = new FormData()
                formData.append('type', type)
                formData.append('value', value)
                me.$axios.post('api/check-data-validity', formData).then(res => {
                    if (res.data) {
                        if (res.data.exists) {
                            me.checkUsernameValidity = true
                        } else {
                            me.checkUsernameValidity = false
                        }
                    }
                })
            },
            loginUser () {
                const me = this
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
            },
            submissionResetSuccess () {
                let me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData()
                        formData.append('password', me.resetPasswordForm.password)
                        formData.append('password_confirmation', me.resetPasswordForm.password_confirmation)
                        formData.append('token', me.resetPasswordForm.token)
                        if (me.oldUser) {
                            formData.append('username', me.oldUserForm.username)
                            formData.append('contact_number', me.oldUserForm.contact_number)
                        }
                        formData.append('_method', 'PATCH')
                        me.loader(true)
                        me.$axios.post('api/forgot-password', formData).then(res => {
                            setTimeout( () => {
                                if (me.oldUser) {
                                    me.$router.push(`/thank-you?rWD5WfJ2GntpsREKyR4R=${res.data.onboarding_code}`)
                                } else {
                                    me.resetDone = true
                                }
                            }, 500)
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
                const me = this
                me.loader(true)
                me.$axios.get(`api/reset-password/validate-token/${me.$route.query.resetToken}`).then(res => {
                    setTimeout( () => {
                        if (res.data.from_import == 1) {
                            me.oldUser = true
                        }
                        me.validToken = 1
                        me.resetPasswordForm.token = me.$route.query.resetToken
                        me.loaded = true
                    }, 500)
                }).catch(err => {
                    me.validToken = err.response.data.errors[0]
                    me.loaded = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            windowScroll () {
                const me = this
                if (me.$store.state.articleAlertStatus) {
                    if (document.getElementById('article_alert')) {
                        document.getElementById('banner').style.marginTop = `${document.getElementById('article_alert').scrollHeight + document.getElementById('header').scrollHeight}px`
                    }
                } else {
                    document.getElementById('banner').style.marginTop = `${document.getElementById('header').scrollHeight}px`
                }
            }
        },
        mounted () {
            const me = this
            me.validateResetPasswordToken()
            me.windowScroll()
        },
        beforeMount () {
            window.addEventListener('load', this.windowScroll)
            window.addEventListener('scroll', this.windowScroll)
            window.addEventListener('resize', this.windowScroll)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.windowScroll)
            window.removeEventListener('scroll', this.windowScroll)
            window.removeEventListener('resize', this.windowScroll)
        }
    }
</script>
