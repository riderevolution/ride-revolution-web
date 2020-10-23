<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_text" v-if="type == 1">
                Are you sure you want to cancel {{ user_package_count.class_package.name }} subscription?
            </div>
            <div class="confirmation_text" v-else>
                Your Subscription has been cancelled.
            </div>
            <div :class="`button_group ${(type != 1) ? 'alt' : ''}`">
                <div class="flex default_btn_red" @click.once="toggleClose(false)" v-if="type == 1"><span>No</span></div>
                <div class="flex default_btn_wht" @click.once="toggleClose(true)"><span>{{ (type == 1) ? 'Yes' : 'OK' }}</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: Number,
                default: 1
            },
            user_package_count: {
                type: Object/Array,
                default: null
            }
        },
        methods: {
            /**
             * [toggleClose toggle action based on the status]
             * @param  {[boolean]} status [action status]
             */
            toggleClose (status) {
                const me = this
                if (me.type == 2) {
                    me.$parent.sub_type = 1
                    me.$parent.toggledMenuTab('active')
                    me.$parent.cancel_subs = false
                    document.body.classList.remove('no_scroll')
                } else {
                    if (status) {
                        let token = me.$cookies.get('70hokc3hhhn5')
                        me.$axios.get('api/check-token', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                me.loader(true)
                                let formData = new FormData()
                                formData.append('recurly_subscription_id', me.user_package_count.recurly_subscription_id)
                                me.$axios.post('api/recurly/cancel', formData, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }).then(res => {
                                    if (res.data) {
                                        me.$parent.cancel_subs = false
                                        setTimeout( () => {
                                            me.$parent.toggleCancelled('subs')
                                        }, 500)
                                    }
                                }).catch(err => {
                                    me.$store.state.errorOverlayPromptStatus = true
                                    me.$parent.cancel_subs = false
                                    me.$store.state.errorList = err.response.data.errors
                                    me.$store.state.errorPromptStatus = true
                                }).then(() => {
                                    setTimeout( () => {
                                        me.loader(false)
                                    }, 500)
                                })
                            }
                        })
                    } else {
                        me.$parent.cancel_subs = false
                        document.body.classList.remove('no_scroll')
                    }
                }
            }
        },
        mounted () {
            document.body.classList.add('no_scroll')
        }
    }
</script>
