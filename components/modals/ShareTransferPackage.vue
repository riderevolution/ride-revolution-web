<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title alt">{{ (category == 'transfer') ? 'Transfer' : 'Share' }} Class Package</h2>
                    <h3 class="form_subtitle">You are about to {{ category }} your <b>{{ data.class_package.name }}</b>. Please input the recipient's username or email address.</h3>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_flex with_btn alt_2">
                            <div class="form_group">
                                <label for="receiver_id">Recipient<span>*</span></label>
                                <input type="text" name="receiver_id" v-model="form.receiver_id" autocomplete="off" placeholder="Enter recipient username or email" class="input_text" v-validate="{required: true, min: 6, regex: '^[a-zA-Z0-9/-/_|\@|\.|\#]*$'}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('receiver_id')">{{ properFormat(errors.first('receiver_id')) }}</span></transition>
                            </div>
                            <div class="form_button alt">
                                <button type="submit" class="default_btn">{{ (category == 'transfer') ? 'Transfer' : 'Share' }}</button>
                            </div>
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
                default: 'transfer'
            },
            data: {
                default: null
            }
        },
        data () {
            return {
                form: {
                    sender_id: ''
                }
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let token = me.$cookies.get('70hokc3hhhn5')
                        me.$axios.get('api/check-token', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                me.loader(true)
                                let formData = new FormData()
                                formData.append('sender_id', res.data.user.id)
                                formData.append('user_package_count_id', me.data.id)
                                formData.append('receiver_id', me.form.receiver_id)
                                me.$axios.post(`api/packages/class-packages/${me.category}?forWeb=1`, formData).then(res => {
                                    if (res.data) {
                                        setTimeout( () => {
                                            me.$store.state.shareTransferPackageStatus = false
                                            me.$parent.promptMessage = `You have successfully ${(me.category == 'share') ? 'shared' : 'transferred'} your package.`
                                            me.$store.state.bookerPromptStatus = true
                                            me.$parent.$parent.toggleTab(2, 'packages')
                                        }, 500)
                                    }
                                }).catch(err => {
                                    me.$store.state.errorList = err.response.data.errors
                                    me.$store.state.errorOverlayPromptStatus = true
                                    me.$store.state.errorPromptStatus = true
                                }).then(() => {
                                    setTimeout( () => {
                                        me.loader(false)
                                    }, 500)
                                })
                            }
                        }).catch(err => {
                            me.$store.state.needLogin = true
                            me.$store.state.errorOverlayPromptStatus = true
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        })
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
                me.$store.state.shareTransferPackageStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
