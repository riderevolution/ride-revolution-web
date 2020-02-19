<template>
    <div class="profile_tab_content" :style="`height: ${height}px`">
        <transition name="fade">
            <div id="tab_0" class="journey wrapper" v-if="category == 'ride-rev-journey'">
                <div class="profile_journey">
                    <div class="teaser">
                        <div class="taken">
                            <div class="summary">
                                <div class="summary_header">
                                    <h3>You've Taken...</h3>
                                </div>
                                <div class="summary_content">
                                    <div class="class_stat">
                                        <div class="class_count">115 Classes</div>
                                        <div class="class_date">In 1 Year and 2 Months</div>
                                    </div>
                                    <div class="motto">
                                        “You may say I’m a dreamer, but I’m not the only one.” - John Lennon
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="badges_earned">
                            <div class="summary">
                                <div class="summary_header alt">
                                    <h3>Badges You've Earned, Woohoo!</h3>
                                    <div class="icon">
                                        <img src="/icons/info-booker-icon.svg" @click="toggleInfoIcon($event, 'ride-rev-journey')" />
                                        <transition name="slide">
                                            <div class="description_overlay" v-if="showInfoBadges">
                                                <div class="pointer"></div>
                                                <p>To show how much we love you, we will give you <b>30-Class Package</b> for free if you complete all 10 badges.</p>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                                <div class="summary_content">
                                    <div class="left">
                                        <div class="badge">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                        <div class="badge">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                        <div class="badge disabled">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                        <div class="badge disabled">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                        <div class="badge disabled">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="badge disabled">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                        <div class="badge disabled">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                        <div class="badge disabled">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                        <div class="badge disabled">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                        <div class="badge disabled">
                                            <img src="/sample-badge.svg" />
                                            <span>Ride back to back classes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="top_booked">
                        <div class="tab_content_header alt2">
                            <h2>Your Top Booked Instructors</h2>
                        </div>
                        <div class="tab_content_main">
                            <div class="instructor">
                                <div :id="`item_${key}`" class="wrapper" v-for="(data, key) in topInstructors" :key="key">
                                    <div class="cover" @mouseover.self="toggleInstructor('in', key)" @mouseleave.self="toggleInstructor('out', key)"></div>
                                    <img class="main" :src="data.path" />
                                    <transition name="fade">
                                        <div class="num_wrapper" v-if="!data.hovered"><div class="num">{{ key + 1 }}</div></div>
                                    </transition>
                                    <transition name="slide">
                                        <div class="overlay" v-if="data.hovered">
                                            <div class="info">
                                                <div class="num_wrapper_alt">
                                                    <div class="num">
                                                        {{ key + 1 }}
                                                    </div>
                                                </div>
                                                <div class="name">{{ data.name }}</div>
                                            </div>
                                            <div class="rides">{{ data.ride }} rides</div>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chart">
                        <div class="tab_content_header alt3">
                            <h2>Your Top Booked Instructors</h2>
                            <ul class="tab_content_header_menu">
                                <li :class="`header_menu_tab_item ${(tabChartCategory == 'weekly') ? 'active' : ''}`" @click="toggledChartMenuTab('weekly')">Weekly</li>
                                <li :class="`header_menu_tab_item ${(tabChartCategory == 'monthly') ? 'active' : ''}`" @click="toggledChartMenuTab('monthly')">Monthly</li>
                            </ul>
                        </div>
                        <div class="ride_chart">
                            <no-ssr>
                                <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
                            </no-ssr>
                        </div>
                        <div class="ride_summary">
                            <div class="left">
                                <div class="value">35</div>
                                <div class="label">Rides in the past 30 days</div>
                            </div>
                            <div class="right">
                                <div class="value">Thurs 6:30 PM</div>
                                <div class="label">Favorite Timeslot</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                            <div :class="`label ${(data.will_expire) ? 'violator' : ''}`">{{ (data.will_expire) ? '2 Days Left' : 'Date of Expiry' }}</div>
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
        <transition name="fade">
            <div id="tab_3" class="default wrapper" v-if="category == 'transactions'">
                <div class="profile_transactions">
                    <div class="tab_content_header alt">
                        <h2>My Pending Transactions ({{ totalItems(pendingTransactions.length) }})</h2>
                        <div class="total">
                            Total Due
                            <span class="count">Php 105.00</span>
                            <img src="/icons/info-booker-icon.svg" @click="toggleInfoIcon($event, 'transactions')" />
                            <transition name="slide">
                                <div class="description_overlay" v-if="showInfoTransactions">
                                    <div class="pointer"></div>
                                    <p>Please pay this balance to our studio cashiers. Thank you so much!</p>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <table class="default_table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Products</th>
                                <th>Branch</th>
                                <th>Total Price</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, key) in pendingTransactions" :key="key">
                                <td><div class="default">{{ data.date }}</div></td>
                                <td><div class="default" v-for="(child, key) in data.products" :key="key">{{ child.name }}({{ child.qty }})</div></td>
                                <td>
                                    <div class="default">{{ data.branch }}</div>
                                </td>
                                <td>
                                    <div class="default bold">Php {{ data.total_price }}</div>
                                </td>
                                <td>
                                    <div :class="`label ${(data.is_paid) ? 'violator paid' : 'violator pending'}`">{{ (data.is_paid) ? 'Paid' : 'Pending' }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="profile_transactions">
                    <div class="tab_content_header alt">
                        <h2>My Closed Transactions</h2>
                    </div>
                    <table class="default_table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Products</th>
                                <th>Branch</th>
                                <th>Total Price</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, key) in paidTransactions" :key="key">
                                <td><div class="default">{{ data.date }}</div></td>
                                <td><div class="default" v-for="(child, key) in data.products" :key="key">{{ child.name }}({{ child.qty }})</div></td>
                                <td>
                                    <div class="default">{{ data.branch }}</div>
                                </td>
                                <td>
                                    <div class="default bold">Php {{ data.total_price }}</div>
                                </td>
                                <td>
                                    <div :class="`label ${(data.is_paid) ? 'violator paid' : 'violator pending'}`">{{ (data.is_paid) ? 'Paid' : 'Pending' }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_4" class="with_allowance wrapper" v-if="category == 'gift-cards'">
                <div class="tab_content_header">
                    <div class="with_info">
                        <h2>
                            Gift Cards send to me
                            <img src="/icons/info-booker-icon.svg" @click="toggleInfoIcon($event, 'gift-cards')" />
                        </h2>
                        <transition name="slide">
                            <div class="description_overlay" v-if="showInfoGiftCards">
                                <div class="pointer"></div>
                                <p>You have 30 days to activate your package. Class package expiry will start on the date of activation.</p>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="tab_content_main">
                    <div class="profile_gift_cards">
                        <div class="gift_card_wrapper" v-for="(data, key) in giftCards" :key="key">
                            <div class="top">
                                <img :src="data.path" />
                                <div class="overlay">
                                    <img class="gift_img" src="/sample-image-booker.png" v-if="data.from.has_image" />
                                    <div class="initials" v-else>
                                        <div class="name">{{ data.from.initials }}</div>
                                    </div>
                                    <div class="label">From {{ data.from.name }}</div>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="details" v-html="data.details" v-line-clamp="3"></div>
                                <div class="package_info">
                                    <div class="name">
                                        {{ data.package.name }}
                                        <div class="violator" v-if="data.has_violator">You still have this package</div>
                                    </div>
                                    <div :class="`default_btn ${(data.has_violator) ? 'disabled' : ''}`">Use Now</div>
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
                showInfoBadges: false,
                showInfoTransactions: false,
                showInfoGiftCards: false,
                height: 0,
                unique: 0,
                tabCategory: '',
                tabChartCategory: 'monthly',
                topInstructors: [
                    {
                        path: '/default/instructor/sample-instructor.png',
                        name: 'Billie',
                        ride: 20,
                        hovered: false
                    },
                    {
                        path: '/default/instructor/sample-instructor.png',
                        name: 'Billie',
                        ride: 20,
                        hovered: false
                    },
                    {
                        path: '/default/instructor/sample-instructor.png',
                        name: 'Billie',
                        ride: 20,
                        hovered: false
                    },
                    {
                        path: '/default/instructor/sample-instructor.png',
                        name: 'Billie',
                        ride: 20,
                        hovered: false
                    },
                    {
                        path: '/default/instructor/sample-instructor.png',
                        name: 'Billie',
                        ride: 20,
                        hovered: false
                    }
                ],
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
                        will_expire: false,
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
                        will_expire: false,
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
                        will_expire: true,
                        expiry_date: 'May 15, 2019',
                        toggled: false
                    }
                ],
                pendingTransactions: [
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            }
                        ],
                        is_paid: false,
                        branch: 'Greenbelt',
                        total_price: '70.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            }
                        ],
                        is_paid: false,
                        branch: 'Greenbelt',
                        total_price: '70.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            },
                            {
                                name: 'Fitbar',
                                qty: 2
                            },
                            {
                                name: 'Pure Nectar Cashew Milk',
                                qty: 2
                            }
                        ],
                        is_paid: false,
                        branch: 'Greenbelt',
                        total_price: '450.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            }
                        ],
                        is_paid: false,
                        branch: 'Greenbelt',
                        total_price: '70.00'
                    }
                ],
                paidTransactions: [
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            }
                        ],
                        is_paid: true,
                        branch: 'Greenbelt',
                        total_price: '70.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            }
                        ],
                        is_paid: true,
                        branch: 'Greenbelt',
                        total_price: '70.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            },
                            {
                                name: 'Fitbar',
                                qty: 2
                            },
                            {
                                name: 'Pure Nectar Cashew Milk',
                                qty: 2
                            }
                        ],
                        is_paid: true,
                        branch: 'Greenbelt',
                        total_price: '450.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            }
                        ],
                        is_paid: true,
                        branch: 'Greenbelt',
                        total_price: '70.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            }
                        ],
                        is_paid: true,
                        branch: 'Greenbelt',
                        total_price: '70.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            },
                            {
                                name: 'Fitbar',
                                qty: 2
                            },
                            {
                                name: 'Pure Nectar Cashew Milk',
                                qty: 2
                            }
                        ],
                        is_paid: true,
                        branch: 'Greenbelt',
                        total_price: '450.00'
                    },
                    {
                        date: 'Apr 4, 2019, 10:00 AM',
                        products: [
                            {
                                name: 'Hope in a Bottle',
                                qty: 2
                            }
                        ],
                        is_paid: true,
                        branch: 'Greenbelt',
                        total_price: '70.00'
                    }
                ],
                giftCards: [
                    {
                        from: {
                            has_image: true,
                            initials: 'JD',
                            name: 'Juan Dela Cruz'
                        },
                        path: '/sample-gift.png',
                        details: '<b>Happy Birthday</b><p>You’re turning 30 bro but I look much older than you wth!</p>',
                        has_violator: false,
                        package: {
                            name: '10-Class Package'
                        }
                    },
                    {
                        from: {
                            has_image: true,
                            initials: 'JD',
                            name: 'Juan Dela Cruz'
                        },
                        path: '/sample-gift2.png',
                        details: '<b>Happy Birthday</b><p>You’re turning 30 bro but I look much older than you wth!</p>',
                        has_violator: false,
                        package: {
                            name: '10-Class Package'
                        }
                    },
                    {
                        from: {
                            has_image: false,
                            initials: 'JD',
                            name: 'Juan Dela Cruz'
                        },
                        path: '/sample-gift2.png',
                        details: '<b>Happy Birthday</b><p>You’re turning 30 bro but I look much older than you wth!</p>',
                        has_violator: true,
                        package: {
                            name: '10-Class Package'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Ride Count',
                        data: [10, 5, 44, 0, 57, 56, 0, 58, 20, 63, 0, 200]
                    }
                ],
                chartOptions: {
                    responsive: [
                        {
                            breakpoint: 767,
                            options: {
                                plotOptions: {
                                    bar: {
                                        columnWidth: '75%'
                                    }
                                },
                                dataLabels: {
                                    formatter: function (val) {
                                        return `${val}`
                                    },
                                    offsetY: -10,
                                    style: {
                                        colors: ["#171717"],
                                        fontSize: '10px',
                                        fontFamily: 'Brandon-Regular'
                                    }
                                },
                                xaxis: {
                                    labels: {
                                        style: {
                                            colors: ['#000'],
                                            fontSize: '10px',
                                            fontFamily: 'Brandon-Regular'
                                        }
                                    },
                                },
                                yaxis: {
                                    labels: {
                                        style: {
                                            colors: ['#000'],
                                            fontSize: '10px',
                                            fontFamily: 'Brandon-Regular'
                                        }
                                    },
                                    title: {
                                        text: 'Rides',
                                        offsetX: 0,
                                        style: {
                                            colors: ['#000'],
                                            fontSize: '10px',
                                            cssClass: 'apexchart_uppercase'
                                        }
                                    }
                                },
                            },
                        }
                    ],
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    colors: ['#9E558B'],
                    plotOptions: {
                        bar: {
                            columnWidth: '45%',
                            dataLabels: {
                                position: 'top'
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return `${val} rides`
                        },
                        offsetY: -15,
                        style: {
                            fontFamily: 'Brandon-Bold',
                            fontSize: '14px',
                            colors: ["#171717"]
                        }
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    grid: {
                        show: false
                    },
                    xaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: ['#000'],
                                fontSize: '14px',
                                fontFamily: 'Brandon-Regular'
                            }
                        },
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: ['#000'],
                                fontSize: '14px',
                                fontFamily: 'Brandon-Regular'
                            }
                        },
                        title: {
                            text: 'Rides',
                            offsetX: -10,
                            style: {
                                color: '#000',
                                fontSize: '12px',
                                fontFamily: 'Brandon-Bold',
                                cssClass: 'apexchart_uppercase'
                            }
                        }
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            type: 'vertical',
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#FD649C",
                                    opacity: 1
                                },
                                {
                                    offset: 100,
                                    color: "#9E558B",
                                    opacity: 1
                                }
                            ]
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + " rides"
                            }
                        }
                    }
                }
            }
        },
        methods: {
            getHeight () {
                const me = this
                setTimeout( () => {
                    me.height = document.getElementById(`tab_${me.unique}`).scrollHeight
                }, 10)
            },
            // checkWarning (data) {
            //     const me = this
            //     let expiry = me.$moment(data.class_package.computed_expiration_date)
            //     let current = me.$moment()
            //     if (parseInt(expiry.diff(current, 'days')) <= 15) {
            //         me.violator.warning = expiry.diff(current, 'days')
            //         return true
            //     } else {
            //         return false
            //     }
            // },

            toggleInstructor (type, key) {
                const me = this
                switch (type) {
                    case 'in':
                        me.topInstructors.forEach((data, index) => {
                            if (key == index) {
                                document.getElementById(`item_${index}`).classList.add('hovered')
                                data.hovered = true
                            } else {
                                document.getElementById(`item_${index}`).classList.add('not_hovered')
                                data.hovered = false
                            }
                        })
                        break
                    case 'out':
                        me.topInstructors.forEach((data, index) => {
                            if (key == index) {
                                document.getElementById(`item_${index}`).classList.remove('hovered')
                                data.hovered = false
                            } else {
                                document.getElementById(`item_${index}`).classList.remove('not_hovered')
                            }
                        })
                        break
                }
            },
            toggleInfoIcon (event, category) {
                const me = this
                let target = event.target
                let parentWidth = target.parentNode.scrollWidth
                switch (category) {
                    case 'gift-cards':
                        me.showInfoGiftCards ^= true
                        break
                    case 'transactions':
                        me.showInfoTransactions ^= true
                        break
                    case 'ride-rev-journey':
                        me.showInfoBadges ^= true
                        break
                }
                setTimeout( () => {
                    let popUpWidth = target.parentNode.parentNode.querySelector('.description_overlay').scrollWidth
                    if (category == 'gift-cards') {
                        target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = `calc((${popUpWidth}px) - (${parentWidth}px) + 20px)`
                    } else if (category == 'transactions') {
                        target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = `calc((${popUpWidth}px) - (${parentWidth}px) - 20px)`
                    } else if (category == 'ride-rev-journey') {
                        target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = `calc(20px)`
                    }
                }, 100)
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
            toggledChartMenuTab (category) {
                const me = this
                me.tabChartCategory = category
            },
            toggleOverlays (e) {
                const me = this
                let target = e.target
                let info_overlay = document.querySelector('#tab_4 .with_info img')
                let elements_first = document.querySelectorAll('.menu_dot')
                let elements_second = document.querySelectorAll('.table_menu_dots')
                if (target !== info_overlay) {
                    me.showInfoGiftCards = false
                }
                me.classes.forEach((data, index) => {
                    if (target !== elements_first[index] && target.parentNode.previousElementSibling !== elements_first[index]) {
                        data.toggled = false
                    }
                })
                me.packages.forEach((data, index) => {
                    if (target !== elements_second[index] && target.parentNode.previousElementSibling !== elements_second[index]) {
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
