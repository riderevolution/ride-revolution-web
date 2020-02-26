<template>
    <div class="book_a_bike form">
        <breadcrumb :overlay="false" />
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" />
        </transition>
        <div id="content">
            <div :class="`${(submitted) ? 'overlay' : ''}`">
                <transition name="slideX">
                    <div v-if="!submitted" class="preview_book_form">
                        <h2 class="header_title">Are you sure want to save the following changes?</h2>
                        <div class="preview">
                            <div class="item">
                                <p>Bike No.</p>
                                <p>7, 8</p>
                            </div>
                            <div class="item">
                                <p>Class Package Used</p>
                                <p>10 Class Package</p>
                            </div>
                            <div class="item">
                                <p>Total Rides Left</p>
                                <p>10</p>
                            </div>
                            <div class="item">
                                <p>Total Rides Used</p>
                                <p>8</p>
                            </div>
                            <div class="total">
                            </div>
                            <div class="preview_actions">
                                <nuxt-link to="/book-a-bike/asdasd" class="back">Back</nuxt-link>
                                <div class="default_btn" @click="submitPreview()">Let's Do This</div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="fade">
            <booker-success v-if="$store.state.buyRidesSuccessStatus" />
        </transition>
    </div>
</template>

<script>
    import ProTip from '../../../../../components/ProTip'
    import Breadcrumb from '../../../../../components/Breadcrumb'
    import BookerSuccess from '../../../../../components/modals/BookerSuccess'
    export default {
        components: {
            ProTip,
            Breadcrumb,
            BookerSuccess
        },
        data () {
            return {
                submitted: false
            }
        },
        methods: {
            submitPreview () {
                const me = this
                me.submitted = true
                me.$store.state.buyRidesSuccessStatus = true
                me.$scrollTo('#content', {
                    offset: -250
                })
            }
        },
        mounted () {
            const me = this
            me.$store.state.proTipStatus = true
            console.log(me.$route.params);
        }
    }
</script>
