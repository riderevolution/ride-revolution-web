<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Please choose which package you’d like to use.</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div :class="`form_custom_checkbox ${(classPackages.length > 4) ? 'scroll' : ''}`">
                            <div :id="`package_${key}`" :class="`custom_checkbox ${(parseInt(data.count) >= $parent.schedule.schedule.class_credits) ? (data.no_more ? 'nope' : '') : 'nope'} ${(data.id == selectedPackage) ? 'active' : ''}`" v-for="(data, key) in classPackages" :key="key" @click="togglePackage(data, key)">
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
                                newTemp.temp.user_package_count = me.selectedClassPackage
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
                                    document.body.classList.remove('no_scroll')
                                    me.loader(false)
                                }, 500)
                                this.$scrollTo('.next_wrapper .right .default_btn', {
                                    duration: 1000,
                                    offset: -750
                                })
                            } else {
                                /**
                                 * check if the temp has class_package */
                                if (me.tempSeat.temp && me.tempSeat.temp.user_package_count) {
                                    /**
                                     * Update the package if the user choose package */
                                    if (me.tempSeat.temp) {
                                        let hasSamePackage = false
                                        let ctr = 0
                                        me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                            /**
                                             * Check all packages except the selected */
                                            if (me.tempSeat.temp.customer.id != element.temp.customer.id) {
                                                /**
                                                * if has the same package */
                                                if (me.selectedClassPackage.id == (element.temp && element.temp.user_package_count.id)) {
                                                    ctr++
                                                    let existingCount = element.temp.user_package_count.count
                                                    let resultsWhenDeducted = existingCount - (ctr * me.$parent.schedule.schedule.class_credits)
                                                    /**
                                                    * check the package count */
                                                    if (resultsWhenDeducted < 0) {
                                                        hasSamePackage = true
                                                    }
                                                }
                                            }
                                        })
                                        if (!hasSamePackage) {
                                            me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                                if (me.tempSeat.temp.customer.id == element.temp.customer.id) {
                                                    let tempClassPackage = newTemp.temp.user_package_count
                                                    /**
                                                     * Check if the the user changed package */
                                                    if (me.$route.name == 'my-profile-manage-class-slug') {
                                                        if (!element.temp.old_user_package_count_id) {
                                                            newTemp.temp.changedPackage = 1
                                                            newTemp.temp.old_user_package_count_id = element.temp.user_package_count.id
                                                        }
                                                    }
                                                    /**
                                                    * for original booker */
                                                    if (element.temp.guest == 0) {
                                                        newTemp.temp.user_package_count = me.selectedClassPackage
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
                                                        newTemp.temp.user_package_count = me.selectedClassPackage
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
                                            me.$store.state.bookerPromptStatus = true
                                        }
                                    }
                                } else {
                                    let hasGuestSamePackage = false
                                    let ctr = 0
                                    /**
                                     * Check if the package has rides left */
                                    me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                        if (me.selectedClassPackage.id == (element.temp && element.temp.user_package_count.id)) {
                                            ctr++
                                            let existingCount = element.temp.user_package_count.count
                                            let resultsWhenDeducted = existingCount - (ctr * me.$parent.schedule.schedule.class_credits)
                                            if (resultsWhenDeducted < 0) {
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
                                        me.$store.state.bookerPromptStatus = true
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
                /**
                 * Check if the the user changed package */
                if (me.$route.name == 'my-profile-manage-class-slug') {
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
            let token = (me.$route.query.token != null) ? me.$route.query.token : me.$cookies.get('token')
            let id = 0
            me.$axios.get('api/check-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    let countCtr = 0
                    let newCtr = 0
                    id = res.data.user.id
                    me.$axios.get(`api/customers/${id}/packages${(me.$route.name == 'my-profile-manage-class-slug' || me.$route.name == 'fish-in-the-glass-manage-class-slug') ? `?forWebBooking=1&scheduled_date_id=${me.$route.params.slug}` : ''}`).then(res => {
                        if (res.data) {
                            if (res.data.customer.user_package_counts.length > 0) {
                                res.data.customer.user_package_counts.forEach((data, index) => {
                                    let ctr = 0
                                    if (me.$route.name != 'my-profile-manage-class-slug') {
                                        if (parseInt(data.count) == 0) {
                                            countCtr++
                                        }
                                    } else {
                                        if (parseInt(data.count) < me.$parent.schedule.schedule.class_credits) {
                                            newCtr++
                                        }
                                    }
                                    if (parseInt(me.$moment(data.class_package.computed_expiration_date).diff(me.$moment(), 'days')) > 0) {
                                        if (me.category == 'inner') {
                                            if (me.$parent.toSubmit.tempSeat.length > 0) {
                                                me.$parent.toSubmit.tempSeat.forEach((pData, index) => {
                                                    if (pData.temp.user_package_count.id == data.id) {
                                                        ctr++
                                                        let existingCount = pData.temp.user_package_count.count
                                                        if (pData.temp.user_package_count.count == me.$parent.schedule.schedule.class_credits || pData.temp.user_package_count.count == 0) {
                                                            data.count = data.count - me.$parent.schedule.schedule.class_credits
                                                            countCtr++
                                                            data.no_more = true
                                                        } else {
                                                            let resultsWhenDeducted = existingCount - ((ctr) * me.$parent.schedule.schedule.class_credits)
                                                            if ((resultsWhenDeducted) > me.$parent.schedule.schedule.class_credits) {
                                                                data.count = existingCount - (ctr * me.$parent.schedule.schedule.class_credits)
                                                            } else {
                                                                if (parseInt(data.count) - me.$parent.schedule.schedule.class_credits < 0) {
                                                                    data.count = data.count
                                                                } else {
                                                                    data.count = parseInt(data.count) - me.$parent.schedule.schedule.class_credits
                                                                }
                                                            }
                                                            if (resultsWhenDeducted < 0) {
                                                                data.no_more = true
                                                                if (existingCount - me.$parent.schedule.schedule.class_credits < 0) {
                                                                    data.count = existingCount
                                                                } else {
                                                                    data.count = existingCount - me.$parent.schedule.schedule.class_credits
                                                                }
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                        me.classPackages.push(data)
                                    }
                                    if (parseInt(data.count) < me.$parent.schedule.schedule.class_credits) {
                                        countCtr++
                                    }
                                })
                                if (me.$parent.tempOriginalSeat == null) {
                                    for (let i = 0; i < me.classPackages.length; i++) {
                                        if (parseInt(me.classPackages[i].count) >= me.$parent.schedule.schedule.class_credits && !me.classPackages[i].no_more) {
                                            me.selectedClassPackage = me.classPackages[i]
                                            me.selectedPackage = me.classPackages[i].id
                                            me.tempSelectedPackage = me.classPackages[i].id
                                            break
                                        }
                                    }
                                } else {
                                    if (me.$parent.tempGuestSeat == null) {
                                        me.selectedClassPackage = me.tempSeat.temp.user_package_count
                                        me.selectedPackage = me.tempSeat.temp.user_package_count.id
                                        me.tempSelectedPackage = me.tempSeat.temp.user_package_count.id
                                    } else {
                                        for (let i = 0; i < me.classPackages.length; i++) {
                                            if (parseInt(me.classPackages[i].count) >= me.$parent.schedule.schedule.class_credits && !me.classPackages[i].no_more) {
                                                if (me.tempSeat.temp) {
                                                    if (me.tempSeat.temp.user_package_count.id == me.classPackages[i].id) {
                                                        me.selectedClassPackage = me.classPackages[i]
                                                        me.selectedPackage = me.classPackages[i].id
                                                        me.tempSelectedPackage = me.classPackages[i].id
                                                        break
                                                    }
                                                } else {
                                                    me.selectedClassPackage = me.classPackages[i]
                                                    me.selectedPackage = me.classPackages[i].id
                                                    me.tempSelectedPackage = me.classPackages[i].id
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }
                                /**
                                 * Check if the the user changed package */
                                if (me.$route.name == 'my-profile-manage-class-slug') {
                                    me.notSelectedPackage = false
                                } else {
                                    let ctr = 0
                                    me.classPackages.forEach((data, index) => {
                                        if (data.no_more) {
                                            ctr++
                                        } else {
                                            if (parseInt(data.count) < me.$parent.schedule.schedule.class_credits) {
                                                ctr++
                                            }
                                        }
                                    })
                                    if (ctr == me.classPackages.length) {
                                        me.notSelectedPackage = false
                                    }
                                }
                            } else {
                                me.$store.state.bookerChoosePackageStatus = false
                                setTimeout( () => {
                                    me.$parent.promptMessage = 'Please buy a class package first'
                                }, 10)
                                switch (me.category) {
                                    case 'inner':
                                        me.$parent.buyCredits = true
                                        break
                                }
                                me.$store.state.bookerPromptStatus = true
                            }
                            if (me.category == 'inner') {
                                if (!me.tempSeat.temp) {
                                    me.notSelectedPackage = true
                                }
                            }
                            if (me.$route.name == 'my-profile-manage-class-slug') {
                                if (countCtr == res.data.customer.user_package_counts.length) {
                                    me.$store.state.bookerChoosePackageStatus = false
                                    setTimeout( () => {
                                        me.$parent.promptMessage = 'Please buy a class package first'
                                    }, 10)
                                    switch (me.category) {
                                        case 'inner':
                                            me.$parent.buyCredits = true
                                            break
                                    }
                                    me.$store.state.bookerPromptStatus = true
                                }
                            } else {
                                if (countCtr >= res.data.customer.user_package_counts.length) {
                                    me.$store.state.bookerChoosePackageStatus = false
                                    me.$store.state.buyPackageFirstStatus = true
                                }
                                if (newCtr == res.data.customer.user_package_counts.length) {
                                    me.$store.state.bookerChoosePackageStatus = false
                                    me.$store.state.buyPackageFirstStatus = true
                                }
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
