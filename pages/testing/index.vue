<template>
    <div class="buy_rides inner transaction" style="padding-top: 200px;">
        <section id="banner">
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted () {
            setTimeout( () => {
                window.opener.document.getElementById('sc').click()
                window.close()
            }, 500)
        }
    }
</script>
