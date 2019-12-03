<template>
    <div id="main_container">
        <transition name="fade">
            <navbar />
        </transition>
        <nuxt />
        <transition name="fade">
            <loading v-if="$store.state.isLoading" />
        </transition>
    </div>
</template>
<script>
    import Navbar from '../components/Navbar'
    import Loading from '../components/modals/Loading'
    export default {
        components: {
            Navbar,
            Loading
        }
    }
</script>
