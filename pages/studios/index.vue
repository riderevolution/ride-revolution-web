<template>
    <div class="studios">
        <section id="banner">
            <img src="/default/studio/studios-bg.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Studios</h1>
            </div>
        </section>
        <section id="teaser">
            <p>We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online. At Ride Revolution we’re not building gyms, we’re building experiences.</p>
            <p>&nbsp;</p>
            <p>Our workout is specifically designed to strengthen the body’s core, tone muscles and burn maximum calories. Light hand weights are used to target the upper body, giving you a true full body workout.</p>
            <p>&nbsp;</p>
            <p>We use cleated shoes to increase the connection between the leg and the bike, engaging the hamstrings and glute muscles resulting in lean, toned legs – and no big thighs!</p>
            <p>&nbsp;</p>
            <p>Every class is set to a specific and personalized playlist, created by the instructor. The music is your guide through your 50-minute journey, helping to push your body and metabolism out of its comfort zone. Our aim is simple – to allow you to lose yourself, let go and have fun. For those who desire, we offer performance tracking in our classes. Through the data consoles on our bikes, we can track your power, calories burned, RPM, distance and heart rate. A report will be emailed to you after class and you can also track your progress by logging into our website.</p>
        </section>
        <section id="visit">
            <h2>Visit our Studios</h2>
            <div class="content">
                <nuxt-link :to="`/studios/${convertToSlug(data.name)}`" class="wrapper" v-for="(data, key) in studios" :key="key">
                    <div class="image">
                        <img :src="data.path" />
                        <svg id="stripe" xmlns="http://www.w3.org/2000/svg" width="97.432" height="115.914" viewBox="0 0 97.432 115.914"> <g transform="translate(0.53 0.53)"> <g transform="translate(0 0)"> <line class="border" x1="33.924" y2="34.37" transform="translate(16.619 21.021)" /> <line class="border" x1="58.028" y2="58.028" transform="translate(30.755 13.488)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(70.036 2.329)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(12.008 54.554)" /> <line class="border" x1="59.707" y2="59.684" /> </g> <path class="border" d="M-95.6,47.944-48.945,0" transform="translate(99.627 66.91)" /> <line class="border" x1="11.606" y2="11.606" transform="translate(84.766 22.416)" /> <line class="border" x1="25.059" y2="25.197" transform="translate(2.125 2.775)" /> <line class="border" x1="25.889" y2="25.889" transform="translate(18.703 0.097)" /> <line class="border" x1="29.46" y2="29.46" transform="translate(39.683 11.256)" /> </g> </svg>
                        <div class="overlay">
                            <div class="default_btn">Explore</div>
                        </div>
                    </div>
                    <h2>{{ data.name }}, {{ data.location }}</h2>
                </nuxt-link>
            </div>
        </section>
        <section id="studio_ig">
            <div class="header">
                <div class="description">
                    <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@riderevolution</span>
                </div>
            </div>
            <div class="content">
                <instagram />
            </div>
        </section>
        <section id="banner" class="alt">
            <img src="/default/studio/book-a-ride.jpg" />
            <div class="overlay_mid">
                <h2>Begin your fitness journey with us.</h2>
                <nuxt-link to="/book-a-bike" class="default_btn">Book a Bike</nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import Instagram from '../../components/Instagram'
    export default {
        components: {
            Breadcrumb,
            Instagram
        },
        data () {
            return {
                studios: [
                    {
                        id: 1,
                        name: 'Greenbelt',
                        location: 'Makati',
                        path: '/default/studio/studio1.jpg'
                    },
                    {
                        id: 2,
                        name: 'Shangri-la Plaza',
                        location: 'Edsa',
                        path: '/default/studio/studio2.jpg'
                    },
                    {
                        id: 3,
                        name: 'Kenny Sports Manila',
                        location: 'BGC',
                        path: '/default/studio/studio3.jpg'
                    }
                ]
            }
        }
    }
</script>
