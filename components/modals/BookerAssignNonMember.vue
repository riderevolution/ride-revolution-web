<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_text">
                You are about to send an email invitation to:
            </div>
            <div class="confirmation_highlight">
                {{ email }}
            </div>
            <div class="button_group">
                <a href="javascript:void(0)" class="flex default_btn_out" @click.once="toggleClose(false)"><span>Back</span></a>
                <div class="flex default_btn" @click.once="toggleClose(true)">Continue</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            email: {
                type: String,
                default: null
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    if (me.email != null) {
                        me.loader(true)
                        setTimeout( () => {
                            me.$parent.currentSeat.status = 'guest'
                            me.$parent.hasGuest = true
                            me.$store.state.bookerAssignStatus = false
                            me.$store.state.bookerAssignNonMemberStatus = false
                            me.$store.state.bookerAssignSuccessStatus = true
                            me.loader(false)
                        }, 500)
                    }
                } else {
                    me.$store.state.bookerAssignNonMemberStatus = false
                    me.$store.state.bookerAssignStatus = true
                }
            }
        }
    }
</script>
