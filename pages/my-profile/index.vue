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
                            <img class="profile_img" src="/sample-image-booker.png" />
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
                                <div class="label">Member ID <b>{{ $store.state.user.member_id }}</b></div>
                                <div class="label">Ride Points <b>0</b></div>
                                <div class="label">Store Credits <b>500</b></div>
                            </div>
                        </div>
                        <nuxt-link :to="`${$nuxt.$route.fullPath}/update-profile`" class="default_btn_wht_out" v-if="!$store.state.completeProfileStatus"><span>Update Profile</span></nuxt-link>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left"></div>
                    <ul class="tab_wrapper">
                        <li :class="`tab_item ${(category == 'ride-rev-journey') ? 'active' : ''}`" @click="toggleTab(0, 'ride-rev-journey')">Ride Rev Journey</li>
                        <li :class="`tab_item ${(category == 'classes') ? 'active' : ''}`" @click="toggleTab(1, 'classes')">Classes</li>
                        <li :class="`tab_item ${(category == 'packages') ? 'active' : ''}`" @click="toggleTab(2, 'packages')">Packages</li>
                        <li :class="`tab_item ${(category == 'transactions') ? 'active' : ''}`" @click="toggleTab(3, 'transactions')">Transactions</li>
                        <li :class="`tab_item ${(category == 'gift-cards') ? 'active' : ''}`" @click="toggleTab(4, 'gift-cards')">Gift Cards</li>
                    </ul>
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
                category: 'ride-rev-journey'
            }
        },
        methods: {
            toggleTab (key, category) {
                const me = this
                me.category = category
                switch (category) {
                    case 'classes':
                        setTimeout( () => {
                            me.$refs.profileTab.tabCategory = 'upcoming'
                        }, 10)
                        break
                    case 'packages':
                        setTimeout( () => {
                            me.$refs.profileTab.tabCategory = 'active'
                        }, 10)
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
            me.$store.state.completeProfileStatus = true
        },
        async asyncData ({ axios, params, store, error }) {
            let ctr = 0
            setInterval( () => {
                if (ctr < 1) {
                    if (!store.state.isAuth) {
                        error({ statusCode: 403, message: 'Page not found' })
                    }
                    ctr++
                }
            }, 500)
        }
    }
</script>
