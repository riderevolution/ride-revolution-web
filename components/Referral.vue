<template>
    <transition name="fade">
        <section id="referral" :class="`${($route.path == '/my-profile') ? 'alt' : ''}`">
            <div class="global_prev_container" v-if="summary.res != ''">
                <div class="item_title">
                    <h2>Order Confirmation</h2>
                </div>
                <div class="global_prev">
                    <div class="item" v-if="summary.type != 'store-credit-page'">
                        <h3>{{ summary.res.name }}</h3>
                        <p>Php {{ totalCount((summary.res.is_promo == 1) ? summary.res.discounted_price : summary.res.package_price) }}</p>
                    </div>
                    <div class="item" v-else>
                        <h3>{{ summary.res.name }}</h3>
                        <p>Php {{ totalCount(summary.res.amount) }}</p>
                    </div>
                    <div class="item" v-if="summary.type == 'store-credit-page'">
                        <h3>Quantity</h3>
                        <p>{{ summary.quantity }}</p>
                    </div>
                    <div class="item" v-if="summary.type != 'store-credit-page'">
                        <h3>Rides</h3>
                        <p>{{ summary.res.class_count }}</p>
                    </div>
                    <div class="item" v-else>
                        <h3>Credits</h3>
                        <p>{{ totalItems(summary.total) }}</p>
                    </div>
                    <div class="item" v-if="summary.type != 'store-credit-page'">
                        <h3>Discount</h3>
                        <p>Php {{ totalCount(summary.discount) }}</p>
                    </div>
                    <div class="total">
                        <p>Total</p>
                        <p>{{ (summary.type == 'store-credits') ? '' : 'Php' }} {{ (summary.type == 'store-credits') ? totalItems(summary.total) : totalCount(summary.total)  }} {{ (summary.type == 'store-credits') ? 'Credits' : '' }}</p>
                    </div>
                </div>
            </div>
            <!-- <div class="wrapper">
                <div v-html="subtitle"></div>
                <div class="link" v-if="isWebBased">
                    <label>Referral Link</label>
                    <input class="refer_link" id="refer_link" type="text" v-model="form.referralLink" @click.self="copyClipBoard($event)" />
                    <transition name="slide">
                        <span class="tooltip" v-if="copied">Copied!</span>
                    </transition>
                </div>
                <form id="default_form" @submit.prevent="submissionSuccess()">
                    <div class="form_flex with_btn">
                        <div class="form_group">
                            <input type="email" id="email" name="email" class="input_text email" autocomplete="off" v-model="form.email" placeholder="Enter your email address" v-validate="'required|email'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">The email field is required</span></transition>
                        </div>
                        <div class="form_button">
                            <button type="submit" class="default_btn"><span>Send Referral Link</span></button>
                        </div>
                    </div>
                </form>
            </div> -->
            <transition name="fade">
                <buy-rides-prompt :message="message" v-if="$store.state.buyRidesPromptStatus" :status="status" />
            </transition>
        </section>
    </transition>
</template>

<script>
    import BuyRidesPrompt from './modals/BuyRidesPrompt'
    export default {
        components: {
            BuyRidesPrompt
        },
        props: {
            summary: {
                default: {
                    res: '',
                    total: 0,
                    quantity: 0,
                    discount: 0,
                    type: ''
                }
            },
            subtitle: {
                default: '<h2>Refer a friend, get a free ride!</h2><h3>Earn a single class for referrals who buy our 2-week unlimited first-timer package. Enter your email below to start referring!</h3>'
            }
        },
        data () {
            return {
                isWebBased: false,
                form: {
                    email: '',
                    referralLink: ''
                },
                message: '',
                copied: false
            }
        },
        methods: {
            copyClipBoard (event) {
                const me = this
                if (event.target) {
                    let element = event.target
                    element.select()
                    element.setSelectionRange(0, 99999)
                    document.execCommand("copy")
                    me.copied = true
                    setTimeout( () => {
                        me.copied = false
                    }, 1000)
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
                        me.loader(true)
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
                                        me.$store.state.buyRidesPromptStatus = true
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
                                    me.loader(false)
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
            initial () {
                const me = this
                me.loader(true)
                let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
                me.$axios.get('api/referral-link', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.form.referralLink = res.data.link
                        }, 500)
                    }
                }).catch(err => {
                    document.body.classList.add('no_scroll')
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        },
        mounted () {
            const me = this
            if (me.$route.fullPath.match(/\bfish-in-the-glass/ig)) {
                me.isWebBased = true
                me.initial()
            } else {
                me.isWebBased = false
            }
        }
    }
</script>
