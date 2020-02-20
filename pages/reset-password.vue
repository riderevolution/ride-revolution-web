<template>
    <div class="reset_password">
        <section id="banner"></section>
        <form id="default_form" @submit.prevent="submissionResetSuccess()">
            <div class="form_main_group">
                <div class="form_header">
                    <label>Reset Password</label>
                </div>
                <div class="form_group">
                    <label for="password">New Password</label>
                    <input type="password" id="password" name="password" ref="password" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}">
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
                    <input type="password" id="confirm_password" name="confirm_password" class="input_text" autocomplete="off" placeholder="Enter your password" v-validate="{required: true, confirmed: 'password', regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}">
                    <transition name="fade">
                        <div class="pw_icon" @click="toggleConfirmPassword(showConfirmPassword)" v-if="!showConfirmPassword"><img src="/icons/hide-pw.svg" /></div>
                    </transition>
                    <transition name="fade">
                        <div class="pw_icon" @click="toggleConfirmPassword(showConfirmPassword)" v-if="showConfirmPassword"><img src="/icons/show-pw.svg" /></div>
                    </transition>
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('register_form.confirm_password')">{{ errors.first('register_form.confirm_password') | properFormat }}</span></transition>
                </div>
            </div>
            <div class="form_button">
                <button type="submit" class="default_btn">Reset</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                showPassword: false,
                showConfirmPassword: false
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
            }
        },
        mounted () {
            const me = this
            if (!me.$route.query.token) {
                alert('GAGO!')
            }
        }
    }
</script>
