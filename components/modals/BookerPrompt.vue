<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(($parent.buyCredits) ? 0 : null)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(($parent.buyCredits) ? 0 : null)"></div>
            <div class="confirmation_text">
                {{ message }}
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose(($parent.buyCredits) ? 1 : 0)">Confirm</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: null
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggleClose (booker) {
                const me = this
                if (booker == 1) {
                    me.$router.push('/buy-rides#package')
                }
                switch (me.$parent.seatStatus) {
                    case 'open':
                        if (me.$parent.classPackage == null) {
                            // document.querySelector('.package_violator').scrollIntoView({block: 'center', behavior: 'smooth'})
                        }
                        break
                }
                me.$parent.status = false
                me.$store.state.bookerPromptStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
