<template>
    <div class="default_modal overlay alt">
        <div class="background"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                Are you sure you want to unshare this package?
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_red" @click.once="toggleClose(false)">Cancel</div>
                <div class="flex default_btn_wht ml" @click.once="toggleClose(true)">Confirm</div>
            </div>
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
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    let token = me.$cookies.get('token')
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
                            formData.append('receiver_id', me.data.sharedto_user_id)
                            me.$axios.post(`api/packages/class-packages/unshare`, formData).then(res => {
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
                        me.$store.state.errorList = err.response.data.errors
                        me.$store.state.errorOverlayPromptStatus = true
                        me.$store.state.errorPromptStatus = true
                    })
                } else {
                    me.$store.state.unSharePackageStatus = false
                }
            }
        }
    }
</script>
