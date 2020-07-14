<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper image" :style="`background-image: url(${$store.state.viewImageUrl})`">
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.viewImageUrl = ''
                me.$store.state.imageViewerStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
