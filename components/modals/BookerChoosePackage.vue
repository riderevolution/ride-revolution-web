<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Please choose where we will deduct your credits.</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_custom_checkbox">
                            <div :id="`package_${key}`" :class="`custom_checkbox ${(classPackage.active) ? 'active' : ''}`" v-for="(classPackage, key) in populateClassPackages" :key="key" @click="togglePackage(classPackage, key)" v-if="classPackage.count > 1">
                                <label>{{ classPackage.class_package.name }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info">
                                    <p>Available: {{ classPackage.count }}</p>
                                    <p>Expires on {{ formatDate(classPackage.class_package.computed_expiration_date) }}</p>
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
                selectedPackage: 0
            }
        },
        computed: {
            populateClassPackages () {
                const me = this
                let result = []
                let ctr = 0
                me.classPackages.forEach((element, index) => {
                    if (ctr < 1 && element.count > 0) {
                        element.active = true
                        me.classPackage = element
                        if (me.type == 1) {
                            me.$parent.classPackage = me.classPackage
                        }
                        me.selectedPackage = element.class_package.id
                        ctr++
                    }
                    result.push(element)
                })
                return result
            },
        },
        methods: {
            submissionSuccess () {
                const me = this
                if (me.selectedPackage) {
                    if (me.type == 0) {
                        let token = me.$cookies.get('token')
                        let formData = new FormData()
                        formData.append('scheduled_date_id', me.$parent.schedule.id)
                        formData.append('user_id', me.$store.state.user.id)
                        formData.append('studio_id', me.$parent.schedule.schedule.studio_id)
                        formData.append('class_package_id', me.selectedPackage)
                        me.$axios.post(`api/waitlists`, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                me.$parent.getAllSchedules(me.$parent.currentYear, me.$parent.currentMonth, me.$parent.currentDay, false)
                                setTimeout( () => {
                                    me.$store.state.buyRidesPromptStatus = true
                                    me.$parent.message = "You've successfully added as waitlist in this class."
                                    me.$parent.status = true
                                    me.$parent.buyCredits = false
                                }, 500)
                            }
                        }).catch(err => {
                            me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                            me.loader(false)
                        })
                    } else if (me.type == 1) {
                        me.$parent.classPackage = me.classPackage
                        me.$parent.packageSelected = me.classPackage.class_package.name
                        me.$parent.pointPackage = false
                        console.log(me.$parent.classPackage);
                    }
                    me.$store.state.bookerChoosePackageStatus = false
                    document.body.classList.remove('no_scroll')
                }
            },
            togglePackage (data, unique) {
                const me = this
                me.active = false
                me.classPackage = data
                me.selectedPackage = data.class_package.id
                document.getElementById(`package_${unique}`).classList.add('active')
                me.classPackages.forEach((element, index) => {
                    if (element.count > 0) {
                        if (unique != index) {
                            document.getElementById(`package_${index}`).classList.remove('active')
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
            me.$axios.get(`api/customers/${me.$store.state.user.id}/packages`).then(res => {
                if (res.data) {
                    if (res.data.customer.user_package_counts.length > 0) {
                        me.classPackages = res.data.customer.user_package_counts
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
    }
</script>
