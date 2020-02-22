<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_image">
                <img src="/default/meme/before-cancel-meme.jpg" v-if="type == 1"/>
                <img src="/default/meme/cancelled-meme.jpg" v-else/>
            </div>
            <div class="confirmation_text" v-if="type == 1">
                Are you sure you want to cancel this class?
            </div>
            <div class="confirmation_text" v-else>
                Your class has been cancelled.
            </div>
            <div :class="`button_group ${(type != 1) ? 'alt' : ''}`">
                <div class="flex default_btn_red" @click.once="toggleClose(false)" v-if="type == 1"><span>No</span></div>
                <div class="flex default_btn" @click.once="toggleClose(true)">{{ (type == 1) ? 'Yes' : 'Done' }}</div>
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
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    if (me.type == 2) {
                        me.$parent.type = 1
                        me.$store.state.cancelClassStatus = false
                        document.body.classList.remove('no_scroll')
                    } else {
                        me.$store.state.cancelClassStatus = false
                        setTimeout( () => {
                            me.$parent.toggleCancelled()
                        }, 100)
                    }
                } else {
                    me.$store.state.cancelClassStatus = false
                    document.body.classList.remove('no_scroll')
                }
            }
        }
    }
</script>
