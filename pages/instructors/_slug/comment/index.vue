<template>
    <transition name="fade">
        <div class="comment" v-if="loaded">
            <breadcrumb :overlay="false" />
            <transition name="slide">
                <pro-tip v-if="$store.state.proTipStatus" />
            </transition>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
                    <div class="form_main_group">
                        <div class="form_header">
                            <h1>What do you think of {{ res.first_name }} {{ res.last_name }}?</h1>
                        </div>
                        <div class="form_group">
                            <label>Tap a star to Rate</label>
                            <div class="form_star">
                                <img :class="`${(data.tapped) ? 'fade_in' : 'fade_out'}`" :src="`${(data.tapped) ? '/icons/star-green.svg' : '/icons/star-gray.svg'}`" v-for="(data, key) in stars" :key="key" @click="tapStar(data, key)" />
                            </div>
                        </div>
                        <div class="form_group">
                            <label for="title">Title <span>*</span></label>
                            <input type="text" name="title" autocomplete="off" class="input_text" placeholder="Enter your title" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('title')">{{ properFormat(errors.first('title')) }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="your_review">Your Review <span>*</span></label>
                            <textarea name="your_review" class="input_text" rows="5" maxlength="500" @input="getCount($event)" placeholder="Please type here" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1|\'|\!|\?|\&|\:]*$', max: 500}"></textarea>
                            <div class="limit_wrapper">
                                <div class="limit"><span class="count">{{ count }}</span> characters left</div>
                                <svg class="progress" width="30" height="30"> <circle class="inner_ring" :r="normalizedRadius" cx="15" cy="15"/> <circle class="outer_ring" :stroke-dasharray="`${circumference} ${circumference}`" :stroke-dashoffset="dashOffset" :r="normalizedRadius" cx="15" cy="15"/> </svg>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('your_review')">{{ properFormat(errors.first('your_review')) }}</span></transition>
                        </div>
                        <!-- <div class="form_image">
                            <input type="file" class="input_image" id="image" name="image[]" multiple ref="file" @change="getFile($event)" v-validate="'required|size:1000|image|ext:jpeg,jpg,png'" required>
                            <label class="input_image_label" for="image">
                                <div class="label">
                                    <img src="/icons/uploaded-icon.svg" /> <span>Upload Photos</span>
                                </div>
                                <div class="disclaimer_wrapper">
                                    <div class="disclaimer">Image size limit: 1MB</div>
                                    <div class="disclaimer alt">Upload limit: 3 photos</div>
                                </div>
                            </label>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('image[]')">{{ properFormat(errors.first('image[]')) }}</span></transition>
                        </div>
                        <transition name="fade">
                            <div class="preview_image_wrapper" id="preview_image_wrapper" v-if="previewImage">
                                <div class="preview" v-for="(data, key) in populateImages" :key="key">
                                    <div class="image_close" @click="removeImage(key)"></div>
                                    <img :id="`preview_image_${key}`" src="" />
                                </div>
                            </div>
                        </transition> -->
                        <div class="form_flex">
                            <vue-recaptcha sitekey="6Ld4_doUAAAAACiRAQf1JQlro_fxvTSZxgxi5jxk"></vue-recaptcha>
                            <div class="form_button">
                                <button type="submit" class="default_btn">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <transition name="fade">
                <comment-success v-if="$store.state.commentSuccessStatus" />
            </transition>
            <transition name="fade">
                <complete-profile-prompt v-if="$store.state.completeProfilePromptStatus" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import ProTip from '../../../../components/ProTip'
    import Breadcrumb from '../../../../components/Breadcrumb'
    import CommentSuccess from '../../../../components/modals/CommentSuccess'
    import CompleteProfilePrompt from '../../../../components/modals/CompleteProfilePrompt'
    import VueRecaptcha from 'vue-recaptcha'
    export default {
        components: {
            ProTip,
            Breadcrumb,
            CommentSuccess,
            CompleteProfilePrompt,
            VueRecaptcha
        },
        data () {
            return {
                res: [],
                loaded: false,
                count: 500,
                dashOffset: 0,
                normalizedRadius: 0,
                circumference: 0,
                stars: [
                    {
                        tapped: false
                    },
                    {
                        tapped: false
                    },
                    {
                        tapped: false
                    },
                    {
                        tapped: false
                    },
                    {
                        tapped: false
                    }
                ],
                form: {
                    stars: 0
                },
                previewImage: false,
                images: []
            }
        },
        computed: {
            // populateImages () {
            //     const me = this
            //     let result
            //     result = me.images
            //     return result
            // }
        },
        methods: {
            // removeImage (key) {
            //     const me = this
            //     let tempList = Array.from(me.images)
            //     let index = tempList.indexOf(key)
            //     if (index == -1) {
            //         tempList.splice(key, 1)
            //         me.images = tempList
            //         for (let i = 0; i < me.images.length; i++) {
            //             let reader = new FileReader()
            //             reader.onload = function () {
            //                 let image = document.getElementById(`preview_image_${i}`)
            //                 image.src = reader.result
            //             }
            //             reader.readAsDataURL(me.images[i])
            //         }
            //     }
            // },
            // getFile (event, key) {
            //     const me = this
            //     let element = event.target
            //     me.$store.state.errorList = []
            //     if (element.files.length > 0 && element.files.length <= 3) {
            //         me.previewImage = true
            //         if (me.images.length != 3) {
            //             for (let i = 0; i < element.files.length; i++) {
            //                 if (me.images.length != 3) {
            //                     me.images.push(element.files[i])
            //                     for (let j = 0; j < me.images.length; j++) {
            //                         let reader = new FileReader()
            //                         reader.onload = function () {
            //                             let image = document.getElementById(`preview_image_${j}`)
            //                             image.src = reader.result
            //                         }
            //                         reader.readAsDataURL(me.images[j])
            //                     }
            //                 } else {
            //                     me.$store.state.errorList = ['Sorry! The upload limit is only 3.']
            //                     me.$store.state.errorPromptStatus = true
            //                 }
            //             }
            //         } else {
            //             me.$store.state.errorList = ['Sorry! The upload limit is only 3.']
            //             me.$store.state.errorPromptStatus = true
            //         }
            //     } else {
            //         me.$store.state.errorList = ['Sorry! The upload limit is only 3.']
            //         me.$store.state.errorPromptStatus = true
            //     }
            // },
            tapStar (data, key) {
                const me = this
                me.form.stars = key + 1
                me.stars.forEach((element, index) => {
                    if (index <= key) {
                        element.tapped = true
                    } else {
                        element.tapped = false
                    }
                })
            },
            getCount (event) {
                const me = this
                let target = event.target
                let total = 500
                if (target.value.length <= 500) {
                    me.dashOffset = me.circumference - (target.value.length / 500) * me.circumference
                    me.count = total - target.value.length
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid && grecaptcha.getResponse().length) {
                        let captcha = grecaptcha.getResponse()
                        me.loader(true)
                        me.$axios.post('api/verify-captcha', { captcha: captcha }).then(verify => {
                            if (verify) {
                                let formData = new FormData(document.getElementById('default_form'))
                                let token = me.$cookies.get('70hokc3hhhn5')
                                formData.append('instructor_id', me.res.id)
                                formData.append('rating', me.form.stars)

                                me.$axios.post('api/reviews', formData, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }).then(res => {
                                    me.$store.state.commentSuccessStatus = true
                                    document.body.classList.add('no_scroll')
                                }).catch(err => {
                                    me.$nuxt.error({ statusCode: 403, message: 'Something Went Wrong' })
                                }).then(() => {
                                    setTimeout( () => {
                                        me.loader(false)
                                    }, 500)
                                })
                            }
                        }).catch(err => {
                            me.$nuxt.error({ statusCode: 403, message: 'Something Went Wrong' })
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            offset: -250
                        })
                    }
                })
            },
            initial () {
                const me = this
                me.loader(true)
                let token = me.$cookies.get('70hokc3hhhn5')
                me.$axios.get(`api/web/instructors/${me.$route.params.slug}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.instructor
                            me.normalizedRadius = 15 - 3 * 2
                            me.circumference = me.normalizedRadius * 2 * Math.PI
                            me.dashOffset = me.circumference
                            me.$store.state.proTipStatus = true

                            me.loaded = true
                            if (token != null && token != undefined) {
                                me.$axios.get('api/check-token', {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }).then(res => {
                                    if (res.data.user.new_user == 0) {
                                    } else {
                                        me.$store.state.lastRoute = `/instructors/${me.$route.params.slug}/comment`
                                        me.$store.state.completeProfilePromptStatus = true
                                    }
                                }).catch(err => {
                                    me.$nuxt.error({ statusCode: 403, message: 'Something Went Wrong' })
                                    me.loader(false)
                                })
                            } else {
                                me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                                me.loader(false)
                            }
                        }, 500)
                    }
                }).catch(err => {
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
            me.initial()
        }
    }
</script>
