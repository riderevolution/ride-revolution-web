<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Please choose where we will deduct your credits.</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group alt">
                        <div class="form_custom_checkbox">
                            <div :id="`package_${key}`" :class="`custom_checkbox ${(data.class_package.id == selectedPackage) ? 'active' : ''}`" v-for="(data, key) in classPackages" :key="key" @click="togglePackage(data, key)" v-if="data.count >= 1">
                                <label>{{ data.class_package.name }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info">
                                    <p>Available: {{ (data.class_package.class_count_unlimited == 1) ? 'Unlimited' : data.count }}</p>
                                    <p>Expires on {{ formatDate(data.class_package.computed_expiration_date) }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form_button">
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
            tempSeat: {
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
                classPackages: [],
                classPackage: [],
                selectedClassPackage: null,
                selectedPackage: 0
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                if (me.selectedPackage) {
                    /**
                     * Waitlist */
                    if (me.type == 0) {
                        let token = (me.$route.query.token != null) ? me.$route.query.token : me.$cookies.get('token')
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
                                formData.append('class_package_id', me.selectedPackage)
                                me.$axios.post(`api/waitlists`, formData, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }).then(res => {
                                    if (res.data) {
                                        me.$store.state.bookerChoosePackageStatus = false
                                        me.$parent.getAllSchedules(me.$parent.currentYear, me.$parent.currentMonth, me.$parent.currentDay, false)
                                        setTimeout( () => {
                                            me.$store.state.buyRidesPromptStatus = true
                                            me.$parent.message = "You've successfully added as waitlist in this class."
                                            me.$parent.status = true
                                            me.$parent.buyCredits = false
                                        }, 500)
                                        me.$parent.removeNext = false
                                    }
                                }).catch(err => {
                                    me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                                    me.loader(false)
                                })
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    /**
                     * Book a ride */
                    } else if (me.type == 1) {
                        let newTemp = me.tempSeat
                        /**
                         * Check if has temp */
                        if (me.tempSeat != null) {
                            if (!me.tempSeat.temp && !me.$parent.hasBooked) {
                                newTemp.temp = {}
                                newTemp.status = 'reserved'
                                newTemp.temp.guest = 0
                                newTemp.temp.class_package = me.selectedClassPackage
                                newTemp.temp.customer = me.$parent.user
                                me.$parent.tempOriginalSeat = newTemp
                                me.$parent.toSubmit.bookCount++
                                if (me.$parent.toSubmit.tempSeat.length > 0) {
                                    me.$parent.hasGuest = true
                                    me.$parent.toSubmit.tempSeat.unshift(newTemp)
                                } else {
                                    me.$parent.toSubmit.tempSeat.push(newTemp)
                                }
                                me.$parent.canSwitch = true
                                me.$parent.hasBooked = true
                                me.$parent.status = true
                                me.$store.state.bookerChoosePackageStatus = false
                                me.loader(true)
                                setTimeout(() => {
                                    me.$parent.promptMessage = "You've successfully booked for this seat."
                                    me.$store.state.buyRidesPromptStatus = true
                                    me.loader(false)
                                }, 500)
                            } else {
                                /**
                                 * check if the temp has class_package */
                                if (me.tempSeat.temp && me.tempSeat.temp.class_package) {
                                    /**
                                     * Update the package if the user choose package */
                                    if (me.tempSeat.temp) {
                                        let hasSamePackage = false
                                        me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                            /**
                                             * Check all packages except the selected */
                                            if (me.tempSeat.temp.customer.id != element.temp.customer.id) {
                                                /**
                                                * if has the same package */
                                                if (me.selectedClassPackage.class_package_id == (element.temp && element.temp.class_package.class_package_id)) {
                                                    /**
                                                    * check the package count */
                                                    if ((me.$parent.toSubmit.bookCount * me.$parent.schedule.schedule.class_credits) > element.temp.class_package.count) {
                                                        hasSamePackage = true
                                                    }
                                                }
                                            }
                                        })
                                        if (!hasSamePackage) {
                                            me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                                if (me.tempSeat.temp.customer.id == element.temp.customer.id) {
                                                    let tempClassPackage = newTemp.temp.class_package
                                                    /**
                                                     * Check if the the user changed package */
                                                    if (me.$route.name == 'my-profile-manage-class-slug') {
                                                        if (newTemp.temp.old_class_package_id) {
                                                            if (newTemp.temp.old_class_package_id != me.selectedClassPackage.class_package_id) {
                                                                newTemp.temp.changedPackage = true
                                                                newTemp.temp.old_class_package_id = tempClassPackage.class_package_id
                                                            } else {
                                                                delete newTemp.temp.changedPackage
                                                                delete newTemp.temp.old_class_package_id
                                                            }
                                                        } else {
                                                            if (newTemp.temp.class_package.class_package_id != me.selectedClassPackage.class_package_id) {
                                                                newTemp.temp.changedPackage = true
                                                                newTemp.temp.old_class_package_id = tempClassPackage.class_package_id
                                                            }
                                                        }
                                                    }
                                                    /**
                                                    * for original booker */
                                                    if (element.temp.guest == 0) {
                                                        newTemp.temp.class_package = me.selectedClassPackage
                                                        me.$parent.toSubmit.tempSeat.splice(index, 1)
                                                        if (me.$parent.toSubmit.tempSeat.length > 0) {
                                                            me.$parent.toSubmit.tempSeat.unshift(newTemp)
                                                        } else {
                                                            me.$parent.toSubmit.tempSeat.push(newTemp)
                                                        }
                                                        me.$store.state.bookerChoosePackageStatus = false
                                                        document.body.classList.remove('no_scroll')
                                                        me.$parent.removeNext = false
                                                    /**
                                                    * for original booker guest */
                                                    } else {
                                                        newTemp.temp.class_package = me.selectedClassPackage
                                                        me.$parent.tempClassPackage = me.selectedClassPackage
                                                        me.$parent.toSubmit.tempSeat.splice(index, 1)
                                                        me.$parent.toSubmit.tempSeat.push(newTemp)
                                                        me.$store.state.bookerChoosePackageStatus = false
                                                        document.body.classList.remove('no_scroll')
                                                        me.$parent.removeNext = false
                                                    }
                                                }
                                            })
                                        } else {
                                            me.$store.state.bookerChoosePackageStatus = false
                                            me.$parent.promptMessage = "The class package you selected doesn't have enough rides left."
                                            me.$store.state.buyRidesPromptStatus = true
                                        }
                                    }
                                } else {
                                    let hasGuestSamePackage = false
                                    /**
                                     * Check if the package has rides left */
                                    me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                        if (me.selectedClassPackage.class_package_id == (element.temp && element.temp.class_package.class_package_id)) {
                                            if ((me.$parent.toSubmit.bookCount * me.$parent.schedule.schedule.class_credits) > element.temp.class_package.count) {
                                                hasGuestSamePackage = true
                                            }
                                        }
                                    })
                                    if (!hasGuestSamePackage) {
                                        /**
                                         * Adding a guest */
                                        me.$parent.tempClassPackage = me.selectedClassPackage
                                        me.$store.state.bookerChoosePackageStatus = false
                                        me.$store.state.bookerAssignStatus = true
                                    } else {
                                        me.$parent.tempGuestSeat = null
                                        me.$store.state.bookerChoosePackageStatus = false
                                        me.$parent.promptMessage = "The class package you selected doesn't have enough rides left."
                                        me.$store.state.buyRidesPromptStatus = true
                                    }
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
                me.selectedPackage = data.class_package.id
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
            let token = (me.$route.query.token != null) ? me.$route.query.token : me.$cookies.get('token')
            let id = 0
            me.$axios.get('api/check-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    id = res.data.user.id
                    me.$axios.get(`api/customers/${id}/packages${(me.$route.name == 'my-profile-manage-class-slug' || me.$route.name == 'fish-in-the-glass-manage-class-slug') ? `?forWebBooking=1&scheduled_date_id=${me.$route.params.slug}` : ''}`).then(res => {
                        if (res.data) {
                            if (res.data.customer.user_package_counts.length > 0) {
                                me.classPackages = res.data.customer.user_package_counts
                                if (me.$parent.tempOriginalSeat == null) {
                                    for (let i = 0; i < me.classPackages.length; i++) {
                                        if (me.classPackages[i].count > 0) {
                                            me.selectedClassPackage = me.classPackages[i]
                                            me.selectedPackage = me.classPackages[i].class_package.id
                                            break
                                        }
                                    }
                                } else {
                                    if (me.$parent.tempGuestSeat == null) {
                                        me.selectedClassPackage = me.tempSeat.temp.class_package
                                        me.selectedPackage = me.tempSeat.temp.class_package.class_package_id
                                    } else {
                                        for (let i = 0; i < me.classPackages.length; i++) {
                                            if (me.classPackages[i].count > 0) {
                                                me.selectedClassPackage = me.classPackages[i]
                                                me.selectedPackage = me.classPackages[i].class_package.id
                                                break
                                            }
                                        }
                                    }
                                }
                            } else {
                                me.$store.state.bookerChoosePackageStatus = false
                                setTimeout( () => {
                                    me.$parent.message = 'Please buy a class package first'
                                }, 10)
                                switch (me.category) {
                                    case 'landing':
                                        me.$parent.buyCredits = true
                                        break
                                }
                                me.$store.state.buyRidesPromptStatus = true
                            }
                        }
                    })
                }
            }).catch(err => {
                console.log(err);
            }).then(() => {
                setTimeout(() => {
                    me.loader(false)
                }, 500)
            })
        }
    }
</script>
