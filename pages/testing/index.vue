<template>
    <div class="buy_rides inner transaction" style="padding-top: 200px;">
        <section id="banner">

        </section>
        <button type="button" name="button" @click="close()">Close</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        methods: {
            close () {
                window.close()
            }
        }
    }
</script>
