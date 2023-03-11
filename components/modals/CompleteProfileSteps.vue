<template>
  <div
    :class="
      `${height > 200 ? 'sticky' : ''} login_sign_up ${
        $route.fullPath == '/' ? 'front' : 'not_front'
      } mobile`
    "
  >
    <section id="login" class="alt">
      <div class="steps">
        <ul>
          <li
            :class="
              `overlay ${
                completeProfileStep == 1 ||
                completeProfileStep == 2 ||
                completeProfileStep == 3 ||
                completeProfileStep == 4
                  ? 'active'
                  : ''
              }`
            "
          >
            <div class="count">
              1
            </div>
          </li>
          <li
            :class="
              `overlay ${
                completeProfileStep == 2 ||
                completeProfileStep == 3 ||
                completeProfileStep == 4
                  ? 'active'
                  : ''
              }`
            "
          >
            <div class="count">
              2
            </div>
          </li>
          <li
            :class="
              `overlay ${
                completeProfileStep == 3 || completeProfileStep == 4
                  ? 'active'
                  : ''
              }`
            "
          >
            <div class="count">
              3
            </div>
          </li>
          <li :class="`overlay ${completeProfileStep == 4 ? 'active' : ''}`">
            <div class="count">
              4
            </div>
          </li>
        </ul>
      </div>
      <form
        id="step_1_form"
        data-vv-scope="complete_profile_form"
        v-show="completeProfileStep == 1"
        enctype="multipart/form-data"
      >
        <div
          id="default_form"
          :class="`${completeProfileStep == 1 ? 'fade_in' : 'fade_out'}`"
        >
          <div class="sign_up_header alt">
            <h2 class="title">Complete your profile</h2>
          </div>
          <div class="form_flex_image" v-if="!$route.query.token">
            <label class="main_label">Profile Picture</label>
            <div class="flex_image">
              <input
                type="file"
                class="input_image"
                id="image"
                name="image[]"
                @change="getFile($event)"
                v-validate="'image|ext:jpeg,jpg,png|size:20000'"
              />
              <input type="hidden" name="image_id[]" value="0" />
              <transition name="slide">
                <span
                  class="validation_errors"
                  v-if="errors.has('complete_profile_form.image[]')"
                >
                  Only .jpg, .jpeg and .png files accepted
                </span>
              </transition>
              <label class="input_image_label" for="image">
                <div class="label">
                  Upload
                </div>
                <transition name="fade">
                  <div
                    class="preview_flex_image_wrapper"
                    id="preview_flex_image_wrapper"
                    v-if="previewImage"
                  >
                    <div class="preview">
                      <img id="preview_image" src="" />
                    </div>
                  </div>
                </transition>
              </label>
            </div>
          </div>
          <div class="form_group">
            <label for="contact_number">
              Contact Number
              <span>*</span>
            </label>
            <input
              type="text"
              name="contact_number"
              autocomplete="off"
              v-model="completeProfile.contact_number"
              placeholder="Enter your contact number"
              class="input_text"
              v-validate="'required|numeric|min:7|max:11'"
            />
            <transition name="slide">
              <span
                class="validation_errors"
                v-if="errors.has('complete_profile_form.contact_number')"
              >
                {{
                  properFormat(
                    errors.first('complete_profile_form.contact_number')
                  )
                }}
              </span>
            </transition>
          </div>
          <div class="form_flex radio">
            <label>
              Sex
              <span>*</span>
            </label>
            <div class="form_radio">
              <input
                type="radio"
                id="female"
                value="F"
                name="sex"
                class="input_radio"
                v-validate="'required'"
                v-model="completeProfile.sex"
              />
              <label for="female">Female</label>
            </div>
            <div class="form_radio">
              <input
                type="radio"
                id="male"
                value="M"
                name="sex"
                class="input_radio"
                v-validate="'required'"
                v-model="completeProfile.sex"
              />
              <label for="male">Male</label>
            </div>
            <transition name="slide">
              <span
                class="validation_errors"
                v-if="errors.has('complete_profile_form.sex')"
              >
                {{ properFormat(errors.first('complete_profile_form.sex')) }}
              </span>
            </transition>
          </div>
          <div class="form_group">
            <label for="birth_date">
              Birth Date
              <span>*</span>
            </label>
            <input
              type="text"
              name="birth_date"
              autocomplete="off"
              maxlength="10"
              class="input_text"
              v-model="completeProfile.birth_date"
              @keyup="inputDate($event)"
              placeholder="YYYY-MM-DD"
              v-validate="{
                required: true,
                max: 10,
                date_format: 'yyyy-MM-dd'
              }"
            />
            <transition name="slide">
              <span
                class="validation_errors"
                v-if="errors.has('complete_profile_form.birth_date')"
              >
                The Birth Date must be in the format YYYY-MM-DD
              </span>
            </transition>
          </div>
          <div class="form_group select">
            <label for="shoe_size">
              Shoe Size (US Sizes)
              <span>*</span>
            </label>
            <div class="select">
              <select
                class="input_select"
                name="shoe_size"
                v-validate="'required'"
              >
                <option value="" selected disabled>
                  Please select a shoe size
                </option>
                <option :value="size" v-for="(size, key) in sizes" :key="key">
                  {{ size }}
                </option>
              </select>
            </div>
            <transition name="slide">
              <span
                class="validation_errors"
                v-if="errors.has('complete_profile_form.shoe_size')"
              >
                {{
                  properFormat(errors.first('complete_profile_form.shoe_size'))
                }}
              </span>
            </transition>
          </div>
          <div class="form_group select">
            <label for="dumbbells">
              Dumbbells
              <span>*</span>
            </label>
            <div class="select">
              <select
                class="input_select"
                name="dumbbells"
                v-validate="'required'"
              >
                <option value="" selected disabled>
                  Please select a dumbbell
                </option>
                <option
                  :value="dumbbell"
                  v-for="(dumbbell, key) in dumbbells"
                  :key="key"
                >
                  {{ dumbbell }}
                </option>
              </select>
            </div>
            <transition name="slide">
              <span
                class="validation_errors"
                v-if="errors.has('complete_profile_form.dumbbells')"
              >
                {{
                  properFormat(errors.first('complete_profile_form.dumbbells'))
                }}
              </span>
            </transition>
          </div>
          <div class="form_group weight">
            <label for="weight">
              Weight
              <span>*</span>
            </label>
            <div class="weight_input">
              <input
                type="text"
                name="weight"
                autocomplete="off"
                class="input_text"
                v-validate="'required|numeric|min_value:1|max_value:200'"
              />
              <transition name="slide">
                <span
                  class="validation_errors"
                  v-if="errors.has('complete_profile_form.weight')"
                >
                  {{
                    properFormat(errors.first('complete_profile_form.weight'))
                  }}
                </span>
              </transition>
            </div>
          </div>
          <div class="form_flex sign_up">
            <div class="backa"></div>
            <div class="form_button">
              <button
                type="button"
                class="default_btn full"
                @click="toggleStep('proceed')"
              >
                Looks Good
              </button>
            </div>
          </div>
        </div>
      </form>
      <form
        id="step_2_form"
        data-vv-scope="complete_profile_2_form"
        v-show="completeProfileStep == 2"
      >
        <div
          id="default_form"
          :class="`${completeProfileStep == 2 ? 'fade_in' : 'fade_out'}`"
        >
          <div class="sign_up_header alt">
            <h2 class="title">Keep going!</h2>
          </div>
          <div class="form_main_group alt">
            <div class="form_header">
              <label>Home Address</label>
            </div>
            <div class="form_group">
              <label for="home_address_line_1">
                Address Line 1
                <span>*</span>
              </label>
              <input
                name="home_address_line_1"
                placeholder="Enter your address line 1"
                class="input_text"
                v-validate="{
                  required: true,
                  regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$',
                  max: 300
                }"
                v-model="completeProfile.home_address_line_1"
              />
              <transition name="slide">
                <span
                  class="validation_errors"
                  v-if="
                    errors.has('complete_profile_2_form.home_address_line_1')
                  "
                >
                  {{
                    properFormat(
                      errors.first(
                        'complete_profile_2_form.home_address_line_1'
                      )
                    )
                  }}
                </span>
              </transition>
            </div>
            <div class="form_group">
              <label for="home_address_line_2">
                Address Line 2
                <b>(Optional)</b>
              </label>
              <input
                name="home_address_line_2"
                placeholder="Enter your address line 2"
                class="input_text"
                v-validate="{
                  regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$',
                  max: 300
                }"
                v-model="completeProfile.home_address_line_2"
              />
            </div>
            <div class="form_flex">
              <div class="form_group select">
                <label for="home_address_country">
                  Country
                  <span>*</span>
                </label>
                <div class="select">
                  <select
                    class="input_select"
                    name="home_address_country"
                    v-model="completeProfile.home_address_country"
                    v-validate="'required'"
                    @change="toggleWorld($event, 'state', 'pa')"
                  >
                    <option value="0" selected disabled>
                      Choose a Country
                    </option>
                    <option
                      :value="country.id"
                      v-for="(country, key) in pa_countries"
                      :key="key"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has('complete_profile_2_form.home_address_country')
                    "
                  >
                    {{
                      properFormat(
                        errors.first(
                          'complete_profile_2_form.home_address_country'
                        )
                      )
                    }}
                  </span>
                </transition>
              </div>
              <div class="form_group select">
                <label for="home_address_state">
                  State
                  <span>*</span>
                </label>
                <div class="select">
                  <select
                    class="input_select"
                    name="home_address_state"
                    v-model="completeProfile.home_address_state"
                    v-validate="'required'"
                  >
                    <option value="0" selected disabled>Choose a State</option>
                    <option
                      :value="state.id"
                      v-for="(state, key) in pa_states"
                      :key="key"
                    >
                      {{ state.name }}
                    </option>
                  </select>
                </div>
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has('complete_profile_2_form.home_address_state')
                    "
                  >
                    {{
                      properFormat(
                        errors.first(
                          'complete_profile_2_form.home_address_state'
                        )
                      )
                    }}
                  </span>
                </transition>
              </div>
            </div>
            <div class="form_flex">
              <div class="form_group">
                <label for="home_address_city">
                  City
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="home_address_city"
                  autocomplete="off"
                  :class="
                    `input_text ${
                      completeProfile.home_address_state != '' ? '' : 'disabled'
                    }`
                  "
                  v-model="completeProfile.home_address_city"
                  placeholder="Enter your city"
                  v-validate="{
                    required: true,
                    regex: '^[a-zA-Z!@#$&()\\|\'-`.+,/_ |\u00f1]*$',
                    max: 100
                  }"
                />
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has('complete_profile_2_form.home_address_city')
                    "
                  >
                    {{
                      properFormat(
                        errors.first(
                          'complete_profile_2_form.home_address_city'
                        )
                      )
                    }}
                  </span>
                </transition>
              </div>
              <div class="form_group">
                <label for="home_address_zip_code">
                  Zip Code
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="home_address_zip_code"
                  autocomplete="off"
                  :class="
                    `input_text ${
                      completeProfile.home_address_state != '' ? '' : 'disabled'
                    }`
                  "
                  v-model="completeProfile.home_address_zip_code"
                  placeholder="Enter your zip code"
                  v-validate="{ required: true, numeric: true }"
                />
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has(
                        'complete_profile_2_form.home_address_zip_code'
                      )
                    "
                  >
                    {{
                      properFormat(
                        errors.first(
                          'complete_profile_2_form.home_address_zip_code'
                        )
                      )
                    }}
                  </span>
                </transition>
              </div>
            </div>
          </div>
          <div class="form_flex sign_up">
            <div
              :class="`${$store.state.isMobile ? 'default_btn_blk' : 'back'}`"
              @click="toggleStep('back')"
            >
              Back
            </div>
            <div class="form_button">
              <button
                type="button"
                class="default_btn full"
                @click="toggleStep('proceed')"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
      <form
        id="step_3_form"
        data-vv-scope="complete_profile_3_form"
        v-show="completeProfileStep == 3"
      >
        <div
          id="default_form"
          :class="`${completeProfileStep == 3 ? 'fade_in' : 'fade_out'}`"
        >
          <div class="sign_up_header alt_2">
            <h2 class="title">Almost there!</h2>
          </div>
          <div class="form_main_group alt">
            <div class="form_header">
              <label>Billing Address</label>
            </div>
            <div class="form_group">
              <div class="form_check">
                <input
                  type="checkbox"
                  id="same_as_personal_address"
                  name="same_as_personal_address"
                  class="input_check"
                  @change="copyPersonalAddress((completeProfile.copy ^= true))"
                />
                <label for="same_as_personal_address">
                  Same as Home Address
                </label>
              </div>
            </div>
            <div class="form_group">
              <label for="billing_address_line_1">
                Address
                <span>*</span>
              </label>
              <input
                name="billing_address_line_1"
                placeholder="Enter your address line 1"
                class="input_text"
                v-validate="{
                  required: true,
                  regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$',
                  max: 300
                }"
                v-model="completeProfile.billing_address_line_1"
              />
              <transition name="slide">
                <span
                  class="validation_errors"
                  v-if="
                    errors.has('complete_profile_3_form.billing_address_line_1')
                  "
                >
                  {{
                    properFormat(
                      errors.first(
                        'complete_profile_3_form.billing_address_line_1'
                      )
                    )
                  }}
                </span>
              </transition>
            </div>
            <div class="form_group">
              <label for="billing_address_line_2">
                Address
                <b>(Optional)</b>
              </label>
              <input
                name="billing_address_line_2"
                placeholder="Enter your address line 2"
                class="input_text"
                v-validate="{
                  regex: '^[a-zA-Z0-9!@#$&()\\|\'-`.+,/_ |\u00f1]*$',
                  max: 300
                }"
                v-model="completeProfile.billing_address_line_2"
              />
            </div>
            <div class="form_flex">
              <div class="form_group select">
                <label for="billing_address_country">
                  Country
                  <span>*</span>
                </label>
                <div class="select">
                  <select
                    class="input_select"
                    name="billing_address_country"
                    v-model="completeProfile.billing_address_country"
                    v-validate="'required'"
                    @change="toggleWorld($event, 'state', 'ba')"
                  >
                    <option value="0" selected disabled>
                      Choose a Country
                    </option>
                    <option
                      :value="country.id"
                      v-for="(country, key) in ba_countries"
                      :key="key"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has(
                        'complete_profile_3_form.billing_address_country'
                      )
                    "
                  >
                    {{
                      properFormat(
                        errors.first(
                          'complete_profile_3_form.billing_address_country'
                        )
                      )
                    }}
                  </span>
                </transition>
              </div>
              <div class="form_group select">
                <label for="billing_address_state">
                  State
                  <span>*</span>
                </label>
                <div class="select">
                  <select
                    class="input_select"
                    name="billing_address_state"
                    v-model="completeProfile.billing_address_state"
                    v-validate="'required'"
                  >
                    <option value="0" selected disabled>Choose a State</option>
                    <option
                      :value="state.id"
                      v-for="(state, key) in ba_states"
                      :key="key"
                    >
                      {{ state.name }}
                    </option>
                  </select>
                </div>
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has(
                        'complete_profile_3_form.billing_address_state'
                      )
                    "
                  >
                    {{
                      properFormat(
                        errors.first(
                          'complete_profile_3_form.billing_address_state'
                        )
                      )
                    }}
                  </span>
                </transition>
              </div>
            </div>
            <div class="form_flex">
              <div class="form_group">
                <label for="billing_address_city">
                  City
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="billing_address_city"
                  autocomplete="off"
                  :class="
                    `input_text ${
                      completeProfile.billing_address_state != ''
                        ? ''
                        : 'disabled'
                    }`
                  "
                  v-model="completeProfile.billing_address_city"
                  placeholder="Enter your city"
                  v-validate="{
                    required: true,
                    regex: '^[a-zA-Z!@#$&()\\|\'-`.+,/_ |\u00f1]*$',
                    max: 100
                  }"
                />
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has('complete_profile_3_form.billing_address_city')
                    "
                  >
                    {{
                      properFormat(
                        errors.first(
                          'complete_profile_3_form.billing_address_city'
                        )
                      )
                    }}
                  </span>
                </transition>
              </div>
              <div class="form_group">
                <label for="billing_address_zip_code">
                  Zip Code
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="billing_address_zip_code"
                  autocomplete="off"
                  :class="
                    `input_text ${
                      completeProfile.billing_address_state != ''
                        ? ''
                        : 'disabled'
                    }`
                  "
                  v-model="completeProfile.billing_address_zip_code"
                  placeholder="Enter your zip code"
                  v-validate="{ required: true, numeric: true }"
                />
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has(
                        'complete_profile_3_form.billing_address_zip_code'
                      )
                    "
                  >
                    {{
                      properFormat(
                        errors.first(
                          'complete_profile_3_form.billing_address_zip_code'
                        )
                      )
                    }}
                  </span>
                </transition>
              </div>
            </div>
          </div>
          <div class="form_flex sign_up">
            <div
              :class="`${$store.state.isMobile ? 'default_btn_blk' : 'back'}`"
              @click="toggleStep('back')"
            >
              Back
            </div>
            <div class="form_button">
              <button
                type="button"
                class="default_btn full"
                @click="toggleStep('proceed')"
              >
                One last thing
              </button>
            </div>
          </div>
        </div>
      </form>
      <form
        id="step_4_form"
        data-vv-scope="complete_profile_4_form"
        v-show="completeProfileStep == 4"
      >
        <div
          id="default_form"
          :class="`${completeProfileStep == 4 ? 'fade_in' : 'fade_out'}`"
        >
          <div class="sign_up_header alt_2">
            <h2 class="title">
              One last thing, please sign our health waiver.
            </h2>
          </div>
          <div class="form_main_group">
            <div class="form_group">
              <transition name="slide">
                <span class="validation_errors" v-if="error">
                  Please choose yes or no
                </span>
              </transition>
              <div
                class="form_flex_radio_alternate"
                v-for="(history, key) in histories"
                :key="key"
              >
                <label>{{ history.title }}</label>
                <div class="radio_wrapper">
                  <div class="form_radio">
                    <input
                      type="radio"
                      :id="`history_${key}_yes`"
                      value="Yes"
                      :name="`history_${key}`"
                      class="action_radio"
                      @change="toggleMedical(key, 1)"
                    />
                    <label :for="`history_${key}_yes`">Yes</label>
                  </div>
                  <div class="form_radio">
                    <input
                      type="radio"
                      :id="`history_${key}_no`"
                      value="No"
                      :name="`history_${key}`"
                      class="action_radio"
                      @change="toggleMedical(key, 0)"
                    />
                    <label :for="`history_${key}_no`">No</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form_group" v-if="has_yes">
              <label for="elaborate">
                If you have marked YES to any of the above, please elaborate
                below:
              </label>
              <textarea
                name="elaborate"
                autocomplete="off"
                key="elaborate"
                class="input_text"
                rows="4"
                v-validate="{ required: checkMedicalHistory }"
              ></textarea>
              <transition name="slide">
                <span
                  class="validation_errors"
                  v-if="errors.has('complete_profile_4_form.elaborate')"
                >
                  {{
                    properFormat(
                      errors.first('complete_profile_4_form.elaborate')
                    )
                  }}
                </span>
              </transition>
            </div>
          </div>
          <div class="form_main_group alt">
            <div class="form_header">
              <label>Emergency Contact</label>
            </div>
            <div class="form_group">
              <label for="emergency_contact_full_name">
                Full Name
                <span>*</span>
              </label>
              <input
                type="text"
                name="emergency_contact_full_name"
                autocomplete="off"
                class="input_text"
                placeholder="Enter emergency contact full name"
                v-validate="{
                  required: true,
                  regex: '^[a-zA-Z-._ |\u00f1]*$',
                  max: 100
                }"
              />
              <transition name="slide">
                <span
                  class="validation_errors"
                  v-if="
                    errors.has(
                      'complete_profile_4_form.emergency_contact_full_name'
                    )
                  "
                >
                  {{
                    properFormat(
                      errors.first(
                        'complete_profile_4_form.emergency_contact_full_name'
                      )
                    )
                  }}
                </span>
              </transition>
            </div>
            <div class="form_group">
              <label for="emergency_contact_phone_number">
                Phone Number
                <span>*</span>
              </label>
              <input
                type="text"
                name="emergency_contact_phone_number"
                autocomplete="off"
                placeholder="Enter emergency contact phone number"
                class="input_text"
                v-validate="'required|numeric|min:7|max:11'"
              />
              <transition name="slide">
                <span
                  class="validation_errors"
                  v-if="
                    errors.has(
                      'complete_profile_4_form.emergency_contact_phone_number'
                    )
                  "
                >
                  {{
                    properFormat(
                      errors.first(
                        'complete_profile_4_form.emergency_contact_phone_number'
                      )
                    )
                  }}
                </span>
              </transition>
            </div>
            <div class="form_group">
              <label for="emergency_contact_relationship">
                Relationship
                <span>*</span>
              </label>
              <input
                type="text"
                name="emergency_contact_relationship"
                autocomplete="off"
                class="input_text"
                placeholder="Enter emergency contact relationship"
                v-validate="{
                  required: true,
                  regex: '^[a-zA-Z-._ |\u00f1]*$',
                  max: 100
                }"
              />
              <transition name="slide">
                <span
                  class="validation_errors"
                  v-if="
                    errors.has(
                      'complete_profile_4_form.emergency_contact_relationship'
                    )
                  "
                >
                  {{
                    properFormat(
                      errors.first(
                        'complete_profile_4_form.emergency_contact_relationship'
                      )
                    )
                  }}
                </span>
              </transition>
            </div>
            <div class="form_group read">
              <div class="form_group_body" v-html="terms.subtitle"></div>
              <!-- <transition name="slide"><span class="validation_errors" v-if="!hasReadTerms">Read first before proceeding.</span></transition> -->
            </div>
            <div class="form_group">
              <div :class="`form_check ${!hasReadTerms ? 'disabled' : ''}`">
                <input
                  type="checkbox"
                  id="i_agree"
                  name="i_agree"
                  class="input_check"
                  v-validate="'required'"
                />
                <label for="i_agree" class="alt">
                  I acknowledge and fully understand the
                  <a target="_blank" href="/terms-and-conditions">
                    Terms &amp; Conditions
                  </a>
                  stated above and that all information stated above are true.
                </label>
                <transition name="slide">
                  <span
                    class="validation_errors"
                    v-if="
                      errors.has('complete_profile_4_form.i_agree') &&
                        hasReadTerms
                    "
                  >
                    {{
                      properFormat(
                        errors.first('complete_profile_4_form.i_agree')
                      )
                    }}
                  </span>
                </transition>
              </div>
            </div>
            <div class="form_group">
              <div class="form_check">
                <input
                  type="checkbox"
                  id="email_waiver"
                  v-model="email_waiver"
                  class="input_check"
                />
                <label for="email_waiver" class="alt">Email me my Waiver</label>
              </div>
            </div>
          </div>
          <div class="form_flex sign_up">
            <div
              :class="`${$store.state.isMobile ? 'default_btn_blk' : 'back'}`"
              @click="toggleStep('back')"
            >
              Back
            </div>
            <div class="form_button">
              <button
                type="button"
                class="default_btn full"
                @click="toggleStep('submit')"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        previewImage: false,
        height: 0,
        email_waiver: 0,
        completeProfileStep: 1,
        completeProfile: {
          birth_date: '',
          contact_number: '',
          sex: '',
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
        terms: '',
        has_yes: false,
        histories: [],
        error: false,
        hasReadTerms: true,
        user: [],
        pa_countries: [],
        pa_states: [],
        ba_countries: [],
        ba_states: [],
        sizes: [],
        dumbbells: ['1LB', '2LBS', '3LBS', '5LBS']
      }
    },
    computed: {
      checkMedicalHistory() {
        const me = this
        let ctr = 0
        me.completeProfile.medical_history = me.histories
        me.completeProfile.medical_history.forEach((history, index) => {
          if (history.value == 1) {
            ctr++
          }
        })
        if (ctr > 0) {
          me.has_yes = true
          return true
        } else {
          me.has_yes = false
          return false
        }
      }
    },
    methods: {
      inputDate(event) {
        const me = this
        me.completeProfile.birth_date = me.parseInputToDate(event.target.value)
      },
      getSizes() {
        const me = this
        me.sizes = []
        let ctr = me.completeProfile.sex == 'M' ? 6 : 4
        let cap = me.completeProfile.sex == 'M' ? 17 : 18
        for (let i = 0; i < cap; i++) {
          me.sizes.push(ctr)
          if (me.completeProfile.sex == 'M' && i > 11) {
            ctr += 1
          } else {
            ctr += 0.5
          }
        }
      },
      toggleMedical(key, status) {
        const me = this
        let ctr = 0
        me.completeProfile.medical_history = me.histories
        me.completeProfile.medical_history[key].value = status
        me.completeProfile.medical_history[key].checked = true
        me.histories.forEach(history => {
          if (history.checked) {
            ctr++
          }
        })
        if (me.error) {
          if (ctr == me.histories.length) {
            me.error = false
          }
        }
        me.checkMedicalHistory
      },
      toggleWorld(event, type, category) {
        const me = this
        let country_id =
          category == 'pa'
            ? me.completeProfile.home_address_country
            : me.completeProfile.billing_address_country
        me.loader(true)
        switch (type) {
          case 'state':
            me.$axios
              .get(`api/world/states?country_id=${country_id}`)
              .then(res => {
                if (category == 'pa') {
                  me.pa_states = res.data.states
                } else {
                  me.ba_states = res.data.states
                }
                setTimeout(() => {
                  me.loader(false)
                }, 500)
              })
            break
        }
      },
      copyPersonalAddress(status) {
        const me = this
        if (status) {
          me.completeProfile.billing_address_line_1 =
            me.completeProfile.home_address_line_1
          me.completeProfile.billing_address_line_2 =
            me.completeProfile.home_address_line_2
          me.completeProfile.billing_address_country =
            me.completeProfile.home_address_country
          me.completeProfile.billing_address_state =
            me.completeProfile.home_address_state
          me.completeProfile.billing_address_city =
            me.completeProfile.home_address_city
          me.completeProfile.billing_address_zip_code =
            me.completeProfile.home_address_zip_code
        } else {
          me.completeProfile.billing_address_line_1 = ''
          me.completeProfile.billing_address_line_2 = ''
          me.completeProfile.billing_address_country = 174
          me.completeProfile.billing_address_state = 0
          me.completeProfile.billing_address_city = ''
          me.completeProfile.billing_address_zip_code = ''
        }
      },
      getFile(event) {
        const me = this
        let element = event.target
        if (element.files[0]) {
          me.previewImage = true
        } else {
          me.previewImage = false
        }
        if (element.files && element.files[0]) {
          let reader = new FileReader()
          reader.onload = function() {
            let image = document.getElementById('preview_image')
            image.src = reader.result
          }
          reader.readAsDataURL(element.files[0])
        } else {
          let image = document.getElementById('preview_image')
          image.src = ''
        }
      },
      toggleStep(status) {
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
                    container: '.login_sign_up',
                    offset: -250
                  })
                }
              })
            } else if (me.completeProfileStep == 2) {
              me.$validator
                .validateAll('complete_profile_2_form')
                .then(valid => {
                  if (valid) {
                    me.completeProfileStep = 3
                  } else {
                    me.$scrollTo('.validation_errors', {
                      container: '.login_sign_up',
                      offset: -250
                    })
                  }
                })
            } else if (me.completeProfileStep == 3) {
              me.$validator
                .validateAll('complete_profile_3_form')
                .then(valid => {
                  if (valid) {
                    me.completeProfileStep = 4
                  } else {
                    me.$scrollTo('.validation_errors', {
                      container: '.login_sign_up',
                      offset: -250
                    })
                  }
                })
            }
            break
          case 'submit':
            if (
              me.completeProfile.medical_history.length == me.histories.length
            ) {
              me.error = false
            } else {
              me.error = true
            }
            me.$validator.validateAll('complete_profile_4_form').then(valid => {
              if (valid) {
                me.loader(true)
                let token =
                  me.$route.query.token != null
                    ? me.$route.query.token
                    : me.$cookies.get('70hokc3hhhn5')
                let formData1 = new FormData(
                  document.getElementById('step_1_form')
                )
                let formData2 = new FormData(
                  document.getElementById('step_2_form')
                )
                let formData3 = new FormData(
                  document.getElementById('step_3_form')
                )
                let formData4 = new FormData(
                  document.getElementById('step_4_form')
                )
                formData1.append(
                  'step_2',
                  JSON.stringify(Object.fromEntries(formData2))
                )
                formData1.append(
                  'step_3',
                  JSON.stringify(Object.fromEntries(formData3))
                )
                formData1.append(
                  'health_waiver',
                  JSON.stringify(Object.fromEntries(formData4))
                )
                formData1.append(
                  'medical_history',
                  JSON.stringify(me.completeProfile.medical_history)
                )
                formData1.append('email_waiver', me.email_waiver ? 1 : 0)
                formData1.append('_method', 'PATCH')

                me.$axios
                  .post('api/user/complete-profile', formData1, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  })
                  .then(res => {
                    me.$store.state.completeProfileSuccessStatus = true
                  })
                  .catch(err => {
                    me.$store.state.errorOverlayPromptStatus = true
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                  })
                  .then(() => {
                    setTimeout(() => {
                      me.loader(false)
                    }, 500)
                  })
              } else {
                me.error = true
                me.$scrollTo('.validation_errors', {
                  container: '.login_sign_up',
                  offset: -250
                })
              }
            })
            break
        }
      },
      /**
       * Close login/sign up modal */
      toggleClose() {
        const me = this
        me.$store.state.completeProfileStepsStatus = false
        document.body.classList.remove('no_scroll')
      },
      checkAdvisory() {
        const me = this
        setTimeout(() => {
          if (document.querySelector('.login_sign_up')) {
            let margin = '0px'
            if (me.$store.state.articleAlertStatus) {
              margin = `${document.getElementById('header').offsetHeight +
                document.getElementById('article_alert').offsetHeight}px`
              document.querySelector(
                '.login_sign_up'
              ).style.marginTop = `${document.getElementById('header')
                .offsetHeight +
                document.getElementById('article_alert').offsetHeight}px`
            } else {
              margin = `${document.getElementById('header').offsetHeight}px`
              document.querySelector('.login_sign_up').style.marginTop = `${
                document.getElementById('header').offsetHeight
              }px`
            }
            document.querySelector(
              '.login_sign_up'
            ).style.height = `calc(100vh - ${margin})`
          }
        }, 100)
      },
      /**
       * Detect height of scroll */
      windowLoginScroll() {
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
            me.$axios
              .get(
                `api/world/states?country_id=${me.completeProfile.home_address_country}`
              )
              .then(res => {
                me.pa_states = res.data.states
                me.ba_states = res.data.states
              })
          }
        })
        me.checkAdvisory()
      }
    },
    mounted() {
      const me = this
      let token = me.$cookies.get('70hokc3hhhn5')
      me.loader(true)

      me.$axios.get('api/extras/medical-history-questions').then(res => {
        if (res.data) {
          res.data.medicalHistoryQuestions.forEach((history, index) => {
            history.checked = false
            me.histories.push(history)
          })
        }
      })

      me.$axios.get(`api/web/basic-page?type=health-waiver`).then(res => {
        me.terms = res.data.pageSetting
      })

      me.$axios
        .get('api/check-token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.data) {
            me.user = res.data.user
            me.completeProfile.birth_date =
              me.user.customer_details.co_birthdate
            me.completeProfile.sex = res.data.user.customer_details.co_sex
            me.getSizes()

            setTimeout(() => {
              me.loader(false)
              me.loaded = true
            }, 500)
          }
        })
        .catch(err => {
          me.$store.state.needLogin = true
          me.$store.state.errorOverlayPromptStatus = true
          me.$store.state.errorList = err.response.data.errors
          me.$store.state.errorPromptStatus = true
        })
      me.windowLoginScroll()
    },
    beforeMount() {
      window.addEventListener('load', this.windowLoginScroll)
      window.addEventListener('resize', this.windowLoginScroll)
    },
    beforeDestroy() {
      window.removeEventListener('load', this.windowLoginScroll)
      window.removeEventListener('resize', this.windowLoginScroll)
    }
  }
</script>
