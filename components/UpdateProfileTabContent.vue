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
                                            <img id="preview_image" :src="`${($store.state.user.customer_details.images[0].path != null) ? $store.state.user.customer_details.images[0].path : '' }`" />
                                        </div>
                                    </div>
                                </transition>
                            </label>
                        </div>
                        <div class="sub_label">
                            <div class="text">{{ $store.state.user.first_name }} {{ $store.state.user.last_name }}</div>
                            <!-- <img src="/sample-type.svg" /> -->
                            <div class="default_btn_blue" @click="viewImage()" v-if="$store.state.user.customer_details.images[0].path != null">View Photo</div>
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
                            <input type="date" name="birth_date" autocomplete="off" class="input_text" v-validate="'required|date_format:yyyy-MM-dd'" v-model="profileOverview.birth_date">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('register_process_form.birth_date')">{{ errors.first('register_process_form.birth_date') | properFormat }}</span></transition>
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
                                <input type="radio" id="female" value="male" name="sex" class="input_radio" v-validate="'required'" :checked="profileOverview.sex == 'female'">
                                <label for="female">Female</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="male" value="female" name="sex" class="input_radio" v-validate="'required'" :checked="profileOverview.sex == 'male'">
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
                    <div class="form_flex">
                        <div class="form_group select">
                            <label for="what_do_you_do">Profession <span>*</span></label>
                            <div class="select">
                                <select class="input_select" name="what_do_you_do" v-model="profileOverview.what_do_you_do" v-validate="'required'">
                                    <option value="0" selected disabled>Choose a Profession</option>
                                    <option :value="data" v-for="(data, key) in professions" :selected="data == profileOverview.what_do_you_do" :key="key">{{ data }}</option>
                                </select>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.what_do_you_do')">{{ errors.first('profile_overview_form.what_do_you_do') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group weight">
                            <label for="weight">Weight <span>*</span></label>
                            <div class="weight_input">
                                <input type="text" name="weight" autocomplete="off" class="input_text" v-model="profileOverview.weight" v-validate="'required|numeric|min_value:1|max_value:200'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.weight')">{{ errors.first('profile_overview_form.weight') | properFormat }}</span></transition>
                            </div>
                        </div>
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
                            <label>Home Address</label>
                        </div>
                        <div class="form_group">
                            <label for="home_address_line_1">Address Line 1 <span>*</span></label>
                            <input name="home_address_line_1" placeholder="Enter your address line 1" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="address.home_address_line_1"/>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_line_1')">{{ errors.first('address_form.home_address_line_1') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="home_address_line_2">Address Line 2 <span>*</span></label>
                            <input name="home_address_line_2" placeholder="Enter your address line 2" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="address.home_address_line_2"/>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_line_2')">{{ errors.first('address_form.home_address_line_2') | properFormat }}</span></transition>
                        </div>
                        <div class="form_flex">
                            <div class="form_group select">
                                <label for="home_address_country">Country <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="home_address_country" v-model="address.home_address_country" v-validate="'required'" @change="toggleWorld($event, 'state', 'pa')">
                                        <option value="0" selected disabled>Choose a Country</option>
                                        <option :value="country.id" v-for="(country, key) in pa_countries" :key="key">{{ country.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_country')">{{ errors.first('address_form.home_address_country') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group select">
                                <label for="home_address_state">State <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="home_address_state" v-model="address.home_address_state" v-validate="'required'">
                                        <option value="0" selected disabled>Choose a State</option>
                                        <option :value="state.id" v-for="(state, key) in pa_states" :key="key">{{ state.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_state')">{{ errors.first('address_form.home_address_state') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_flex">
                            <div class="form_group">
                                <label for="home_address_city">City <span>*</span></label>
                                <input type="text" name="home_address_city" autocomplete="off" :class="`input_text ${(address.home_address_state != '') ? '' : 'disabled'}`" v-model="address.home_address_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_city')">{{ errors.first('address_form.home_address_city') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="home_address_zip_code">Zip Code <span>*</span></label>
                                <input type="text" name="home_address_zip_code" autocomplete="off" :class="`input_text ${(address.home_address_state != '') ? '' : 'disabled'}`" v-model="address.home_address_zip_code" placeholder="Enter your zip code" v-validate="{required: true, numeric: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_zip_code')">{{ errors.first('address_form.home_address_zip_code') | properFormat }}</span></transition>
                            </div>
                        </div>
                    </div>
                    <div class="form_main_group alt">
                        <div class="form_header">
                            <label>Billing Address</label>
                        </div>
                        <div class="form_group">
                            <div class="form_check">
                                <input type="checkbox" id="same_as_personal_address" name="same_as_personal_address" class="input_check" @change="copyPersonalAddress(address.copy ^= true)">
                                <label for="same_as_personal_address">Same as Personal Address</label>
                            </div>
                        </div>
                        <div class="form_group">
                            <label for="billing_address_line_1">Address Line 1 <span>*</span></label>
                            <input name="billing_address_line_1" placeholder="Enter your address line 1" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="address.billing_address_line_1"/>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_line_1')">{{ errors.first('address_form.billing_address_line_1') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="billing_address_line_2">Address Line 2 <span>*</span></label>
                            <input name="billing_address_line_2" placeholder="Enter your address line 2" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="address.billing_address_line_2"/>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_line_2')">{{ errors.first('address_form.billing_address_line_2') | properFormat }}</span></transition>
                        </div>
                        <div class="form_flex">
                            <div class="form_group select">
                                <label for="billing_address_country">Country <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="billing_address_country" v-model="address.billing_address_country" v-validate="'required'" @change="toggleWorld($event, 'state', 'ba')">
                                        <option value="0" selected disabled>Choose a Country</option>
                                        <option :value="country.id" v-for="(country, key) in ba_countries" :key="key">{{ country.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_country')">{{ errors.first('address_form.billing_address_country') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group select">
                                <label for="billing_address_state">State <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="billing_address_state" v-model="address.billing_address_state" v-validate="'required'">
                                        <option value="0" selected disabled>Choose a State</option>
                                        <option :value="state.id" v-for="(state, key) in ba_states" :key="key">{{ state.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_state')">{{ errors.first('address_form.billing_address_state') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_flex">
                            <div class="form_group">
                                <label for="billing_address_city">City <span>*</span></label>
                                <input type="text" name="billing_address_city" autocomplete="off" :class="`input_text ${(address.billing_address_state != '') ? '' : 'disabled'}`" v-model="address.billing_address_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_city')">{{ errors.first('address_form.billing_address_city') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="billing_address_zip_code">Zip Code <span>*</span></label>
                                <input type="text" name="billing_address_zip_code" autocomplete="off" :class="`input_text ${(address.billing_address_state != '') ? '' : 'disabled'}`" v-model="address.billing_address_zip_code" placeholder="Enter your zip code" v-validate="{required: true, numeric: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_zip_code')">{{ errors.first('address_form.billing_address_zip_code') | properFormat }}</span></transition>
                            </div>
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
                        <div class="form_inline_group" @click="toggleChangePassword()">
                            <label>Change Password</label>
                            <div class="form_arrow"><svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="11.46" height="20.09" viewBox="0 0 11.46 20.09"> <path class="path" d="M9324.543,3625.279l8.631,8.631c.007.007-8.631,8.631-8.631,8.631" transform="translate(-9323.128 -3623.865)"/> </svg></div>
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
                res: [],
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
                    what_do_you_do: '0',
                    weight: '',
                    image_id: 0
                },
                address: {
                    home_address_line_1: '',
                    home_address_line_2: '',
                    home_address_country: 0,
                    home_address_state: 0,
                    home_address_city: '',
                    home_address_zip_code: '',
                    billing_address_line_1: '',
                    billing_address_line_2: '',
                    billing_address_country: 0,
                    billing_address_state: 0,
                    billing_address_city: '',
                    billing_address_zip_code: '',
                    copy: false
                },
                pa_countries: [],
                pa_states: [],
                ba_countries: [],
                ba_states: [],
                professions: ['Accounting/Finance', 'Admin/Human Resources', 'Arts/Media/Communications', 'Building/Construction', 'Information Technology', 'Education/Training', 'Engineering', 'Healthcare', 'Hotel/Restaurant', 'Manufacturing', 'Sales/Marketing', 'Sciences', 'Services', 'Others']
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
            properFormat (value) {
                let newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
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
					if (message[0].split('file').length > 1) {
                        message = message[0].split('file')[1]
                        return `The ${newValue} field${message}`
                    } else {
                        return `The ${newValue}`
                    }
                }
            }
        },
        methods: {
            toggleWorld (event, type, category) {
                const me = this
                let country_id = (category == 'pa') ? me.address.home_address_country : me.address.billing_address_country
                me.loader(true)
                switch (type) {
                    case 'state':
                        me.$axios.get(`api/world/states?country_id=${country_id}`).then(res => {
                            if (category == 'pa') {
                                me.pa_states = res.data.states
                            } else {
                                me.ba_states = res.data.states
                            }
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                }
            },
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
            copyPersonalAddress (status) {
                const me = this
                if (status) {
                    me.address.billing_address_line_1 = me.address.home_address_line_1
                    me.address.billing_address_line_2 = me.address.home_address_line_2
                    me.address.billing_address_country = me.address.home_address_country
                    if (me.address.billing_address_state == 0) {
                        me.$axios.get(`api/world/states?country_id=${me.address.home_address_country}`).then(res => {
                            me.ba_states = res.data.states
                        })
                    }
                    me.address.billing_address_state = me.address.home_address_state
                    me.address.billing_address_city = me.address.home_address_city
                    me.address.billing_address_zip_code = me.address.home_address_zip_code
                } else {
                    if (me.res.customer_details.ba_state_id != null) {
                        me.address.billing_address_state = me.res.customer_details.ba_state_id
                    } else {
                        me.address.billing_address_state = 0
                    }
                    me.address.billing_address = me.res.customer_details.ba_address
                    me.address.billing_address_city = me.res.customer_details.ba_city
                    me.address.billing_address_zip_code = me.res.customer_details.ba_zip_code
                }
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
            me.getHeight()
            let token = me.$cookies.get('token')
            me.loader(true)
            me.$axios.get('api/check-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    me.res = res.data.user
                    me.profileOverview.image_id = (res.data.user.customer_details.images[0].path != null) ? res.data.user.customer_details.images[0].id : 0
                    me.profileOverview.first_name = res.data.user.first_name
                    me.profileOverview.last_name = res.data.user.last_name
                    me.profileOverview.email = res.data.user.email
                    me.profileOverview.birth_date = res.data.user.customer_details.co_birthdate
                    me.profileOverview.contact_number = res.data.user.customer_details.co_contact_number
                    me.profileOverview.sex = res.data.user.customer_details.co_sex
                    me.profileOverview.shoe_size = res.data.user.customer_details.co_shoe_size
                    me.profileOverview.weight = res.data.user.customer_details.co_weight
                    me.profileOverview.what_do_you_do = res.data.user.customer_details.profession

                    me.$axios.get('api/world/countries').then(res => {
                        if (res.data) {
                            me.pa_countries = res.data.countries
                            me.ba_countries = res.data.countries
                            if (me.res.customer_details.pa_country_id != null) {
                                me.$axios.get(`api/world/states?country_id=${me.res.customer_details.pa_country_id}`).then(res => {
                                    me.pa_states = res.data.states
                                    me.address.home_address_country = me.res.customer_details.pa_country_id
                                    me.address.home_address_state = me.res.customer_details.pa_state_id
                                })
                            }
                            if (me.res.customer_details.ba_country_id != null) {
                                me.$axios.get(`api/world/states?country_id=${me.res.customer_details.ba_country_id}`).then(res => {
                                    me.ba_states = res.data.states
                                    me.address.billing_address_country = me.res.customer_details.ba_country_id
                                    me.address.billing_address_state = me.res.customer_details.ba_state_id
                                })
                            }
                        }
                    })

                    me.address.home_address_line_1 = res.data.user.customer_details.pa_address
                    me.address.home_address_line_2 = res.data.user.customer_details.pa_address_2
                    me.address.home_address_city = res.data.user.customer_details.pa_city
                    me.address.home_address_zip_code = res.data.user.customer_details.pa_zip_code
                    me.address.billing_address_line_1 = res.data.user.customer_details.ba_address
                    me.address.billing_address_line_2 = res.data.user.customer_details.ba_address_2
                    me.address.billing_address_city = res.data.user.customer_details.ba_city
                    me.address.billing_address_zip_code = res.data.user.customer_details.ba_zip_code

                    me.previewImage = (res.data.user.customer_details.images[0].path != null) ? true : false
                    me.subscribed = (res.data.user.newsletter_subscription) ? true : false
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                }
            })
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
