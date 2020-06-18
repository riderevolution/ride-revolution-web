<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper video">
            <iframe :src="data.video_link" width="100%"></iframe>
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
            toggleClose () {
                const me = this
                me.$store.state.videoPrompt = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
