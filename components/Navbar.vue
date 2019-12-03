<template>
    <div id="header">
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
        <div class="nav_burger">
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
            windowScroll() {
                let height = window.pageYOffset | document.body.scrollTop,
                    element = document.querySelector('#header')
                if (element.classList.contains('not_front')) {
                    if (height > 100) {
                        element.classList.add('sticky')
                    } else {
                        element.classList.remove('sticky')
                    }
                } else {
                    if (height >= 100) {
                        element.classList.add('sticky')
                    } else {
                        element.classList.remove('sticky')
                    }
                }
            },
        },
        beforeMount () {
            window.addEventListener('scroll', this.windowScroll)
            window.addEventListener('resize', this.windowScroll)
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.windowScroll)
            window.removeEventListener('resize', this.windowScroll)
        }
    }
</script>
