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
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('current_password')">{{ errors.first('current_password') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="new_password">New Password <span>*</span></label>
                            <input type="password" id="new_password" name="new_password" class="input_text" ref="new_password" autocomplete="off" placeholder="Please enter your new password" v-validate="{required: true, min: 8, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="form.new_password">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('new_password')">{{ errors.first('new_password') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="verify_password">Verify Password <span>*</span></label>
                            <input type="password" id="verify_password" name="verify_password" class="input_text" autocomplete="off" placeholder="Please enter your verify password" v-validate="{required: true, min: 8, confirmed: 'new_password', regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.|\#|\!|\$]*$'}" v-model="form.new_password_confirmation">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('verify_password')">{{ errors.first('verify_password') | properFormat }}</span></transition>
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
