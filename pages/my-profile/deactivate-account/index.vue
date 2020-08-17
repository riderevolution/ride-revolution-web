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
                            <input type="radio" id="temporary" value="temporary" name="reason" class="input_radio" v-validate="'required'" v-model="form.reason">
                            <label for="temporary">This is temporary. I’ll be back soon.</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="not-useful-website" value="not-useful-website" name="reason" class="input_radio" v-validate="'required'" v-model="form.reason">
                            <label for="not-useful-website">I don’t find this website useful.</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="privacy-issue" value="privacy-issue" name="reason" class="input_radio" v-validate="'required'" v-model="form.reason">
                            <label for="privacy-issue">I have privacy issue.</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="another-account" value="another-account" name="reason" class="input_radio" v-validate="'required'" v-model="form.reason">
                            <label for="another-account">I have another Ride Rev account.</label>
                        </div>
                        <div class="form_radio">
                            <input type="radio" id="others" value="others" name="reason" class="input_radio" v-validate="'required'" v-model="form.reason">
                            <label for="others">Other (please explain further)</label>
                        </div>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('reason')">{{ properFormat(errors.first('reason')) }}</span></transition>
                    </div>
                    <transition name="slide">
                        <div class="form_group" v-if="form.reason == 'others'">
                            <textarea name="other_details" placeholder="Enter your other reason" v-model="form.other_reason" rows="5" class="input_text" key="other_details" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1|\']*$'}"></textarea>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('other_details')">{{ properFormat(errors.first('other_details')) }}</span></transition>
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
        <transition name="fade">
            <deactivate-account-prompt v-if="$store.state.deactivateAccountPromptStatus" />
        </transition>
    </div>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    import DeactivateAccountPrompt from '../../../components/modals/DeactivateAccountPrompt'
    export default {
        components: {
            Breadcrumb,
            DeactivateAccountPrompt
        },
        data () {
            return {
                form: {
                    reason: '',
                    other_reason: '',
                    _method: 'PATCH'
                }
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.$store.state.deactivateAccountPromptStatus = true
                        document.body.classList.add('no_scroll')
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
            let token = me.$cookies.get('70hokc3hhhn5')
            me.loader(true)
            if (token == null || token == undefined) {
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
                me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
            }
            setTimeout( () => {
                me.loader(false)
            }, 500)
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `Deactivate Account | Ride Revolution`,
                link: [
                    {
                        rel: 'nofollow',
                        href: `${host}${me.$route.fullPath}`
                    }
                ]
            }
        }
    }
</script>
