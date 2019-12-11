<template>
    <div id="header" :class="`${($route.fullPath == '/') ? 'front' : 'not_front'}`">
        <div class="navbar">
            <nuxt-link to="/" class="logo">
                <img src="/logo.svg" />
                <div class="logo_title">
                    Ride <br/>
                    Revolution
                </div>
            </nuxt-link>
            <ul class="nav_list">
                <li>
                    <nuxt-link to="/" class="nav_item">Buy Rides</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/" class="nav_item">Book a Ride</nuxt-link>
                </li>
                <li>
                    <a href="javascript:void(0)" class="default_btn">Login / Sign up</a>
                </li>
            </ul>
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
            }
        },
        methods: {
            toggleNavbarExpanded () {
                const me = this
                me.$store.state.isExpanded = true
                document.body.classList.add('no_scroll')
            },
            windowScroll() {
                let height = window.pageYOffset | document.body.scrollTop
                let element = document.querySelector('#header')
                if (element.classList.contains('not_front')) {
                    if (height > 100) {
                        element.classList.add('sticky')
                    } else {
                        element.classList.remove('sticky')
                    }
                } else {
                    if (height >= 200) {
                        element.classList.add('sticky')
                    } else {
                        element.classList.remove('sticky')
                    }
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
