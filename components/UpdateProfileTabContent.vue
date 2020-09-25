<template>
    <div class="update_profile_tab_content" :style="`height: ${height}px`" v-if="loaded">
        <transition name="fade">
            <div id="tab_0" class="wrapper" v-if="category == 'profile-overview'">
                <form id="default_form" @submit.prevent="submissionProfileSuccess()" data-vv-scope="profile_overview_form" enctype="multipart/form-data">
                    <div class="form_flex_image">
                        <label class="main_label">Profile Picture</label>
                        <div class="flex_image">
                            <input type="file" class="input_image" id="image" name="image[]" @change="getFile($event)" v-validate="'image|ext:jpeg,jpg,png|size:20000'">
                            <input type="hidden" name="image_id[]" :value="profileOverview.image_id">
                            <!-- <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.image[]')">{{ properFormat(errors.first('profile_overview_form.image[]')) }}</span></transition> -->
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.image[]')">Only .jpg, .jpeg and .png files accepted</span></transition>
                            <label class="input_image_label" for="image">
                                <div class="label">
                                    Upload
                                </div>
                                <transition name="fade">
                                    <div class="preview_flex_image_wrapper" id="preview_flex_image_wrapper" v-if="previewImage">
                                        <div class="preview">
                                            <img id="preview_image" :src="`${(res.customer_details.images[0].path != null) ? res.customer_details.images[0].path : '' }`" />
                                        </div>
                                    </div>
                                </transition>
                            </label>
                        </div>
                        <div class="sub_label">
                            <div class="text">{{ res.first_name }} {{ res.last_name }}</div>
                            <!-- <img src="/sample-type.svg" /> -->
                            <div class="default_btn_blue" @click="viewImage(res.customer_details.images[0].path)" v-if="res.customer_details.images[0].path != null">View Photo</div>
                        </div>
                    </div>
                    <div class="form_flex">
                        <div class="form_group">
                            <label for="first_name">First Name <span>*</span></label>
                            <input type="text" name="first_name" autocomplete="off" class="input_text" v-model="profileOverview.first_name" placeholder="Enter your first name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.first_name')">{{ properFormat(errors.first('profile_overview_form.first_name')) }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="last_name">Last Name <span>*</span></label>
                            <input type="text" name="last_name" autocomplete="off" class="input_text" v-model="profileOverview.last_name" placeholder="Enter your last name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.last_name')">{{ properFormat(errors.first('profile_overview_form.last_name')) }}</span></transition>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="email">E-mail <span>*</span></label>
                        <input type="text" id="email" name="email" class="input_text" v-model="profileOverview.email" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.email')">{{ properFormat(errors.first('profile_overview_form.email')) }}</span></transition>
                    </div>
                    <div class="form_flex">
                        <div class="form_group">
                            <label for="birth_date">Birth Date <span>*</span></label>
                            <input type="text" name="birth_date" autocomplete="off" maxlength="10" class="input_text" v-model="profileOverview.birth_date" @keyup="inputDate($event)" placeholder="YYYY-MM-DD" v-validate="{required: true, max: 10, date_format: 'yyyy-MM-dd'}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.birth_date')">The Birth Date must be in the format YYYY-MM-DD</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="contact_number">Contact Number <span>*</span></label>
                            <input type="text" name="contact_number" autocomplete="off" v-model="profileOverview.contact_number" placeholder="Enter your contact number" class="input_text" v-validate="'required|numeric|min:7|max:11'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.contact_number')">{{ properFormat(errors.first('profile_overview_form.contact_number')) }}</span></transition>
                        </div>
                    </div>
                    <div class="form_flex">
                        <div class="form_flex radio">
                            <label>Sex <span>*</span></label>
                            <div class="form_radio">
                                <input type="radio" id="female" value="F" name="sex" class="input_radio" v-validate="'required'" v-model="profileOverview.sex" @change="getSizes()">
                                <label for="female">Female</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="male" value="M" name="sex" class="input_radio" v-validate="'required'" v-model="profileOverview.sex" @change="getSizes()">
                                <label for="male">Male</label>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.sex')">{{ properFormat(errors.first('profile_overview_form.sex')) }}</span></transition>
                        </div>
                        <div class="form_group select">
                            <label for="shoe_size">Shoe Size (US Sizes) <span>*</span></label>
                            <div class="select">
                                <select class="input_select" name="shoe_size" v-model="profileOverview.shoe_size" v-validate="'required'">
                                    <option value="" selected disabled>Please select a shoe size</option>
                                    <option :value="size" v-for="(size, index) in sizes">{{ size }}</option>
                                </select>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.shoe_size')">{{ properFormat(errors.first('profile_overview_form.shoe_size')) }}</span></transition>
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
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.what_do_you_do')">{{ properFormat(errors.first('profile_overview_form.what_do_you_do')) }}</span></transition>
                        </div>
                        <div class="form_group weight">
                            <label for="weight">Weight <span>*</span></label>
                            <div class="weight_input">
                                <input type="text" name="weight" autocomplete="off" class="input_text" v-model="profileOverview.weight" v-validate="'required|numeric|min_value:1|max_value:200'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('profile_overview_form.weight')">{{ properFormat(errors.first('profile_overview_form.weight')) }}</span></transition>
                            </div>
                        </div>
                    </div>
                    <div class="form_button">
                        <nuxt-link to="/my-profile" class="default_btn_red">Cancel</nuxt-link>
                        <button type="submit" class="default_btn ml">Save Changes</button>
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
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_line_1')">{{ properFormat(errors.first('address_form.home_address_line_1')) }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="home_address_line_2">Address Line 2 <b>(Optional)</b></label>
                            <input name="home_address_line_2" placeholder="Enter your address line 2" class="input_text" v-validate="{regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="address.home_address_line_2"/>
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
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_country')">{{ properFormat(errors.first('address_form.home_address_country')) }}</span></transition>
                            </div>
                            <div class="form_group select">
                                <label for="home_address_state">State <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="home_address_state" v-model="address.home_address_state" v-validate="'required'">
                                        <option value="0" selected disabled>Choose a State</option>
                                        <option :value="state.id" v-for="(state, key) in pa_states" :key="key">{{ state.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_state')">{{ properFormat(errors.first('address_form.home_address_state')) }}</span></transition>
                            </div>
                        </div>
                        <div class="form_flex">
                            <div class="form_group">
                                <label for="home_address_city">City <span>*</span></label>
                                <input type="text" name="home_address_city" autocomplete="off" :class="`input_text ${(address.home_address_state != '') ? '' : 'disabled'}`" v-model="address.home_address_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_city')">{{ properFormat(errors.first('address_form.home_address_city')) }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="home_address_zip_code">Zip Code <span>*</span></label>
                                <input type="text" name="home_address_zip_code" autocomplete="off" :class="`input_text ${(address.home_address_state != '') ? '' : 'disabled'}`" v-model="address.home_address_zip_code" placeholder="Enter your zip code" v-validate="{required: true, numeric: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.home_address_zip_code')">{{ properFormat(errors.first('address_form.home_address_zip_code')) }}</span></transition>
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
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_line_1')">{{ properFormat(errors.first('address_form.billing_address_line_1')) }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="billing_address_line_2">Address Line 2 <b>(Optional)</b></label>
                            <input name="billing_address_line_2" placeholder="Enter your address line 2" class="input_text" v-validate="{regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 300}" v-model="address.billing_address_line_2"/>
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
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_country')">{{ properFormat(errors.first('address_form.billing_address_country')) }}</span></transition>
                            </div>
                            <div class="form_group select">
                                <label for="billing_address_state">State <span>*</span></label>
                                <div class="select">
                                    <select class="input_select" name="billing_address_state" v-model="address.billing_address_state" v-validate="'required'">
                                        <option value="0" selected disabled>Choose a State</option>
                                        <option :value="state.id" v-for="(state, key) in ba_states" :key="key">{{ state.name }}</option>
                                    </select>
                                </div>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_state')">{{ properFormat(errors.first('address_form.billing_address_state')) }}</span></transition>
                            </div>
                        </div>
                        <div class="form_flex">
                            <div class="form_group">
                                <label for="billing_address_city">City <span>*</span></label>
                                <input type="text" name="billing_address_city" autocomplete="off" :class="`input_text ${(address.billing_address_state != '') ? '' : 'disabled'}`" v-model="address.billing_address_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_city')">{{ properFormat(errors.first('address_form.billing_address_city')) }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="billing_address_zip_code">Zip Code <span>*</span></label>
                                <input type="text" name="billing_address_zip_code" autocomplete="off" :class="`input_text ${(address.billing_address_state != '') ? '' : 'disabled'}`" v-model="address.billing_address_zip_code" placeholder="Enter your zip code" v-validate="{required: true, numeric: true}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address_zip_code')">{{ properFormat(errors.first('address_form.billing_address_zip_code')) }}</span></transition>
                            </div>
                        </div>
                    </div>
                    <div class="form_button">
                        <nuxt-link to="/my-profile" class="default_btn_red">Cancel</nuxt-link>
                        <button type="submit" class="default_btn ml">Save Changes</button>
                    </div>
                </form>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_2" class="card wrapper" v-if="category == 'card'">
                <div class="cards">
                    <div class="ci_header">
                        Paymaya
                    </div>
                    <div class="card_item" v-for="(data, key) in populateCards" v-if="cards.length > 0">
                        <div class="overlay">
                            <div class="ci_dot" :class="{ 'toggled': data.toggled }" @click="toggleDot(data, key)"></div>
                            <transition name="slideAlt">
                                <ul class="menu_dot_list" v-if="data.toggled" v-click-outside="closeDot">
                                    <li class="menu_dot_item">Set as Default</li>
                                    <li class="menu_dot_item red">Delete Card</li>
                                </ul>
                            </transition>
                        </div>
                        <div class="c_type" v-html="cardType(data)"></div>
                        <div class="c_number">
                            **** **** **** {{ data.last_digit }}
                        </div>
                        <div class="c_date">Exp. {{ data.exp_month }}/{{ $moment(data.exp_year, 'YYYY').format('YY') }}</div>
                        <div class="c_default">
                            <div class="d_status" v-if="data.default">Default</div>
                        </div>
                    </div>
                    <div class="no_results" v-if="cards.length == 0">
                        <div class="text">You don't have any cards.</div>
                        <div class="default_btn nmt" @click="addPaymayaCard()">Add Paymaya Card</div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_3" class="accounts wrapper" v-if="category == 'account-settings'">
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
            <add-card v-if="add_card" />
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
    import AddCard from './modals/AddCard'
    import ChangePassword from './modals/ChangePassword'
    import BuyRidesPrompt from './modals/BuyRidesPrompt'
    export default {
        components: {
            AddCard,
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
                ctr: 0,
                res: [],
                sizes: [],
                message: '',
                add_card: false,
                loaded: false,
                previewImage: false,
                subscribed: true,
                copied: false,
                height: 0,
                unique: 0,
                card_unique: 0,
                cards: [

                ],
                profileOverview: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    birth_date: '',
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
            populateCards () {
                const me = this
                let result = []
                for (let i = 0, len = me.cards.length; i < len; i++) {
                    result.push(me.cards[i])
                }
                return result
            }
        },
        methods: {
            addPaymayaCard () {
                const me = this
                me.add_card = true
            },
            toggleDot (data, unique = null) {
                const me = this
                me.closeDot()
                if (unique != null) {
                    me.card_unique = unique
                }
                data.toggled = true
            },
            closeDot () {
                const me = this
                if (me.card_unique != null) {
                    me.cards[me.card_unique].toggled = false
                }
            },
            cardType (data) {
                const me = this
                let card_type = ''

                switch (data.type) {
                    case 'visa':
                        card_type = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="19" viewBox="0 0 60 19"> <g fill="none" fill-rule="evenodd"> <g fill-rule="nonzero"> <g> <g> <g> <path fill="#3C58BF" d="M21.6 17.462L24.592 0.631 29.268 0.631 26.369 17.462z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#293688" d="M21.6 17.462L25.434 0.631 29.268 0.631 26.369 17.462z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#3C58BF" d="M43.294.818C42.358.444 40.862.07 38.992.07c-4.675 0-8.041 2.338-8.041 5.704 0 2.525 2.337 3.834 4.207 4.675 1.87.842 2.432 1.403 2.432 2.151 0 1.122-1.496 1.683-2.806 1.683-1.87 0-2.898-.28-4.488-.935l-.654-.28-.655 3.833c1.122.468 3.18.935 5.33.935 4.956 0 8.228-2.337 8.228-5.89 0-1.964-1.215-3.46-4.02-4.676-1.683-.841-2.712-1.309-2.712-2.15 0-.749.842-1.497 2.712-1.497 1.59 0 2.711.28 3.553.655l.467.187.749-3.647z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#293688" d="M43.294.818C42.358.444 40.862.07 38.992.07c-4.675 0-7.2 2.338-7.2 5.704 0 2.525 1.496 3.834 3.366 4.675 1.87.842 2.432 1.403 2.432 2.151 0 1.122-1.496 1.683-2.806 1.683-1.87 0-2.898-.28-4.488-.935l-.654-.28-.655 3.833c1.122.468 3.18.935 5.33.935 4.956 0 8.228-2.337 8.228-5.89 0-1.964-1.215-3.46-4.02-4.676-1.683-.841-2.712-1.309-2.712-2.15 0-.749.842-1.497 2.712-1.497 1.59 0 2.711.28 3.553.655l.467.187.749-3.647z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#3C58BF" d="M51.335.631c-1.122 0-1.964.094-2.431 1.216L41.89 17.462h5.05l.934-2.805h5.985l.56 2.805h4.49L54.981.632h-3.647zm-2.15 11.22c.28-.84 1.87-4.955 1.87-4.955s.374-1.028.654-1.683l.28 1.59s.936 4.207 1.123 5.142h-3.928v-.093z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#293688" d="M52.457.631c-1.122 0-1.963.094-2.431 1.216l-8.135 15.615h5.05l.934-2.805h5.985l.56 2.805h4.49L54.981.632h-2.525zm-3.273 11.22c.374-.934 1.87-4.955 1.87-4.955s.375-1.028.655-1.683l.28 1.59s.936 4.207 1.123 5.142h-3.928v-.093z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#3C58BF" d="M12.997 12.413l-.467-2.431c-.842-2.805-3.553-5.891-6.546-7.387l4.208 14.96h5.05L22.816.726h-5.05l-4.769 11.688z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#293688" d="M12.997 12.413l-.467-2.431c-.842-2.805-3.553-5.891-6.546-7.387l4.208 14.96h5.05L22.816.726H18.7l-5.704 11.688z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#FFBC00" d="M0 .631l.842.187C6.826 2.221 10.94 5.774 12.53 9.982l-1.683-7.948C10.567.912 9.725.63 8.697.63H0z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#F7981D" d="M0 .631c5.984 1.403 10.94 5.05 12.53 9.257L10.94 3.25c-.28-1.122-1.215-1.776-2.244-1.776L0 .63z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#ED7C00" d="M0 .631c5.984 1.403 10.94 5.05 12.53 9.257l-1.122-3.646c-.28-1.123-.655-2.245-1.964-2.712L0 .63z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <g fill="#051244"> <path d="M11.595 9.397l-3.18-3.179L6.92 9.771l-.374-2.337C5.704 4.629 2.992 1.543 0 .047l4.208 14.96h5.05l2.337-5.61zM20.291 15.008L16.27 10.894 15.522 15.008zM31.044 9.21c.374.374.561.655.468 1.029 0 1.122-1.496 1.683-2.806 1.683-1.87 0-2.898-.28-4.488-.935l-.654-.28-.655 3.833c1.122.468 3.18.935 5.33.935 2.992 0 5.423-.841 6.826-2.337l-4.02-3.928zM36.468 15.008h4.394l.935-2.805h5.985l.56 2.805h4.49l-1.59-6.826-5.61-5.424.28 1.497s.935 4.207 1.122 5.142h-3.928c.375-.935 1.87-4.955 1.87-4.955s.375-1.029.655-1.684" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41) translate(6.078 2.455)"/> </g> </g> </g> </g> </g> </g> </svg>'
                        break
                    case 'master-card':
                        card_type = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="32" viewBox="0 0 50 32"> <g fill="none" fill-rule="evenodd"> <g fill-rule="nonzero"> <g> <g> <g> <g transform="translate(-212 -511) translate(146 300) translate(43 146) translate(0 33) translate(23 32)"> <circle cx="15.4" cy="16.131" r="15.273" fill="#EE0005"/> <circle cx="34.376" cy="16.131" r="15.273" fill="#F9A000"/> <path fill="#FF6300" d="M19.103 16.13c0 4.85 2.26 9.171 5.785 11.969 3.525-2.798 5.786-7.119 5.786-11.968 0-4.85-2.261-9.171-5.786-11.969-3.524 2.798-5.785 7.12-5.785 11.969z"/> </g> </g> </g> </g> </g> </g> </svg>'
                        break
                }

                return card_type
            },
            getSizes () {
                const me = this
                me.sizes = []
                let ctr = (me.profileOverview.sex == 'M') ? 6 : 4
                let cap = (me.profileOverview.sex == 'M') ? 17 : 18
                for (let i = 0; i < cap; i++) {
                    me.sizes.push(ctr)
                    if (me.profileOverview.sex == 'M' && i > 11) {
                        ctr += 1
                    } else {
                        ctr += 0.5
                    }
                }
            },
            inputDate (event) {
                const me = this
                me.profileOverview.birth_date = me.parseInputToDate(event.target.value)
            },
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
            viewImage (imageUrl) {
                const me = this
                me.$store.state.viewImageUrl = imageUrl
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
                let interval = setInterval( () => {
                    if (document.getElementById(`tab_${me.unique}`)) {
                        me.height = document.getElementById(`tab_${me.unique}`).scrollHeight
                    }
                    me.ctr++
                }, 500)
                if (me.ctr > 0) {
                    clearInterval(interval)
                }
            },
            toggleSubscribe () {
                const me = this
                let value
                let token = me.$cookies.get('70hokc3hhhn5')
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
                        let token = me.$cookies.get('70hokc3hhhn5')
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
                        let token = me.$cookies.get('70hokc3hhhn5')
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
            },
            initialization () {
                const me = this
                let token = me.$cookies.get('70hokc3hhhn5')
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
                        me.getSizes()
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

                        me.$axios.get('api/paymaya/cards', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            console.log(res.data);
                        })
                        
                        setTimeout( () => {
                            me.loaded = true
                        }, 500)
                    }
                }).catch((err) => {
                    me.$store.state.loginSignUpStatus = true
                    document.body.classList.add('no_scroll')
                    me.$nuxt.error({ statusCode: 403, message: 'Something Went Wrong' })
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        },
        mounted () {
            const me = this
            me.getHeight()
            me.initialization()
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
