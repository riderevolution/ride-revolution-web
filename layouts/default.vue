<template>
    <div id="main_container">
        <navbar />
        <nuxt />
        <transition name="fade">
            <loading v-if="$store.state.isLoading" />
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
    import Loading from '../components/modals/Loading'
    export default {
        components: {
            NavbarExpanded,
            Navbar,
            Foot,
            Loading
        }
    }
</script>
