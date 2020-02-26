<template>
    <div id="complete_profile">
        <div class="profile_text">
            <span>Profile Progress 30%</span>
            <div class="wrapper">
                <div :class="`rec ${(n <= 3) ? 'active' : ''}`" v-for="n in 10"></div>
            </div>
            <span class="complete" @click="toggleSteps()">Complete profile now</span>
            <span>&nbsp; so you can book your first ride already.</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleSteps () {
                const me = this
                me.$store.state.completeProfileStepsStatus = true
            }
        }
    }
</script>
