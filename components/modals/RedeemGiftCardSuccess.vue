<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_title">
                Congratulations! You successfully redeemed your gift card.
            </div>
            <div class="confirmation_image">
                <img :src="giftCard.images[0].path" />
                <div class="overlay">
                    <img class="gift_img" :src="giftCard.fromUser.images[0].path" v-if="giftCard.fromUser.images[0].path != null" />
                    <div class="initials" v-else>
                        <div class="name">{{ giftCard.fromUser.first_name.charAt(0) }}{{ giftCard.fromUser.last_name.charAt(0) }}</div>
                    </div>
                    <div class="label">From {{ giftCard.fromUser.first_name }} {{ giftCard.fromUser.last_name }}</div>
                </div>
            </div>
            <div class="button_group alt">
                <div class="default_btn_wht flex" @click.once="toggleClose()">Done</div>
            </div>
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
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.redeemGiftCardSuccessStatus = false
                document.body.classList.remove('no_scroll')
                me.$parent.giftCardTemp = []
                me.$parent.$parent.toggleTab(4, 'gift-cards')
            }
        }
    }
</script>
