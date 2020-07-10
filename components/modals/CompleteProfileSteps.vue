<template>
    <div :class="`${($store.state.completeProfileHealthStatus) ? 'health' : ''} ${(height > 200) ? 'sticky' : ''} login_sign_up ${($route.fullPath == '/') ? 'front' : 'not_front'} mobile`">
        <section id="login" class="alt">
            <div class="steps">
                <ul>
                    <li :class="`overlay ${(completeProfileStep == 1 || completeProfileStep == 2 || completeProfileStep == 3 || completeProfileStep == 4) ? 'active' : ''}`">
                        <div class="count">
                            1
                        </div>
                    </li>
                    <li :class="`overlay ${(completeProfileStep == 2 || completeProfileStep == 3 || completeProfileStep == 4) ? 'active' : ''}`">
                        <div class="count">
                            2
                        </div>
                    </li>
                    <li :class="`overlay ${(completeProfileStep == 3 || completeProfileStep == 4) ? 'active' : ''}`">
                        <div class="count">
                            3
                        </div>
                    </li>
                    <li :class="`overlay ${(completeProfileStep == 4) ? 'active' : ''}`">
                        <div class="count">
                            4
                        </div>
                    </li>
                </ul>
            </div>
            <form id="step_1_form" data-vv-scope="complete_profile_form" v-show="completeProfileStep == 1" enctype="multipart/form-data">
                <div id="default_form" :class="`${(completeProfileStep == 1) ? 'fade_in' : 'fade_out'}`">
                    <div class="sign_up_header alt">
                        <h2 class="title">Complete your profile</h2>
                    </div>
                    <div class="form_flex_image" v-if="!$route.query.token">
                        <label class="main_label">Profile Picture</label>
                        <div class="flex_image">
                            <input type="file" class="input_image" id="image" name="image[]" @change="getFile($event)" v-validate="'image|ext:jpeg,jpg,png|size:20000'">
                            <input type="hidden" name="image_id[]" value="0">
                            <!-- <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_form.image[]')">{{ errors.first('complete_profile_form.image[]') | properFormat }}</span></transition> -->
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_form.image[]')">Only .jpg, .jpeg and .png files accepted</span></transition>
                            <label class="input_image_label" for="image">
                                <div class="label">
                                    Upload
                                </div>
                                <transition name="fade">
                                    <div class="preview_flex_image_wrapper" id="preview_flex_image_wrapper" v-if="previewImage">
                                        <div class="preview">
                                            <img id="preview_image" src="" />
                                        </div>
                                    </div>
                                </transition>
                            </label>
                        </div>
                    </div>
                    <div class="form_group select">
                        <label for="shoe_size">Shoe Size (US Sizes) <span>*</span></label>
                        <div class="select">
                            <select class="input_select" name="shoe_size" v-validate="'required'">
                                <option value="" selected disabled>Please select a shoe size</option>
                                <option :value="size" v-for="(size, index) in sizes">{{ size }}</option>
                            </select>
                        </div>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_form.shoe_size')">{{ errors.first('complete_profile_form.shoe_size') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group weight">
                        <label for="weight">Weight <span>*</span></label>
                        <div class="weight_input">
                            <input type="text" name="weight" autocomplete="off" class="input_text" v-validate="'required|numeric|min_value:1|max_value:200'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_form.weight')">{{ errors.first('complete_profile_form.weight') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="backa"></div>
                        <div class="form_button">
                            <button type="button" class="default_btn full" @click="toggleStep('proceed')">Looks Good</button>
                        </div>
                    </div>
                </div>
            </form>
            <form id="step_2_form" data-vv-scope="complete_profile_2_form" v-show="completeProfileStep == 2">
                <div id="default_form" :class="`${(completeProfileStep == 2) ? 'fade_in' : 'fade_out'}`">
                    <div class="sign_up_header alt">
                        <h2 class="title">Keep going!</h2>
                    </div>
                    <div class="form_main_group alt">
                        <div class="form_header">
                            <label>Home Address</label>
                        </div>
                        <div class="form_group">
                            <label for="home_address_line_1">Address Line 1 <span>*</span></label>
                            <input name="home_address_line_1" placeholder="Enter your address line 1" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="completeProfile.home_address_line_1"/>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_2_form.home_address_line_1')">{{ errors.first('complete_profile_2_form.home_address_line_1') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="home_address_line_2">Address Line 2 <b>(Optional)</b></label>
                            <input name="home_address_line_2" placeholder="Enter your address line 2" class="input_text" v-validate="{regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="completeProfile.home_address_line_2"/>
                        </div>
                        <div class="form_flex">
                            <div class="form_group select">
                                <label for="home_address_country">Country <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="home_address_country" v-model="completeProfile.home_address_country" v-validate="'required'" @change="toggleWorld($event, 'state', 'pa')">
                                        <option value="0" selected disabled>Choose a Country</option>
                                        <option :value="country.id" v-for="(country, key) in pa_countries" :key="key">{{ country.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_2_form.home_address_country')">{{ errors.first('complete_profile_2_form.home_address_country') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group select">
                                <label for="home_address_state">State <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="home_address_state" v-model="completeProfile.home_address_state" v-validate="'required'">
                                        <option value="0" selected disabled>Choose a State</option>
                                        <option :value="state.id" v-for="(state, key) in pa_states" :key="key">{{ state.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_2_form.home_address_state')">{{ errors.first('complete_profile_2_form.home_address_state') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_flex">
                            <div class="form_group">
                                <label for="home_address_city">City <span>*</span></label>
                                <input type="text" name="home_address_city" autocomplete="off" :class="`input_text ${(completeProfile.home_address_state != '') ? '' : 'disabled'}`" v-model="completeProfile.home_address_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_2_form.home_address_city')">{{ errors.first('complete_profile_2_form.home_address_city') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="home_address_zip_code">Zip Code <span>*</span></label>
                                <input type="text" name="home_address_zip_code" autocomplete="off" :class="`input_text ${(completeProfile.home_address_state != '') ? '' : 'disabled'}`" v-model="completeProfile.home_address_zip_code" placeholder="Enter your zip code" v-validate="{required: true, numeric: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_2_form.home_address_zip_code')">{{ errors.first('complete_profile_2_form.home_address_zip_code') | properFormat }}</span></transition>
                            </div>
                        </div>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="back" @click="toggleStep('back')">Back</div>
                        <div class="form_button">
                            <button type="button" class="default_btn full" @click="toggleStep('proceed')">Next</button>
                        </div>
                    </div>
                </div>
            </form>
            <form id="step_3_form" data-vv-scope="complete_profile_3_form" v-show="completeProfileStep == 3">
                <div id="default_form" :class="`${(completeProfileStep == 3) ? 'fade_in' : 'fade_out'}`">
                    <div class="sign_up_header alt_2">
                        <h2 class="title">Almost there!</h2>
                    </div>
                    <div class="form_main_group alt">
                        <div class="form_header">
                            <label>Billing Address</label>
                        </div>
                        <div class="form_group">
                            <div class="form_check">
                                <input type="checkbox" id="same_as_personal_address" name="same_as_personal_address" class="input_check" @change="copyPersonalAddress(completeProfile.copy ^= true)">
                                <label for="same_as_personal_address">Same as Home Address</label>
                            </div>
                        </div>
                        <div class="form_group">
                            <label for="billing_address_line_1">Address <span>*</span></label>
                            <input name="billing_address_line_1" placeholder="Enter your address line 1" class="input_text" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="completeProfile.billing_address_line_1"/>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_3_form.billing_address_line_1')">{{ errors.first('complete_profile_3_form.billing_address_line_1') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="billing_address_line_2">Address <b>(Optional)</b></label>
                            <input name="billing_address_line_2" placeholder="Enter your address line 2" class="input_text" v-validate="{regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="completeProfile.billing_address_line_2"/>
                        </div>
                        <div class="form_flex">
                            <div class="form_group select">
                                <label for="billing_address_country">Country <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="billing_address_country" v-model="completeProfile.billing_address_country" v-validate="'required'" @change="toggleWorld($event, 'state', 'ba')">
                                        <option value="0" selected disabled>Choose a Country</option>
                                        <option :value="country.id" v-for="(country, key) in ba_countries" :key="key">{{ country.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_3_form.billing_address_country')">{{ errors.first('complete_profile_3_form.billing_address_country') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group select">
                                <label for="billing_address_state">State <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="billing_address_state" v-model="completeProfile.billing_address_state" v-validate="'required'">
                                        <option value="0" selected disabled>Choose a State</option>
                                        <option :value="state.id" v-for="(state, key) in ba_states" :key="key">{{ state.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_3_form.billing_address_state')">{{ errors.first('complete_profile_3_form.billing_address_state') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_flex">
                            <div class="form_group">
                                <label for="billing_address_city">City <span>*</span></label>
                                <input type="text" name="billing_address_city" autocomplete="off" :class="`input_text ${(completeProfile.billing_address_state != '') ? '' : 'disabled'}`" v-model="completeProfile.billing_address_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_3_form.billing_address_city')">{{ errors.first('complete_profile_3_form.billing_address_city') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="billing_address_zip_code">Zip Code <span>*</span></label>
                                <input type="text" name="billing_address_zip_code" autocomplete="off" :class="`input_text ${(completeProfile.billing_address_state != '') ? '' : 'disabled'}`" v-model="completeProfile.billing_address_zip_code" placeholder="Enter your zip code" v-validate="{required: true, numeric: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_3_form.billing_address_zip_code')">{{ errors.first('complete_profile_3_form.billing_address_zip_code') | properFormat }}</span></transition>
                            </div>
                        </div>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="back" @click="toggleStep('back')">Back</div>
                        <div class="form_button">
                            <button type="button" class="default_btn full" @click="toggleStep('proceed')">One last thing</button>
                        </div>
                    </div>
                </div>
            </form>
            <form id="step_4_form" data-vv-scope="complete_profile_4_form" v-show="completeProfileStep == 4">
                <div id="default_form" :class="`${(completeProfileStep == 4) ? 'fade_in' : 'fade_out'}`">
                    <div class="sign_up_header alt_2">
                        <h2 class="title">One last thing, please sign our health waiver.</h2>
                    </div>
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
                    <div class="form_main_group alt">
                        <div class="form_header">
                            <label>Emergency Contact</label>
                        </div>
                        <div class="form_group">
                            <label for="emergency_contact_full_name">Full Name <span>*</span></label>
                            <input type="text" name="emergency_contact_full_name" autocomplete="off" class="input_text" placeholder="Enter emergency contact full name" v-validate="{required: true, regex: '^[a-zA-Z-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_4_form.emergency_contact_full_name')">{{ errors.first('complete_profile_4_form.emergency_contact_full_name') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="emergency_contact_phone_number">Phone Number <span>*</span></label>
                            <input type="text" name="emergency_contact_phone_number" autocomplete="off" placeholder="Enter emergency contact phone number" class="input_text" v-validate="'required|numeric|min:7|max:11'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_4_form.emergency_contact_phone_number')">{{ errors.first('complete_profile_4_form.emergency_contact_phone_number') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="emergency_contact_relationship">Relationship <span>*</span></label>
                            <input type="text" name="emergency_contact_relationship" autocomplete="off" class="input_text" placeholder="Enter emergency contact relationship" v-validate="{required: true, regex: '^[a-zA-Z-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_4_form.emergency_contact_relationship')">{{ errors.first('complete_profile_4_form.emergency_contact_relationship') | properFormat }}</span></transition>
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
                        <div class="form_group">
                            <div :class="`form_check ${(!hasReadTerms) ? 'disabled' : ''}`">
                                <input type="checkbox" id="i_agree" name="i_agree" class="input_check" v-validate="'required'">
                                <label for="i_agree" class="alt">I acknowledge and fully understand the <a target="_blank" href="/terms-and-conditions">Terms &amp; Conditions</a> stated above and that all information stated above are true.</label>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_4_form.i_agree') && hasReadTerms">{{ errors.first('complete_profile_4_form.i_agree') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_group">
                            <div class="form_check">
                                <input type="checkbox" id="email_waiver" name="email_waiver" class="input_check">
                                <label for="email_waiver" class="alt">Email me my Waiver</label>
                            </div>
                        </div>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="back" @click="toggleStep('back')">Back</div>
                        <div class="form_button">
                            <button type="button" class="default_btn full" @click="toggleStep('submit')">Complete Profile</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
        <transition name="fade">
            <health-waiver v-if="$store.state.completeProfileHealthStatus" />
        </transition>
    </div>
</template>

<script>
    import HealthWaiver from './HealthWaiver'
    export default {
        components: {
            HealthWaiver
        },
        data () {
            return {
                previewImage: false,
                height: 0,
                completeProfileStep: 1,
                completeProfile: {
                    home_address_line_1: '',
                    home_address_line_2: '',
                    home_address_country: 174,
                    home_address_state: 0,
                    home_address_city: '',
                    home_address_zip_code: '',
                    billing_address_line_1: '',
                    billing_address_line_2: '',
                    billing_address_country: 174,
                    billing_address_state: 0,
                    billing_address_city: '',
                    billing_address_zip_code: '',
                    medical_history: [],
                    copy: false
                },
                histories: [],
                error: false,
                hasReadTerms: false,
                pa_countries: [],
                pa_states: [],
                ba_countries: [],
                ba_states: [],
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
                let newValue = value.split('The ')[1].split(' field')[0].split('.')
                if (newValue.length > 1) {
                    newValue = newValue[1].split('[]')
                    if (newValue.length > 1) {
                        let nextValue = newValue[0].split('_')
                        if (nextValue.length > 1) {
                            newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                        } else {
                            newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                    }
                } else {
                    newValue = value.split('The ')[1].split(' field')[0].split('[]')
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
                        if (message[0].split('image').length > 1) {
                            message = message[0].split('image[]')[1]
                            return `The ${newValue} ${message}`
                        } else {
                            return `The ${newValue}`
                        }
                    }
                }
            }
        },
        methods: {
            toggleMedical (key, status) {
                const me = this
                let ctr = 0
                me.completeProfile.medical_history = me.histories
                me.completeProfile.medical_history[key].value = status
                me.completeProfile.medical_history[key].checked = true
                me.histories.forEach((history, index) => {
                    if (history.checked) {
                        ctr++
                    }
                })
                if (me.error) {
                    if (ctr == me.histories.length) {
                        me.error = false
                    }
                }
            },
            toggleWorld (event, type, category) {
                const me = this
                let country_id = (category == 'pa') ? me.completeProfile.home_address_country : me.completeProfile.billing_address_country
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
            copyPersonalAddress (status) {
                const me = this
                if (status) {
                    me.completeProfile.billing_address_line_1 = me.completeProfile.home_address_line_1
                    me.completeProfile.billing_address_line_2 = me.completeProfile.home_address_line_2
                    me.completeProfile.billing_address_country = me.completeProfile.home_address_country
                    me.completeProfile.billing_address_state = me.completeProfile.home_address_state
                    me.completeProfile.billing_address_city = me.completeProfile.home_address_city
                    me.completeProfile.billing_address_zip_code = me.completeProfile.home_address_zip_code
                } else {
                    me.completeProfile.billing_address_line_1 = ''
                    me.completeProfile.billing_address_line_2 = ''
                    me.completeProfile.billing_address_country = 174
                    me.completeProfile.billing_address_state = 0
                    me.completeProfile.billing_address_city = ''
                    me.completeProfile.billing_address_zip_code = ''
                }
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
            toggleStep (status) {
                const me = this
                switch (status) {
                    case 'back':
                        if (me.completeProfileStep == 1) {
                            me.$store.state.completeProfileStepsStatus = false
                            document.body.classList.remove('no_scroll')
                        } else if (me.completeProfileStep == 2) {
                            me.completeProfileStep = 1
                        } else if (me.completeProfileStep == 3) {
                            me.completeProfileStep = 2
                        } else if (me.completeProfileStep == 4) {
                            me.completeProfileStep = 3
                        }
                        break
                    case 'proceed':
                        if (me.completeProfileStep == 1) {
                            me.$validator.validateAll('complete_profile_form').then(valid => {
                                if (valid) {
                                    me.completeProfileStep = 2
                                } else {
                                    me.$scrollTo('.validation_errors', {
                                        container: '#default_form',
                                        offset: -250
                                    })
                                }
                            })
                        } else if (me.completeProfileStep == 2) {
                            me.$validator.validateAll('complete_profile_2_form').then(valid => {
                                if (valid) {
                                    me.completeProfileStep = 3
                                } else {
                                    me.$scrollTo('.validation_errors', {
                                        container: '#default_form',
                                        offset: -250
                                    })
                                }
                            })
                        } else if (me.completeProfileStep == 3) {
                            me.$validator.validateAll('complete_profile_3_form').then(valid => {
                                if (valid) {
                                    me.completeProfileStep = 4
                                } else {
                                    me.$scrollTo('.validation_errors', {
                                        container: '#default_form',
                                        offset: -250
                                    })
                                }
                            })
                        }
                        break
                    case 'submit':
                        if (me.completeProfile.medical_history.length == me.histories.length) {
                            me.error = false
                        } else {
                            me.error = true
                        }
                        me.$validator.validateAll('complete_profile_4_form').then(valid => {
                            if (valid) {
                                me.loader(true)
                                let token = (me.$route.query.token != null) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
                                let formData1 = new FormData(document.getElementById('step_1_form'))
                                let formData2 = new FormData(document.getElementById('step_2_form'))
                                let formData3 = new FormData(document.getElementById('step_3_form'))
                                let formData4 = new FormData(document.getElementById('step_4_form'))
                                formData1.append('step_2', JSON.stringify(Object.fromEntries(formData2)))
                                formData1.append('step_3', JSON.stringify(Object.fromEntries(formData3)))
                                formData1.append('health_waiver', JSON.stringify(Object.fromEntries(formData4)))
                                formData1.append('medical_history', JSON.stringify(me.completeProfile.medical_history))
                                formData1.append('_method', 'PATCH')
                                me.$axios.post('api/user/complete-profile', formData1, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }).then(res => {
                                    me.$store.state.completeProfileStepsStatus = false
                                    if (me.$store.state.lastRoute != '') {
                                        me.$router.push(me.$store.state.lastRoute)
                                    } else {
                                        location.reload()
                                    }
                                }).catch(err => {
                                    me.$store.state.errorList = err.response.data.errors
                                    me.$store.state.errorPromptStatus = true
                                }).then(() => {
                                    setTimeout( () => {
                                        me.loader(false)
                                        me.$store.state.completeProfileSuccessStatus = true
                                    }, 500)
                                })
                            } else {
                                me.error = true
                                me.$scrollTo('.validation_errors', {
                                    offset: -250
                                })
                            }
                        })
                        break
                }
            },
            /**
             * Close login/sign up modal */
            toggleClose () {
                const me = this
                me.$store.state.completeProfileStepsStatus = false
                document.body.classList.remove('no_scroll')
            },
            /**
             * Detect height of scroll */
            windowLoginScroll () {
                const me = this
                let height = window.pageYOffset | document.body.scrollTop
                let element = document.querySelector('.login_sign_up')
                if (element.classList.contains('front')) {
                    me.height = height
                }
                me.$axios.get('api/world/countries').then(res => {
                    if (res.data) {
                        me.pa_countries = res.data.countries
                        me.ba_countries = res.data.countries
                        me.$axios.get(`api/world/states?country_id=${me.completeProfile.home_address_country}`).then(res => {
                            me.pa_states = res.data.states
                            me.ba_states = res.data.states
                        })
                    }
                })
                setTimeout( () => {
                    document.querySelector('#step_4_form .read .form_group_body').addEventListener('scroll', function(e) {
                        if (this.offsetHeight + this.scrollTop >= this.scrollHeight) {
                            me.hasReadTerms = true
                        } else {
                            me.hasReadTerms = false
                            document.getElementById('i_agree').checked = false
                        }
                    })
                }, 100)
            }
        },
        mounted () {
            const me = this
            me.$axios.get('api/extras/medical-history-questions').then(res => {
                if (res.data) {
                    res.data.medicalHistoryQuestions.forEach((history, index) => {
                        history.checked = false
                        me.histories.push(history)
                    })
                }
            })
            me.windowLoginScroll()
        },
        beforeMount () {
            window.addEventListener('load', this.windowLoginScroll)
            window.addEventListener('resize', this.windowLoginScroll)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.windowLoginScroll)
            window.removeEventListener('resize', this.windowLoginScroll)
        }
    }
</script>
