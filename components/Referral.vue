<template>
    <section id="referral">
        <div class="wrapper">
            <h2>Don’t ride alone. Get Php 200 for every friend you refer.</h2>
            <h3>Your friends get Php 200 and you get Php 200 after their first purchase. Enter your email address to start referring.</h3>
            <form id="default_form">
                <div class="form_flex with_btn">
                    <div class="form_group">
                        <input type="email" id="email" name="email" class="input_text email" autocomplete="off" placeholder="Enter your email address" v-validate="'required|email'">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">The email field is required</span></transition>
                    </div>
                    <div class="form_button">
                        <button type="button" class="default_btn">Send Referral Link</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    export default {

    }
</script>
