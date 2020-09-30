<template>
    <div class="profile_tab_content" :style="`height: ${height}px`" v-if="$parent.componentLoaded">
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
                                        <div class="class_count">{{ rideRevJourney.classesTaken }} Classes</div>
                                        <div class="class_date">{{ usertoNow }}</div>
                                    </div>
                                    <div class="motto" v-if="rideRevJourney.classesTaken >= 10">{{ checkRideCount(rideRevJourney.classesTaken) }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="badges_earned">
                            <div class="summary">
                                <div class="summary_header alt">
                                    <h3>Here are the RR badges you’ve earned!</h3>
                                    <div class="icon">
                                        <img src="/icons/info-booker-icon.svg" @click="toggleInfoIcon($event, 'ride-rev-journey')" />
                                        <transition name="slide">
                                            <div class="description_overlay" v-if="showInfoBadges">
                                                <div class="pointer"></div>
                                                <p>As a reward, we're giving you a FREE 5-Class Package and limited edition Ride Revolution merchandise when you earn all 10 badges!</p>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                                <div class="summary_content">
                                    <div class="left">
                                        <div :class="`badge ${(badge.progress >= badge.target) ? '' : 'disabled'}`" v-for="(badge, key) in badgeLeft" :key="key">
                                            <img :src="badge.badge_image" />
                                            <span>{{ badge.description }}</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div :class="`badge ${(badge.progress >= badge.target) ? '' : 'disabled'}`" v-for="(badge, key) in badgeRight" :key="key">
                                            <img :src="badge.badge_image" />
                                            <span>{{ badge.description }}</span>
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
                        <div class="tab_content_main" v-if="rideRevJourney.topInstructors.length > 0">
                            <div class="instructor desktop" v-if="!$store.state.isMobile">
                                <div :id="`item_${key}`" class="item" v-for="(data, key) in populateTopInstructors" :key="key">
                                    <div class="cover" @mouseover.self="toggleInstructor('in', key)" @mouseleave.self="toggleInstructor('out', key)"></div>
                                    <img class="main" :src="data.instructor_details.gallery[0].path" :alt="data.instructor_details.images[0].alt" v-if="data.instructor_details.gallery.length > 0" />
                                    <img class="main" src="/logo.svg" :alt="data.instructor_details.slug" v-else />
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
                                                <div class="name">{{ data.instructor_details.nickname }}</div>
                                            </div>
                                            <div class="rides">{{ data.bookCount }} rides</div>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="instructor" v-else>
                                <no-ssr>
                                    <swiper :options="mobileOptions" class="default">
                                        <swiper-slide :id="`item_${key}`" v-for="(data, key) in populateTopInstructors" :key="key">
                                            <div class="item">
                                                <div class="cover"></div>
                                                <img class="main" :src="data.instructor_details.gallery[0].path" :alt="data.instructor_details.images[0].alt" v-if="data.instructor_details.gallery.length > 0" />
                                                <img class="main" src="/logo.svg" :alt="data.instructor_details.slug" v-else />
                                                <transition name="slide">
                                                    <div class="overlay">
                                                        <div class="info">
                                                            <div class="num_wrapper_alt">
                                                                <div class="num">
                                                                    {{ key + 1 }}
                                                                </div>
                                                            </div>
                                                            <div class="name">{{ data.instructor_details.nickname }}</div>
                                                        </div>
                                                        <div class="rides">{{ data.bookCount }} rides</div>
                                                    </div>
                                                </transition>
                                            </div>
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                    </swiper>
                                </no-ssr>
                            </div>
                        </div>
                        <div class="no_results alt pb" v-else>
                            <p>You Have no Rides yet.</p>
                        </div>
                    </div>
                    <div :class="`chart ${(rideRevJourney.topInstructors.length <= 0) ? 'margin' : ''}`">
                        <div class="tab_content_header alt3">
                            <h2>HOW MANY TIMES YOU’VE RIDEN WITH RIDE REV</h2>
                            <ul class="tab_content_header_menu">
                                <li :class="`header_menu_tab_item ${(tabChartCategory == 'weekly') ? 'active' : ''}`" @click="toggledChartMenuTab('weekly')">Weekly</li>
                                <li :class="`header_menu_tab_item ${(tabChartCategory == 'monthly') ? 'active' : ''}`" @click="toggledChartMenuTab('monthly')">Monthly</li>
                            </ul>
                        </div>
                        <div class="ride_chart">
                            <no-ssr>
                                <apexchart height="600" :key="graphKey" :options="chartOptions" :series="series"></apexchart>
                            </no-ssr>
                        </div>
                        <div class="ride_summary">
                            <div class="left">
                                <div class="value">{{ rideRevJourney.ridesForThePast30Days }}</div>
                                <div class="label">Rides in the past 30 days</div>
                            </div>
                            <div class="right">
                                <div class="value">{{ (rideRevJourney.favoriteTimeSlot == null) ? 'N/A' : $moment(rideRevJourney.favoriteTimeSlot, 'hh:mm A').format('h:mm A') }}</div>
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
                        <li :class="`menu_tab_item ${(tabCategory == 'class-history') ? 'active' : ''}`" @click="toggledMenuTab('class-history')">History</li>
                    </ul>
                    <div class="menu_tab_content">
                        <div class="profile_classes" v-if="classes.length > 0">
                            <div class="class_wrapper" v-for="(data, key) in populateClasses" :key="key">
                                <div class="overlay" v-if="!data.history">
                                    <div :class="`menu_dot${(data.toggled) ? ' toggled' : ''}`" @click="toggleMenuDot(key)"></div>
                                    <transition name="slideAlt">
                                        <ul class="menu_dot_list" v-if="data.toggled">
                                            <li class="menu_dot_item" @click="manageClass(data.scheduled_date_id)" v-if="!data.waitlistDateTime">{{ (data.status != 'reserved-guest') ? 'Manage' : 'View' }} Class</li>
                                            <li class="menu_dot_item" @click="manageClass(data.scheduled_date_id)" v-else>View Class</li>
                                            <li class="menu_dot_item red" @click="toggleCancel(data)" v-if="data.status != 'reserved-guest' || data.waitlistDateTime">Cancel Class</li>
                                        </ul>
                                    </transition>
                                </div>
                                <div class="top">
                                    <div class="left">
                                        <div class="date">
                                            <div class="day">{{ $moment(data.scheduled_date.date).format('DD') }}</div>
                                            <div class="month">{{ $moment(data.scheduled_date.date).format('MMM') }}</div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <h3 class="title">{{ (data.scheduled_date.schedule.custom_name != null) ? data.scheduled_date.schedule.custom_name : data.scheduled_date.schedule.class_type.name }}</h3>
                                        <div class="violator" v-if="$moment(data.scheduled_date.date).format('MMMM DD, YYYY') == $moment().format('MMMM DD, YYYY')">Today</div>
                                        <div class="schedule">{{ data.scheduled_date.schedule.start_time }} at {{ data.scheduled_date.schedule.studio.name }}</div>
                                        <div class="schedule" v-if="data.seat && !data.scheduled_date.schedule.studio.online_class">
                                            Bikes: <span class="green">{{ data.seat.number }}</span><span v-for="(guest, key) in data.guestBookings" :key="key" v-if="data.guestBookings.length > 0" class="pink"><span class="separator">, </span>{{ guest.seat.number }}</span>
                                        </div>
                                        <div class="schedule" v-else>
                                            Bikes: <span class="green">-</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <img :src="getInstructorsImageInSchedule(data.scheduled_date)" />
                                    <div class="right">
                                        <div class="label">Instructor</div>
                                        <h3 class="name">{{ getInstructorsInSchedule(data.scheduled_date) }}</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="action">
                                <div v-if="!showLoadedClasses" class="default_btn load" @click="loadMoreClasses()">Load More</div>
                            </div>
                        </div>
                        <div class="no_results" v-else>
                            <div class="text">You don't have any classes.</div>
                            <div class="logo">
                                <img src="/footer-logo.svg" />
                            </div>
                            <nuxt-link to="/book-a-bike" class="default_btn">Book a Class</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_2" class="package wrapper" v-if="category == 'packages'">
                <div id="default_menu">
                    <ul class="menu_tab">
                        <li :class="`menu_tab_item ${(tabCategory == 'active') ? 'active' : ''}`" @click="toggledMenuTab('active')">Active</li>
                        <li :class="`menu_tab_item ${(tabCategory == 'expired') ? 'active' : ''}`" @click="toggledMenuTab('expired')">Expired</li>
                    </ul>
                    <div class="menu_tab_content">
                        <div class="profile_packages">
                            <table class="default_table" v-if="packages.length > 0">
                                <thead>
                                    <tr>
                                        <th>Packages</th>
                                        <th>Used</th>
                                        <th>Available</th>
                                        <th>Purchase</th>
                                        <th>Activation</th>
                                        <th>Expiry {{ (tabCategory == 'expired') ? '/ Consumed On' : '' }}</th>
                                        <th v-if="tabCategory != 'expired'">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, key) in packages" :key="key">
                                        <td data-column="Packages">
                                            <div class="package_info">
                                                <div class="count">
                                                    <div :class="`overlay ${(data.class_package.class_count_unlimited == 1) ? 'infinite' : ''}`">{{ (data.class_package.class_count_unlimited == 1) ? '&#8734;' : data.class_package.class_count }}</div>
                                                </div>
                                                <div class="title">
                                                    {{ data.class_package.name }}
                                                    <div class="violator_list">
                                                        <div class="violator shared" v-if="data.sharedto_user_id != null && !data.sharedby_user">Shared to {{ data.sharedto_user.first_name }} {{ data.sharedto_user.last_name }}</div>
                                                        <div class="violator shared_with_me" v-if="data.sharedto_user_id != null && data.sharedby_user">Shared by {{ data.sharedby_user.first_name }} {{ data.sharedby_user.last_name }}</div>
                                                        <div class="violator froze" v-if="data.frozen">Package is Frozen</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-column="Used"><div class="default">{{ parseInt(data.original_package_count) - parseInt(data.count) }}</div></td>
                                        <td data-column="Available"><div class="default">{{ (data.class_package.class_count_unlimited == 1) ? 'Unlimited' : (parseInt(data.count) == data.original_package_count) ? parseInt(data.original_package_count) : parseInt(data.count) }}</div></td>
                                        <td data-column="Purchase">
                                            <div :class="`${(!$store.state.isMobile) ? '' : 'mobile'}`">
                                                <div class="default">{{ $moment(data.created_at).format('MMM D, YYYY') }}</div>
                                            </div>
                                        </td>
                                        <td data-column="Activation">
                                            <div :class="`${(!$store.state.isMobile) ? '' : 'mobile'}`">
                                                <div class="default">{{ (data.activation_date != 'NA') ? $moment(data.activation_date).format('MMM D, YYYY') : 'N/A' }}</div>
                                            </div>
                                        </td>
                                        <td data-column="Expiry">
                                            <div :class="`${(!$store.state.isMobile) ? '' : 'mobile'}`">
                                                <div class="default">{{ (data.computed_expiration_date == null) ? $moment(data.updated_at).format('MMM D, YYYY') : $moment(data.computed_expiration_date).format('MMM D, YYYY') }}</div>
                                                <div class="label violator" v-if="parseInt($moment(data.computed_expiration_date).diff($moment(), 'days')) <= 15 && tabCategory == 'active'">{{ ($moment(data.computed_expiration_date).diff($moment(), 'days') == 0) ? `${$moment(data.computed_expiration_date).diff($moment(), 'hours')} Hours` : `${$moment(data.computed_expiration_date).diff($moment(), 'days')} Days` }} Left</div>
                                            </div>
                                        </td>
                                        <td data-column="Actions" v-if="!data.expired">
                                            <div class="table_menu_overlay" v-if="data.class_package.por_allow_sharing_of_package || data.class_package.por_allow_transferring_of_package || data.class_package.recurring ">
                                                <div class="table_menu_dots" @click="toggleTableMenuDot(key)">&#9679; &#9679; &#9679;</div>
                                                <transition name="slideAlt">
                                                    <ul class="table_menu_dots_list" v-if="data.toggled">
                                                        <li class="table_menu_item" @click="togglePackage(data, 'share')" v-if="data.class_package.por_allow_sharing_of_package && data.sharedto_user_id == null">Share Package</li>
                                                        <li class="table_menu_item" @click="togglePackage(data, 'unshare')" v-else-if="data.class_package.por_allow_sharing_of_package && data.sharedto_user_id != null">Unshare Package</li>
                                                        <li v-if="data.class_package.por_allow_transferring_of_package && !data.frozen && data.sharedto_user_id == null" class="table_menu_item" @click="togglePackage(data, 'transfer')">Transfer Package</li>
                                                        <li v-if="data.class_package.recurring" class="table_menu_item cancel" @click="togglePackage(data, 'subscribe')">Cancel Subscription</li>
                                                    </ul>
                                                </transition>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="no_results" v-else>
                                <div class="text">You don't have any packages.</div>
                                <div class="logo">
                                    <img src="/footer-logo.svg" />
                                </div>
                                <nuxt-link to="/buy-rides" class="default_btn">Buy Credits</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_3" class="default wrapper" v-if="category == 'transactions'">
                <div class="profile_transactions">
                    <div class="tab_content_header alt">
                        <h2>My Transactions ({{ totalItems(transactions.total) }})</h2>
                        <div class="total" v-if="totalPendingPayment > 0">
                            Total Due
                            <span class="count">Php {{ totalCount(totalPendingPayment) }}</span>
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
                                <th>Quantity</th>
                                <th>Origin</th>
                                <th>Total Price</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody v-if="transactions.data.length > 0">
                            <tr v-for="(data, key) in transactions.data" :key="key">
                                <td data-column="Date"><div class="default">{{ $moment(data.created_at).format('MMMM DD, YYYY') }}</div></td>
                                <td data-column="Products">
                                    <div>
                                        <div class="default" v-for="(child, key) in data.payment_items" :key="key">
                                            <b>{{ (child.type == 'custom-gift-card') ? 'Digital Gift Card - ' : (child.type == 'physical-gift-card' ? 'Physical Gift Card - ' : '') }}</b> {{ (child.product_variant) ? `${child.product_variant.product.name} ${child.product_variant.variant}` : (child.class_package ? child.class_package.name : (child.store_credit ? child.store_credit.name : child.gift_card.card_code )) }}
                                        </div>
                                    </div>
                                </td>
                                <td data-column="Quantity">
                                    <div>
                                        <div class="default" v-for="(child, key) in data.payment_items" :key="key">
                                            <b>{{ child.quantity }}</b>
                                        </div>
                                    </div>
                                </td>
                                <td data-column="Origin">
                                    <div class="default">{{ (data.studio) ? data.studio.name : 'Website/App' }}</div>
                                </td>
                                <td data-column="Total Price">
                                    <div class="default bold">Php {{ totalCount(data.total) }}</div>
                                </td>
                                <td data-column="Payment Status">
                                    <div :class="`label ${(data.status == 'paid') ? 'violator paid' : 'violator pending'}`">{{ (data.status == 'paid') ? 'Paid' : 'Pending' }}</div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody class="no_results" v-else>
                            <td class="text" colspan="6">You don't have any transactions yet.</td>
                        </tbody>
                    </table>
                    <pagination :apiRoute="transactions.path" :current="transactions.current_page" :last="transactions.last_page" v-if="transactions.data.length > 0" />
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div id="tab_4" class="with_allowance wrapper" v-if="category == 'gift-cards'">
                <div class="tab_content_header">
                    <div class="with_info flex">
                        <h2>
                            Gift Cards sent to me
                            <img src="/icons/info-booker-icon.svg" @click="toggleInfoIcon($event, 'gift-cards')" />
                        </h2>
                        <transition name="slide">
                            <div class="description_overlay" v-if="showInfoGiftCards">
                                <div class="pointer"></div>
                                <p>You have 30 days to activate your package. Class package expiry will start on the date of activation.</p>
                            </div>
                        </transition>
                        <nuxt-link to="/buy-rides/digital-gift-card" class="default_btn" v-if="!$store.state.isMobile">Buy a Gift Card</nuxt-link>
                    </div>
                </div>
                <div class="tab_content_main">
                    <div class="profile_gift_cards" v-if="giftCards.length > 0">
                        <div class="gift_card_wrapper" v-for="(data, key) in giftCards" :key="key">
                            <div class="top">
                                <img :src="data.images[0].path" :alt="data.images[0].alt" />
                                <div class="overlay">
                                    <img class="gift_img" :src="data.fromUserImages[0].path" v-if="data.fromUserImages[0].path != null" />
                                    <div class="initials" v-else>
                                        <div class="name">{{ data.fromUser.first_name.charAt(0) }}{{ data.fromUser.last_name.charAt(0) }}</div>
                                    </div>
                                    <div class="label">From {{ data.fromUser.first_name }} {{ data.fromUser.last_name }}</div>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="details">
                                    <b>{{ data.title }}</b>
                                    <p>{{ data.personal_message }}</p>
                                </div>
                                <div class="package_info">
                                    <div class="name">
                                        {{ data.gift_card.class_package.name }}<br />
                                        <div class="violator" v-html="data.gift_card.class_package.gift_card_description"></div>
                                    </div>
                                    <div class="default_btn" @click="toggleRedeem(data)">Use Now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="no_results" v-if="giftCards.length == 0">
                        <div class="text">You don't have any gift cards.</div>
                        <div class="logo">
                            <img src="/footer-logo.svg" />
                        </div>
                        <!-- <nuxt-link to="/buy-rides/digital-gift-card" class="default_btn">Digital Gift Card</nuxt-link> -->
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <cancel-class v-if="$store.state.cancelClassStatus" :type="type" />
        </transition>
        <transition name="fade">
            <cancel-subscription v-if="cancel_subs" :user_package_count="target_package" :type="sub_type" />
        </transition>
        <transition name="fade">
            <redeem-gift-card v-if="$store.state.redeemGiftCardStatus" :type="type" :giftCard="giftCardTemp" />
        </transition>
        <transition name="fade">
            <redeem-gift-card-success v-if="$store.state.redeemGiftCardSuccessStatus" :giftCard="giftCardTemp" />
        </transition>
        <transition name="fade">
            <share-transfer-package v-if="$store.state.shareTransferPackageStatus" :category="packageCategory" :data="shareTransferPackage" />
        </transition>
        <transition name="fade">
            <unshare-package-prompt v-if="$store.state.unSharePackageStatus" :data="shareTransferPackage" />
        </transition>
        <transition name="fade">
            <booker-prompt v-if="$store.state.bookerPromptStatus" :message="promptMessage" />
        </transition>
    </div>
</template>

<script>
    import CancelClass from './modals/CancelClass'
    import CancelSubscription from './modals/CancelSubscription'
    import RedeemGiftCard from './modals/RedeemGiftCard'
    import RedeemGiftCardSuccess from './modals/RedeemGiftCardSuccess'
    import ShareTransferPackage from './modals/ShareTransferPackage'
    import UnsharePackagePrompt from './modals/UnsharePackagePrompt'
    import BookerPrompt from './modals/BookerPrompt'
    import Pagination from './Pagination'
    export default {
        components: {
            CancelClass,
            CancelSubscription,
            RedeemGiftCard,
            RedeemGiftCardSuccess,
            ShareTransferPackage,
            UnsharePackagePrompt,
            BookerPrompt,
            Pagination
        },
        props: {
            category: {
                type: String,
                default: 'ride-rev-journey'
            }
        },
        data () {
            return {
                toShow: 12,
                showLoadedClasses: false,
                promptMessage: '',
                rideRevJourney: {
                    badges: [],
                    classesTaken: 0,
                    favoriteTimeSlot: null,
                    monthlyRideCount: {},
                    ridesForThePast30Days: 0,
                    topInstructors: [],
                    weeklyRideCount: {}
                },
                shareTransferPackage: [],
                graphKey: 0,
                usertoNow: this.$moment().toNow(),
                totalPendingPayment: 0,
                user: null,
                tempBooking: null,
                giftCardTemp: [],
                mobileOptions: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        465: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        }
                    }
                },
                violator: {
                    warning: 0,
                    shared: 0,
                    transferred: 0,
                    freeze: 0,
                },
                packageCategory: 'transfer',
                type: 1,
                sub_type: 1,
                cancel_subs: false,
                showInfoBadges: false,
                showInfoTransactions: false,
                showInfoGiftCards: false,
                height: 0,
                unique: 0,
                tabCategory: '',
                tabChartCategory: 'monthly',
                classes: [],
                packages: [],
                target_package: [],
                transactions: {
                    total: 0,
                    data: []
                },
                giftCards: [],
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
                                chart: {
                                    type: 'bar',
                                    height: 350
                                },
                                plotOptions: {
                                    bar: {
                                        columnWidth: '100%'
                                    }
                                },
                                dataLabels: {
                                    formatter: function (val) {
                                        return `${val}`
                                    },
                                    offsetY: -10,
                                    style: {
                                        colors: ["#171717"],
                                        fontSize: '8px',
                                        fontFamily: 'Brandon-Regular'
                                    }
                                },
                                xaxis: {
                                    labels: {
                                        style: {
                                            colors: ['#000'],
                                            fontSize: '8px',
                                            fontFamily: 'Brandon-Regular'
                                        }
                                    },
                                },
                                yaxis: {
                                    tickAmount: 1,
                                    labels: {
                                        formatter: function (val) {
                                            return val.toFixed(0)
                                        },
                                        style: {
                                            colors: ['#000'],
                                            fontSize: '8px',
                                            fontFamily: 'Brandon-Regular'
                                        }
                                    },
                                    title: {
                                        text: 'Rides',
                                        offsetX: 0,
                                        style: {
                                            colors: ['#000'],
                                            fontSize: '8px',
                                            cssClass: 'apexchart_uppercase'
                                        }
                                    }
                                },
                            },
                        }
                    ],
                    chart: {
                        type: 'bar',
                        height: 350,
                        toolbar: {
                            show: false
                        },
                    },
                    colors: ['#9E558B'],
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                position: 'top'
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return `${val}`
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
                        show: true
                    },
                    xaxis: {
                        labels: {
                            formatter: function (val) {
                                return `${val}`
                            },
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
                        tickAmount: 1,
                        labels: {
                            show: true,
                            formatter: function (val) {
                                return val.toFixed(0)
                            },
                            style: {
                                colors: ['#000'],
                                fontSize: '14px',
                                fontFamily: 'Brandon-Regular'
                            }
                        },
                        title: {
                            text: 'Rides',
                            offsetX: 0,
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
                                return val
                            }
                        }
                    }
                },
                ctr: 0
            }
        },
        computed: {
            populateClasses () {
                const me = this
                let result = []
                let count = 0
                for (let i = 0; i < me.toShow; i++) {
                    if (me.classes[i]) {
                        count++
                        me.classes[i].checked = true
                        result.push(me.classes[i])
                    }
                }
                if (count == me.classes.length) {
                    me.showLoadedClasses = true
                } else {
                    me.showLoadedClasses = false
                }
                return result
            },
            badgeLeft () {
                const me = this
                let badge = []
                let ctr = 0
                me.rideRevJourney.badges.forEach((data, index) => {
                    if (ctr < 5) {
                        badge.push(data)
                        ctr++
                    }
                })
                return badge
            },
            badgeRight () {
                const me = this
                let badge = []
                let ctr = 0
                me.rideRevJourney.badges.forEach((data, index) => {
                    if (ctr >= 5) {
                        badge.push(data)
                    }
                    ctr++
                })
                return badge
            },
            populateTopInstructors () {
                const me = this
                let result = []
                me.rideRevJourney.topInstructors.forEach((data, index) => {
                    result.push(data)
                })
                return result
            }
        },
        methods: {
            loadMoreClasses () {
                const me = this
                if (!me.showLoadedClasses) {
                    me.toShow += 12
                    me.$scrollTo('.load', {
                        offset: -250
                    })
                }
            },
            getInstructorsImageInSchedule (data) {
                const me = this
                let result = ''
                if (data != '') {
                    let instructor = []
                    data.schedule.instructor_schedules.forEach((ins, index) => {
                        if (ins.primary == 1) {
                            instructor = ins
                        }
                    })
                    result = instructor.user.instructor_details.images[0].path
                }

                return result
            },
            getInstructorsInSchedule (data) {
                const me = this
                let result = ''
                if (data != '') {
                    let ins_ctr = 0
                    let instructor = []
                    data.schedule.instructor_schedules.forEach((ins, index) => {
                        if (ins.substitute == 0) {
                            ins_ctr += 1
                        }
                        if (ins.primary == 1) {
                            instructor = ins
                        }
                    })

                    if (ins_ctr == 2) {
                        result = `${instructor.user.instructor_details.nickname} + ${data.schedule.instructor_schedules[1].user.instructor_details.nickname}`
                    } else {
                        result = `${instructor.user.fullname}`
                    }

                }

                return result
            },
            checkRideCount (count) {
                const me = this
                if (count >= 10 && count <= 19) {
                    return 'You’re making great progress. Let’s keep riding on this journey together.'
                } else if (count >= 20 && count <= 49) {
                    return 'Did you ever think a stationary bike could take you so far? Let’s keep working on your Revolution!'
                } else if (count >= 50 && count <= 99) {
                    return 'Wow you are dedicated to your Revolution! Keep it up!'
                } else if (count >= 100) {
                    return 'You made it to 100! We’re proud to have shared 100 rides with you. To a hundred more and beyond!'
                }
            },
            countVariantQty (items) {
                const me = this
                let ctr = 0
                items.forEach((item, index) => {
                    ctr += parseInt(item.quantity)
                })
                return ctr
            },
            toggleDetails () {
                const me = this
                let target = document.querySelector('#default_menu .toggler')
                if (target) {
                    if (target.parentNode.classList.contains('toggled')) {
                        target.nextElementSibling.style.height = `${0}px`
                        target.parentNode.classList.remove('toggled')
                    } else {
                        target.parentNode.classList.add('toggled')
                        target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
                    }
                }
            },
            manageClass (id) {
                const me = this
                me.$router.push(`/my-profile/manage-class/${id}`)
            },
            togglePackage (data, category) {
                const me = this
                me.packageCategory = category
                me.shareTransferPackage = data
                switch (category) {
                    case 'share':
                    case 'transfer':
                        me.$store.state.shareTransferPackageStatus = true
                        break
                    case 'unshare':
                        me.$store.state.unSharePackageStatus = true
                        break
                    case 'subscribe':
                        me.target_package = data
                        me.cancel_subs = true
                        break
                }
                document.body.classList.add('no_scroll')
            },
            toggleRedeem (data) {
                const me = this
                me.giftCardTemp = data
                me.$store.state.redeemGiftCardStatus = true
                document.body.classList.add('no_scroll')
            },
            getHeight () {
                const me = this
                let interval = ''
                let token = me.$cookies.get('70hokc3hhhn5')
                me.$axios.get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        me.user = res.data.user
                        interval = setInterval( () => {
                            if (document.getElementById(`tab_${me.unique}`)) {
                                me.height = document.getElementById(`tab_${me.unique}`).scrollHeight
                            }
                            me.ctr++
                        }, 500)
                    }
                }).catch(err => {
                    setTimeout( () => {
                        me.$store.state.errorList = err.response.data.errors
                        me.$store.state.errorPromptStatus = true
                    }, 500)
                }).then(() => {
                    if (me.ctr > 0) {
                        clearInterval(interval)
                    }
                })
            },
            // checkWarning (data) {
            //     const me = this
            //     let result = false
            //     let expiry = me.$moment(data.class_package.computed_expiration_date)
            //     let current = me.$moment()
            //     if (parseInt(expiry.diff(current, 'days')) <= 15) {
            //         me.violator.warning = expiry.diff(current, 'days')
            //         result = true
            //     } else {
            //         result = false
            //     }
            //     return result
            // },
            toggleCancel (data) {
                const me = this
                me.tempBooking = data
                me.$store.state.cancelClassStatus = true
                document.body.classList.add('no_scroll')
            },
            toggleCancelled (type = null) {
                const me = this
                if (type != null) {
                    me.sub_type = 2
                    me.cancel_subs = true
                } else {
                    me.type = 2
                    me.$store.state.cancelClassStatus = true
                }
            },
            toggleInstructor (type, key) {
                const me = this
                switch (type) {
                    case 'in':
                        me.rideRevJourney.topInstructors.forEach((data, index) => {
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
                        me.rideRevJourney.topInstructors.forEach((data, index) => {
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
                        target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = (me.$store.state.isMobile) ? `calc((${popUpWidth}px - ${parentWidth}px) / 2)` : `calc((${popUpWidth}px) - (${parentWidth}px) + 20px)`
                    } else if (category == 'transactions') {
                        if (!me.$store.state.isMobile) {
                            target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = `20px`
                        } else {
                            target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = `calc((${popUpWidth}px) - (${parentWidth}px) - 20px)`
                        }
                    } else if (category == 'ride-rev-journey') {
                        target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = (me.$store.state.isMobile) ? `10px` : `20px`
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
                switch (category) {
                    case 'upcoming':
                    case 'waitlisted':
                    case 'class-history':
                        category = (category == 'upcoming') ? 'upcoming-classes' : category
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.user.id}/${category}`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    me.classes = []
                                    switch (category) {
                                        case 'upcoming-classes':
                                            res.data.customer.upcomingClasses.forEach((data, index) => {
                                                data.toggled = false
                                                data.checked = false
                                                me.classes.push(data)
                                            })
                                            break
                                        case 'waitlisted':
                                            res.data.customer.waitlisted.forEach((data, index) => {
                                                data.toggled = false
                                                data.checked = false
                                                me.classes.push(data)
                                            })
                                            break
                                        case 'class-history':
                                            res.data.customer.classHistory.forEach((data, index) => {
                                                data.toggled = false
                                                data.checked = false
                                                data.history = true
                                                me.classes.push(data)
                                            })
                                            break
                                    }
                                }, 10)
                            }
                        }).catch((err) => {
                            setTimeout( () => {
                                me.$store.state.errorList = err.response.data.errors
                                me.$store.state.errorPromptStatus = true
                            }, 500)
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                    case 'active':
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.$parent.user.id}/packages`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    me.packages = []
                                    res.data.customer.user_package_counts.forEach((data, index) => {
                                        if (parseInt(me.$moment(data.computed_expiration_date).diff(me.$moment(), 'seconds')) > 0) {
                                            data.toggled = false
                                            data.expired = false
                                            me.packages.push(data)
                                        }
                                    })
                                }, 10)
                            }
                        }).catch((err) => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                    case 'expired':
                        me.loader(true)
                        me.$axios.get(`api/customers/${me.$parent.user.id}/packages`).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    me.packages = []
                                    res.data.customer.user_package_counts.forEach((data, index) => {
                                        if (parseInt(me.$moment(data.computed_expiration_date).diff(me.$moment(), 'seconds')) <= 0 || data.computed_expiration_date == null) {
                                            data.expired = true
                                            me.packages.push(data)
                                        }
                                    })
                                }, 10)
                            }
                        }).catch((err) => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                        break
                }
            },
            toggledChartMenuTab (category) {
                const me = this
                let series_data = []
                let series_labels = []
                me.tabChartCategory = category
                me.loader(true)
                setTimeout( () => {
                    switch (category) {
                        case 'weekly':
                            for (let i = 0, len = me.rideRevJourney.weeklyRideCount.series.data.length; i < len; i++) {
                                series_data.push(me.rideRevJourney.weeklyRideCount.series.data[i].count)
                                series_labels.push(me.rideRevJourney.weeklyRideCount.series.data[i].date)
                            }
                            me.series[0].data = series_data
                            me.chartOptions.xaxis.categories = series_labels
                            break
                        case 'monthly':
                            for (let i = 0, len = me.rideRevJourney.monthlyRideCount.series.data.length; i < len; i++) {
                                series_data.push(me.rideRevJourney.monthlyRideCount.series.data[i].count)
                                series_labels.push(me.$moment(me.rideRevJourney.monthlyRideCount.series.data[i].month_year, 'MMM YYYY').format('MMM'))
                            }
                            me.series[0].data = series_data
                            me.chartOptions.xaxis.categories = series_labels
                            break
                    }
                    me.graphKey += 1
                    me.loader(false)
                }, 500)
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
                    if (target && (target.parentNode && target.parentNode.previousElementSibling)) {
                        if (target !== elements_first[index] && target.parentNode.previousElementSibling !== elements_first[index]) {
                            data.toggled = false
                        }
                    }
                })
                me.packages.forEach((data, index) => {
                    if (target && (target.parentNode && target.parentNode.previousElementSibling)) {
                        if (target !== elements_second[index] && target.parentNode.previousElementSibling !== elements_second[index]) {
                            data.toggled = false
                        }
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
