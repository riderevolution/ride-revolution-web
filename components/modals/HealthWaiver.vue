<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="health_waiver_form" class="overlay alt_2 scroll" data-vv-scope="health_waiver_form" @submit.prevent="submissionSuccess()">
                <div id="default_form" class="modal_wrapper">
                    <h2 class="form_title alt">One last thing, please sign our health waiver.</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_main_group">
                            <div class="form_group">
                                <transition name="slide"><span class="validation_errors" v-if="error">Please choose yes or no</span></transition>
                                <div class="form_flex_radio_alternate" v-for="(history, key) in histories" :key="key">
                                    <label>{{ history.title }}</label>
                                    <div class="radio_wrapper">
                                        <div class="form_radio">
                                            <input type="radio" :id="`history_${key}_yes`" value="Yes" :name="`history_${key}`" class="action_radio" @change="toggleMedical(key, 1)">
                                            <label :for="`history_${key}_yes`">Yes</label>
                                        </div>
                                        <div class="form_radio">
                                            <input type="radio" :id="`history_${key}_no`" value="No" :name="`history_${key}`" class="action_radio" @change="toggleMedical(key, 0)">
                                            <label :for="`history_${key}_no`">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form_main_group">
                            <div class="form_header">
                                <label>Emergency Contact</label>
                            </div>
                            <div class="form_group">
                                <label for="emergency_contact">Emergency Contact <span>*</span></label>
                                <input type="text" name="emergency_contact" autocomplete="off" class="input_text" placeholder="Enter your emergency contact" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('health_waiver_form.emergency_contact')">{{ errors.first('health_waiver_form.emergency_contact') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="phone_number">Phone Number <span>*</span></label>
                                <input type="text" name="phone_number" autocomplete="off" placeholder="Enter your phone number" class="input_text" v-validate="'required|numeric|min:7|max:11'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('health_waiver_form.phone_number')">{{ errors.first('health_waiver_form.phone_number') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="relationship">Relationship <span>*</span></label>
                                <input type="text" name="relationship" autocomplete="off" class="input_text" placeholder="Enter your relationship" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('health_waiver_form.relationship')">{{ errors.first('health_waiver_form.relationship') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group read">
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
                                <transition name="slide"><span class="validation_errors" v-if="!hasReadTerms">Read first before proceeding.</span></transition>
                            </div>
                        </div>
                        <div class="form_group">
                            <div :class="`form_check ${(!hasReadTerms) ? 'disabled' : ''}`">
                                <input type="checkbox" id="i_agree" name="i_agree" class="input_check" v-validate="'required'">
                                <label for="i_agree">I acknowledge and fully understand the <a target="_blank" href="/terms-and-conditions">Terms &amp; Conditions</a> stated above and that all information stated above are true.</label>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('health_waiver_form.i_agree') && hasReadTerms">{{ errors.first('health_waiver_form.i_agree') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_group">
                            <div class="form_check">
                                <input type="checkbox" id="email_waiver" name="email_waiver" class="input_check" v-validate="'required'">
                                <label for="email_waiver">Email me my Waiver</label>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('health_waiver_form.email_waiver') && hasReadTerms">{{ errors.first('health_waiver_form.email_waiver') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_button">
                            <button type="submit" class="default_btn">Sign Waiver</button>
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
                histories: [],
                form: {
                    medical_history: []
                },
                error: false,
                hasReadTerms: false
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
                    if (message[0].split('image[]').length > 1) {
                        message = message[0].split('image[]')[1]
                        return `The ${newValue} field${message}`
                    } else {
                        return `The ${newValue}`
                    }
                }
            }
        },
        methods: {
            toggleMedical (key, status) {
                const me = this
                let ctr = 0
                me.form.medical_history = me.histories
                me.form.medical_history[key].value = status
                me.form.medical_history[key].checked = true
                me.histories.forEach((history, index) => {
                    if (history.checked) {
                        ctr++
                    }
                })
                if (ctr == me.histories.length) {
                    me.error = false
                } else {
                    me.error = true
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll('health_waiver_form').then(valid => {
                    if (valid) {
                        let token = me.$cookies.get('token')
                        let formData1 = new FormData(document.getElementById('step_1_form'))
                        let formData2 = new FormData(document.getElementById('step_2_form'))
                        let formData3 = new FormData(document.getElementById('step_3_form'))
                        let formData4 = new FormData(document.getElementById('health_waiver_form'))
                        formData1.append('step_2', JSON.stringify(Object.fromEntries(formData2)))
                        formData1.append('step_3', JSON.stringify(Object.fromEntries(formData3)))
                        formData1.append('health_waiver', JSON.stringify(Object.fromEntries(formData4)))
                        formData1.append('medical_history', JSON.stringify(me.form.medical_history))
                        formData1.append('_method', 'PATCH')
                        me.$axios.post('api/user/complete-profile', formData1, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            console.log(res.data);
                        //     me.$store.state.changePasswordStatus = false
                        //     me.$store.state.buyRidesPromptStatus = true
                        //     me.$parent.message = "You've successfully changed your password."
                        // }).catch(err => {
                        //     me.$store.state.errorList = err.response.data.errors
                        //     me.$store.state.errorPromptStatus = true
                        // }).then(() => {
                        //     setTimeout( () => {
                        //         me.loader(false)
                        //     }, 500)
                        //     me.validateToken()
                        })
                    } else {
                        me.error = true
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form.alt_2',
							offset: -250
						})
                    }
                })
            },
            toggleClose () {
                const me = this
                me.$store.state.completeProfileHealthStatus = false
            }
        },
        mounted () {
            const me = this
            setTimeout( () => {
                document.querySelector('#default_form .read .form_group_body').addEventListener('scroll', function(e) {
                    if (this.offsetHeight + this.scrollTop >= this.scrollHeight) {
                        me.hasReadTerms = true
                    } else {
                        me.hasReadTerms = false
                        document.getElementById('i_agree').checked = false
                    }
                })
            }, 100)
            me.$axios.get('api/extras/medical-history-questions').then(res => {
                if (res.data) {
                    res.data.medicalHistoryQuestions.forEach((history, index) => {
                        history.checked = false
                        me.histories.push(history)
                    })
                }
            })
        }
    }
</script>
