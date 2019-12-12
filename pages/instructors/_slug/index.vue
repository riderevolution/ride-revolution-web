<template>
    <div class="instructor_inner">
        <breadcrumb />
        <section id="info">
            <div class="left">
                <h1>Billie Capistrano</h1>
                <div class="specializations">
                    <div class="wrapper">
                        <img src="/default/specialization/drill-sergeant.svg" />
                        <h3>Drill Sergeant</h3>
                    </div>
                    <div class="wrapper">
                        <img src="/default/specialization/speed-freak.svg" />
                        <h3>Speed Freak</h3>
                    </div>
                    <div class="wrapper">
                        <img src="/default/specialization/coachella-afterparty.svg" />
                        <h3>Coachella Afterparty</h3>
                    </div>
                </div>
                <div class="description">
                    <h2>Inspiring. Passionate. Vivacious</h2>
                    <p>Arguably the most likable woman in fitness, Billies’s energy is electric. Expect verv, passion and soul. With a focus on functional and athletic fitness, Tiago will push you closer to those goals. You will never know your limits unless you push yourself to them.</p>
                </div>
                <div class="talents">
                    <p>Specialization: ACE Certified, Calisthenics, Yoga</p>
                </div>
                <div class="quote">
                    <p>Use your mental strength to beat the person<br> you were yesterday! <span class="green">#RideRevWithBilly</span></p>
                </div>
            </div>
            <div class="right" style="background-image: url('/default/instructor/sample-instructor.png');">
            </div>
        </section>
        <section id="classes">
            <div class="header">
                <h2>#RideRev <span>With Billie</span></h2>
                <h3>This week’s upcoming classes</h3>
            </div>
            <div class="content">
                <div class="wrapper">
                    <div class="start">
                        <div class="date">{{ parseDate('date', 'May 15, 2019') }}</div>
                        <div class="time">{{ parseDate('time', 'May 15, 2019 10:30 AM') }}</div>
                    </div>
                    <div class="info">
                        <img class="main" src="/default/lets-ride/sample-ig0.jpg" />
                        <div class="description">
                            <h2>Billie Capistrano</h2>
                            <div class="limit">
                                <span>50 Minute Ride </span>
                                <img src="/icons/info-icon.svg" />
                            </div>
                            <p>Shangri-la Plaza</p>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="default_btn_out"><span>Book Now</span></a>
                </div>
                <div class="wrapper">
                    <div class="start">
                        <div class="date">{{ parseDate('date', 'May 15, 2019') }}</div>
                        <div class="time">{{ parseDate('time', 'May 15, 2019 10:30 AM') }}</div>
                    </div>
                    <div class="info">
                        <img class="main" src="/default/lets-ride/sample-ig0.jpg" />
                        <div class="description">
                            <h2>Billie Capistrano</h2>
                            <div class="limit">
                                <span>50 Minute Ride </span>
                                <img src="/icons/info-icon.svg" />
                            </div>
                            <p>Shangri-la Plaza</p>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="default_btn_out"><span>Waitlist</span></a>
                </div>
                <div class="wrapper">
                    <div class="start">
                        <div class="date">{{ parseDate('date', 'May 15, 2019') }}</div>
                        <div class="time">{{ parseDate('time', 'May 15, 2019 10:30 AM') }}</div>
                    </div>
                    <div class="info">
                        <img class="main" src="/default/lets-ride/sample-ig0.jpg" />
                        <div class="description">
                            <h2>Billie Capistrano</h2>
                            <div class="limit">
                                <span>50 Minute Ride </span>
                                <img src="/icons/info-icon.svg" />
                            </div>
                            <p>Shangri-la Plaza</p>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="default_btn_out"><span>Book Now</span></a>
                </div>
                <div class="wrapper">
                    <div class="start">
                        <div class="date">{{ parseDate('date', 'May 15, 2019') }}</div>
                        <div class="time">{{ parseDate('time', 'May 15, 2019 10:30 AM') }}</div>
                    </div>
                    <div class="info">
                        <img class="main" src="/default/lets-ride/sample-ig0.jpg" />
                        <div class="description">
                            <h2>Billie Capistrano</h2>
                            <div class="limit">
                                <span>50 Minute Ride </span>
                                <img src="/icons/info-icon.svg" />
                            </div>
                            <p>Shangri-la Plaza</p>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="default_btn_out"><span>Waitlist</span></a>
                </div>
            </div>
            <div class="preview">
                <img src="/default/instructor/class_preview.jpg" />
            </div>
        </section>
        <section id="spotify">
            <div class="left">
                <img src="/icons/spotify-icon.svg" />
                <h2>MUSIC BILLIE IS VIBING<br> RIGHT NOW</h2>
                <p>She likes it pop with a twist. She enjoys that irregular-paced ride and loves adding<br> dance moves to that electric heart-pumping beat. Janet Jackson, Imagine Dragons,<br> Eminem, Justin Timberlake, and David Guetta are always in her playlist.</p>
            </div>
            <div class="right">
                <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="100%" height="550px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </section>
        <section id="ride_with">
            <div class="header">
                <h2>#RideWithBillie</h2>
                <div class="description">
                    <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@billiecapis</span>
                </div>
            </div>
            <div class="content">
                <instagram :lessOne="true" />
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    import Instagram from '../../../components/Instagram'
    export default {
        components: {
            Breadcrumb,
            Instagram
        },
        methods: {
            parseDate (type, data) {
                const me = this
                switch (type) {
                    case 'time':
                        return me.$moment(data).format('hh:mmA')
                        break
                    case 'date':
                        return me.$moment(data).format('MMMM D')
                        break
                }
            }
        }
    }
</script>
