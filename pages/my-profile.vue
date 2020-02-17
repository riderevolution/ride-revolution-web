<template>
    <div class="my_profile">
        <breadcrumb :overlay="false" />
        <referral />
    </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import Referral from '../components/Referral'
    export default {
        components: {
            Breadcrumb,
            Referral
        }
    }
</script>
