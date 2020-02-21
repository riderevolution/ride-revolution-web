<template>
    <div :class="`login_sign_up ${($route.fullPath == '/') ? 'front' : 'not_front'}`">
        <div class="close_icon" @click="toggleClose()"></div>
        <transition name="fade">
            <section id="login" v-if="!signUp">
                <h2 class="title">Hi, welcome back!</h2>
                <div class="action">
                    <div class="default_btn_login" @click="fbLogin()">
                        <img src="/icons/fb-login.svg" />
                        <span>Login with Facebook</span>
                    </div>
                    <div class="default_btn_login alt" @click="googleLogin()">
                        <img src="/icons/google-login.svg" />
                        <span>Login with Google</span>
                    </div>
                </div>
                <div class="divider">
                    <span>or</span>
                </div>
                <form id="default_form" data-vv-scope="login_form" @submit.prevent="submissionLoginSuccess()">
                    <div class="form_group">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" name="email" class="input_text" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}" v-model="loginForm.email">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('login_form.email')">{{ errors.first('login_form.email') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="loginForm.password">
                        <transition name="fade">
                            <div class="pw_icon" @click="togglePassword(showPassword)" v-if="!showPassword"><img src="/icons/hide-pw.svg" /></div>
                        </transition>
                        <transition name="fade">
                            <div class="pw_icon" @click="togglePassword(showPassword)" v-if="showPassword"><img src="/icons/show-pw.svg" /></div>
                        </transition>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('login_form.password')">{{ errors.first('login_form.password') | properFormat }}</span></transition>
                    </div>
                    <div class="form_flex">
                        <div class="form_check">
                            <input type="checkbox" id="remember_me" name="remember_me" class="input_check">
                            <label for="remember_me">Remember Me</label>
                        </div>
                        <div class="input_link" @click="toggleForgot()">Forgot Password?</div>
                    </div>
                    <div class="form_button">
                        <button type="submit" class="default_btn full">Login</button>
                    </div>
                </form>
                <div class="new_here">
                    New here? <span @click="toggleNextPrev(signUp)">Create an account</span>.
                </div>
            </section>
        </transition>
        <transition name="fade">
            <section id="login" v-if="forgotPassword">
                <h2 class="title">Forgot your password?</h2>
                <h3 class="subtitle">Just leave it to us. Please enter your email address where we can send your new password.</h3>
                <form id="default_form" data-vv-scope="forgot_form" @submit.prevent="submissionForgotSuccess()">
                    <div class="form_group">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" name="email" class="input_text" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}" v-model="forgotPasswordForm.email">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('forgot_form.email')">{{ errors.first('forgot_form.email') | properFormat }}</span></transition>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="back" @click="toggleStep('forgot')">Back</div>
                        <div class="form_button">
                            <button type="submit" class="default_btn full">Send</button>
                        </div>
                    </div>
                </form>
            </section>
        </transition>
        <transition name="fade">
            <section id="login" v-if="signUp && signUpStep == 0">
                <h2 class="title">Congratulations on starting your health and fitness journey! You’ve come to the right place.</h2>
                <div class="action">
                    <div class="default_btn_login">
                        <img src="/icons/fb-login.svg" />
                        <span>Login with Facebook</span>
                    </div>
                    <div class="default_btn_login alt">
                        <img src="/icons/google-login.svg" />
                        <span>Login with Google</span>
                    </div>
                </div>
                <div class="divider">
                    <span>or</span>
                </div>
                <form id="default_form" data-vv-scope="register_form">
                    <div class="form_group">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" name="email" class="input_text" v-model="signUpForm.email" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('register_form.email')">{{ errors.first('register_form.email') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" ref="password" v-model="signUpForm.password" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}">
                        <transition name="fade">
                            <div class="pw_icon" @click="togglePassword(showPassword)" v-if="!showPassword"><img src="/icons/hide-pw.svg" /></div>
                        </transition>
                        <transition name="fade">
                            <div class="pw_icon" @click="togglePassword(showPassword)" v-if="showPassword"><img src="/icons/show-pw.svg" /></div>
                        </transition>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('register_form.password')">{{ errors.first('register_form.password') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" v-model="signUpForm.confirmPassword" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, confirmed: 'password', regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}">
                        <transition name="fade">
                            <div class="pw_icon" @click="toggleConfirmPassword(showConfirmPassword)" v-if="!showConfirmPassword"><img src="/icons/hide-pw.svg" /></div>
                        </transition>
                        <transition name="fade">
                            <div class="pw_icon" @click="toggleConfirmPassword(showConfirmPassword)" v-if="showConfirmPassword"><img src="/icons/show-pw.svg" /></div>
                        </transition>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('register_form.confirm_password')">{{ errors.first('register_form.confirm_password') | properFormat }}</span></transition>
                    </div>
                    <div class="form_button">
                        <button type="button" class="default_btn full" @click="submissionRegisterSuccess()">Sign up</button>
                    </div>
                </form>
                <div class="new_here">
                    Already have an account? <span @click="toggleNextPrev(signUp)">Create an account</span>.
                </div>
            </section>
        </transition>
        <transition name="fade">
            <section id="login" v-if="signUpProcess && signUpStep == 1">
                <div class="sign_up_header">
                    <h2 class="title">A few more things</h2>
                    <div class="counter">1/3</div>
                </div>
                <form id="default_form" data-vv-scope="register_process_form">
                    <div class="form_group">
                        <label for="first_name">First Name <span>*</span></label>
                        <input type="text" name="first_name" autocomplete="off" class="input_text" v-model="signUpForm.firstName" placeholder="Enter your first name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('register_process_form.first_name')">{{ errors.first('register_process_form.first_name') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="last_name">Last Name <span>*</span></label>
                        <input type="text" name="last_name" autocomplete="off" class="input_text" v-model="signUpForm.lastName" placeholder="Enter your last name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('register_process_form.last_name')">{{ errors.first('register_process_form.last_name') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="co_contact_number">Contact Number <span>*</span></label>
                        <input type="text" name="co_contact_number" autocomplete="off" v-model="signUpForm.contactNumber" placeholder="Enter your contact number" class="input_text" v-validate="'required|numeric|min:7|max:11'">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('register_process_form.co_contact_number')">{{ errors.first('register_process_form.co_contact_number') | properFormat }}</span></transition>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="back" @click="toggleStep('back')">Back</div>
                        <div class="form_button">
                            <button type="button" class="default_btn full" @click="toggleStep('proceed')">Looks Good</button>
                        </div>
                    </div>
                </form>
            </section>
        </transition>
        <transition name="fade">
            <section id="login" v-if="signUpProcess && signUpStep == 2">
                <div class="sign_up_header">
                    <h2 class="title">Almost there, Mark!</h2>
                    <div class="counter">2/3</div>
                </div>
                <form id="default_form" data-vv-scope="register_process_form">
                    <div class="form_group date">
                        <label for="birth_date">Birthdate <span>*</span></label>
                        <no-ssr>
                            <vc-date-picker
                            :is-required="true"
                            v-model="signUpForm.birthDate"
                            :input-props='{
                                class: "vc-appearance-none vc-w-full vc-py-2 vc-px-3 vc-text-gray-800 vc-bg-white input_text",
                                id: "birth_date",
                                name: "birth_date",
                                readonly: true
                                }'
                                />
                        </no-ssr>
                    </div>
                    <div class="form_group select">
                        <label for="what_do_you_do">What do you do <span>*</span></label>
                        <div class="select">
                            <select class="input_select" name="what_do_you_do" v-model="signUpForm.whatDoYouDo" v-validate="'required'">
                                <option value="" selected disabled>Choose a Profession</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </select>
                        </div>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('register_process_form.what_do_you_do')">{{ errors.first('register_process_form.what_do_you_do') | properFormat }}</span></transition>
                    </div>
                    <div class="form_flex radio">
                        <label>Sex <span>*</span></label>
                        <div class="form_radio">
                            <input type="radio" id="female" value="female" name="sex" class="input_radio" v-validate="'required'" v-model="signUpForm.sex">
                            <label for="female">Female</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="male" value="male" name="sex" class="input_radio" v-validate="'required'" v-model="signUpForm.sex">
                            <label for="male">Male</label>
                        </div>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('register_process_form.sex')">{{ errors.first('register_process_form.sex') | properFormat }}</span></transition>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="back" @click="toggleStep('back')">Back</div>
                        <div class="form_button">
                            <button type="button" class="default_btn full" @click="toggleStep('proceed')">One last thing</button>
                        </div>
                    </div>
                </form>
            </section>
        </transition>
        <transition name="fade">
            <section id="login" v-if="signUpProcess && signUpStep == 3">
                <div class="sign_up_header">
                    <h2 class="title">Terms and Conditions &amp; Privacy Policy</h2>
                    <div class="counter">3/3</div>
                </div>
                <form id="default_form" data-vv-scope="register_process_form">
                    <div class="form_group">
                        <div class="form_group_body">
                            <b>I. <u>Application of These Terms And Conditions (the “RIDE REV” Agreement)</u></b><br>
                            This website is operated by Ride Revolution Inc. These terms and conditions (“Terms”) govern your relationship with Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br><br>
                            <b>II. <u>Duis aute irure dolor in reprehenderit in voluptate velit</u></b><br>
                            This website is operated by Ride Revolution Inc. These terms and conditions (“Terms”) govern your relationship with Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br><br>
                            <b>III. <u>Application of These Terms And Conditions (the “RIDE REV” Agreement)</u></b><br>
                            This website is operated by Ride Revolution Inc. These terms and conditions (“Terms”) govern your relationship with Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br><br>
                            <b>IV. <u>Duis aute irure dolor in reprehenderit in voluptate velit</u></b><br>
                            This website is operated by Ride Revolution Inc. These terms and conditions (“Terms”) govern your relationship with Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br><br>
                            <b>V. <u>Duis aute irure dolor in reprehenderit in voluptate velit</u></b><br>
                            This website is operated by Ride Revolution Inc. These terms and conditions (“Terms”) govern your relationship with Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br><br>
                            <b>VI. <u>Application of These Terms And Conditions (the “RIDE REV” Agreement)</u></b><br>
                            This website is operated by Ride Revolution Inc. These terms and conditions (“Terms”) govern your relationship with Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br><br>
                            <b>VII. <u>Duis aute irure dolor in reprehenderit in voluptate velit</u></b><br>
                            This website is operated by Ride Revolution Inc. These terms and conditions (“Terms”) govern your relationship with Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                    <div class="form_group">
                        <div :class="`form_check ${(!hasReadTerms) ? 'disabled' : ''}`">
                            <input type="checkbox" id="i_agree" name="i_agree" class="input_check" v-validate="'required'" v-model="signUpForm.iAgree">
                            <label for="i_agree">I agree to the <a target="_blank" href="/terms-and-conditions">Terms &amp; Conditions</a> and Ride Revolution’s <a target="_blank" href="/privacy-policy">Privacy Policy</a>.</label>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('register_process_form.i_agree') && hasReadTerms">{{ errors.first('register_process_form.i_agree') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="back" @click="toggleStep('back')">Back</div>
                        <div class="form_button">
                            <button type="button" class="default_btn full" @click="submitRegistration()">Agree and Finish</button>
                        </div>
                    </div>
                </form>
            </section>
        </transition>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                showPassword: false,
                showConfirmPassword: false,
                forgotPassword: false,
                signUp: false,
                signUpProcess: false,
                signUpForm: {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    contactNumber: '',
                    birthDate: new Date(),
                    whatDoYouDo: '',
                    sex: '',
                    iAgree: ''
                },
                hasReadTerms: false,
                signUpStep: null,
                loginForm: {
                    email: '',
                    password: '',
                },
                forgotPasswordForm: {
                    email: ''
                }
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
            fbLogin () {
                let me = this

                me.initFB()

                FB.login(res => {
                    if (res.authResponse) {
                        FB.api('/me?fields=email,name,first_name,last_name', res => {
                            let data = res
                            me.loader(true)
                            me.$axios.post('api/login/facebook/', data).then(res => {
                                let token = res.data.token
                                me.$cookies.set('token', token, '7d')
                                me.$store.state.isAuth = true
                                me.$store.state.loginSignUpStatus = false
                                document.body.classList.remove('no_scroll')
                                me.$router.push('/')
                            }).catch(err => {
                                console.log(err)
                                me.$cookies.remove('token')
                            }).then(() => {
                                setTimeout(() => {
                                    me.loader(false)
                                }, 300)
                                me.validateToken()
                            })
                        })
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, {
                    scope: 'public_profile,email'
                })
            },
            googleLogin () {
                let me = this
                me.$gAuth.signIn().then(res => {
                    // call backend
                    let profile = res.getBasicProfile()
                    let data = {
                        email: profile.getEmail(),
                        google_id: profile.getId(),
                        first_name: profile.getGivenName(),
                        last_name: profile.getFamilyName(),
                    }
                    me.$axios.post('api/login/google/', data).then(res => {
                        let token = res.data.token
                        me.$cookies.set('token', token, '7d')
                        me.$store.state.isAuth = true
                        me.$store.state.loginSignUpStatus = false
                        document.body.classList.remove('no_scroll')
                        me.$router.push('/')
                    }).catch(err => {
                        console.log(err)
                        me.$cookies.remove('token')
                    }).then(() => {
                        setTimeout(() => {
                            me.loader(false)
                        }, 300)
                        me.validateToken()
                    })
                })
            },
            /**
             * Submission of forgot password */
            submissionForgotSuccess () {
                const me = this
                me.$validator.validateAll('forgot_form').then(valid => {
                    if (valid) {
                        me.$axios.post('api/forgot-password', me.forgotPasswordForm).then(res => {
                            me.$store.state.loginSignUpStatus = false
                            document.body.classList.remove('no_scroll')
                            me.$store.state.forgotPasswordSuccessStatus = true
                        }).catch(err => {
                            console.log(err)
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
             * Toggling of forgot password form */
            toggleForgot () {
                const me = this
                me.forgotPassword = true
                me.signUp = true
            },
            /**
             * Submission of next steps registration process form */
            submitRegistration () {
                const me = this
                me.$validator.validateAll('register_process_form').then(valid => {
                    if (valid) {
                        me.$router.push('/my-profile')
                        me.$store.state.loginSignUpStatus = false
                        document.body.classList.remove('no_scroll')
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
                            offset: -250
                        })
                    }
                })
            },
            /**
             * Toggling of step in registration */
            toggleStep (status) {
                const me = this
                switch (status) {
                    case 'back':
                        if (me.signUpStep == 1) {
                            me.signUp = true
                            me.signUpProcess = false
                            me.signUpStep = 0
                        } else if (me.signUpStep == 2) {
                            me.signUpStep = 1
                        } else if (me.signUpStep == 3) {
                            me.signUpStep = 2
                        }
                        break
                    case 'proceed':
                        me.$validator.validateAll('register_process_form').then(valid => {
                            if (valid) {
                                if (me.signUpStep == 1) {
                                    me.signUpStep = 2
                                } else if (me.signUpStep == 2) {
                                    me.signUpStep = 3
                                    setTimeout( () => {
                                        document.querySelector('#default_form .form_group_body').addEventListener('scroll', function(e) {
                                            if (this.offsetHeight + this.scrollTop >= this.scrollHeight) {
                                                me.hasReadTerms = true
                                            } else {
                                                me.hasReadTerms = false
                                                me.signUpForm.iAgree = ''
                                                document.getElementById('i_agree').checked = false
                                            }
                                        })
                                    }, 100)
                                } else if (me.signUpStep == 3) {
                                    me.$store.state.loginSignUpStatus = false
                                    document.body.classList.remove('no_scroll')
                                }
                            } else {
                                me.$scrollTo('.validation_errors', {
                                    container: '#default_form',
                                    offset: -250
                                })
                            }
                        })
                        break
                    case 'forgot':
                        me.signUp = false
                        me.forgotPassword = false
                        break
                }
            },
            /**
             * Toggling of Sign Up and Login */
            toggleNextPrev () {
                const me = this
                if (me.signUp) {
                    me.signUp = false
                } else {
                    me.signUp = true
                    me.signUpStep = 0
                }
                me.showPassword = false
                me.showConfirmPassword = false
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
                    document.getElementById('confirm_password').type = 'password'
                } else {
                    me.showConfirmPassword = true
                    document.getElementById('confirm_password').type = 'text'
                }
            },
            /**
             * Close login/sign up modal */
            toggleClose () {
                const me = this
                me.$store.state.loginSignUpStatus = false
                document.body.classList.remove('no_scroll')
            },
            /**
             * Submission of login form */
            submissionLoginSuccess () {
                const me = this
                me.$validator.validateAll('login_form').then(valid => {
                    if (valid) {
                        me.loader(true)
                        me.$axios.post('api/customer-login', me.loginForm).then(res => {
                            let token = res.data.token
                            me.$cookies.set('token', token, '7d')
                            me.$store.state.isAuth = true
                            me.$store.state.loginSignUpStatus = false
                            document.body.classList.remove('no_scroll')
                            me.$router.push('/')
                        }).catch(err => {
                            alert(err.response.data.errors[0])
                            console.log(err)
                        }).then(() => {
                            setTimeout(() => {
                                me.loader(false)
                            }, 300)
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
            /**
             * Submission of first step registration form */
            submissionRegisterSuccess () {
                const me = this
                me.$validator.validateAll('register_form').then(valid => {
                    if (valid) {
                        me.signUpProcess = true
                        me.signUpStep = 1
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
							offset: -250
						})
                    }
                })
            },
            /**
             * Detect height of scroll */
            windowLoginScroll () {
                let height = window.pageYOffset | document.body.scrollTop
                let element = document.querySelector('.login_sign_up')
                if (element.classList.contains('front')) {
                    if (height >= 200) {
                        element.classList.add('sticky')
                    } else {
                        element.classList.remove('sticky')
                    }
                }
            }
        },
        beforeMount () {
            window.addEventListener('load', this.windowLoginScroll)
            window.addEventListener('scroll', this.windowLoginScroll)
            window.addEventListener('resize', this.windowLoginScroll)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.windowLoginScroll)
            window.removeEventListener('scroll', this.windowLoginScroll)
            window.removeEventListener('resize', this.windowLoginScroll)
        }
    }
</script>
