<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2 assign" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Add a guest</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group alt">
                        <div class="form_flex">
                            <div class="form_radio">
                                <input type="radio" id="member" value="member" name="assign_type" class="input_radio" checked v-model="assignType">
                                <label for="member">Member</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="non-member" value="non-member" name="assign_type" class="input_radio" v-model="assignType">
                                <label for="non-member">Non-member</label>
                            </div>
                        </div>
                        <div class="form_toggler" v-if="assignType == 'member'">
                            <div class="form_group">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" class="input_text" autocomplete="off" placeholder="Please enter a username" v-validate="{required: true, regex: '^[a-zA-Z0-9]*$', max: 15}" v-model="memberID">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('username')">Please enter username. Email addresses are not accepted.</span></transition>
                            </div>
                        </div>
                        <div class="form_toggler" v-if="assignType == 'non-member'">
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="first_name">First Name</label>
                                    <input type="text" id="first_name" name="first_name" class="input_text" autocomplete="off" placeholder="Enter First Name" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1]*$'}" v-model="nonMemberFirstName">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ properFormat(errors.first('first_name')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="last_name">Last Name</label>
                                    <input type="text" id="last_name" name="last_name" class="input_text" autocomplete="off" placeholder="Enter Last Name" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1]*$'}" v-model="nonMemberLastName">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ properFormat(errors.first('last_name')) }}</span></transition>
                                </div>
                            </div>
                            <div class="form_group">
                                <label for="email">Email Address</label>
                                <input type="text" id="email" name="email" class="input_text" autocomplete="off" placeholder="Enter Email Address" v-validate="'required|email'" v-model="nonMemberEmail">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ properFormat(errors.first('email')) }}</span></transition>
                            </div>
                        </div>
                        <div class="form_disclaimer">
                            Note: Guests who are either a member or a non-member will not have any ride metrics from this class.
                        </div>
                        <div class="form_button">
                            <button type="submit" class="default_btn">Add Guest</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                assignType: 'member',
                memberID: '',
                nonMemberEmail: '',
                nonMemberFirstName: '',
                nonMemberLastName: '',
                nonMember: {
                    email: null,
                    first_name: null,
                    last_name: null,
                    customer_details:  {
                        images: [
                            {
                                path: null
                            }
                        ]
                    }
                },
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.$parent.assignType = me.assignType
                        if (me.assignType == 'member') {
                            let formData = new FormData()
                            let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
                            me.loader(true)
                            formData.append('member_id', me.memberID)
                            formData.append('scheduled_date_id', me.$route.params.slug)
                            me.$axios.post('api/customers/member-id-search', formData, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then(res => {
                                if (res.data) {
                                    me.$parent.customer = res.data
                                    setTimeout( () => {
                                        me.$store.state.bookerAssignMemberPromptStatus = true
                                    }, 500)
                                }
                            }).catch(err => {
                                me.loader(false)
                                me.$store.state.bookerAssignStatus = false
                                me.$store.state.bookerAssignMemberErrorStatus = true
                            }).then(() => {
                                setTimeout( () => {
                                    me.$parent.tempAssignedGuest.first_name = ''
                                    me.$parent.tempAssignedGuest.last_name = ''
                                    me.$parent.tempAssignedGuest.email = ''
                                    me.loader(false)
                                }, 500)
                            })
                        } else {
                            let formData = new FormData()
                            let checkEmail = false
                            me.loader(true)
                            formData.append('type', 'email')
                            formData.append('value', me.nonMemberEmail)
                            formData.append('scheduled_date_id', me.$route.params.slug)
                            me.$axios.post('api/check-data-validity', formData).then(res => {
                                if (res.data) {
                                    if (res.data.exists) {
                                        me.$store.state.bookerAssignStatus = false
                                        me.$store.state.bookerAssignNonMemberErrorStatus = true
                                    } else {

                                        Object.keys(me.$parent.seats).forEach((parent) => {
                                            Object.keys(me.$parent.seats[parent]).forEach((child) => {
                                                if (child == 'data') {
                                                    for (let i = 0; i < me.$parent.seats[parent][child].length; i++) {
                                                        if (me.$parent.seats[parent][child][i].bookings.length > 0) {
                                                            if (me.$parent.seats[parent][child][i].bookings[0].is_guest == 0) {
                                                                if (me.$parent.seats[parent][child][i].bookings[0].user.email == me.nonMemberEmail) {
                                                                    checkEmail = true
                                                                    break
                                                                }
                                                            } else if (me.$parent.seats[parent][child][i].bookings[0].is_guest == 1) {
                                                                if (me.$parent.seats[parent][child][i].bookings[0].guest_email == me.nonMemberEmail) {
                                                                    checkEmail = true
                                                                    break
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            })
                                        })

                                        if (checkEmail) {
                                            me.$store.state.bookerAssignStatus = false
                                            me.$store.state.bookerAssignNonMemberErrorStatus = true
                                        } else {
                                            me.nonMember.email = me.nonMemberEmail
                                            me.nonMember.first_name = me.nonMemberFirstName
                                            me.nonMember.last_name = me.nonMemberLastName
                                            me.$parent.nonMember = me.nonMember
                                            me.$store.state.bookerAssignNonMemberStatus = true
                                        }
                                    }
                                }
                            }).catch(err => {
                                me.loader(false)
                                me.$store.state.bookerAssignStatus = false
                                me.$store.state.bookerAssignNonMemberErrorStatus = true
                            }).then(() => {
                                setTimeout( () => {
                                    me.$parent.tempAssignedGuest.first_name = ''
                                    me.$parent.tempAssignedGuest.last_name = ''
                                    me.$parent.tempAssignedGuest.email = ''
                                    me.loader(false)
                                }, 500)
                            })
                        }
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
							offset: -250
						})
                    }
                })
            },
            toggleClose () {
                const me = this
                me.$parent.tempAssignedGuest.first_name = me.nonMemberFirstName
                me.$parent.tempAssignedGuest.last_name = me.nonMemberLastName
                me.$parent.tempAssignedGuest.email = me.nonMemberEmail
                me.$store.state.bookerAssignStatus = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            const me = this
            if (me.$parent.tempAssignedGuest.first_name != '') {
                me.nonMemberFirstName = me.$parent.tempAssignedGuest.first_name
            }
            if (me.$parent.tempAssignedGuest.last_name != '') {
                me.nonMemberLastName = me.$parent.tempAssignedGuest.last_name
            }
            if (me.$parent.tempAssignedGuest.email != '') {
                me.nonMemberEmail = me.$parent.tempAssignedGuest.email
            }
        }
    }
</script>
