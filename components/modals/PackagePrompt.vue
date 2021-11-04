<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click.once="toggleClose()"></div>
            <div class="confirmation_text">
                {{ payload.message }}
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose()">OK</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            payload: {
                type: Object,
                value: null
            }
        },
        methods: {
            toggleClose () {
                const me = this
                let form_data = new FormData()
                me.$axios.post(`api/extras/read-subscription-expiry-notif/${payload.id}`, form_data).thene(res => {
                    me.$parent.package_prompt = false
                    document.body.classList.remove('no_scroll')
                    window.location.assign('/my-profile#packages')
                })
            }
        },
        mounted () {
            document.body.classList.add('no_scroll')
        }
    }
</script>
