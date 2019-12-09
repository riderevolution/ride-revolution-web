<template>
    <div class="image_wrapper">
        <a href="javascript:void(0)" class="image" v-for="(n, key) in 5" :key="key">
            <img :src="`/default/lets-ride/sample-ig${key}.jpg`" />
        </a>
    </div>
</template>

<script>
    export default {

    }
</script>
