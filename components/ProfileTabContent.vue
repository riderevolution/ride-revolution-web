<template>
    <div class="profile_tab_content" :style="`height: ${height}px`">
        <transition name="fade">
            <div id="tab_0" class="wrapper" v-if="category == 'ride-rev-journey'">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </transition>
        <transition name="fade">
            <div id="tab_1" class="class wrapper" v-if="category == 'classes'">
                <div id="default_menu">
                    <ul class="menu_tab">
                        <li :class="`menu_tab_item ${(tabCategory == 'upcoming') ? 'active' : ''}`" @click="toggledMenuTab('upcoming')">Upcoming</li>
                        <li :class="`menu_tab_item ${(tabCategory == 'waitlisted') ? 'active' : ''}`" @click="toggledMenuTab('waitlisted')">Waitlisted</li>
                        <li :class="`menu_tab_item ${(tabCategory == 'history') ? 'active' : ''}`" @click="toggledMenuTab('history')">History</li>
                    </ul>
                    <div class="menu_tab_content">
                        <div class="profile_classes">
                            <div class="class_wrapper">
                                <div class="top">
                                    <div class="left">
                                        <div class="date">
                                            <div class="day">15</div>
                                            <div class="month">APR</div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <h3 class="title">Michael Buble x Jose Mari Chan Holiday Theme Ride</h3>
                                        <div class="violator">Today</div>
                                        <div class="schedule">12:15 PM at Greenbelt 5</div>
                                        <div class="bike">Bikes: 15</div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <img src="/sample-image-booker.png" />
                                    <div class="right">
                                        <div class="label">Instructor</div>
                                        <h3 class="name">Billie Capistrano</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="class_wrapper">
                                <div class="top">
                                    <div class="left">
                                        <div class="date">
                                            <div class="day">15</div>
                                            <div class="month">APR</div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <h3 class="title">Michael Buble x Jose Mari Chan Holiday Theme Ride</h3>
                                        <div class="schedule">12:15 PM at Greenbelt 5</div>
                                        <div class="bike">Bikes: 15</div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <img src="/sample-image-booker.png" />
                                    <div class="right">
                                        <div class="label">Instructor</div>
                                        <h3 class="name">Billie Capistrano</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="class_wrapper">
                                <div class="top">
                                    <div class="left">
                                        <div class="date">
                                            <div class="day">15</div>
                                            <div class="month">APR</div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <h3 class="title">Michael Buble x Jose Mari Chan Holiday Theme Ride</h3>
                                        <div class="schedule">12:15 PM at Greenbelt 5</div>
                                        <div class="bike">Bikes: 15</div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <img src="/sample-image-booker.png" />
                                    <div class="right">
                                        <div class="label">Instructor</div>
                                        <h3 class="name">Billie Capistrano</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            category: {
                type: String,
                default: 'ride-rev-journey'
            }
        },
        data () {
            return {
                height: 0,
                unique: 0,
                tabCategory: ''
            }
        },
        methods: {
            getHeight () {
                const me = this
                setTimeout( () => {
                    me.height = document.getElementById(`tab_${me.unique}`).scrollHeight
                }, 10)
            },
            toggledMenuTab (category) {
                const me = this
                me.tabCategory = category
            }
        },
        mounted () {
            const me = this
            me.getHeight()
        }
    }
</script>
