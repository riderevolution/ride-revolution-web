<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_text">
                {{ message }}
            </div>
            <div class="button_group alt">
                <div class="flex default_btn" @click.once="toggleClose()">Done</div>
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
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.waitlistedClassesPromptStatus = false
                me.$parent.message = ''
            }
        }
    }
</script>
