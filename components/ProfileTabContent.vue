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
                            <div class="class_wrapper" v-for="(data, key) in classes" :key="key">
                                <div class="overlay">
                                    <div class="menu_dot" @click="toggleMenuDot(key)">&#9679; &#9679; &#9679;</div>
                                    <transition name="slideAlt">
                                        <ul class="menu_dot_list" v-if="data.toggled">
                                            <li class="menu_dot_item">Manage Class</li>
                                            <li class="menu_dot_item red">Cancel Class</li>
                                        </ul>
                                    </transition>
                                </div>
                                <div class="top">
                                    <div class="left">
                                        <div class="date">
                                            <div class="day">{{ data.date.day }}</div>
                                            <div class="month">{{ data.date.month }}</div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <h3 class="title">{{ data.title }}</h3>
                                        <div class="violator" v-if="data.has_violator">Today</div>
                                        <div class="schedule">{{ data.schedule }}</div>
                                        <div class="schedule">Bikes: {{ data.bike }}</div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <img src="/sample-image-booker.png" />
                                    <div class="right">
                                        <div class="label">Instructor</div>
                                        <h3 class="name">{{ data.instructor.name }}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_2" class="wrapper" v-if="category == 'packages'">
                <div id="default_menu">
                    <ul class="menu_tab">
                        <li :class="`menu_tab_item ${(tabCategory == 'active') ? 'active' : ''}`" @click="toggledMenuTab('active')">Active</li>
                        <li :class="`menu_tab_item ${(tabCategory == 'expired') ? 'active' : ''}`" @click="toggledMenuTab('expired')">Expired</li>
                    </ul>
                    <div class="menu_tab_content">
                        <div class="profile_packages">
                            <table class="default_table">
                                <thead>
                                    <tr>
                                        <th>Packages</th>
                                        <th>Used</th>
                                        <th>Available</th>
                                        <th>Purchase</th>
                                        <th>Activation</th>
                                        <th>Expiry</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, key) in packages" :key="key">
                                        <td>
                                            <div class="package_info">
                                                <div class="count">
                                                    <div class="overlay">{{ data.package.count }}</div>
                                                </div>
                                                <div class="title">
                                                    {{ data.package.name }}
                                                    <div :class="`violator ${data.violator.class}`" v-if="data.violator != null">{{ data.violator.title }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><div class="default">{{ data.used }}</div></td>
                                        <td><div class="default">{{ data.available }}</div></td>
                                        <td>
                                            <div class="default">{{ data.purchase_date }}</div>
                                            <div class="label">Date Purchased</div>
                                        </td>
                                        <td>
                                            <div class="default">{{ data.activation_date }}</div>
                                            <div class="label">Date Activated</div>
                                        </td>
                                        <td>
                                            <div class="default">{{ data.expiry_date }}</div>
                                            <div class="label">Date of Expiry</div>
                                        </td>
                                        <td>
                                            <div class="table_menu_overlay">
                                                <div class="table_menu_dots" @click="toggleTableMenuDot(key)">&#9679; &#9679; &#9679;</div>
                                                <transition name="slideAlt">
                                                    <ul class="table_menu_dots_list" v-if="data.toggled">
                                                        <li class="table_menu_item">Share Package</li>
                                                        <li class="table_menu_item">Transfer Package</li>
                                                    </ul>
                                                </transition>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                tabCategory: '',
                classes: [
                    {
                        date: {
                            day: 15,
                            month: 'APR'
                        },
                        title: 'Michael Buble x Jose Mari Chan Holiday Theme Ride',
                        has_violator: true,
                        schedule: '12:15 PM at Greenbelt 5',
                        bike: 15,
                        instructor: {
                            name: 'Billie Capistrano'
                        },
                        toggled: false
                    },
                    {
                        date: {
                            day: 15,
                            month: 'APR'
                        },
                        title: '50 Minute Ride',
                        has_violator: false,
                        schedule: '12:15 PM at Greenbelt 5',
                        bike: 15,
                        instructor: {
                            name: 'Billie Capistrano'
                        },
                        toggled: false
                    },
                    {
                        date: {
                            day: 15,
                            month: 'APR'
                        },
                        title: 'Black Eyed Peas Theme Ride',
                        has_violator: false,
                        schedule: '12:15 PM at Greenbelt 5',
                        bike: 15,
                        instructor: {
                            name: 'Billie Capistrano'
                        },
                        toggled: false
                    }
                ],
                packages: [
                    {
                        package: {
                            count: 15,
                            name: '15-Class Package'
                        },
                        violator: null,
                        used: 3,
                        available: 12,
                        purchase_date: 'Apr 4, 2019',
                        activation_date: 'Apr 8, 2019',
                        expiry_date: 'May 15, 2019',
                        toggled: false
                    },
                    {
                        package: {
                            count: 15,
                            name: '5-Class Package'
                        },
                        violator: {
                            title: 'Shared with Ben Stiller',
                            class: 'shared'
                        },
                        used: 3,
                        available: 12,
                        purchase_date: 'Apr 4, 2019',
                        activation_date: 'Apr 8, 2019',
                        expiry_date: 'May 15, 2019',
                        toggled: false
                    },
                    {
                        package: {
                            count: 15,
                            name: '15-Class Package'
                        },
                        violator: {
                            title: 'Ben Stiller Shared with me',
                            class: 'shared_with_me'
                        },
                        used: 3,
                        available: 12,
                        purchase_date: 'Apr 4, 2019',
                        activation_date: 'Apr 8, 2019',
                        expiry_date: 'May 15, 2019',
                        toggled: false
                    }
                ]
            }
        },
        methods: {
            getHeight () {
                const me = this
                setTimeout( () => {
                    me.height = document.getElementById(`tab_${me.unique}`).scrollHeight
                }, 10)
            },
            toggleTableMenuDot (key) {
                const me = this
                me.packages.forEach((data, index) => {
                    if (key == index) {
                        if (data.toggled) {
                            data.toggled = false
                        } else {
                            data.toggled = true
                        }
                    } else {
                        data.toggled = false
                    }
                })
            },
            toggleMenuDot (key) {
                const me = this
                me.classes.forEach((data, index) => {
                    if (key == index) {
                        if (data.toggled) {
                            data.toggled = false
                        } else {
                            data.toggled = true
                        }
                    } else {
                        data.toggled = false
                    }
                })
            },
            toggledMenuTab (category) {
                const me = this
                me.tabCategory = category
            },
            toggleOverlays (e) {
                const me = this
                let target = e.target
                let elements_first = document.querySelectorAll('.menu_dot')
                me.classes.forEach((data, index) => {
                    if (target !== elements_first[index] && target.parentNode.previousElementSibling !== elements_first[index]) {
                        data.toggled = false
                    }
                })
            }
        },
        mounted () {
            const me = this
            me.getHeight()
        },
        beforeMount () {
            window.addEventListener('load', this.getHeight)
            window.addEventListener('resize', this.getHeight)
            document.addEventListener('click', this.toggleOverlays)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.getHeight)
            window.removeEventListener('load', this.getHeight)
            document.removeEventListener('click', this.toggleOverlays)
        }
    }
</script>
