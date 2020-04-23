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
            <div class="right" style="background-image: url('/default/instructor/instructor-vinny.png');">
            </div>
        </section>
        <section id="classes">
            <div class="header">
                <h2>#RideRev <span>With Billie</span></h2>
                <h3>This week’s upcoming classes</h3>
            </div>
            <div class="content" v-if="!$parent.$parent.isMobile">
                <div class="wrapper" v-for="(n, key) in 4" :key="key">
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
                    <a href="javascript:void(0)" class="default_btn_out"><span>{{ (n <= 2) ? 'Book Now' : 'Waitlist' }}</span></a>
                </div>
            </div>
            <div class="content mobile" v-else>
                <div class="wrapper" v-for="(n, key) in 4" :key="key">
                    <img class="main" src="/default/lets-ride/sample-ig0.jpg" />
                    <div class="info">
                        <div class="start">
                            <div class="date">{{ parseDate('date', 'May 15, 2019') }}</div>
                            <div class="time">{{ parseDate('time', 'May 15, 2019 10:30 AM') }}</div>
                        </div>
                        <div class="description">
                            <h2>Billie Capistrano</h2>
                            <div class="limit">
                                <span>50 Minute Ride </span>
                                <img src="/icons/info-icon.svg" />
                            </div>
                            <p>Shangri-la Plaza</p>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="default_btn_out"><span>{{ (n <= 2) ? 'Book Now' : 'Waitlist' }}</span></a>
                </div>
            </div>
            <!-- <div class="preview">
                <img src="/default/instructor/class_preview.jpg" />
                <div class="overlay">
                    <h2>Class Preview</h2>
                    <svg id="play_button" xmlns="http://www.w3.org/2000/svg" width="104" height="104" viewBox="0 0 104 104">
                        <g transform="translate(-588 -3201)">
                            <circle class="btn_1" cx="52" cy="52" r="52" transform="translate(588 3201)" />
                            <path class="btn_2" d="M4631-11488.4v39.225l28.446-19.473Z" transform="translate(-4001 14722.354)" />
                            <g class="btn_3" transform="translate(588 3201)">
                                <circle class="btn_4" cx="52" cy="52" r="52" />
                                <circle class="btn_5" cx="52" cy="52" r="51.5" />
                            </g>
                        </g>
                    </svg>
                </div>
            </div> -->
        </section>
        <section id="comments">
            <div class="header">
                <h2>Here are what other riders are raving about Billie</h2>
                <nuxt-link to="/instructors/asdasdadas/comment" class="default_btn">Write a Review</nuxt-link>
            </div>
            <div class="content" v-if="!$parent.$parent.isMobile">
                <div class="comment" v-for="(data, key) in populateComment" :key="key">
                    <img class="comment_img" :src="data.path" v-if="data.hasImage" />
                    <div class="comment_img_initials" v-else>
                        <div class="background"></div>
                        <div class="initials">CL</div>
                    </div>
                    <div class="comment_info">
                        <div class="comment_header">
                            <div class="stats">
                                <h3>{{ data.name }}</h3>
                                <div class="stars">
                                    <img src="/icons/star-green.svg" v-if="data.stars != 0" v-for="n in data.stars" />
                                    <img src="/icons/star-gray.svg" v-if="data.stars != 5" v-for="n in 5 - data.stars" />
                                </div>
                            </div>
                            <div class="date">{{ $moment('May 15, 2019').format('MMMM D, YYYY') }}</div>
                        </div>
                        <div class="title">{{ data.title }}</div>
                        <div class="description" v-html="data.description"></div>
                    </div>
                </div>
            </div>
            <div class="content mobile" v-else>
                <div class="comment" v-for="(data, key) in populateComment" :key="key">
                    <div class="comment_header_mobile">
                        <img class="comment_img" :src="data.path" v-if="data.hasImage" />
                        <div class="comment_img_initials" v-else>
                            <div class="background"></div>
                            <div class="initials">CL</div>
                        </div>
                        <div class="stats">
                            <h3>{{ data.name }}</h3>
                            <div class="stars">
                                <img src="/icons/star-green.svg" v-if="data.stars != 0" v-for="n in data.stars" />
                                <img src="/icons/star-gray.svg" v-if="data.stars != 5" v-for="n in 5 - data.stars" />
                            </div>
                            <div class="date">{{ $moment('May 15, 2019').format('MMMM D, YYYY') }}</div>
                        </div>
                    </div>
                    <div class="comment_info_mobile">
                        <div class="title">{{ data.title }}</div>
                        <div class="description" v-html="data.description"></div>
                    </div>
                </div>
            </div>
            <div class="load_more">
                <div v-if="!checkComments" class="default_btn load" @click="loadMoreComments()">Load More</div>
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
        <section id="spotify">
            <div class="left">
                <img src="/icons/spotify-logo.svg" />
                <h2>MUSIC BILLIE IS VIBING<br> RIGHT NOW</h2>
                <p>She likes it pop with a twist. She enjoys that irregular-paced ride and loves adding<br> dance moves to that electric heart-pumping beat. Janet Jackson, Imagine Dragons,<br> Eminem, Justin Timberlake, and David Guetta are always in her playlist.</p>
            </div>
            <div class="right">
                <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="100%" height="550px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
        data () {
            return {
                toShow: 4,
                count: 0,
                comments: [
                    {
                        path: '/default/lets-ride/sample-ig0.jpg',
                        hasImage: true,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'In vitae turpis massa sed elementum tempus. Praesent tristique magna sit amet purus gravida quis. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at.',
                        stars: 4,
                        checked: true
                    },
                    {
                        hasImage: false,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 3,
                        checked: true
                    },
                    {
                        path: '/default/lets-ride/sample-ig0.jpg',
                        hasImage: true,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 0,
                        checked: true
                    },
                    {
                        hasImage: false,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 2,
                        checked: true
                    },
                    {
                        path: '/default/lets-ride/sample-ig0.jpg',
                        hasImage: true,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 5,
                        checked: false
                    },
                    {
                        hasImage: false,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 1,
                        checked: false
                    },
                ]
            }
        },
        computed: {
            populateComment () {
                const me = this
                let result = []
                for (let i = 0; i < me.toShow; i++) {
                    if (me.comments[i] != null) {
                        me.comments[i].checked = true
                        result.push(me.comments[i])
                    }
                }
                return result
            },
            checkComments () {
                const me = this
                let count = 0
                let result = false
                me.comments.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.comments.length) {
                    result = true
                } else {
                    result = false
                }
                me.count = count
                return result
            }
        },
        methods: {
            loadMoreComments () {
                const me = this
                if (!me.checkComments) {
                    me.toShow += 4
                    me.$scrollTo('.load', {
                        offset: 0
                    })
                }
            },
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
