<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt_2 gc" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title alt">Redeem gift card</h2>
                    <h3 class="form_subtitle">Please input the 4-digit PIN sent to your email address.</h3>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_group">
                            <label><b>{{ giftCard.gift_card.card_code }}</b></label>
                        </div>
                        <div class="form_flex with_btn alt_2">
                            <div class="form_group">
                                <label for="pin">Pin <span>*</span></label>
                                <input type="text" name="pin" autocomplete="off" placeholder="Enter your pin number" class="input_text" v-validate="'required|numeric|min:2|max:12'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('pin')">{{ errors.first('pin') | properFormat }}</span></transition>
                            </div>
                            <div class="form_button alt">
                                <button type="submit" class="default_btn">Redeem Now</button>
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
            giftCard: {
                default: null
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
                        let token = me.$cookies.get('70hokc3hhhn5')
                        me.loader(true)
                        if (token == null || token == undefined) {
                            me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        } else {
                            let formData = new FormData(document.getElementById('default_form'))
                            me.$axios.post(`api/extras/redeem-gift-card/${me.giftCard.id}`, formData, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then(res => {
                                if (res.data) {
                                    setTimeout( () => {
                                        me.$store.state.redeemGiftCardStatus = false
                                        me.$store.state.redeemGiftCardSuccessStatus = true
                                    }, 500)
                                }
                            }).catch((err) => {
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
                me.$store.state.redeemGiftCardStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
