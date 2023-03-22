<template lang="html">
  <div v-if="loaded">
    <section
      id="content"
      :class="`${!$store.state.proTipStatus ? 'dismiss' : ''}`"
    >
      <div id="step_1" :class="`step ${step != 1 ? 'overlay' : ''}`">
        <transition name="slideX">
          <div class="flex_step" v-if="step == 1">
            <div class="main_left">
              <div>
                <div class="header">
                  <h2 class="date">
                    {{ $moment(schedule.date).format('MMM DD, YYYY') }}
                  </h2>
                  <h2 class="date">
                    {{ schedule.schedule.start_time }} -
                    {{ schedule.schedule.end_time }}
                  </h2>
                </div>
                <div v-if="!isMobile">
                  <div class="content">
                    <ul>
                      <li>
                        <span>
                          <img class="icon" src="/icons/ride-icon.svg" />
                          {{
                            schedule.schedule.custom_name != null
                              ? schedule.schedule.custom_name
                              : schedule.schedule.class_type.name
                          }}
                        </span>
                      </li>
                      <li>
                        <span>
                          <img class="icon" src="/icons/instructor-icon.svg" />
                          {{ getInstructorsInSchedule(schedule) }}
                        </span>
                      </li>
                      <li>
                        <span>
                          <img class="icon" src="/icons/credit-alt-icon.svg" />
                          {{ schedule.schedule.class_credits }}
                          {{
                            schedule.schedule.class_credits <= 1
                              ? 'Credit'
                              : 'Credits'
                          }}
                        </span>
                      </li>
                      <li>
                        <span>
                          <img class="icon" src="/icons/location-icon.svg" />
                          {{ schedule.schedule.studio.name }}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="description"
                    v-if="!schedule.schedule.studio.online_class"
                    v-html="schedule.schedule.description"
                  ></div>
                  <div
                    class="description"
                    v-if="!schedule.schedule.studio.online_class"
                  >
                    <h3>What else can I do?</h3>
                    <ul>
                      <li>
                        <b>Add a guest.</b>
                        You can book for up to 4 more people using the same
                        account. Non-members will be sent an email invitation to
                        sign up as a member before they can ride.
                      </li>
                      <li>
                        <b>Switch Seats.</b>
                        You can switch any of your booked seats as long as there
                        are vacant bikes available.
                      </li>
                      <li>
                        <b>Switch Class Package.</b>
                        If you have more than one class package you can reselect
                        which one you’d like to use for this class.
                      </li>
                    </ul>
                  </div>
                  <div class="preview" v-if="!schedule.guestHere && manage">
                    <h3 class="preview_title">Booking Summary</h3>
                    <div class="item">
                      <p>Bike No.</p>
                      <p class="right">
                        <span
                          v-for="(number, key) in getAllSeatNumbers"
                          v-html="number"
                        ></span>
                      </p>
                    </div>
                    <div class="item">
                      <p>Class Packages Used</p>
                      <p class="right">
                        <span
                          v-for="(data, key) in getAllPackages"
                          v-html="data"
                        ></span>
                      </p>
                    </div>
                    <div class="total">
                      <p>Consumes</p>
                      <p class="right">
                        {{ ctr * schedule.schedule.class_credits }} Credit/s
                      </p>
                    </div>
                  </div>
                  <div
                    class="waitlisted"
                    v-if="
                      isWaitlisted && !schedule.schedule.studio.online_class
                    "
                  >
                    <div class="label">Waitlisted</div>
                    <div class="user">
                      <div class="name">
                        {{ user.first_name }} {{ user.last_name }}
                      </div>
                      <div class="default_btn_red" @click="cancelWaitlist()">
                        Cancel
                      </div>
                    </div>
                  </div>
                </div>
                <div class="details_toggle" v-else>
                  <div class="toggler" @click.self="toggleDetails($event)">
                    Show Details
                  </div>
                  <div class="toggle_data">
                    <div class="content">
                      <ul>
                        <li>
                          <span>
                            <img class="icon" src="/icons/ride-icon.svg" />
                            {{
                              schedule.schedule.custom_name != null
                                ? schedule.schedule.custom_name
                                : schedule.schedule.class_type.name
                            }}
                          </span>
                        </li>
                        <li>
                          <span>
                            <img
                              class="icon"
                              src="/icons/instructor-icon.svg"
                            />
                            {{ getInstructorsInSchedule(schedule) }}
                          </span>
                        </li>
                        <li>
                          <span>
                            <img
                              class="icon"
                              src="/icons/credit-alt-icon.svg"
                            />
                            {{ schedule.schedule.class_credits }}
                            {{
                              schedule.schedule.class_credits <= 1
                                ? 'Credit'
                                : 'Credits'
                            }}
                          </span>
                        </li>
                        <li>
                          <span>
                            <img class="icon" src="/icons/location-icon.svg" />
                            {{ schedule.schedule.studio.name }}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div
                      class="description"
                      v-if="!schedule.schedule.studio.online_class"
                      v-html="schedule.schedule.description"
                    ></div>
                    <div
                      class="description"
                      v-if="!schedule.schedule.studio.online_class"
                    >
                      <h3>What else can I do?</h3>
                      <ul>
                        <li>
                          <b>Add a guest.</b>
                          You can book for up to 4 more people using the same
                          account. Non-members will be sent an email invitation
                          to sign up as a member before they can ride.
                        </li>
                        <li>
                          <b>Switch Seats.</b>
                          You can switch any of your booked seats as long as
                          there are vacant bikes available.
                        </li>
                        <li>
                          <b>Switch Class Package.</b>
                          If you have more than one class package you can
                          reselect which one you’d like to use for this class.
                        </li>
                      </ul>
                    </div>
                    <div class="preview" v-if="!schedule.guestHere && manage">
                      <h3 class="preview_title">Booking Summary</h3>
                      <div class="item">
                        <p>Bike No.</p>
                        <p class="right">
                          <span
                            v-for="(number, key) in getAllSeatNumbers"
                            v-html="number"
                          ></span>
                        </p>
                      </div>
                      <div class="item">
                        <p>Class Packages Used</p>
                        <p class="right">
                          <span
                            v-for="(data, key) in getAllPackages"
                            v-html="data"
                          ></span>
                        </p>
                      </div>
                      <div class="total">
                        <p>Consumes</p>
                        <p class="right">
                          {{ ctr * schedule.schedule.class_credits }} Credit/s
                        </p>
                      </div>
                    </div>
                    <div
                      class="waitlisted"
                      v-if="
                        isWaitlisted && !schedule.schedule.studio.online_class
                      "
                    >
                      <div class="label">Waitlisted</div>
                      <div class="user">
                        <div class="name">
                          {{ user.first_name }} {{ user.last_name }}
                        </div>
                        <div class="default_btn_red" @click="cancelWaitlist()">
                          Cancel
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="main_right">
              <div class="header">
                <div class="header_left">
                  <nuxt-link
                    to="/book-a-bike"
                    class="back"
                    v-if="!inApp && !manage"
                  >
                    Back
                  </nuxt-link>
                  <nuxt-link
                    :to="
                      `/fish-in-the-glass/book-a-bike?token=${$route.query.token}`
                    "
                    class="back"
                    v-else-if="inApp && !manage"
                  >
                    Back
                  </nuxt-link>
                  <nuxt-link
                    to="/my-profile"
                    class="back"
                    v-else-if="!inApp && manage"
                  >
                    Back
                  </nuxt-link>
                  <nuxt-link
                    :to="
                      `/fish-in-the-glass/book-a-bike?token=${$route.query.token}`
                    "
                    class="back"
                    v-else-if="inApp && manage"
                  >
                    Back
                  </nuxt-link>
                </div>
                <div class="header_right">
                  <div
                    class="default_btn_red"
                    @click="toggleCancel()"
                    v-if="manage && !schedule.guestHere"
                  >
                    Cancel Class
                  </div>
                </div>
              </div>
              <div class="content" :id="`parent_${layout}`">
                <div
                  class="seat_wrapper"
                  v-if="!schedule.schedule.studio.online_class"
                >
                  <div class="overlay_header">
                    <h3>Please choose your bike/s</h3>
                    <h4>
                      Note: You can book up to 5 bikes for regular packages.
                    </h4>
                    <img :src="getInstructorsImageInSchedule(schedule)" />
                  </div>
                  <div
                    :class="`overlay_seat ${seat.position} ${seat.layout}`"
                    v-for="(seat, key) in populateSeats"
                    :key="key"
                  >
                    <div
                      @click="signIn(data)"
                      :class="`seat ${addClass(data)}`"
                      v-for="(data, key) in seat.data"
                      :key="key"
                    >
                      <transition name="fade">
                        <img
                          class="seat_image"
                          :src="
                            data.bookings[0].user.customer_details.images[0]
                              .path
                          "
                          v-if="
                            !isMobile &&
                              data.bookings.length > 0 &&
                              data.bookings[0].user != null &&
                              data.bookings[0].user.customer_details.images[0]
                                .path != null &&
                              user.id == data.bookings[0].original_booker_id &&
                              !schedule.guestHere
                          "
                        />
                      </transition>

                      <transition name="fade">
                        <img
                          class="seat_image"
                          :src="
                            data.bookings[0].user.customer_details.images[0]
                              .path
                          "
                          v-if="
                            !isMobile &&
                              data.bookings.length > 0 &&
                              data.bookings[0].user != null &&
                              data.bookings[0].user.customer_details.images[0]
                                .path != null &&
                              schedule.original_booker_id ==
                                data.bookings[0].original_booker_id &&
                              schedule.guestHere
                          "
                        />
                      </transition>

                      <transition name="fade">
                        <div
                          class="overlay"
                          v-if="
                            !isMobile &&
                              data.bookings.length > 0 &&
                              data.bookings[0].user != null &&
                              data.bookings[0].user.customer_details.images[0]
                                .path == null &&
                              user.id == data.bookings[0].original_booker_id &&
                              !schedule.guestHere
                          "
                        >
                          <div class="letter">
                            {{ data.bookings[0].user.first_name.charAt(0)
                            }}{{ data.bookings[0].user.last_name.charAt(0) }}
                          </div>
                        </div>
                      </transition>

                      <transition name="fade">
                        <div
                          class="overlay"
                          v-if="
                            !isMobile &&
                              data.bookings.length > 0 &&
                              data.bookings[0].user != null &&
                              data.bookings[0].user.customer_details.images[0]
                                .path == null &&
                              schedule.original_booker_id ==
                                data.bookings[0].original_booker_id &&
                              schedule.guestHere
                          "
                        >
                          <div class="letter">
                            {{ data.bookings[0].user.first_name.charAt(0)
                            }}{{ data.bookings[0].user.last_name.charAt(0) }}
                          </div>
                        </div>
                      </transition>

                      <transition name="fade">
                        <div
                          class="overlay"
                          v-if="
                            !isMobile &&
                              data.bookings.length > 0 &&
                              data.bookings[0].user == null &&
                              user.id == data.bookings[0].original_booker_id &&
                              !schedule.guestHere
                          "
                        >
                          <div class="letter">
                            {{ data.bookings[0].guest_first_name.charAt(0)
                            }}{{ data.bookings[0].guest_last_name.charAt(0) }}
                          </div>
                        </div>
                      </transition>

                      <transition name="fade">
                        <div
                          class="overlay"
                          v-if="
                            !isMobile &&
                              data.bookings.length > 0 &&
                              data.bookings[0].user == null &&
                              schedule.original_booker_id ==
                                data.bookings[0].original_booker_id &&
                              schedule.guestHere
                          "
                        >
                          <div class="letter">
                            {{ data.bookings[0].guest_first_name.charAt(0)
                            }}{{ data.bookings[0].guest_last_name.charAt(0) }}
                          </div>
                        </div>
                      </transition>

                      <div class="seat_number">
                        {{ data.number }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="seat_wrapper alt" v-else>
                  <div class="seat_instructor_header">
                    <img :src="getInstructorsImageInSchedule(schedule)" />
                    <div class="seat_instructor_name">
                      {{ getInstructorsInSchedule(schedule) }}
                    </div>
                  </div>
                  <div class="seat_instructor_content">
                    <div
                      class="body"
                      v-html="
                        schedule.schedule.description != null
                          ? schedule.schedule.description
                          : schedule.schedule.class_type.description
                      "
                    ></div>
                    <div
                      class="default_btn"
                      @click="signIn(onlineData)"
                      v-if="
                        $route.name != 'my-profile-manage-class-slug' &&
                          $route.name != 'fish-in-the-glass-manage-class-slug'
                      "
                    >
                      Book this class
                    </div>
                  </div>
                </div>
                <div
                  class="footer"
                  v-if="!schedule.schedule.studio.online_class"
                >
                  <div class="legends">
                    <ul>
                      <li class="available">
                        <span></span>
                        Available
                      </li>
                      <li class="unavailable">
                        <span></span>
                        Unavailable
                      </li>
                      <li class="guest">
                        <span></span>
                        Guest
                      </li>
                      <li class="you">
                        <span></span>
                        You
                      </li>
                    </ul>
                  </div>
                  <transition name="fade">
                    <div class="actions" v-if="cancelSwitchingSeat">
                      <div class="next_wrapper">
                        <div class="left">
                          <div class="flex package">
                            <div
                              class="default_btn_red"
                              @click="chooseSeat('cancel')"
                            >
                              <span>Cancel Switch</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="actions"
                      v-if="
                        !schedule.guestHere &&
                          !isSwitchingSeat &&
                          (manage ? !res.waitlisted : true)
                      "
                    >
                      <transition name="fade">
                        <div class="next_wrapper">
                          <div class="left" v-if="ctr > 0">
                            <div class="flex package">
                              <div
                                class="toggler"
                                v-if="
                                  hasGuest &&
                                    ctr > 1 &&
                                    tempOriginalSeat != null
                                "
                              >
                                <p>Swap seat for:</p>
                                <div class="picker" @click="chooseSeat('swap')">
                                  Bike No. {{ tempOriginalSeat.number }}
                                </div>
                              </div>
                              <div
                                class="default_btn_out"
                                @click="chooseSeat('switch')"
                                v-if="canSwitch"
                              >
                                <span>Switch Seat</span>
                              </div>
                            </div>
                          </div>
                          <div class="left" v-else></div>
                          <div class="right" v-if="!checkPackage">
                            <nuxt-link
                              to="/buy-rides"
                              rel="canonical"
                              class="default_btn"
                              v-if="!inApp"
                            >
                              Buy Credits
                            </nuxt-link>
                            <nuxt-link
                              :to="
                                `/fish-in-the-glass/buy-rides?token=${$route.query.token}`
                              "
                              rel="canonical"
                              class="default_btn"
                              v-else
                            >
                              Buy Credits
                            </nuxt-link>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </section>
    <transition name="fade">
      <booker-assign v-if="$store.state.bookerAssignStatus" />
    </transition>
    <transition name="fade">
      <booker-cancel
        v-if="$store.state.bookerCancelStatus"
        :type="cancelType"
        :seat="tempOriginalSeat"
      />
    </transition>
    <transition name="fade">
      <booker-choose-package
        :seat="dummyData"
        v-if="$store.state.bookerChoosePackageStatus"
        :category="'inner'"
        :type="type"
      />
    </transition>
    <transition name="fade">
      <booker-choose-seat
        :seats="toSubmit.tempSeat"
        v-if="$store.state.bookerChooseSeatStatus"
      />
    </transition>
    <transition name="fade">
      <booker-switch-seat
        :seats="toSubmit.tempSeat"
        v-if="$store.state.bookerSwitchSeatStatus"
      />
    </transition>
    <transition name="fade">
      <booker-assign-member-prompt
        :customer="customer"
        :seat="tempGuestSeat"
        v-if="$store.state.bookerAssignMemberPromptStatus"
      />
    </transition>
    <transition name="fade">
      <booker-assign-member-error
        v-if="$store.state.bookerAssignMemberErrorStatus"
      />
    </transition>
    <transition name="fade">
      <booker-assign-non-member-error
        v-if="$store.state.bookerAssignNonMemberErrorStatus"
      />
    </transition>
    <transition name="fade">
      <booker-assign-non-member
        :email="nonMember.email"
        :nonMember="nonMember"
        :seat="tempGuestSeat"
        v-if="$store.state.bookerAssignNonMemberStatus"
      />
    </transition>
    <transition name="fade">
      <booker-assign-success
        :message="message"
        v-if="$store.state.bookerAssignSuccessStatus"
      />
    </transition>
    <transition name="fade">
      <booker-prompt
        :message="promptMessage"
        v-if="$store.state.bookerPromptStatus"
        :status="status"
        :firstBook="firstBook"
      />
    </transition>
    <transition name="fade">
      <online-prompt v-if="$store.state.onlinePromptStatus" />
    </transition>
    <transition name="fade">
      <booker-remove-booking
        :seat="dummyData"
        v-if="$store.state.bookerRemoveBookingStatus"
      />
    </transition>
    <transition name="fade">
      <booker-success
        v-if="$store.state.buyRidesSuccessStatus"
        :data="instructor"
      />
    </transition>
    <transition name="fade">
      <buy-package-first v-if="$store.state.buyPackageFirstStatus" />
    </transition>
    <transition name="fade">
      <buy-online-package-first
        v-if="$store.state.buyOnlinePackageFirstStatus"
      />
    </transition>
    <transition name="fade">
      <booker-actions
        :seat="dummyData"
        v-if="$store.state.bookerActionsPrompt"
      />
    </transition>
  </div>
  <skeleton
    :page="'default_box'"
    :has_col="false"
    :has_banner="false"
    :layout="'two'"
    v-else
  />
</template>

<script>
  import Skeleton from './Skeleton'
  import BookerAssign from './modals/BookerAssign'
  import BookerCancel from './modals/BookerCancel'
  import BookerChoosePackage from './modals/BookerChoosePackage'
  import BookerChooseSeat from './modals/BookerChooseSeat'
  import BookerSwitchSeat from './modals/BookerSwitchSeat'
  import BookerAssignMemberPrompt from './modals/BookerAssignMemberPrompt'
  import BookerAssignMemberError from './modals/BookerAssignMemberError'
  import BookerAssignNonMemberError from './modals/BookerAssignNonMemberError'
  import BookerAssignNonMember from './modals/BookerAssignNonMember'
  import BookerAssignSuccess from './modals/BookerAssignSuccess'
  import BookerPrompt from './modals/BookerPrompt'
  import OnlinePrompt from './modals/OnlinePrompt'
  import BookerRemoveBooking from './modals/BookerRemoveBooking'
  import BookerSuccess from './modals/BookerSuccess'
  import BuyPackageFirst from './modals/BuyPackageFirst'
  import BuyOnlinePackageFirst from './modals/BuyOnlinePackageFirst'
  import BookerActions from './modals/BookerActions'
  export default {
    props: {
      inApp: {
        type: Boolean,
        default: false
      },
      manage: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Skeleton,
      BookerAssign,
      BookerCancel,
      BookerChoosePackage,
      BookerChooseSeat,
      BookerSwitchSeat,
      BookerAssignMemberPrompt,
      BookerAssignMemberError,
      BookerAssignNonMemberError,
      BookerAssignNonMember,
      BookerAssignSuccess,
      BookerPrompt,
      OnlinePrompt,
      BookerRemoveBooking,
      BookerSuccess,
      BuyPackageFirst,
      BuyOnlinePackageFirst,
      BookerActions
    },
    data() {
      return {
        tempAssignedGuest: {
          first_name: '',
          last_name: '',
          email: ''
        },
        onlineData: {
          status: 'open',
          online: 1
        },
        instructor: {},
        res: [],
        assignType: '',
        isMobile: false,
        firstBook: false,
        step: 1,
        cancelType: 1,
        type: 1,
        loaded: false,
        customer: null,
        temp: [],
        schedule: [],
        seats: {
          left: {
            position: 'left',
            data: []
          },
          right: {
            position: 'right',
            data: []
          },
          bottom: {
            position: 'bottom',
            data: []
          },
          bottom_alt: {
            position: 'bottom_alt',
            data: []
          },
          bottom_alt_2: {
            position: 'bottom_alt_2',
            data: []
          }
        },
        ctr: 0,
        checkPackage: 0,
        nonMember: {
          email: null,
          first_name: null,
          last_name: null,
          customer_details: {
            images: [
              {
                path: null
              }
            ]
          }
        },
        layout: 0,
        scheduled_date_id: 0,
        message: 'Cheers! Successfully added a Guest.',
        promptMessage: '',
        status: false,
        tempClassPackage: null,
        hasGuest: false,
        seatStatus: '',
        hasBooked: false,
        tempGuestSeat: null,
        tempOriginalSeat: null,
        dummyData: null,
        toSubmit: {
          tempSeat: []
        },
        tempBookCount: 0,
        user: '',
        isWaitlisted: false,
        canSwitch: false,
        isSwitchingSeat: false,
        cancelSwitchingSeat: false,
        selectedSwitchSeat: null,
        webApp: false
      }
    },
    computed: {
      populateSeats() {
        const me = this
        let result
        result = me.seats
        return result
      },
      getAllPackages() {
        const me = this
        let data = me.temp
        let packages = []
        let tempResult = []
        let result = []
        let ctr = 0
        data.forEach((element, index) => {
          if (element.bookings.length > 0) {
            element.bookings[0].user_package_count.same_number = 1
            if (tempResult.length == 0) {
              if (me.schedule.schedule.studio.online_class == 1) {
                element.bookings.forEach((booking, key) => {
                  if (booking.original_booker_id == me.user.id) {
                    tempResult.push(booking.user_package_count)
                  }
                })
              } else {
                tempResult.push(element.bookings[0].user_package_count)
              }
            } else if (tempResult.length > 0) {
              let tempCtr = 0
              tempResult.forEach((temp, tIndex) => {
                if (
                  temp.class_package.id ==
                  element.bookings[0].user_package_count.class_package.id
                ) {
                  temp.same_number++
                  tempCtr++
                }
              })
              if (tempCtr == 0) {
                tempResult.push(element.bookings[0].user_package_count)
              }
            }
          }
        })
        tempResult.forEach((data, index) => {
          if (ctr == 0) {
            if (data.same_number > 1) {
              result.push(
                `${data.class_package.name} <b class="green">(${data.same_number})</b>`
              )
            } else {
              result.push(data.class_package.name)
            }
          } else if (ctr > 0) {
            if (data.same_number > 1) {
              result.push(
                `<br />${data.class_package.name} <b class="green">(${data.same_number})</b>`
              )
            } else {
              result.push(`<br />${data.class_package.name}`)
            }
          }
          ctr++
        })
        return result
      },
      getAllSeatNumbers() {
        const me = this
        let result = []
        if (!me.schedule.schedule.studio.online_class) {
          me.temp.forEach((seat, index) => {
            if (
              seat.bookings.length > 0 &&
              seat.bookings[0].original_booker_id == me.user.id
            ) {
              if (seat.bookings[0].is_guest == 0) {
                result.unshift(`<b class="green">${seat.number}</b>`)
              } else {
                result.push(`, <b class="violet">${seat.number}</b>`)
              }
            }
          })
        } else {
          result = '-'
        }
        return result
      }
    },
    methods: {
      getInstructorsImageInSchedule(data) {
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
      getInstructorsInSchedule(data) {
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
      toggleCancel() {
        const me = this
        me.$store.state.bookerCancelStatus = true
        document.body.classList.add('no_scroll')
      },
      toggleCancelled() {
        const me = this
        me.cancelType = 2
        me.$store.state.bookerCancelStatus = true
      },
      cancelWaitlist() {
        const me = this
        let formData = new FormData()
        let token = !me.inApp
          ? me.$cookies.get('70hokc3hhhn5')
          : me.$route.query.token
        formData.append('scheduled_date_id', me.$route.params.slug)
        me.loader(true)
        me.$axios
          .post('api/schedules/waitlist', formData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            if (res.data) {
              me.promptMessage =
                'You have been successfully removed from the waitlist.'
              document.body.classList.add('no_scroll')
              me.$store.state.bookerPromptStatus = true
              setTimeout(() => {
                if (!me.inApp) {
                  me.$router.push('/my-profile')
                } else {
                  me.$router.push(
                    `/fish-in-the-glass/book-a-bike?token=${token}`
                  )
                }
              }, 1500)
            }
          })
          .catch(err => {
            me.debugger(
              `${JSON.stringify(err)} <> ${JSON.stringify(err.response)}`,
              'components/Booker.vue(cancelWaitlist)'
            )
            if (err.response?.data && err.response.data?.errors) {
              me.$store.state.errorList = err.response.data.errors
              me.$store.state.errorPromptStatus = true
            }
          })
          .then(() => {
            setTimeout(() => {
              me.loader(false)
            }, 500)
          })
      },
      toggleDetails(event) {
        const me = this
        let target = event.target
        if (target.parentNode.classList.contains('toggled')) {
          target.nextElementSibling.style.height = `${0}px`
          target.parentNode.classList.remove('toggled')
        } else {
          target.parentNode.classList.add('toggled')
          target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
        }
      },
      /**
       * [addClass description]
       * @param {[type]} seat [description]
       */
      addClass(seat) {
        const me = this
        let result = ''
        if (me.isSwitchingSeat) {
          result += 'switch '
        }
        switch (seat.status) {
          case 'open':
            if (me.schedule.guestHere) {
              result += 'blocked comp'
            } else {
              result += 'open'
            }
            break
          case 'reserved':
          case 'reserved-guest':
          case 'signed-in':
            if (seat.bookings.length > 0) {
              if (me.schedule.guestHere) {
                if (
                  me.schedule.original_booker_id ==
                  seat.bookings[0].original_booker_id
                ) {
                  if (seat.bookings[0].is_guest != 0) {
                    result += 'reserved-guest'
                  } else {
                    result += 'reserved alt'
                  }
                } else {
                  result += 'blocked comp'
                }
              } else {
                if (
                  seat.bookings.length > 0 &&
                  seat.bookings[0].original_booker_id != me.user.id
                ) {
                  result += 'blocked comp'
                } else {
                  if (seat.bookings[0].is_guest != 0) {
                    result += 'reserved-guest'
                  } else {
                    result += 'reserved alt'
                  }
                }
              }
            } else {
              result += 'blocked comp'
            }
            break
          case 'blocked':
          case 'comp':
            result += 'blocked comp'
            break
        }
        return result
      },
      /**
       * Conversion of hours and minutes */
      parseScheduleRide(data) {
        const me = this
        let result = ''
        let time = data.split('+')[1]
        let hour = time.split(':')[0]
        let minutes = time.split(':')[1]
        if (hour != 0) {
          result += `${me.$moment(time, 'h:m').format('h')} ${
            hour > 1 ? 'Hours ' : 'Hour '
          }`
          result += me.$moment(time, 'h:m').format('mm') + ' Minutes'
        } else {
          result += me.$moment(time, 'h:m').format('mm') + ' Minutes'
        }
        return result
      },
      /**
       * [chooseSeat toggle the swap and switch seat]
       * @param  {[string]} type [type of action]
       */
      chooseSeat(type) {
        const me = this
        me.loader(true)
        switch (type) {
          case 'swap':
            setTimeout(() => {
              me.$store.state.bookerChooseSeatStatus = true
              document.body.classList.add('no_scroll')
              me.loader(false)
            }, 500)
            break
          case 'switch':
            setTimeout(() => {
              me.$store.state.bookerSwitchSeatStatus = true
              document.body.classList.add('no_scroll')
              me.loader(false)
            }, 500)
            break
          case 'cancel':
            setTimeout(() => {
              me.selectedSwitchSeat = null
              me.isSwitchingSeat = false
              me.cancelSwitchingSeat = false
              me.loader(false)
            }, 500)
            break
        }
      },
      /**
       * [signIn check the seat]
       * @param  {[object]} data [seat structure]
       */
      signIn(data) {
        const me = this
        me.seatStatus = data.status
        if (me.schedule.guestHere) {
          me.promptMessage = 'Sorry! A guest cannot manage/change this class.'
          me.$store.state.bookerPromptStatus = true
          document.body.classList.add('no_scroll')
        } else {
          if (me.checkPackage == 1) {
            switch (data.status) {
              case 'reserved':
              case 'reserved-guest':
                if (data.bookings.length > 0) {
                  me.dummyData = data
                  me.$store.state.bookerActionsPrompt = true
                  document.body.classList.add('no_scroll')
                }
                break
              case 'open':
                me.dummyData = data
                if (me.isSwitchingSeat) {
                  me.switchSeatData(data)
                } else {
                  if (me.user.user_package_counts.length > 0 && !me.hasBooked) {
                    me.loader(true)
                    setTimeout(() => {
                      me.$store.state.bookerChoosePackageStatus = true
                      document.body.classList.add('no_scroll')
                    }, 500)
                  } else {
                    if (me.ctr >= 5) {
                      me.promptMessage =
                        "You've already reached the limit of adding guest."
                      me.$store.state.bookerPromptStatus = true
                      document.body.classList.add('no_scroll')
                    } else {
                      me.tempGuestSeat = data
                      me.loader(true)
                      setTimeout(() => {
                        me.$store.state.bookerChoosePackageStatus = true
                        document.body.classList.add('no_scroll')
                      }, 500)
                    }
                  }
                }
                break
            }
          } else {
            if (me.schedule.schedule.studio.online_class) {
              me.$store.state.buyOnlinePackageFirstStatus = true
            } else {
              me.$store.state.buyPackageFirstStatus = true
            }
            document.body.classList.add('no_scroll')
          }
        }
      },
      switchSeatData(data) {
        const me = this
        me.loader(true)
        let formData = new FormData()
        formData.append('seat_id', data.id)
        formData.append('booking_id', me.selectedSwitchSeat.bookings[0].id)
        me.$axios
          .post('api/bookings/switch-seat', formData)
          .then(res => {
            if (res.data) {
              setTimeout(() => {
                me.promptMessage = `You've Successfully switched seat from number ${me.selectedSwitchSeat.number} to ${data.number}`
                me.$store.state.bookerPromptStatus = true
                document.body.classList.add('no_scroll')
                me.isSwitchingSeat = false
                me.cancelSwitchingSeat = false
              }, 500)
            }
          })
          .catch(err => {
            me.debugger(
              `${JSON.stringify(err)} <> ${JSON.stringify(err.response)}`,
              'components/Booker.vue(switchSeatData)'
            )
            if (err.response?.data && err.response.data?.errors) {
              me.$store.state.errorList = err.response.data.errors
              me.$store.state.errorStatus = true
            }
          })
          .then(() => {
            setTimeout(() => {
              me.selectedSwitchSeat = []
              me.fetchSeats(me.$route.params.slug)
            }, 500)
          })
      },
      /**
       * [fetchSeats fetch all the seats]
       * @param  {[int]} id [schedule date id slug]
       */
      fetchSeats(id) {
        const me = this
        me.toSubmit.tempSeat = []
        me.ctr = 0
        let token = !me.inApp
          ? me.$cookies.get('70hokc3hhhn5')
          : me.$route.query.token
        me.loader(true)
        me.$axios
          .get('api/check-token', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            if (res.data) {
              me.user = res.data.user
              me.$axios
                .get(`api/scheduled-dates/${id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
                .then(res => {
                  if (res.data) {
                    if (!me.manage) {
                      if (
                        res.data.scheduledDate.originalHere ||
                        res.data.scheduledDate.guestHere
                      ) {
                        if (!me.inApp) {
                          me.$store.state.bookerPromptStatus = false
                          me.$router.push(`/my-profile/manage-class/${id}`)
                        } else {
                          me.$store.state.bookerPromptStatus = false
                          me.$router.push(
                            `/fish-in-the-glass/manage-class/${id}?token=${token}`
                          )
                        }
                      }
                    } else {
                      if (!res.data.hasBookingHere) {
                        me.$nuxt.error({
                          statusCode: 404,
                          message: 'Page not found'
                        })
                      }
                    }
                    me.layout = res.data.scheduledDate.schedule.studio_id
                    let layout = `layout_${res.data.scheduledDate.schedule.studio_id}`
                    me.seats = {
                      left: { position: 'left', layout: layout, data: [] },
                      right: { position: 'right', layout: layout, data: [] },
                      bottom: { position: 'bottom', layout: layout, data: [] },
                      bottom_alt: {
                        position: 'bottom_alt',
                        layout: layout,
                        data: []
                      },
                      bottom_alt_2: {
                        position: 'bottom_alt_2',
                        layout: layout,
                        data: []
                      }
                    }
                    me.res = res.data
                    me.temp = res.data.seats
                    me.schedule = res.data.scheduledDate
                    me.instructor =
                      me.schedule.schedule.instructor_schedules[0].user
                    me.temp.forEach((seat, index) => {
                      if (seat.bookings.length > 0) {
                        if (seat.position == 'Online') {
                          seat.bookings.forEach((booking, index) => {
                            if (booking.original_booker_id == me.user.id) {
                              if (booking.is_guest == 0) {
                                me.bookingID = booking.id
                                me.tempOriginalSeat = seat
                                me.toSubmit.tempSeat.unshift(seat)
                              }
                              me.ctr++
                            }
                          })
                        } else {
                          if (
                            seat.bookings[0].original_booker_id == me.user.id
                          ) {
                            if (seat.bookings[0].is_guest == 0) {
                              me.bookingID = seat.bookings[0].id
                              me.tempOriginalSeat = seat
                              me.toSubmit.tempSeat.unshift(seat)
                            } else {
                              me.toSubmit.tempSeat.push(seat)
                            }
                            me.ctr++
                          }
                        }
                      }
                      switch (seat.position) {
                        case 'left':
                          me.seats.left.data.push(seat)
                          break
                        case 'right':
                          me.seats.right.data.push(seat)
                          break
                        case 'bottom':
                          me.seats.bottom.data.push(seat)
                          break
                        case 'bottom_alt':
                          me.seats.bottom_alt.data.push(seat)
                          break
                        case 'bottom_alt_2':
                          me.seats.bottom_alt_2.data.push(seat)
                          break
                      }
                    })
                    if (!me.manage) {
                      me.checkPackage = res.data.userPackagesCount > 0 ? 1 : 0
                    } else {
                      me.checkPackage = 1
                    }

                    me.isWaitlisted = res.data.waitlisted ? true : false

                    if (me.ctr > 0) {
                      me.hasBooked = true
                      me.canSwitch = true
                      if (me.ctr > 1) {
                        me.hasGuest = true
                      }
                    }
                    me.loaded = true
                    me.$store.state.proTipStatus = true
                  }
                })
                .catch(err => {
                  me.debugger(
                    `${JSON.stringify(err)} <> ${JSON.stringify(err.response)}`,
                    'components/Booker.vue(fetchSeats)'
                  )
                  me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                })
                .then(() => {
                  setTimeout(() => {
                    me.loader(false)
                  }, 500)
                })
            }
          })
          .catch(err => {
            me.debugger(
              `${JSON.stringify(err)} <> ${JSON.stringify(err.response)}`,
              'components/Booker.vue(fetchSeats)'
            )
            if (err.response?.data && err.response.data?.errors) {
              me.$store.state.needLogin = true
              me.$store.state.errorList = err.response.data.errors
              me.$store.state.errorPromptStatus = true
              me.$nuxt.error({
                statusCode: 403,
                message: 'Something Went Wrong'
              })
              me.loader(false)
            }
          })
      },
      onResize() {
        const me = this
        if (me.$route.query.token) {
          me.webApp = true
        } else {
          me.webApp = false
        }
        if (document.documentElement && document.documentElement.clientWidth) {
          if (document.documentElement.clientWidth <= 1025) {
            me.isMobile = true
          } else {
            me.isMobile = false
          }
        }
      }
    },
    mounted() {
      const me = this
      me.onResize()
    },
    beforeMount() {
      window.addEventListener('load', this.onResize)
      window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
      window.removeEventListener('load', this.onResize)
    }
  }
</script>
