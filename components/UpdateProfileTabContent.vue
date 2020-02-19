<template>
    <div class="update_profile_tab_content" :style="`height: ${height}px`">
        <transition name="fade">
            <div id="tab_0" class="wrapper" v-if="category == 'profile-overview'">
                <form id="default_form" @submit.prevent="submissionProfileSuccess()" data-vv-scope="profile_overview_form">
                    <div class="form_flex">
                        <div class="form_group">
                            <label for="first_name">First Name <span>*</span></label>
                            <input type="text" name="first_name" autocomplete="off" class="input_text" v-model="user.first_name" placeholder="Enter your first name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.first_name')">{{ errors.first('profile_overview_form.first_name') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="last_name">Last Name <span>*</span></label>
                            <input type="text" name="last_name" autocomplete="off" class="input_text" v-model="user.last_name" placeholder="Enter your last name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.last_name')">{{ errors.first('profile_overview_form.last_name') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="email">E-mail <span>*</span></label>
                        <input type="text" id="email" name="email" class="input_text" v-model="user.email" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.email')">{{ errors.first('profile_overview_form.email') | properFormat }}</span></transition>
                    </div>
                    <div class="form_flex">
                        <div class="form_group date">
                            <label for="birth_date">Birthdate <span>*</span></label>
                            <no-ssr>
                                <vc-date-picker
                                :is-required="true"
                                v-model="user.birth_date"
                                :input-props='{
                                    class: "vc-appearance-none vc-w-full vc-py-2 vc-px-3 vc-text-gray-800 vc-bg-white input_text",
                                    id: "birth_date",
                                    name: "birth_date",
                                    readonly: true
                                    }'
                                    />
                            </no-ssr>
                        </div>
                        <div class="form_group">
                            <label for="co_contact_number">Contact Number <span>*</span></label>
                            <input type="text" name="co_contact_number" autocomplete="off" v-model="user.contact_number" placeholder="Enter your contact number" class="input_text" v-validate="'required|numeric|min:7|max:11'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.co_contact_number')">{{ errors.first('profile_overview_form.co_contact_number') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_flex">
                        <div class="form_flex radio">
                            <label>Sex <span>*</span></label>
                            <div class="form_radio">
                                <input type="radio" id="female" value="female" name="sex" class="input_radio" v-validate="'required'" v-model="user.sex">
                                <label for="female">Female</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="male" value="male" name="sex" class="input_radio" v-validate="'required'" v-model="user.sex">
                                <label for="male">Male</label>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.sex')">{{ errors.first('profile_overview_form.sex') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group select">
                            <label for="shoe_size">Shoe Size (US Sizes) <span>*</span></label>
                            <div class="select">
                                <select class="input_select" name="shoe_size" v-model="user.shoe_size" v-validate="'required'">
                                    <option value="" selected disabled>Please select a shoe size</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.shoe_size')">{{ errors.first('profile_overview_form.shoe_size') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_group select">
                        <label for="what_do_you_do">What do you do <span>*</span></label>
                        <div class="select">
                            <select class="input_select" name="what_do_you_do" v-model="user.what_do_you_do" v-validate="'required'">
                                <option value="" selected disabled>Choose a Profession</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </select>
                        </div>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.what_do_you_do')">{{ errors.first('profile_overview_form.what_do_you_do') | properFormat }}</span></transition>
                    </div>
                    <div class="form_button">
                        <button type="submit" class="default_btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_1" class="address wrapper" v-if="category == 'address'">
                <form id="default_form" @submit.prevent="submissionAddressSuccess()" data-vv-scope="address_form">
                    <div class="form_main_group">
                        <div class="form_header">
                            <label>Personal Address</label>
                        </div>
                        <div class="form_group">
                            <label for="personal_address_1">Address 1 <span>*</span></label>
                            <input type="text" name="personal_address_1" autocomplete="off" class="input_text" v-model="user.personal_address_1" placeholder="Enter your address 1" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.personal_address_1')">{{ errors.first('address_form.personal_address_1') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="personal_address_2">Address 2 (Optional)</label>
                            <input type="text" name="personal_address_2" autocomplete="off" class="input_text" v-model="user.personal_address_2" placeholder="Enter your address 2" v-validate="{regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.personal_address_2')">{{ errors.first('address_form.personal_address_2') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="personal_city">City <span>*</span></label>
                            <input type="text" name="personal_city" autocomplete="off" class="input_text" v-model="user.personal_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.personal_city')">{{ errors.first('address_form.personal_city') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_main_group alt">
                        <div class="form_header">
                            <label>Billing Address</label>
                        </div>
                        <div class="form_group">
                            <div class="form_check">
                                <input type="checkbox" id="same_as_personal_address" name="same_as_personal_address" class="input_check" @change="copyPersonalAddress()">
                                <label for="same_as_personal_address">Same as Personal Address</label>
                            </div>
                        </div>
                        <div class="form_group">
                            <label for="billing_address_1">Address 1 <span>*</span></label>
                            <input type="text" name="billing_address_1" autocomplete="off" class="input_text" v-model="user.billing_address_1" placeholder="Enter your address 1" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_1')">{{ errors.first('address_form.billing_address_1') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="billing_address_2">Address 2 (Optional)</label>
                            <input type="text" name="billing_address_2" autocomplete="off" class="input_text" v-model="user.billing_address_2" placeholder="Enter your address 2" v-validate="{regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_2')">{{ errors.first('address_form.billing_address_2') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="billing_city">City <span>*</span></label>
                            <input type="text" name="billing_city" autocomplete="off" class="input_text" v-model="user.billing_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_city')">{{ errors.first('address_form.billing_city') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_button">
                        <button type="submit" class="default_btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_2" class="wrapper" v-if="category == 'account-settings'">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            category: {
                type: String,
                default: 'profile-overview'
            }
        },
        data () {
            return {
                copied: false,
                height: 0,
                unique: 0,
                user: {
                    first_name: 'Mark',
                    last_name: 'Ruffalo',
                    email: 'markruffalo@gmail.com',
                    birth_date: new Date(),
                    contact_number: '09559123947',
                    sex: 'male',
                    shoe_size: '5',
                    what_do_you_do: '1',
                    personal_address_1: '',
                    personal_address_2: '',
                    personal_city: '',
                    billing_address_1: '',
                    billing_address_2: '',
                    billing_city: ''
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
            getHeight () {
                const me = this
                setTimeout( () => {
                    me.height = document.getElementById(`tab_${me.unique}`).scrollHeight
                }, 10)
            },
            copyPersonalAddress () {
                const me = this
                me.user.billing_address_1 = me.user.personal_address_1
                me.user.billing_address_2 = me.user.personal_address_2
                me.user.billing_city = me.user.personal_city
            },
            submissionProfileSuccess () {
                const me = this
                me.$validator.validateAll('profile_overview_form').then(valid => {
                    if (valid) {

                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
                            offset: -250
                        })
                    }
                })
            },
            submissionAddressSuccess () {
                const me = this
                me.$validator.validateAll('address_form').then(valid => {
                    if (valid) {

                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
                            offset: -250
                        })
                    }
                })
            }
        },
        mounted () {
            const me = this
            me.getHeight()
        },
        beforeMount () {
            window.addEventListener('load', this.getHeight)
            window.addEventListener('resize', this.getHeight)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.getHeight)
            window.removeEventListener('load', this.getHeight)
        }
    }
</script>
