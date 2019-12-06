<template>
    <div id="main_container">
        <navbar />
        <nuxt />
        <transition name="fade">
            <loading v-if="$store.state.isLoading" />
        </transition>
        <foot />
    </div>
</template>
<script>
    import Navbar from '../components/Navbar'
    import Foot from '../components/Foot'
    import Loading from '../components/modals/Loading'
    export default {
        components: {
            Navbar,
            Foot,
            Loading
        }
    }
</script>
