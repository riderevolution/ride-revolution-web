<template>
    <div id="header" :class="`${(height > 200) ? 'sticky' : ''} ${($route.fullPath == '/') ? 'front' : ($route.fullPath == '/instructors' ? 'instructor' : 'not_front')} ${($store.state.loginSignUpStatus) ? 'login' : ''}`">
        <div class="navbar">
            <nuxt-link rel="canonical" to="/" class="logo">
                <img src="/logo.svg" />
                <div class="logo_title">
                    Ride <br/>
                    Revolution
                </div>
            </nuxt-link>
            <ul class="nav_list" v-if="!$parent.isMobile">
                <li>
                    <nuxt-link rel="canonical" to="/buy-rides" class="nav_item">Buy Rides</nuxt-link>
                </li>
                <li>
                    <nuxt-link rel="canonical" to="/book-a-bike" class="nav_item">Book a Bike</nuxt-link>
                </li>
                <li>
                    <nuxt-link rel="canonical" to="/instructors" class="nav_item">Instructors</nuxt-link>
                </li>
                <li v-if="!$store.state.isAuth">
                    <div class="default_btn" @click="loginUser()">Login / Sign up</div>
                </li>
                <li v-else>
                    <div :class="`user_dropdown ${(showList) ? 'toggled' : ''}`" @click="showList ^= true" v-click-outside="toggleList">
                        <img :src="`${($store.state.user.customer_details.images[0].path != null) ? $store.state.user.customer_details.images[0].path : '' }`" v-if="$store.state.user.customer_details.images[0].path != null" />
                        <div class="overlay" v-else>
                            <div class="letter">
                                {{ first_name }}{{ last_name }}
                            </div>
                        </div>
                        <h3>{{ `${$store.state.user.first_name} ${$store.state.user.last_name}` }}</h3>
                        <transition name="slideAlt">
                            <ul class="user_dropdown_list" v-click-outside="toggleList" v-if="showList">
                                <li class="user_dropdown_item">
                                    <nuxt-link to="/my-profile" class="item_link">View My Account</nuxt-link>
                                </li>
                                <li class="user_dropdown_item">
                                    <nuxt-link to="/my-profile/update-profile" class="item_link">Update My Account</nuxt-link>
                                </li>
                                <li class="user_dropdown_item">
                                    <div class="item_link red" @click="logout()">Signout</div>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </li>
            </ul>
            <div class="nav_login" @click="loginUser()" v-if="$parent.isMobile && !$store.state.isAuth">
                <img src="/icons/login-icon.svg" />
                <div class="background"></div>
            </div>
            <div :class="`user_dropdown ${(showList) ? 'toggled' : ''}`" @click="showList ^= true" v-click-outside="toggleList" v-if="$parent.isMobile && $store.state.isAuth">
                <img :src="`${($store.state.user.customer_details.images[0].path != null) ? $store.state.user.customer_details.images[0].path : '' }`" v-if="$store.state.user.customer_details.images[0].path != null" />
                <div class="overlay" v-else>
                    <div class="letter">
                        {{ first_name }}{{ last_name }}
                    </div>
                </div>
                <transition name="slideAlt">
                    <ul class="user_dropdown_list" v-click-outside="toggleList" v-if="showList">
                        <li class="user_dropdown_item">
                            <nuxt-link to="/my-profile" class="item_link">View My Account</nuxt-link>
                        </li>
                        <li class="user_dropdown_item">
                            <nuxt-link to="/my-profile/update-profile" class="item_link">Update My Account</nuxt-link>
                        </li>
                        <li class="user_dropdown_item">
                            <div class="item_link red" @click="logout()">Signout</div>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
        <div class="nav_burger" @click="toggleNavbarExpanded()">
            <div class="bar top_line"></div>
            <div class="bar middle_line"></div>
            <div class="bar bottom_line"></div>
            <div class="excess_line"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                height: 0,
                showList: false,
                first_name: '',
                last_name: ''
            }
        },
        methods: {
            toggleList () {
                const me = this
                me.showList = false
            },
            loginUser () {
                const me = this
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
                me.windowScroll()
            },
            toggleNavbarExpanded () {
                const me = this
                me.$store.state.isExpanded = true
                document.body.classList.add('no_scroll')
            },
            windowScroll () {
                const me = this
                me.height = 0
                let height = window.pageYOffset | document.body.scrollTop
                let element = document.querySelector('#header')
                if (element.classList.contains('front')) {
                    me.height = height
                }
            },
        },
        mounted () {
            const me = this
            let ctr = 0
            me.windowScroll()
            setInterval( () => {
                if (ctr > 1) {
                    if (me.$store.state.user.first_name != '' || me.$store.state.user.last_name != '') {
                        me.first_name = me.$store.state.user.first_name.charAt(0)
                        me.last_name = me.$store.state.user.last_name.charAt(0)
                    }
                }
                ctr++
            }, 500)
        },
        beforeMount () {
            window.addEventListener('load', this.windowScroll)
            window.addEventListener('scroll', this.windowScroll)
            window.addEventListener('resize', this.windowScroll)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.windowScroll)
            window.removeEventListener('scroll', this.windowScroll)
            window.removeEventListener('resize', this.windowScroll)
        }
    }
</script>
