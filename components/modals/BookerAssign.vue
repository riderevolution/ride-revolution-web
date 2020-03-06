<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Add a guest</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
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
                                <label for="member_id">Username</label>
                                <input type="text" id="member_id" name="member_id" class="input_text alt" autocomplete="off" placeholder="Please enter a username" v-validate="{required: true, regex: '^[a-zA-Z0-9]*$'}" v-model="memberID">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('member_id')">The member id field is required</span></transition>
                            </div>
                        </div>
                        <div class="form_toggler" v-if="assignType == 'non-member'">
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="first_name">First Name</label>
                                    <input type="text" id="first_name" name="first_name" class="input_text" autocomplete="off" placeholder="Enter First Name" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1]*$'}" v-model="nonMemberFirstName">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">The first name field is required</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="last_name">Last Name</label>
                                    <input type="text" id="last_name" name="last_name" class="input_text" autocomplete="off" placeholder="Enter Last Name" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\u00f1]*$'}" v-model="nonMemberLastName">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">The last name field is required</span></transition>
                                </div>
                            </div>
                            <div class="form_group">
                                <label for="email">Email Address</label>
                                <input type="text" id="email" name="email" class="input_text" autocomplete="off" placeholder="Enter Email Address" v-validate="'required|email'" v-model="nonMemberEmail">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">The email field is required</span></transition>
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
                nonMemberLastName: ''
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        if (me.assignType == 'member') {
                            let formData = new FormData()
                            formData.append('member_id', me.memberID)
                            me.loader(true)
                            me.$axios.post('api/customers/member-id-search', formData).then(res => {
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
                            me.$parent.nonMember.email = me.nonMemberEmail
                            me.$parent.nonMember.first_name = me.nonMemberFirstName
                            me.$parent.nonMember.last_name = me.nonMemberLastName
                            me.$store.state.bookerAssignNonMemberStatus = true
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
