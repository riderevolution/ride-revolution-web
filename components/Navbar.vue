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
                    <div class="user_dropdown">
                        <img src="/sample-image-booker.png" />
                        <h3>Mark Ruffalo</h3>
                    </div>
                </li>
            </ul>
            <div class="nav_login" @click="loginUser()" v-if="$parent.isMobile && !$store.state.isAuth">
                <img src="/icons/login-icon.svg" />
                <div class="background"></div>
            </div>
            <div class="user_dropdown" v-if="$parent.isMobile && $store.state.isAuth">
                <img src="/sample-image-booker.png" />
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
                height: 0
            }
        },
        methods: {
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
                let height = window.pageYOffset | document.body.scrollTop
                let element = document.querySelector('#header')
                if (element.classList.contains('front')) {
                    me.height = height
                }
            },
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
