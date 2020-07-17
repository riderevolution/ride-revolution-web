<template>
    <div>
        <transition name="slide">
            <div id="article_alert" v-if="$store.state.articleAlertStatus && advisory != null">
                <div class="left" v-if="!$store.state.isMobile">
                    <img src="/icons/announcement-icon.png" />
                    <div class="info">
                        <div v-html="advisory.summary" @click.prevent="$router.push(`/news/${advisory.slug}`)"></div>
                    </div>
                </div>
                <div class="left" v-else>
                    <div class="info">
                        <div v-html="advisory.summary" @click.prevent="$router.push(`/news/${advisory.slug}`)"></div>
                    </div>
                </div>
                <div class="right" v-if="!$store.state.isMobile">
                    <div class="close_icon" @click="toggleClose()"></div>
                </div>
                <div class="close_icon mobile" @click="toggleClose()" v-else></div>
            </div>
        </transition>
        <div id="header" :class="`${(height > 200) ? 'sticky' : ''} ${($route.fullPath == '/') ? 'front' : ($route.fullPath == '/instructors' ? 'instructor' : 'not_front')} ${($store.state.loginSignUpStatus) ? 'login' : ''}`">
            <div class="navbar">
                <nuxt-link rel="canonical" to="/" class="logo">
                    <img src="/logo.svg" />
                    <div class="logo_title">
                        Ride <br/>
                        Revolution
                    </div>
                </nuxt-link>
                <ul class="nav_list" v-if="!$store.state.isMobile" itemscope itemtype="https://schema.org/SiteNavigationElement">
                    <meta itemprop="name" content="Main Menu">
                    <li itemprop="name">
                        <nuxt-link rel="canonical" to="/buy-rides" itemprop="url" class="nav_item">Buy Rides</nuxt-link>
                    </li>
                    <li itemprop="name">
                        <nuxt-link rel="canonical" to="/book-a-bike" itemprop="url" class="nav_item">Book a Bike</nuxt-link>
                    </li>
                    <li itemprop="name">
                        <nuxt-link rel="canonical" to="/instructors" itemprop="url" class="nav_item">Instructors</nuxt-link>
                    </li>
                    <li itemprop="name" v-if="!$store.state.isAuth">
                        <div class="default_btn" @click="loginUser()">Login / Sign up</div>
                    </li>
                    <li v-else>
                        <div :class="`user_dropdown ${(showList) ? 'toggled' : ''}`" @click="showList ^= true" v-click-outside="toggleList">
                            <img :src="`${(user.customer_details.images[0].path != null) ? user.customer_details.images[0].path : '' }`" v-if="user.customer_details.images[0].path != null" />
                            <div class="overlay" v-else>
                                <div class="letter">
                                    {{ first_name }}{{ last_name }}
                                </div>
                            </div>
                            <h3>{{ `${user.first_name} ${user.last_name}` }}</h3>
                            <transition name="slideAlt">
                                <ul class="user_dropdown_list" v-if="showList">
                                    <li class="user_dropdown_item">
                                        <nuxt-link to="/my-profile" class="item_link">View My Profile</nuxt-link>
                                    </li>
                                    <li class="user_dropdown_item">
                                        <div class="item_link" @click="checkUser()">Account Settings</div>
                                    </li>
                                    <li class="user_dropdown_item">
                                        <div class="item_link red" @click="logout()">Signout</div>
                                    </li>
                                </ul>
                            </transition>
                        </div>
                    </li>
                </ul>
                <div class="nav_login" @click="loginUser()" v-if="$store.state.isMobile && !$store.state.isAuth">
                    <img src="/icons/login-icon.svg" />
                    <div class="background"></div>
                </div>
                <div v-if="$store.state.isMobile && $store.state.isAuth">
                    <div :class="`user_dropdown ${(showList) ? 'toggled' : ''}`" @click="showList ^= true" v-click-outside="toggleList">
                        <img :src="`${(user.customer_details.images[0].path != null) ? user.customer_details.images[0].path : '' }`" v-if="user.customer_details.images[0].path != null" />
                        <div class="overlay" v-else>
                            <div class="letter">
                                {{ first_name }}{{ last_name }}
                            </div>
                        </div>
                        <transition name="slideAlt">
                            <ul class="user_dropdown_list" v-if="showList">
                                <li class="user_dropdown_item">
                                    <nuxt-link to="/my-profile" class="item_link">View My Profile</nuxt-link>
                                </li>
                                <li class="user_dropdown_item">
                                    <div class="item_link" @click="checkUser()">Account Settings</div>
                                </li>
                                <li class="user_dropdown_item">
                                    <div class="item_link red" @click="logout()">Signout</div>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="nav_burger" @click="toggleNavbarExpanded()">
                <div class="bar top_line"></div>
                <div class="bar middle_line"></div>
                <div class="bar bottom_line"></div>
                <div class="excess_line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                height: 0,
                showList: false,
                advisory: null,
                first_name: '',
                last_name: '',
                user: {
                    customer_details: {
                        images: [
                            {
                                path: ''
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.articleAlertStatus = false
                document.getElementById('header').style.top = `${0}px`

                if (document.querySelector('.login_sign_up')) {
                    document.querySelector('.login_sign_up').style.marginTop = `${document.getElementById('header').scrollHeight}px`
                } else if (document.getElementById('complete_profile')) {
                    document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('complete_profile').scrollHeight}px`

                    document.getElementById('complete_profile').style.top = `${document.getElementById('header').scrollHeight}px`
                } else if (document.getElementById('instructors_nav')) {
                    document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('instructors_nav').scrollHeight}px`

                    document.getElementById('instructors_nav').style.top = `${document.getElementById('header').scrollHeight}px`
                } else if (document.getElementById('banner')) {
                    document.getElementById('banner').style.marginTop = `${document.getElementById('header').scrollHeight}px`
                } else if (document.querySelector('.buy_rides.inner') || document.querySelector('.book_a_bike.inner')) {
                    if (me.$store.state.articleAlertStatus && !me.$store.state.proTipStatus) {
                        document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('pro_tip').scrollHeight}px`
                    } else if (!me.$store.state.articleAlertStatus && me.$store.state.proTipStatus) {
                        document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight + document.getElementById('article_alert').scrollHeight}px`
                        document.getElementById('pro_tip').style.top = `${document.getElementById('header').scrollHeight}px`
                    } else {
                        document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight}px`
                    }
                } else {
                    document.getElementById('breadcrumb').style.paddingTop = `${document.getElementById('header').scrollHeight}px`
                }


            },
            checkUser () {
                const me = this
                if (me.user.new_user == 1) {
                    me.$store.state.completeProfileStepsStatus = true
                    document.body.classList.add('no_scroll')
                } else {
                    me.$router.push(`/my-profile/update-profile`)
                }
            },
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
                setTimeout( () => {
                    if (me.advisory != null) {
                        if (me.$store.state.articleAlertStatus) {
                            document.getElementById('header').style.top = `${document.getElementById('article_alert').scrollHeight}px`
                        } else {
                            document.getElementById('header').style.top = `${0}px`
                        }
                    }
                }, 100)
            },
            fetchAdvisory () {
                const me = this
                me.$axios.get('api/web/advisory').then(res => {
                    if (res.data.advisory != null) {
                        me.advisory = res.data.advisory
                        setTimeout( () => {
                            if (me.$store.state.articleAlertStatus) {
                                document.getElementById('header').style.top = `${document.getElementById('article_alert').scrollHeight}px`
                            } else {
                                document.getElementById('header').style.top = `${0}px`
                            }
                        }, 100)
                    }
                })
            }
        },
        mounted () {
            const me = this
            let token = me.$cookies.get('70hokc3hhhn5')
            if (token != null && token != undefined) {
                me.$axios.get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        me.user = res.data.user
                        me.first_name = me.user.first_name.charAt(0)
                        me.last_name = me.user.last_name.charAt(0)
                    }
                })
            }
            me.windowScroll()
            me.fetchAdvisory()
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
