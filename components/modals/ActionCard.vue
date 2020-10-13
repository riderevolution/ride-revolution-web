<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div v-if="type == 'default'">
            <div class="confirmation_wrapper">
                <div class="form_close" @click="toggleClose()"></div>
                <div class="confirmation_text">
                    Are you sure you want to set default this card?
                </div>
                <div class="button_group">
                    <div class="flex default_btn_red" @click.once="toggleClose()"><span>No</span></div>
                    <div class="flex default_btn_wht" @click.once="toggleAction()"><span>Yes</span></div>
                </div>
            </div>
        </div>
        <div v-else-if="type == 'delete'">
            <div class="confirmation_wrapper">
                <div class="form_close" @click="toggleClose()"></div>
                <div class="confirmation_text">
                    Are you sure you want to delete this card?
                </div>
                <div class="button_group">
                    <div class="flex default_btn_red" @click.once="toggleClose()"><span>No</span></div>
                    <div class="flex default_btn_wht" @click.once="toggleAction()"><span>Yes</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'default'
            },
            card: {
                type: Object/Array,
                default: null
            }
        },
        methods: {
            toggleAction () {
                const me = this
                let token = me.$cookies.get('70hokc3hhhn5')
                let url = ''
                me.loader(true)

                if (me.type == 'default') {
                    me.$axios.post(`api/paymaya/cards/set-as-default/${me.card.cardTokenId}`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        setTimeout(() => {
                            me.$parent.card_action = false
                            me.$parent.card_success = true
                            me.$parent.card_message = 'Successfully set this card as default!'
                            me.$parent.getCards()
                        }, 500)
                    }).catch(err => {
                        setTimeout(() => {
                            me.$store.state.errorOverlayPromptStatus = true
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }, 500)
                    }).then(() => {
                        setTimeout(() => {
                            me.loader(false)
                        }, 500)
                    })
                } else {
                    me.$axios.delete(`api/paymaya/cards/${me.card.cardTokenId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        setTimeout(() => {
                            me.$parent.card_action = false
                            me.$parent.card_success = true
                            me.$parent.card_message = 'Successfully deleted the card!'
                            me.$parent.getCards()
                        }, 500)
                    }).catch(err => {
                        setTimeout(() => {
                            me.$store.state.errorOverlayPromptStatus = true
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }, 500)
                    }).then(() => {
                        setTimeout(() => {
                            me.loader(false)
                        }, 500)
                    })
                }
            },
            toggleClose () {
                const me = this
                me.$parent.card_action = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            document.body.classList.add('no_scroll')
        }
    }
</script>
