<template>
    <div class="deactivate_account">
        <breadcrumb :overlay="false" />
        <section id="content">
            <form id="default_form" @submit.prevent="submissionSuccess()">
                <div class="form_main_group">
                    <div class="form_header">
                        <h1>Deactivate Account</h1>
                        <h2>Are you sure to deactivate your account? You may reactivate it later, if you wish.</h2>
                    </div>
                    <div class="form_radio_group">
                        <div class="form_radio">
                            <input type="radio" id="temporary" value="temporary" name="reason" class="input_radio" v-validate="'required'" v-model="user.reason">
                            <label for="temporary">This is temporary. I’ll be back soon.</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="not-useful-website" value="not-useful-website" name="reason" class="input_radio" v-validate="'required'" v-model="user.reason">
                            <label for="not-useful-website">I don’t find this website useful.</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="privacy-issue" value="privacy-issue" name="reason" class="input_radio" v-validate="'required'" v-model="user.reason">
                            <label for="privacy-issue">I have privacy issue.</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="another-account" value="another-account" name="reason" class="input_radio" v-validate="'required'" v-model="user.reason">
                            <label for="another-account">I have another Ride Rev account.</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="others" value="others" name="reason" class="input_radio" v-validate="'required'" v-model="user.reason">
                            <label for="others">Other (please explain further)</label>
                        </div>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('reason')">{{ errors.first('reason') | properFormat }}</span></transition>
                    </div>
                    <transition name="slide">
                        <div class="form_group" v-if="user.reason == 'others'">
                            <textarea name="other_details" placeholder="Enter your explanation here" rows="5" class="input_text" key="other_details" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1|\']*$'}"></textarea>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('other_details')">{{ errors.first('other_details') | properFormat }}</span></transition>
                        </div>
                    </transition>
                </div>
                <div class="form_flex alt">
                    <div class="form_button">
                        <nuxt-link to="/my-profile/update-profile" class="default_btn_red">Cancel</nuxt-link>
                    </div>
                    <div class="form_button margin">
                        <button type="submit" class="default_btn">Continue</button>
                    </div>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    export default {
        components: {
            Breadcrumb
        },
        data () {
            return {
                user: {
                    reason: ''
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

                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
                            offset: -250
                        })
                    }
                })
            }
        }
    }
</script>
