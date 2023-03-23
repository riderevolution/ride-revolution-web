<template>
    <div
        :class="
            `${height > 200 ? 'sticky' : ''} login_sign_up ${
                $route.fullPath == '/' ? 'front' : 'not_front'
            } mobile`
        "
    >
        <section id="login" class="alt">
            <form id="step_4_form" data-vv-scope="complete_profile_4_form">
                <div id="default_form" class="fade_in">
                    <div class="sign_up_header alt_2">
                        <h2 class="title">
                            Please sign our new health waiver.
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
                                            class="action_radio pointer"
                                            @change="toggleMedical(key, 1)"
                                        />
                                        <label :for="`history_${key}_yes`">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form_radio">
                                        <input
                                            type="radio"
                                            :id="`history_${key}_no`"
                                            value="No"
                                            :name="`history_${key}`"
                                            class="action_radio pointer"
                                            @change="toggleMedical(key, 0)"
                                        />
                                        <label :for="`history_${key}_no`">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form_group" v-if="has_yes">
                            <label for="elaborate">
                                If you have marked YES to any of the above,
                                please elaborate below:
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
                                    v-if="
                                        errors.has(
                                            'complete_profile_4_form.elaborate'
                                        )
                                    "
                                >
                                    {{
                                        properFormat(
                                            errors.first(
                                                'complete_profile_4_form.elaborate'
                                            )
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
                                v-model="user.customer_details.ec_full_name"
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
                                v-model="
                                    user.customer_details.ec_contact_number
                                "
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
                                v-model="user.customer_details.ec_relationship"
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
                            <div
                                class="form_group_body"
                                v-html="terms.subtitle"
                            ></div>
                            <!-- <transition name="slide"><span class="validation_errors" v-if="!hasReadTerms">Read first before proceeding.</span></transition> -->
                        </div>
                        <div class="form_group">
                            <div
                                :class="
                                    `form_check ${
                                        !hasReadTerms ? 'disabled' : ''
                                    }`
                                "
                            >
                                <input
                                    type="checkbox"
                                    id="i_agree"
                                    name="i_agree"
                                    class="input_check"
                                    v-validate="'required'"
                                />
                                <label for="i_agree" class="alt">
                                    I acknowledge and fully understand the
                                    <a
                                        target="_blank"
                                        href="/terms-and-conditions"
                                    >
                                        Terms &amp; Conditions
                                    </a>
                                    stated above and that all information stated
                                    above are true.
                                </label>
                                <transition name="slide">
                                    <span
                                        class="validation_errors"
                                        v-if="
                                            errors.has(
                                                'complete_profile_4_form.i_agree'
                                            ) && hasReadTerms
                                        "
                                    >
                                        {{
                                            properFormat(
                                                errors.first(
                                                    'complete_profile_4_form.i_agree'
                                                )
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
                                    class="input_check"
                                    v-model="email_waiver"
                                />
                                <label for="email_waiver" class="alt">
                                    Email me my Waiver
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="form_button">
                            <button
                                type="button"
                                class="default_btn full"
                                @click="toggleStep('submit')"
                            >
                                Update Health Waiver
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
                healthWaiver: {
                    medical_history: [],
                    copy: false
                },
                terms: '',
                has_yes: false,
                histories: [],
                error: false,
                hasReadTerms: true,
                user: {
                    customer_details: {
                        ec_full_name: '',
                        ec_relationship: '',
                        ec_contact_number: ''
                    }
                }
            }
        },
        computed: {
            checkMedicalHistory() {
                const me = this
                let ctr = 0
                me.healthWaiver.medical_history = me.histories
                me.healthWaiver.medical_history.forEach((history, index) => {
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
            toggleMedical(key, status) {
                const me = this
                let ctr = 0
                me.healthWaiver.medical_history = me.histories
                me.healthWaiver.medical_history[key].value = status
                me.healthWaiver.medical_history[key].checked = true
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
                me.checkMedicalHistory
            },
            toggleStep(status) {
                const me = this

                if (
                    me.healthWaiver.medical_history.length ==
                    me.histories.length
                ) {
                    me.error = false
                } else {
                    me.error = true
                }
                me.$validator
                    .validateAll('complete_profile_4_form')
                    .then(valid => {
                        if (valid) {
                            me.loader(true)
                            let token =
                                me.$route.query.token != null
                                    ? me.$route.query.token
                                    : me.$cookies.get('70hokc3hhhn5')
                            let formData = new FormData()
                            let step4Form = new FormData(
                                document.getElementById('step_4_form')
                            )
                            formData.append(
                                'health_waiver',
                                JSON.stringify(Object.fromEntries(step4Form))
                            )
                            formData.append(
                                'medical_history',
                                JSON.stringify(me.healthWaiver.medical_history)
                            )
                            formData.append(
                                'email_waiver',
                                me.email_waiver ? 1 : 0
                            )
                            formData.append('_method', 'PATCH')
                            me.$axios
                                .post('api/user/health-waiver', formData, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                .then(res => {
                                    me.$store.state.healthWaiverSuccess = true
                                })
                                .catch(err => {
                                    me.$store.state.errorOverlayPromptStatus = true
                                    me.$store.state.errorList =
                                        err.response.data.errors
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
            },
            /**
             * Close login/sign up modal */
            toggleClose() {
                const me = this
                me.$store.state.healthWaiver = false
                document.body.classList.remove('no_scroll')
            },
            checkAdvisory() {
                const me = this
                setTimeout(() => {
                    if (document.querySelector('.login_sign_up')) {
                        let margin = '0px'
                        if (me.$store.state.articleAlertStatus) {
                            margin = `${document.getElementById('header')
                                .offsetHeight +
                                document.getElementById('article_alert')
                                    .offsetHeight}px`
                            document.querySelector(
                                '.login_sign_up'
                            ).style.marginTop = `${document.getElementById(
                                'header'
                            ).offsetHeight +
                                document.getElementById('article_alert')
                                    .offsetHeight}px`
                        } else {
                            margin = `${
                                document.getElementById('header').offsetHeight
                            }px`
                            document.querySelector(
                                '.login_sign_up'
                            ).style.marginTop = `${
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
                me.checkAdvisory()
            }
        },
        mounted() {
            const me = this
            document.body.classList.add('no_scroll')
            let token = me.$cookies.get('70hokc3hhhn5')
            me.loader(true)

            me.$axios.get('api/extras/medical-history-questions').then(res => {
                if (res.data) {
                    res.data.medicalHistoryQuestions.forEach(
                        (history, index) => {
                            history.checked = false
                            me.histories.push(history)
                        }
                    )
                }
            })

            me.$axios.get(`api/web/basic-page?type=health-waiver`).then(res => {
                me.terms = res.data.pageSetting
            })

            me.$axios
                .get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: null
                })
                .then(res => {
                    if (res.data) {
                        me.user = res.data.user

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
