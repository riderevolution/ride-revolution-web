<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_title">
                Congratulations! You successfully redeemed your gift card.
            </div>
            <div class="confirmation_image">
                <img src="/sample-gift.png" />
                <div class="overlay">
                    <img class="gift_img" src="/sample-image-booker.png" />
                    <!-- <div class="initials" v-else>
                        <div class="name">{{ data.from.initials }}</div>
                    </div> -->
                    <div class="label">From Juan</div>
                </div>
            </div>
            <div class="button_group alt">
                <div class="default_btn_wht flex" @click.once="toggleClose(true)">Done</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    me.$store.state.redeemGiftCardSuccessStatus = false
                    document.body.classList.remove('no_scroll')
                }
            }
        }
    }
</script>
