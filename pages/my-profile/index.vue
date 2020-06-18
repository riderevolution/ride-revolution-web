<template>
    <div class="my_profile" v-if="loaded">
        <breadcrumb :overlay="false" />
        <transition name="slide">
            <complete-profile v-if="$store.state.completeProfileStatus" />
        </transition>
        <section id="content">
            <h1 class="no_font">My Profile</h1>
            <transition name="fade">
                <div class="profile_tab">
                    <div class="top">
                        <div class="left">
                            <div class="overlay">
                                <img class="profile_img" :src="`${(user.customer_details.images[0].path != null) ? user.customer_details.images[0].path : '' }`" v-if="user.customer_details.images[0].path != null" />
                                <div class="overlay_letter" v-else>
                                    <div class="letter">
                                        {{ first_name }}{{ last_name }}
                                    </div>
                                </div>
                                <div class="badges">
                                    <div class="first"><img src="/sample-badge-2.svg" /></div>
                                    <div class="second"><img src="/sample-badge.svg" /></div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="data">
                                <div class="name"><h2>{{ user.first_name }} {{ user.last_name }}</h2> <span><img src="/sample-type.svg" /></span></div>
                                <div class="info">
                                    <div class="label">Username <b>{{ user.member_id }}</b></div>
                                    <div class="label">Store Credits <b>{{ storeCredits }}</b></div>
                                </div>
                            </div>
                            <nuxt-link :to="`${$nuxt.$route.fullPath}/update-profile`" class="default_btn_wht_out" v-if="user.new_user == 0"><span>Update Profile</span></nuxt-link>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="left"></div>
                        <ul class="tab_wrapper" v-if="!$store.state.isMobile">
                            <li :class="`tab_item ${(category == 'ride-rev-journey') ? 'active' : ''}`" @click="toggleTab(0, 'ride-rev-journey')">Ride Rev Journey</li>
                            <li :class="`tab_item ${(category == 'classes') ? 'active' : ''}`" @click="toggleTab(1, 'classes')">Classes</li>
                            <li :class="`tab_item ${(category == 'packages') ? 'active' : ''}`" @click="toggleTab(2, 'packages')">Packages</li>
                            <li :class="`tab_item ${(category == 'transactions') ? 'active' : ''}`" @click="toggleTab(3, 'transactions')">Transactions</li>
                            <li :class="`tab_item ${(category == 'gift-cards') ? 'active' : ''}`" @click="toggleTab(4, 'gift-cards')">Gift Cards</li>
                        </ul>
                        <div class="mobile" v-else>
                            <div class="tab_toggler">
                                <div class="toggler" @click.self="toggleDetails($event)">Menu</div>
                                <ul class="tab_wrapper">
                                    <li :class="`tab_item ${(category == 'ride-rev-journey') ? 'active' : ''}`" @click="toggleTab(0, 'ride-rev-journey')">Ride Rev Journey</li>
                                    <li :class="`tab_item ${(category == 'classes') ? 'active' : ''}`" @click="toggleTab(1, 'classes')">Classes</li>
                                    <li :class="`tab_item ${(category == 'packages') ? 'active' : ''}`" @click="toggleTab(2, 'packages')">Packages</li>
                                    <li :class="`tab_item ${(category == 'transactions') ? 'active' : ''}`" @click="toggleTab(3, 'transactions')">Transactions</li>
                                    <li :class="`tab_item ${(category == 'gift-cards') ? 'active' : ''}`" @click="toggleTab(4, 'gift-cards')">Gift Cards</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <profile-tab-content ref="profileTab" :category="category" />
        </section>
        <referral />
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import CompleteProfile from '../../components/CompleteProfile'
    import ProfileTabContent from '../../components/ProfileTabContent'
    import Referral from '../../components/Referral'
    export default {
        components: {
            Breadcrumb,
            CompleteProfile,
            ProfileTabContent,
            Referral
        },
        data () {
            return {
                loaded: false,
                componentLoaded: false,
                category: 'ride-rev-journey',
                storeCredits: 0,
                first_name: '',
                last_name: '',
                user: []
            }
        },
        watch: {
            $route (to, from){

            }
        },
        methods: {
            toggleDetails (event) {
                const me = this
                let target = event.target
                if (target.parentNode.classList.contains('toggled')) {
                    target.nextElementSibling.style.height = `${0}px`
                    target.parentNode.classList.remove('toggled')
                } else {
                    target.parentNode.classList.add('toggled')
                    target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
                }
            },
            toggleTab (key, category) {
                const me = this
                me.category = category
                switch (category) {
                    case 'ride-rev-journey':
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.user.id}/ride-rev-journey`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    res.data.customer.rideRevJourney.topInstructors.forEach((instructor, index) => {
                                        instructor.hovered = false
                                    })
                                    me.$refs.profileTab.rideRevJourney = res.data.customer.rideRevJourney
                                    me.$refs.profileTab.series[0].data = res.data.customer.rideRevJourney.monthlyRideCount.series.data
                                    me.$refs.profileTab.usertoNow = me.$moment(res.data.customer.created_at).toNow()
                                    me.$refs.profileTab.tabChartCategory = 'monthly'
                                    let currentMonth = me.$moment().month() + 1
                                    let labels = []
                                    labels.unshift(me.$moment(currentMonth, 'M').format('MMM'))
                                    for (let i = 0; i < 11; i++) {
                                        currentMonth = currentMonth - 1
                                        if (currentMonth == 0) {
                                            currentMonth = 12
                                        }
                                        labels.unshift(me.$moment(currentMonth, 'M').format('MMM'))
                                    }
                                    me.$refs.profileTab.chartOptions.xaxis.categories = labels
                                }, 10)
                            }
                        }).catch((err) => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                    case 'classes':
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.user.id}/upcoming-classes`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    me.$refs.profileTab.classes = []
                                    res.data.customer.upcomingClasses.forEach((data, index) => {
                                        data.toggled = false
                                        me.$refs.profileTab.classes.push(data)
                                    })
                                }, 10)
                            }
                        }).catch((err) => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.$refs.profileTab.tabCategory = 'upcoming'
                            }, 10)
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                    case 'packages':
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.user.id}/packages?forWeb=1`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    me.$refs.profileTab.packages = []
                                    res.data.customer.user_package_counts.forEach((data, index) => {
                                        if (parseInt(me.$moment(data.class_package.computed_expiration_date).diff(me.$moment(), 'days')) > 0) {
                                            data.toggled = false
                                            data.expired = false
                                            me.$refs.profileTab.packages.push(data)
                                        }
                                    })
                                }, 10)
                            }
                        }).catch((err) => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.$refs.profileTab.tabCategory = 'active'
                            }, 10)
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                    case 'transactions':
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.user.id}/transactions?forWeb=1`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    me.$refs.profileTab.pendingTransactions = []
                                    me.$refs.profileTab.paidTransactions = []
                                    res.data.customer.payments.forEach((data, index) => {
                                        if (data.status == 'pending') {
                                            me.$refs.profileTab.pendingTransactions.push(data)
                                        } else {
                                            me.$refs.profileTab.paidTransactions.push(data)
                                        }
                                    })
                                    me.$refs.profileTab.totalPendingPayment = res.data.customer.totalPendingPayments
                                }, 10)
                            }
                        }).catch((err) => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                    case 'gift-cards':
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.user.id}/gift-cards?forWebBooking=1`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    me.$refs.profileTab.giftCards = []
                                    res.data.customer.giftCards.forEach((data, index) => {
                                        me.$refs.profileTab.giftCards.push(data)
                                    })
                                }, 10)
                            }
                        }).catch((err) => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                }
                setTimeout( () => {
                    me.$refs.profileTab.getHeight()
                    me.$refs.profileTab.unique = key
                }, 10)
                setTimeout( () => {
                    me.$store.state.fromManageClass = false
                }, 500)
            }
        },
        mounted () {
            const me = this
            let token = me.$cookies.get('token')
            me.loader(true)
            if (token == null || token == undefined) {
                me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            } else {
                me.$axios.get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        me.user = res.data.user
                        me.storeCredits = (res.data.user.store_credits === null) ? 0 : res.data.user.store_credits.amount
                        me.first_name = res.data.user.first_name.charAt(0)
                        me.last_name = res.data.user.last_name.charAt(0)
                        if (res.data.user.new_user == 1) {
                            me.$store.state.completeProfileStatus = true
                        }
                        if (me.$store.state.fromManageClass) {
                            me.loaded = true
                            setTimeout( () => {
                                me.componentLoaded = true
                                me.category = 'classes'
                                me.toggleTab(1, 'classes')
                            }, 10)
                        } else {
                            me.$axios.get(`api/customers/${me.user.id}/ride-rev-journey`).then(res => {
                                if (res.data) {
                                    me.loaded = true
                                    setTimeout( () => {
                                        me.componentLoaded = true
                                        res.data.customer.rideRevJourney.topInstructors.forEach((instructor, index) => {
                                            instructor.hovered = false
                                        })
                                        me.$refs.profileTab.rideRevJourney = res.data.customer.rideRevJourney
                                        me.$refs.profileTab.series[0].data = res.data.customer.rideRevJourney.monthlyRideCount.series.data
                                        me.$refs.profileTab.usertoNow = me.$moment(res.data.customer.created_at).toNow()
                                        me.$refs.profileTab.tabChartCategory = 'monthly'
                                        let currentMonth = me.$moment().month() + 1
                                        let labels = []
                                        labels.unshift(me.$moment(currentMonth, 'M').format('MMM'))
                                        for (let i = 0; i < 11; i++) {
                                            currentMonth = currentMonth - 1
                                            if (currentMonth == 0) {
                                                currentMonth = 12
                                            }
                                            labels.unshift(me.$moment(currentMonth, 'M').format('MMM'))
                                        }
                                        me.$refs.profileTab.chartOptions.xaxis.categories = labels
                                    }, 10)
                                }
                            }).catch((err) => {
                                me.$store.state.errorList = err.response.data.errors
                                me.$store.state.errorPromptStatus = true
                            }).then(() => {
                                setTimeout( () => {
                                    me.loader(false)
                                }, 500)
                            })
                        }
                    }
                })
            }
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `My Profile | Ride Revolution`,
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
