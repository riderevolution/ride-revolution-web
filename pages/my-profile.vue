<template>
    <div class="my_profile">
        <breadcrumb :overlay="false" />
        <section id="content">
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
                            <div class="name"><h2>Mark Ruffalo</h2> <span><img src="/sample-type.svg" /></span></div>
                            <div class="info">
                                <div class="label">Member ID <b>RR12345</b></div>
                                <div class="label">Ride Points <b>0</b></div>
                                <div class="label">Store Credits <b>500</b></div>
                            </div>
                        </div>
                        <div class="default_btn_wht_out"><span>Update Profile</span></div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left"></div>
                    <ul class="tab_wrapper">
                        <li :class="`tab_item ${(category == 'ride-rev-journey') ? 'active' : ''}`" @click="toggleTab(0, 'ride-rev-journey')">Ride Rev Journey</li>
                        <li :class="`tab_item ${(category == 'classes') ? 'active' : ''}`" @click="toggleTab(1, 'classes')">Classes</li>
                        <li :class="`tab_item ${(category == 'packages') ? 'active' : ''}`" @click="toggleTab(2, 'packages')">Packages</li>
                        <li :class="`tab_item ${(category == 'transactions') ? 'active' : ''}`" @click="toggleTab(3, 'transactions')">Transactions</li>
                        <li :class="`tab_item ${(category == 'gift-card') ? 'active' : ''}`" @click="toggleTab(4, 'gift-card')">Gift Cards</li>
                    </ul>
                </div>
            </div>
            <profile-tab-content ref="profileTab" :category="category" />
        </section>
        <referral />
    </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import ProfileTabContent from '../components/ProfileTabContent'
    import Referral from '../components/Referral'
    export default {
        components: {
            Breadcrumb,
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
        }
    }
</script>
