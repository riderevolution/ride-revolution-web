<template>
    <div class="my_profile">
        <breadcrumb :overlay="false" />
        <transition name="slide">
            <complete-profile v-if="$store.state.completeProfileStatus" />
        </transition>
        <section id="content">
            <h1 class="no_font">My Profile</h1>
            <div class="profile_tab">
                <div class="top">
                    <div class="left">
                        <div class="overlay">
                            <img class="profile_img" :src="`${($store.state.user.customer_details.images[0].path != null) ? $store.state.user.customer_details.images[0].path : '' }`" v-if="$store.state.user.customer_details.images[0].path != null" />
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
                            <div class="name"><h2>{{ $store.state.user.first_name }} {{ $store.state.user.last_name }}</h2> <span><img src="/sample-type.svg" /></span></div>
                            <div class="info">
                                <div class="label">Username <b>{{ $store.state.user.member_id }}</b></div>
                                <div class="label">Store Credits <b>{{ storeCredits }}</b></div>
                            </div>
                        </div>
                        <nuxt-link :to="`${$nuxt.$route.fullPath}/update-profile`" class="default_btn_wht_out" v-if="$store.state.user.new_user == 0"><span>Update Profile</span></nuxt-link>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left"></div>
                    <ul class="tab_wrapper" v-if="!$parent.$parent.isMobile">
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
                category: 'ride-rev-journey',
                storeCredits: 0,
                first_name: '',
                last_name: ''
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
                    case 'classes':
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.$store.state.user.id}/upcoming-classes`).then(res => {
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
                        me.$axios.get(`api/customers/${me.$store.state.user.id}/packages?forWeb=1`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    me.$refs.profileTab.packages = []
                                    res.data.customer.user_package_counts.forEach((data, index) => {
                                        data.toggled = false
                                        me.$refs.profileTab.packages.push(data)
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
                }
                setTimeout( () => {
                    me.$refs.profileTab.getHeight()
                    me.$refs.profileTab.unique = key
                }, 10)
            }
        },
        mounted () {
            const me = this
            let token = me.$cookies.get('token')
            if (token == null || token == undefined) {
                me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
            } else {
                let ctr = 0
                let timer = setInterval( () => {
                    if (ctr > 1) {
                        me.storeCredits = (me.$store.state.user.store_credits === null) ? 0 : me.$store.state.user.store_credits.amount
                        me.first_name = me.$store.state.user.first_name.charAt(0)
                        me.last_name = me.$store.state.user.last_name.charAt(0)
                        if (me.$store.state.user.new_user == 1) {
                            me.$store.state.completeProfileStatus = true
                        }
                    }
                    ctr++
                }, 500)
                if (ctr > 4) {
                    clearInterval(timer)
                }
            }
        }
    }
</script>
