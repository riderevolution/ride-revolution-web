<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_text">
                Are you sure you want to add this member?
            </div>
            <div class="member_info" v-if="customer != null">
                <img :src="customer.path" />
                <h2>{{ customer.name }}</h2>
                <h3>{{ customer.member_id }}</h3>
            </div>
            <div class="button_group">
                <a href="javascript:void(0)" class="flex default_btn_out" @click.once="toggleClose(false)"><span>No</span></a>
                <div class="flex default_btn" @click.once="toggleClose(true)">Yes</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            customer: {
                type: Object,
                default: null
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    if (me.customer != null) {
                        me.loader(true)
                        setTimeout( () => {
                            me.$parent.currentSeat.status = 'guest'
                            me.$store.state.bookerAssignMemberPromptStatus = false
                            me.$store.state.bookerAssignSuccessStatus = true
                            me.loader(false)
                        }, 500)
                    }
                } else {
                    me.$store.state.bookerAssignMemberPromptStatus = false
                    me.$store.state.bookerAssignStatus = true
                }
            }
        }
    }
</script>
