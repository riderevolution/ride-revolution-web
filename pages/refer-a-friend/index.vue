<template>
    <transition name="fade">
        <div class="refer_a_friend" v-if="loaded">
            <banner :res="res" />
            <section id="referral" :class="`${($route.path == '/my-profile') ? 'alt' : ''}`">
                <div class="wrapper">
                    <div v-html="res.subtitle"></div>
                    <form id="default_form" @submit.prevent="submissionSuccess()">
                        <div class="form_flex with_btn">
                            <div class="form_group">
                                <input type="email" id="email" name="email" class="input_text email" v-model="form.email" autocomplete="off" placeholder="Enter your email address" v-validate="'required|email'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">The email field is required</span></transition>
                            </div>
                            <div class="form_button">
                                <button type="submit" class="default_btn"><span>Send Referral Link</span></button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </transition>
</template>

<script>
    import Banner from '../../components/Banner'
    export default {
        components: {
            Banner
        },
        data () {
            return {
                res: [],
                loaded: false,
                form: {
                    email: ''
                }
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
                        if (token != null && token != undefined) {
                            let formData = new FormData(document.getElementById('default_form'))
                            me.$axios.post('api/refer-a-friend', formData, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then(res => {
                                if (res.data) {
                                    setTimeout( () => {
                                        me.message = `You have been successfully invited ${me.form.email}.`
                                        me.$store.state.buyRidesPromptStatus = false
                                        document.body.classList.remove('no_scroll')
                                    }, 500)
                                }
                            }).catch(err => {
                                document.body.classList.add('no_scroll')
                                me.$store.state.errorList = err.response.data.errors
                                me.$store.state.errorPromptStatus = true
                            }).then(() => {
                                setTimeout( () => {
                                    me.form.email = ''
                                    me.errors.clear()
                                    me.$nextTick(() => {
                                        me.$validator.reset()
                                    })
                                }, 500)
                            })
                        } else {
                            me.$store.state.loginCheckerStatus = true
                            document.body.classList.add('no_scroll')
                        }
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#referral',
							offset: -250
						})
                    }
                })
            },
            async initial () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.loaded = true
                    me.loader(false)
                }, 500)
            }
        },
        async mounted () {
            const me = this
            await setTimeout( () => {
                me.initial()
            }, 10)
        },
        asyncData ({ $axios, params, error, store }) {
            return $axios.get(`api/page-settings/refer-a-friend`)
                .then(res => {
                    return {
                        res: res.data.pageSettings
                    }
                }).catch(err => {
                    error({ statusCode: 403, message: 'Page not found' })
                })
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `${me.res.title} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ],
                meta: [
                    { hid: 'og:title', property: 'og:title', content: `${me.res.meta_title}` },
                    { hid: 'og:description', property: 'og:description', content: `${me.res.meta_description}` },
                    { hid: 'og:keywords', property: 'og:keywords', content: `${me.res.meta_keywords}` },
                    { hid: 'og:url', property: 'og:url', content: `${host}/${me.$route.fullPath}` },
                    { hid: 'og:image', property: 'og:image', content: `${me.res.banners[0].path}` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${me.res.banners[0].alt}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
