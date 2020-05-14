<template>
    <div :class="`${($store.state.completeProfileHealthStatus) ? 'health' : ''} ${(height > 200) ? 'sticky' : ''} login_sign_up ${($route.fullPath == '/') ? 'front' : 'not_front'} ${($parent.isMobile) ? 'mobile' : ''}`">
        <section id="login" class="alt">
            <div class="steps">
                <ul>
                    <li :class="`overlay ${(completeProfileStep == 1 || completeProfileStep == 2 || completeProfileStep == 3) ? 'active' : ''}`">
                        <div class="count">
                            1
                        </div>
                    </li>
                    <li :class="`overlay ${(completeProfileStep == 2 || completeProfileStep == 3) ? 'active' : ''}`">
                        <div class="count">
                            2
                        </div>
                    </li>
                    <li :class="`overlay ${(completeProfileStep == 3) ? 'active' : ''}`">
                        <div class="count">
                            3
                        </div>
                    </li>
                </ul>
            </div>
            <form id="step_1_form" data-vv-scope="complete_profile_form" v-show="completeProfileStep == 1" enctype="multipart/form-data">
                <div id="default_form" :class="`${(completeProfileStep == 1) ? 'fade_in' : 'fade_out'}`">
                    <div class="sign_up_header alt">
                        <h2 class="title">Complete your profile</h2>
                    </div>
                    <div class="form_flex_image">
                        <label class="main_label">Profile Picture</label>
                        <div class="flex_image">
                            <input type="file" class="input_image" id="image" name="image[]" @change="getFile($event)" v-validate="'size:1000|image|ext:jpeg,jpg,png'">
                            <input type="hidden" name="image_id[]" value="0">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_form.image[]')">{{ errors.first('complete_profile_form.image[]') | properFormat }}</span></transition>
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
                            <input type="text" name="weight" autocomplete="off" class="input_text" v-validate="'required|numeric|min:1|max:200'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_form.weight')">{{ errors.first('complete_profile_form.weight') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_flex sign_up">
                        <div class="back" @click="toggleStep('back')">Back</div>
                        <div class="form_button">
                            <button type="button" class="default_btn full" @click="toggleStep('proceed')">Looks Good</button>
                        </div>
                    </div>
                </div>
            </form>
            <form id="step_2_form" data-vv-scope="complete_profile_2_form" v-show="completeProfileStep == 2">
                <div id="default_form" :class="`${(completeProfileStep == 2) ? 'fade_in' : 'fade_out'}`">
                    <div class="sign_up_header alt">
                        <h2 class="title">Tell us about your personal address</h2>
                    </div>
                    <div class="form_group">
                        <label for="personal_address">Address <span>*</span></label>
                        <input type="text" name="personal_address" autocomplete="off" class="input_text" placeholder="Enter your address 1" v-model="completeProfile.personal_address" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_2_form.personal_address')">{{ errors.first('complete_profile_2_form.personal_address') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="personal_city">City <span>*</span></label>
                        <input type="text" name="personal_city" autocomplete="off" class="input_text" placeholder="Enter your city" v-model="completeProfile.personal_city" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('complete_profile_2_form.personal_city')">{{ errors.first('complete_profile_2_form.personal_city') | properFormat }}</span></transition>
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
                                <input type="checkbox" id="same_as_personal_address" name="same_as_personal_address" class="input_check" @change="copyPersonalAddress()">
                                <label for="same_as_personal_address">Same as Personal Address</label>
                            </div>
                        </div>
                        <div class="form_group">
                            <label for="billing_address">Address <span>*</span></label>
                            <input type="text" name="billing_address" autocomplete="off" class="input_text" v-model="completeProfile.billing_address" placeholder="Enter your address 1" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_address')">{{ errors.first('address_form.billing_address') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="billing_city">City <span>*</span></label>
                            <input type="text" name="billing_city" autocomplete="off" class="input_text" v-model="completeProfile.billing_city" placeholder="Enter your city" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('address_form.billing_city')">{{ errors.first('address_form.billing_city') | properFormat }}</span></transition>
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
                    personal_address: '',
                    personal_city: '',
                    billing_address: '',
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
            copyPersonalAddress () {
                const me = this
                me.completeProfile.billing_address = me.completeProfile.personal_address
                me.completeProfile.billing_city = me.completeProfile.personal_city
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
                                    me.$store.state.completeProfileHealthStatus = true
                                } else {
                                    me.$scrollTo('.validation_errors', {
                                        container: '#default_form',
                                        offset: -250
                                    })
                                }
                            })
                        }
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
            }
        },
        mounted () {
            const me = this
            me.windowLoginScroll()
        },
        beforeMount () {
            window.addEventListener('load', this.windowLoginScroll)
            window.addEventListener('scroll', this.windowLoginScroll)
            window.addEventListener('resize', this.windowLoginScroll)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.windowLoginScroll)
            window.removeEventListener('scroll', this.windowLoginScroll)
            window.removeEventListener('resize', this.windowLoginScroll)
        }
    }
</script>
