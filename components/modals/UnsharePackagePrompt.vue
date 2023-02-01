<template>
    <div class="default_modal overlay alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <template v-if="active_step == 1">
                <div class="confirmation_text">
                    Select a friend you want to unshare this package
                </div>
                <p>&nbsp;</p>
                <div :class="`form_custom_checkbox ${(data.shares_count > 1) ? 'share-scroll' : ''}`">
                    <div
                        v-for="(share, key) in data.shares"
                        :key="key"
                        :id="`user_${key}`"
                        :class="[
                            'custom_checkbox',
                            share.active && 'active'
                        ]"
                        @click="selectUser(share)"
                    >
                        <label>{{ share.user.fullname }}</label>
                        <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                            <g transform="translate(-804.833 -312)">
                                <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                            </g>
                        </svg>
                        <div class="info">
                            <p>{{ share.user.member_id }}</p>
                            <p>{{ share.user.email }}</p>
                        </div>
                    </div>
                </div>
                <div class="button_group alt">
                    <div class="flex default_btn_red" @click.once="toggleClose(false)">Cancel</div>
                    <div 
                        :class="[
                            'flex default_btn_wht ml',
                            !selected_user && 'disabled'
                        ]"
                        @click="(!selected_user) ? null : active_step = 2"
                    >
                        Confirm
                    </div>
                </div>
            </template>
            <template v-else-if="active_step == 2">
                <div class="confirmation_text">
                    Are you sure you want to unshare this package?
                </div>
                <div class="button_group alt">
                    <div class="flex default_btn_red" @click="active_step = 1">Back</div>
                    <div class="flex default_btn_wht ml" @click.once="toggleClose(true)">Continue</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                default: null
            }
        },
        data: () => ({
            active_step: 1,
            selected_user: null
        }),
        methods: {
            selectUser (payload) {
                this.data.shares.forEach(share => {
                    share.active = (share.user_id == payload.user_id) ? true : false
                })
                this.selected_user = payload
            },
            toggleClose (status) {
                const me = this
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
                            formData.append('sender_id', res.data.user.id)
                            formData.append('user_package_count_id', me.data.id)
                            formData.append('receiver_id', me.selected_user.user_id)
                            me.$axios.post(`api/packages/class-packages/unshare`, formData, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then(res => {
                                if (res.data) {
                                    setTimeout( () => {
                                        me.$store.state.unSharePackageStatus = false
                                        me.$parent.promptMessage = `You have successfully unshared your package.`
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
                    this.data.shares.forEach(share => {
                        share.active = false
                    })
                    me.$store.state.unSharePackageStatus = false
                }
            }
        }
    }
</script>
