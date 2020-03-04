<template>
    <div class="update_profile_tab_content" :style="`height: ${height}px`">
        <transition name="fade">
            <div id="tab_0" class="wrapper" v-if="category == 'profile-overview'">
                <form id="default_form" @submit.prevent="submissionProfileSuccess()" data-vv-scope="profile_overview_form" enctype="multipart/form-data">
                    <div class="form_flex_image">
                        <label class="main_label">Profile Picture</label>
                        <div class="flex_image">
                            <input type="file" class="input_image" id="image" name="image[]" @change="getFile($event)" v-validate="'size:1000|image|ext:jpeg,jpg,png'">
                            <input type="hidden" name="image_id[]" :value="profileOverview.image_id">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.image[]')">{{ errors.first('profile_overview_form.image[]') | properFormat }}</span></transition>
                            <label class="input_image_label" for="image">
                                <div class="label">
                                    Upload
                                </div>
                                <transition name="fade">
                                    <div class="preview_flex_image_wrapper" id="preview_flex_image_wrapper" v-if="previewImage">
                                        <div class="preview">
                                            <img id="preview_image" :src="`${($store.state.user.customer_details.images) ? $store.state.user.customer_details.images[0].path : '' }`" />
                                        </div>
                                    </div>
                                </transition>
                            </label>
                        </div>
                        <div class="sub_label">
                            <div class="text">{{ $store.state.user.first_name }} {{ $store.state.user.last_name }}</div>
                            <img src="/sample-type.svg" />
                            <div class="default_btn_blue" @click="viewImage()">View Photo</div>
                        </div>
                    </div>
                    <div class="form_flex">
                        <div class="form_group">
                            <label for="first_name">First Name <span>*</span></label>
                            <input type="text" name="first_name" autocomplete="off" class="input_text" v-model="profileOverview.first_name" placeholder="Enter your first name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.first_name')">{{ errors.first('profile_overview_form.first_name') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="last_name">Last Name <span>*</span></label>
                            <input type="text" name="last_name" autocomplete="off" class="input_text" v-model="profileOverview.last_name" placeholder="Enter your last name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.last_name')">{{ errors.first('profile_overview_form.last_name') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="email">E-mail <span>*</span></label>
                        <input type="text" id="email" name="email" class="input_text" v-model="profileOverview.email" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.email')">{{ errors.first('profile_overview_form.email') | properFormat }}</span></transition>
                    </div>
                    <div class="form_flex">
                        <div class="form_group date">
                            <label for="birth_date">Birthdate <span>*</span></label>
                            <no-ssr>
                                <vc-date-picker
                                :is-required="true"
                                v-model="profileOverview.birth_date"
                                :nav-visibility="'visible'"
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
                            <label for="contact_number">Contact Number <span>*</span></label>
                            <input type="text" name="contact_number" autocomplete="off" v-model="profileOverview.contact_number" placeholder="Enter your contact number" class="input_text" v-validate="'required|numeric|min:7|max:11'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.contact_number')">{{ errors.first('profile_overview_form.contact_number') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_flex">
                        <div class="form_flex radio">
                            <label>Sex <span>*</span></label>
                            <div class="form_radio">
                                <input type="radio" id="female" value="female" name="sex" class="input_radio" v-validate="'required'" v-model="profileOverview.sex">
                                <label for="female">Female</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="male" value="male" name="sex" class="input_radio" v-validate="'required'" v-model="profileOverview.sex">
                                <label for="male">Male</label>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.sex')">{{ errors.first('profile_overview_form.sex') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group select">
                            <label for="shoe_size">Shoe Size (US Sizes) <span>*</span></label>
                            <div class="select">
                                <select class="input_select" name="shoe_size" v-model="profileOverview.shoe_size" v-validate="'required'">
                                    <option value="" selected disabled>Please select a shoe size</option>
                                    <option :value="size" v-for="(size, index) in sizes">{{ size }}</option>
                                </select>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.shoe_size')">{{ errors.first('profile_overview_form.shoe_size') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_group select">
                        <label for="what_do_you_do">What do you do <span>*</span></label>
                        <div class="select">
                            <select class="input_select" name="what_do_you_do" v-model="profileOverview.what_do_you_do" v-validate="'required'">
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
                            <input type="text" name="personal_address_1" autocomplete="off" class="input_text" v-model="address.personal_address_1" placeholder="Enter your address 1" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.personal_address_1')">{{ errors.first('address_form.personal_address_1') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="personal_address_2">Address 2 (Optional)</label>
                            <input type="text" name="personal_address_2" autocomplete="off" class="input_text" v-model="address.personal_address_2" placeholder="Enter your address 2" v-validate="{regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.personal_address_2')">{{ errors.first('address_form.personal_address_2') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="personal_city">City <span>*</span></label>
                            <input type="text" name="personal_city" autocomplete="off" class="input_text" v-model="address.personal_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
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
                            <input type="text" name="billing_address_1" autocomplete="off" class="input_text" v-model="address.billing_address_1" placeholder="Enter your address 1" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_1')">{{ errors.first('address_form.billing_address_1') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="billing_address_2">Address 2 (Optional)</label>
                            <input type="text" name="billing_address_2" autocomplete="off" class="input_text" v-model="address.billing_address_2" placeholder="Enter your address 2" v-validate="{regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_2')">{{ errors.first('address_form.billing_address_2') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="billing_city">City <span>*</span></label>
                            <input type="text" name="billing_city" autocomplete="off" class="input_text" v-model="address.billing_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
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
            <div id="tab_2" class="accounts wrapper" v-if="category == 'account-settings'">
                <form id="default_form">
                    <div class="form_main_group">
                        <div class="form_header">
                            <label>Account Settings</label>
                        </div>
                        <div class="form_inline_group">
                            <label for="subscribed" @click="toggleSubscribe()">Subscribe to Ride Revolution newsletter</label>
                            <div class="form_check toggler" @click="toggleSubscribe()">
                                <input type="hidden" id="subscribed" name="subscribed" class="action_check" :value="(subscribed) ? 1 : 0">
                                <div :class="`toggle ${(subscribed) ? 'active' : ''}`"></div>
                            </div>
                        </div>
                        <div class="form_inline_group">
                            <label>Change Password</label>
                            <div class="form_arrow" @click="toggleChangePassword()"><svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="11.46" height="20.09" viewBox="0 0 11.46 20.09"> <path class="path" d="M9324.543,3625.279l8.631,8.631c.007.007-8.631,8.631-8.631,8.631" transform="translate(-9323.128 -3623.865)"/> </svg></div>
                        </div>
                    </div>
                    <div class="form_button">
                        <nuxt-link to="/my-profile/deactivate-account" class="default_btn_red">Deactivate Account</nuxt-link>
                    </div>
                </form>
            </div>
        </transition>
        <transition name="fade">
            <change-password v-if="$store.state.changePasswordStatus" />
        </transition>
        <transition name="fade">
            <buy-rides-prompt v-if="$store.state.buyRidesPromptStatus" :status="true" :message="message" />
        </transition>
    </div>
</template>

<script>
    import ChangePassword from './modals/ChangePassword'
    import BuyRidesPrompt from './modals/BuyRidesPrompt'
    export default {
        components: {
            ChangePassword,
            BuyRidesPrompt
        },
        props: {
            category: {
                type: String,
                default: 'profile-overview'
            }
        },
        data () {
            return {
                message: '',
                previewImage: false,
                subscribed: true,
                copied: false,
                height: 0,
                unique: 0,
                profileOverview: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    birth_date: new Date(),
                    contact_number: '',
                    sex: '',
                    shoe_size: '',
                    what_do_you_do: '',
                    image_id: 0
                },
                address: {
                    personal_address_1: '',
                    personal_address_2: '',
                    personal_city: '',
                    billing_address_1: '',
                    billing_address_2: '',
                    billing_city: ''
                }
            }
        },
        computed: {
            sizes () {
                const me = this
                let ctr = 5
                let sizes = []
                for (let i = 0; i < 35; i++) {
                    ctr += 0.5
                    sizes.push(ctr)
                }
                return sizes
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
            viewImage () {
                const me = this
                me.$store.state.imageViewerStatus = true
                document.body.classList.add('no_scroll')
            },
            getFile (event) {
                const me = this
                let element = event.target
                if (element.files[0]) {
                    me.previewImage = true
                } else {
                    me.previewImage = false
                }
                if (element.files && element.files[0]) {
                    let reader = new FileReader()
                    reader.onload = function () {
                        let image = document.getElementById('preview_image')
                        image.src = reader.result
                    }
                    reader.readAsDataURL(element.files[0])
                } else {
                    let image = document.getElementById('preview_image')
                    image.src = ''
                }
            },
            getHeight () {
                const me = this
                setTimeout( () => {
                    me.height = document.getElementById(`tab_${me.unique}`).scrollHeight
                }, 10)
            },
            toggleSubscribe () {
                const me = this
                let value
                let token = me.$cookies.get('token')
                let formData = new FormData()
                formData.append('_method', 'PATCH')
                me.subscribed ^= true
                value = (me.subscribed) ? 1 : 0
                me.loader(true)
                me.$axios.post(`api/user/toggle-subscription/${value}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    me.message = 'Successfully updated your account settings.'
                    me.$store.state.buyRidesPromptStatus = true
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                }).then(() => {
                    setTimeout( () => {
                        document.body.classList.add('no_scroll')
                        me.loader(false)
                    }, 500)
                    me.validateToken()
                })
            },
            toggleChangePassword () {
                const me = this
                me.$store.state.changePasswordStatus = true
                document.body.classList.add('no_scroll')
            },
            copyPersonalAddress () {
                const me = this
                me.address.billing_address_1 = me.address.personal_address_1
                me.address.billing_address_2 = me.address.personal_address_2
                me.address.billing_city = me.address.personal_city
            },
            submissionProfileSuccess () {
                const me = this
                me.$validator.validateAll('profile_overview_form').then(valid => {
                    if (valid) {
                        let token = me.$cookies.get('token')
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.loader(true)
                        me.$axios.post(`api/user/update/profile-overview`, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            me.message = 'Successfully updated your profile overview.'
                            me.$store.state.buyRidesPromptStatus = true
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                document.body.classList.add('no_scroll')
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
            submissionAddressSuccess () {
                const me = this
                me.$validator.validateAll('address_form').then(valid => {
                    if (valid) {
                        let token = me.$cookies.get('token')
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.loader(true)
                        me.$axios.post(`api/user/update/address`, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            me.message = 'Successfully updated your address.'
                            me.$store.state.buyRidesPromptStatus = true
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                document.body.classList.add('no_scroll')
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
            }
        },
        mounted () {
            const me = this
            let ctr = 0
            setInterval( () => {
                if (ctr < 1) {
                    me.profileOverview.image_id = (me.$store.state.user.customer_details.images[0].path != null) ? me.$store.state.user.customer_details.images[0].id : 0
                    me.profileOverview.first_name = me.$store.state.user.first_name
                    me.profileOverview.last_name = me.$store.state.user.last_name
                    me.profileOverview.email = me.$store.state.user.email
                    me.profileOverview.birth_date = new Date(me.$store.state.user.customer_details.co_birthdate)
                    me.profileOverview.contact_number = me.$store.state.user.customer_details.co_contact_number
                    me.profileOverview.sex = me.$store.state.user.customer_details.co_sex
                    me.profileOverview.shoe_size = me.$store.state.user.customer_details.co_shoe_size
                    me.profileOverview.what_do_you_do = me.$store.state.user.customer_details.occupation_id

                    me.address.personal_address_1 = me.$store.state.user.customer_details.pa_address_1
                    me.address.personal_address_2 = me.$store.state.user.customer_details.pa_address_2
                    me.address.personal_city = me.$store.state.user.customer_details.pa_city
                    me.address.billing_address_1 = me.$store.state.user.customer_details.ba_address_1
                    me.address.billing_address_2 = me.$store.state.user.customer_details.ba_address_2
                    me.address.billing_city = me.$store.state.user.customer_details.ba_city

                    me.previewImage = (me.$store.state.user.customer_details.images[0].path != null) ? true : false
                    me.subscribed = (me.$store.state.user.newsletter_subscription) ? true : false
                    ctr++
                }
            }, 500)
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
