<template>
    <div id="main_container">
        <navbar />
        <nuxt />
        <transition name="fade">
            <loader v-if="$store.state.isLoading" />
        </transition>
        <foot />
        <transition name="fade">
            <navbar-expanded v-if="$store.state.isExpanded" />
        </transition>
    </div>
</template>
<script>
    import NavbarExpanded from '../components/NavbarExpanded'
    import Navbar from '../components/Navbar'
    import Foot from '../components/Foot'
    import Loader from '../components/modals/Loader'
    export default {
        components: {
            NavbarExpanded,
            Navbar,
            Foot,
            Loader
        }
    }
</script>
