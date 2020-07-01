<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2" @submit.prevent="submissionSuccess()">
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
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('username')">{{ errors.first('username') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_toggler" v-if="assignType == 'non-member'">
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="first_name">First Name</label>
                                    <input type="text" id="first_name" name="first_name" class="input_text" autocomplete="off" placeholder="Enter First Name" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1]*$'}" v-model="nonMemberFirstName">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ errors.first('first_name') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="last_name">Last Name</label>
                                    <input type="text" id="last_name" name="last_name" class="input_text" autocomplete="off" placeholder="Enter Last Name" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1]*$'}" v-model="nonMemberLastName">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ errors.first('last_name') | properFormat }}</span></transition>
                                </div>
                            </div>
                            <div class="form_group">
                                <label for="email">Email Address</label>
                                <input type="text" id="email" name="email" class="input_text" autocomplete="off" placeholder="Enter Email Address" v-validate="'required|email'" v-model="nonMemberEmail">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') | properFormat }}</span></transition>
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
        filters: {
            properFormat (value) {
                let newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
                let message = value.split('The ')[1].split(' field')
                if (message.length > 1) {
                    message = message[1]
                    return `The ${newValue} field${message}`
                } else {
                    if (message[0].split('file').length > 1) {
                        message = message[0].split('file')[1]
                        return `The ${newValue} field${message}`
                    } else {
                        return `The ${newValue}`
                    }
                }
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        if (me.assignType == 'member') {
                            let formData = new FormData()
                            let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('token')
                            me.loader(true)
                            formData.append('member_id', me.memberID)
                            formData.append('scheduled_date_id', me.$route.params.slug)
                            formData.append('temp_seats', JSON.stringify(me.$parent.toSubmit.tempSeat))
                            me.$axios.post('api/customers/member-id-search', formData, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then(res => {
                                if (res.data) {
                                    me.$parent.customer = res.data
                                    setTimeout( () => {
                                        me.$store.state.bookerAssignStatus = false
                                        me.$store.state.bookerAssignMemberPromptStatus = true
                                    }, 500)
                                }
                            }).catch(err => {
                                me.loader(false)
                                me.$store.state.bookerAssignStatus = false
                                me.$store.state.bookerAssignMemberErrorStatus = true
                            }).then(() => {
                                setTimeout( () => {
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
                                        me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                            if (element.temp.customer.email == me.nonMemberEmail) {
                                                checkEmail = true
                                            }
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
                me.$store.state.bookerAssignStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
