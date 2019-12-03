<template>
    <div class="navbar_container">
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
            <div class="top_line"></div>
            <div class="middle_line"></div>
            <div class="bottom_line"></div>
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
        }
    }
</script>
