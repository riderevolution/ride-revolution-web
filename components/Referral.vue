<template>
    <section id="referral" :class="`${($route.path == '/my-profile') ? 'alt' : ''}`">
        <div class="wrapper">
            <div v-html="subtitle"></div>
            <div class="link" v-if="isWebBased">
                <label>Referral Link</label>
                <a class="refer_link" href="http://riderev/refer-a-friend">http://riderev/refer-a-friend</a>
            </div>
            <form id="default_form" @submit.prevent="submissionSuccess()">
                <div class="form_flex with_btn">
                    <div class="form_group">
                        <input type="email" id="email" name="email" class="input_text email" autocomplete="off" v-model="form.email" placeholder="Enter your email address" v-validate="'required|email'">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">The email field is required</span></transition>
                    </div>
                    <div class="form_button">
                        <button type="submit" class="default_btn"><span>Send Referral Link</span></button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            subtitle: {
                default: '<h2>Refer a friend, get a free ride!</h2><h3>Earn a single class for referrals who buy our 2-week unlimited first-timer package. Enter your email below to start referring!</h3>'
            }
        },
        data () {
            return {
                isWebBased: false,
                form: {
                    email: ''
                }
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
                        let token = me.$cookies.get('token')
                        let formData = new FormData(document.getElementById('default_form'))
                        me.$axios.post('api/refer-a-frined', fornData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                setTimeout( () => {
                                    console.log(res.data);
                                }, 500)
                            }
                        }).catch(err => {
                            document.body.classList.add('no_scroll')
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.form.email = ''
                                me.errors.clear()
                                me.$nextTick(() => {
                                    me.$validator.reset()
                                })
                            }, 500)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#referral',
							offset: -250
						})
                    }
                })
            }
        },
        mounted () {
            const me = this
            if (me.$route.fullPath.match(/\bfish-in-the-glass/ig)) {
                me.isWebBased = true
            } else {
                me.isWebBased = false
            }
        }
    }
</script>
