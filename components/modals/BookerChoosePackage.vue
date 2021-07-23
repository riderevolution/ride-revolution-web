<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.once.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Please choose which package you’d like to use.</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div :class="`form_custom_checkbox ${(ctr > 5) ? 'scroll' : ''}`">
                            <div :id="`package_${key}`" :class="`custom_checkbox ${(parseInt(data.count) >= $parent.schedule.schedule.class_credits) ? (data.valid ? '' : 'nope') : 'nope'} ${(data.id == selectedPackage) ? 'active' : ''}`" v-for="(data, key) in classPackages" :key="key" @click="togglePackage(data, key)" v-if="parseInt(data.count) > 0">
                                <label>{{ data.class_package.name }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info">
                                    <p>Available: {{ (data.class_package.class_count_unlimited == 1) ? 'Unlimited' : data.count }}</p>
                                    <p>Expires on {{ formatDate((data.computed_expiration_date != null) ? data.computed_expiration_date : data.expiry_date_if_not_activated ) }}</p>
                                    <p class="full" v-if="!data.valid">{{ (!$parent.schedule.schedule.studio.online_class) ? 'THIS PACKAGE IS FOR ONLINE CLASSES ONLY.' : 'THIS PACKAGE IS FOR IN-STUDIO CLASSES ONLY.' }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form_button" v-if="notSelectedPackage">
                            <button type="submit" class="default_btn">Select</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            seat: {
                default: null
            },
            category: {
                type: String,
                default: 'slug'
            },
            type: {
                type: Number
            }
        },
        data () {
            return {
                ctr: 0,
                user: [],
                classPackages: [],
                classPackage: [],
                selectedClassPackage: null,
                selectedPackage: 0,
                tempSelectedPackage: 0,
                notSelectedPackage: true
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                if (me.selectedPackage) {
                    /**
                     * Waitlist */
                    if (me.type == 0) {
                        let token = (me.$route.query.token != null) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
                        me.$axios.get('api/check-token', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                let formData = new FormData()
                                formData.append('scheduled_date_id', me.$parent.schedule.id)
                                formData.append('user_id', res.data.user.id)
                                formData.append('studio_id', me.$parent.schedule.schedule.studio_id)
                                formData.append('user_package_count_id', me.selectedPackage)
                                me.$axios.post(`api/waitlists`, formData, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }).then(res => {
                                    if (res.data) {
                                        me.$store.state.bookerChoosePackageStatus = false
                                        me.$parent.getAllSchedules(me.$parent.currentYear, me.$parent.currentMonth, me.$parent.currentDay, false)
                                        setTimeout( () => {
                                            me.$store.state.bookerPromptStatus = true
                                            me.$parent.message = "You've successfully added as waitlist in this class."
                                            me.$parent.status = true
                                            me.$parent.buyCredits = false
                                        }, 500)
                                        me.$parent.removeNext = false
                                    }
                                }).catch(err => {
                                    me.$store.state.errorOverlayPromptStatus = true
                                    me.$store.state.errorList = err.response.data.errors
                                    me.$store.state.errorPromptStatus = true
                                    me.loader(false)
                                })
                            }
                        }).catch(err => {
                            me.$store.state.needLogin = true
                            me.$store.state.errorOverlayPromptStatus = true
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                            me.loader(false)
                        })
                    /**
                     * Book a ride */
                    } else if (me.type == 1) {
                        let newTemp = me.seat
                        if (me.seat != null) {
                            if ((me.$parent.schedule.schedule.studio.online_class) ? true : !me.seat.bookings.length > 0 && !me.$parent.hasBooked) {
                                me.loader(true)
                                let formData = new FormData()
                                formData.append('is_guest', 0)
                                if (me.$parent.schedule.schedule.studio.online_class) {
                                    formData.append('scheduled_date_id', me.$parent.scheduled_date_id)
                                    formData.append('seat_id', 123)
                                } else {
                                    formData.append('scheduled_date_id', me.$route.params.slug)
                                    formData.append('seat_id', me.seat.id)
                                }
                                formData.append('user_id', me.user.id)
                                formData.append('user_package_count_id', me.selectedPackage)
                                me.loader(true)
                                me.$axios.post('api/bookings', formData).then(res => {
                                    if (res.data) {
                                        setTimeout( () => {
                                            me.$store.state.bookerChoosePackageStatus = false
                                            if (me.$parent.schedule.schedule.studio.online_class) {
                                                me.$store.state.onlinePromptStatus = true
                                            } else {
                                                me.$store.state.bookerPromptStatus = true
                                                me.$parent.promptMessage = 'Your seat has been successfully reserved.'
                                            }
                                            me.$parent.firstBook = true
                                            me.$parent.canSwitch = true
                                            me.$parent.hasBooked = true
                                            me.$parent.status = true
                                        }, 500)
                                    }
                                }).catch(err => {
                                    setTimeout( () => {
                                        me.$store.state.errorOverlayPromptStatus = true
                                        me.$store.state.errorList = err.response.data.errors
                                        me.$store.state.errorPromptStatus = true
                                    }, 500)
                                }).then(() => {
                                    setTimeout( () => {
                                        me.loader(false)
                                    }, 500)
                                })
                            } else {
                                if (me.seat.bookings.length > 0) {
                                    me.loader(true)
                                    let formData = new FormData(document.getElementById('default_form'))
                                    formData.append('booking_id', me.seat.bookings[0].id)
                                    formData.append('new_user_package_count_id', me.selectedPackage)
                                    formData.append('old_user_package_count_id', me.tempSelectedPackage)
                                    me.loader(true)
                                    me.$axios.post('api/bookings/change-package', formData).then(res => {
                                        if (res.data) {
                                            setTimeout( () => {
                                                me.$store.state.bookerChoosePackageStatus = false
                                                me.$parent.promptMessage = "You've successfully changed package."
                                                me.$store.state.bookerPromptStatus = true
                                            }, 500)
                                        }
                                    }).catch(err => {
                                        setTimeout( () => {
                                            me.$store.state.errorOverlayPromptStatus = true
                                            me.$store.state.errorList = err.response.data.errors
                                            me.$store.state.errorPromptStatus = true
                                        }, 500)
                                    }).then(() => {
                                        setTimeout( () => {
                                            me.$parent.fetchSeats(me.$route.params.slug)
                                        }, 500)
                                    })
                                } else {
                                    me.loader(true)
                                    let formData = new FormData()
                                    formData.append('scheduled_date_id', me.$route.params.slug)
                                    formData.append('user_id', me.user.id)
                                    formData.append('user_package_count_id', me.selectedPackage)
                                    me.$axios.post('api/extras/check-if-user-is-booked-already', formData).then(res => {
                                        setTimeout( () => {
                                            if (res.data.result > 0) {
                                                me.$parent.tempClassPackage = me.selectedClassPackage
                                                me.$store.state.bookerChoosePackageStatus = false
                                                me.$store.state.bookerAssignStatus = true
                                            }
                                        }, 500);
                                    }).catch(err => {
                                        setTimeout( () => {
                                            me.$store.state.errorOverlayPromptStatus = true
                                            me.$store.state.errorList = err.response.data.errors
                                            me.$store.state.errorPromptStatus = true
                                        }, 500)
                                    }).then(() => {
                                        setTimeout( () => {
                                            me.loader(false)
                                        }, 500)
                                    })
                                }
                            }
                        }
                    }
                }
            },
            togglePackage (data, unique) {
                const me = this
                me.active = false
                me.selectedClassPackage = data
                /**
                 * Check if the the user changed package */
                if (me.$route.name == 'my-profile-manage-class-slug' && me.seat.bookings.length > 0) {
                    if (me.tempSelectedPackage == data.id) {
                        me.notSelectedPackage = false
                    } else {
                        me.notSelectedPackage = true
                    }
                }
                me.selectedPackage = data.id
                document.getElementById(`package_${unique}`).classList.add('active')
                me.classPackages.forEach((element, index) => {
                    if (element.count > 0) {
                        if (unique != index) {
                            if (document.getElementById(`package_${index}`)) {
                                document.getElementById(`package_${index}`).classList.remove('active')
                            }
                        }
                    }
                })
            },
            formatDate (value) {
                if (value) {
                    return this.$moment(value).format('MMM DD, YYYY')
                }
            },
            toggleClose () {
                const me = this
                me.$store.state.bookerChoosePackageStatus = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            const me = this
            let token = (me.$route.query.token != null) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
            let id = 0
            me.$axios.get('api/check-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    let url = ''
                    let countCtr = 0
                    let newCtr = 0
                    me.user = res.data.user
                    id = res.data.user.id
                    if (me.$parent.landing) {
                        url = `api/customers/${id}/packages?forWebBooking=1&scheduled_date_id=${me.$parent.schedule.id}`
                    } else {
                        url = `api/customers/${id}/packages?forWebBooking=1&scheduled_date_id=${me.$route.params.slug}`
                    }

                    me.$axios.get(`${url}`).then(res => {
                        if (res.data) {
                            if (res.data.customer.user_package_counts.length > 0) {
                                res.data.customer.user_package_counts.forEach((data, index) => {
                                    if (parseInt(me.$moment((data.computed_expiration_date != null) ? data.computed_expiration_date : data.expiry_date_if_not_activated).diff(me.$moment())) > 0) {
                                        if (parseInt(data.count) < me.$parent.schedule.schedule.class_credits) {
                                            countCtr++
                                        } else {
                                            me.ctr++
                                        }
                                        me.classPackages.push(data)
                                    } else {
                                        countCtr++
                                    }
                                })
                                if (me.$parent.tempOriginalSeat == null) {
                                    for (let i = 0; i < me.classPackages.length; i++) {
                                        if (parseInt(me.classPackages[i].count) >= me.$parent.schedule.schedule.class_credits) {
                                            if (me.classPackages[i].valid) {
                                                me.selectedClassPackage = me.classPackages[i]
                                                me.selectedPackage = me.classPackages[i].id
                                                me.tempSelectedPackage = me.classPackages[i].id
                                                break
                                            }
                                        }
                                    }
                                } else {
                                    if (me.seat != null) {
                                        for (let i = 0; i < me.classPackages.length; i++) {
                                            if (parseInt(me.classPackages[i].count) >= me.$parent.schedule.schedule.class_credits) {
                                                if (me.seat.bookings.length > 0) {
                                                    if (me.seat.bookings[0].user_package_count.id == me.classPackages[i].id) {
                                                        me.selectedClassPackage = me.classPackages[i]
                                                        me.selectedPackage = me.classPackages[i].id
                                                        me.tempSelectedPackage = me.classPackages[i].id
                                                        break
                                                    }
                                                } else {
                                                    if (me.classPackages[i].valid) {
                                                        me.selectedClassPackage = me.classPackages[i]
                                                        me.selectedPackage = me.classPackages[i].id
                                                        me.tempSelectedPackage = me.classPackages[i].id
                                                        break
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        for (let i = 0; i < me.classPackages.length; i++) {
                                            if (parseInt(me.classPackages[i].count) >= me.$parent.schedule.schedule.class_credits) {
                                                if (me.classPackages[i].valid) {
                                                    me.selectedClassPackage = me.classPackages[i]
                                                    me.selectedPackage = me.classPackages[i].id
                                                    me.tempSelectedPackage = me.classPackages[i].id
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (countCtr >= res.data.customer.user_package_counts.length) {
                                me.$store.state.bookerChoosePackageStatus = false
                                if (me.$parent.schedule.schedule.studio.online_class) {
                                    me.$store.state.buyOnlinePackageFirstStatus = true
                                } else {
                                    me.$store.state.buyPackageFirstStatus = true
                                }
                            }

                            if (me.$parent.manage && me.seat.bookings.length > 0) {
                                if (res.data.customer.user_package_counts.length - countCtr >= 1) {
                                    if (me.tempSelectedPackage == me.selectedPackage) {
                                        me.notSelectedPackage = false
                                    } else {
                                        me.notSelectedPackage = true
                                    }
                                }
                            } else {
                                me.notSelectedPackage = true
                            }
                        }
                    })
                }
            }).catch(err => {
                me.$store.state.needLogin = true
                me.$store.state.errorOverlayPromptStatus = true
                me.$store.state.errorList = err.response.data.errors
                me.$store.state.errorPromptStatus = true
            }).then(() => {
                setTimeout(() => {
                    me.loader(false)
                }, 500)
            })
        }
    }
</script>
