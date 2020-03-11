<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_image">
                <img src="/default/meme/cancelled-meme.jpg" />
            </div>
            <div class="confirmation_text">
                Sorry! You don't have a package, buy first
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose(true)">Buy Rides</div>
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
                    if (me.$parent.webApp) {
                        me.$router.push('/fish-in-the-glass/buy-rides#package')
                    } else {
                        me.$router.push('/buy-rides#package')
                    }
                }
                me.$store.state.buyPackageFirstStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
