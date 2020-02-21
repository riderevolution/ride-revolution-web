<template>
    <div class="book_a_bike form">
        <breadcrumb :overlay="false" />
        <section id="banner"></section>
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" />
        </transition>
        <div id="content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
    </div>
</template>

<script>
    import ProTip from '../../../../components/ProTip'
    import Breadcrumb from '../../../../components/Breadcrumb'
    export default {
        components: {
            ProTip,
            Breadcrumb
        },
        mounted () {
            const me = this
            me.$store.state.proTipStatus = true
            console.log(me.$route.params);
        }
    }
</script>
