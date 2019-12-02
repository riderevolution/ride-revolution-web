<template>
    <div id="main_container">
        <nuxt />
        <transition name="fade">
            <loading v-if="$store.state.isLoading" />
        </transition>
    </div>
</template>
<script>
    import Loading from '../components/modals/Loading'
    export default {
        components: {
            Loading
        }
    }
</script>
