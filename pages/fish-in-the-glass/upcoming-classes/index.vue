<template>
    <div class="upcoming_classes fish">
        <section id="banner" class="alt_3">
            <img src="/default/upcoming-classes/upcoming-classes-banner.jpg" />
            <div class="overlay_mid">
                <h1>{{ totalItems(classes.length) }}</h1>
                <h2>Upcoming Classes</h2>
            </div>
            <nuxt-link to="/fish-in-the-glass/waitlisted-classes" class="overlay_waitlist">
                <p>Waitlisted Classes: 1</p>
                <svg id="chevron" xmlns="http://www.w3.org/2000/svg" width="10.293" height="17.758" viewBox="0 0 10.293 17.758">
                    <path class="icon" d="M-2156,2337.738l8.172,8.172-8.172,8.172" transform="translate(2156.707 -2337.031)"/>
                </svg>
            </nuxt-link>
        </section>
        <section id="content">
            <div class="classes">
                <nuxt-link to="/fish-in-the-glass/book-a-bike/asdasdasd" class="class" v-for="(data, key) in classes" :key="key">
                    <div class="left">
                        <div class="bike">Bike: {{ data.bike }}</div>
                        <div class="date">{{ $moment().format('MMM D, h:mm A') }}</div>
                        <div class="info">
                            <div class="text">{{ data.class }} with {{ data.instructor }}</div>
                            <div class="divider">|</div>
                            <div class="text">{{ data.studio }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <svg id="chevron" xmlns="http://www.w3.org/2000/svg" width="10.293" height="17.758" viewBox="0 0 10.293 17.758">
                            <path class="icon" d="M-2156,2337.738l8.172,8.172-8.172,8.172" transform="translate(2156.707 -2337.031)"/>
                        </svg>
                    </div>
                </nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        layout: 'fish',
        data () {
            return {
                classes: [
                    {
                        id: 1,
                        bike: '7 and 8',
                        class: 'Ride Rev',
                        instructor: 'Billie Capistrano',
                        studio: 'Greenbelt 5'
                    },
                    {
                        id: 2,
                        bike: '7 and 8',
                        class: 'Ride Rev',
                        instructor: 'Billie Capistrano',
                        studio: 'Shangri-la Plaza'
                    },
                    {
                        id: 3,
                        bike: '6 and 10',
                        class: 'Ride Rev',
                        instructor: 'Billie Capistrano',
                        studio: 'Kenny Sports Manila'
                    }
                ]
            }
        }
    }
</script>
