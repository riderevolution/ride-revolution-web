<template>
    <div id="instagram">
        <div :class="`image_wrapper ${(lessOne) ? 'less_one' : ''}`">
            <a href="javascript:void(0)" class="image" v-for="(n, key) in 5" :key="key" v-if="!lessOne">
                <img :src="`/default/lets-ride/sample-ig${key}.jpg`" />
            </a>
            <a href="javascript:void(0)" class="image" v-for="(n, key) in 4" :key="key" v-if="lessOne">
                <img :src="`/default/lets-ride/sample-ig${key}.jpg`" />
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            lessOne: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
