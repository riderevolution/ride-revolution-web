<template>
    <transition name="fade">
        <div class="home" v-if="loaded">
            <section id="banner">
                <h1>Ride Revolution</h1>
                <img class="main_image" :data-src="res.banners[0].path" :alt="res.banners[0].alt" v-lazy-load />
                <div class="overlay_mobile" v-if="$store.state.isMobile">
                    <img class="overlay_image" src="default/home/home-banner-mobile.svg" alt="ride-revolution" />
                    <div class="overlay_child" v-if="!$store.state.isMobile" @click="toggleVideo()"> <svg id="play_icon" xmlns="http://www.w3.org/2000/svg" width="94" height="93" viewBox="0 0 94 93"> <g transform="translate(-864 -325)"> <g transform="translate(868 329)"> <path class="play" d="M806.695,422.713,787.279,411.3v22.829Z" transform="translate(-752.454 -380.462)" /> <path class="border" d="M819.75,455.351a42.252,42.252,0,1,1-51.864-66.715" transform="translate(-751.456 -379.831)" /> <path class="border" d="M834.187,441.3a42.306,42.306,0,0,1-6.325,9.807" transform="translate(-753.584 -381.298)" /> <path class="border" d="M778.942,382.525a42.283,42.283,0,0,1,56.253,50.6" transform="translate(-752.222 -379.579)" /> </g> <rect class="rect" width="94" height="93" transform="translate(864 325)" /> </g> </svg> <div class="label">Play Video</div> </div>
                    <p class="nmr" v-html="res.subtitle"></p>
                    <div class="overlay_flex">
                        <nuxt-link to="/about" rel="canonical" class="default_btn">About Us</nuxt-link>
                        <div class="default_btn_wht" @click="toggleVideo()">Play Video</div>
                    </div>
                </div>
                <div class="overlay_top" v-if="!$store.state.isMobile">
                    <img class="overlay_image" src="default/home/home-banner-mobile.svg" alt="ride-revolution" />
                    <div class="overlay_child" v-if="!$store.state.isMobile" @click="toggleVideo()"> <svg id="play_icon" xmlns="http://www.w3.org/2000/svg" width="94" height="93" viewBox="0 0 94 93"> <g transform="translate(-864 -325)"> <g transform="translate(868 329)"> <path class="play" d="M806.695,422.713,787.279,411.3v22.829Z" transform="translate(-752.454 -380.462)" /> <path class="border" d="M819.75,455.351a42.252,42.252,0,1,1-51.864-66.715" transform="translate(-751.456 -379.831)" /> <path class="border" d="M834.187,441.3a42.306,42.306,0,0,1-6.325,9.807" transform="translate(-753.584 -381.298)" /> <path class="border" d="M778.942,382.525a42.283,42.283,0,0,1,56.253,50.6" transform="translate(-752.222 -379.579)" /> </g> <rect class="rect" width="94" height="93" transform="translate(864 325)" /> </g> </svg> <div class="label">Play Video</div> </div>
                </div>
                <div class="overlay_bottom" v-if="!$store.state.isMobile">
                    <p class="nmr" v-html="res.subtitle"></p>
                    <nuxt-link to="/about" rel="canonical" class="default_btn" v-if="!$store.state.isMobile">About Us</nuxt-link>
                </div>
                <div class="scroll_mobile" v-if="$store.state.isMobile">
                    <img src="/icons/scroll-down.svg" @click="scrollDown()" />
                </div>
            </section>
            <promo />
            <section id="packages">
                <div class="header">
                    <h2 :class="`image_bg ${($store.state.isMobile) ? 'mobile' : ''}`">packages</h2>
                    <div class="description">
                        <p>Browse through our class packages and find one that’s fit for you!</p>
                        <nuxt-link class="link" to="/buy-rides" v-if="!$store.state.isMobile"><span>See All Class Packages</span> <div></div><div></div><div></div></nuxt-link>
                    </div>
                </div>
                <div class="content" v-if="!$store.state.isMobile">
                    <nuxt-link :event="''" @click.native="checkIfLoggedIn($event, `/buy-rides/package/${data.slug}`, data, 'package')" :to="`/buy-rides/package/${data.slug}`" :class="`package_wrapper ${(data.is_promo == 1) ? 'promo' : ''}`" v-for="(data, key) in packages" :key="key">
                        <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
                        <div class="package_header">
                            <h2 class="title">{{ data.name }}</h2>
                            <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                        </div>
                        <div class="discounted_price" v-if="data.is_promo == 1">Php {{ totalItems(data.package_price) }}</div>
                        <div class="price">Php {{ totalItems((data.is_promo == 1) ? data.discounted_price : data.package_price) }}</div>
                        <div class="expires">Expires in {{ data.expires_in }} {{ data.expiry_type }}{{ (data.expires_in > 1) ? 's' : '' }}</div>
                        <div class="default_btn_out"><span>Buy Now</span></div>
                    </nuxt-link>
                </div>
                <div class="content" v-else>
                    <no-ssr>
                        <swiper :options="mobileOptions" class="default">
                            <swiper-slide class="slider" v-for="(data, key) in packages" :key="key">
                                <nuxt-link :to="`/buy-rides/package/${data.slug}`" :class="`package_wrapper ${(data.is_promo == 1) ? 'promo' : ''}`">
                                    <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
                                    <div class="package_header">
                                        <h2 class="title">{{ data.name }}</h2>
                                        <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                                    </div>
                                    <div class="discounted_price" v-if="data.is_promo == 1">Php {{ totalItems(data.package_price) }}</div>
                                    <div class="price">Php {{ totalItems((data.is_promo == 1) ? data.discounted_price : data.package_price) }}</div>
                                    <div class="expires">Expires in {{ data.expires_in }} {{ data.expiry_type }}{{ (data.expires_in > 1) ? 's' : '' }}</div>
                                    <div class="default_btn_out"><span>Buy Now</span></div>
                                </nuxt-link>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                        <div class="action_mobile" v-if="$store.state.isMobile">
                            <nuxt-link rel="canonical" to="/buy-rides" class="default_btn">See All Class Packages</nuxt-link>
                        </div>
                    </no-ssr>
                </div>
            </section>
            <section id="reviews" v-if="testimonials.length > 0">
                <div class="header">
                    <h2 :class="`image_bg ${($store.state.isMobile) ? 'mobile' : ''}`">reviews</h2>
                    <div class="description">
                        <p><strong>Here’s what our riders had to say...</strong></p>
                    </div>
                </div>
                <div class="content">
                    <no-ssr>
                        <swiper :options="testimonialsOptions" class="default alt" v-if="!$store.state.isMobile">
                            <swiper-slide class="review_slide" v-for="(data, key) in testimonials" :key="key">
                                <div class="description" v-html="data.body"></div>
                                <img :src="data.images[0].path_resized" :alt="data.images[0].alt" />
                                <h2 class="title">{{ data.name }}</h2>
                            </swiper-slide>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                        <swiper :options="mobileOptions" class="default" v-else>
                            <swiper-slide class="review_slide mobile" v-for="(data, key) in testimonials" :key="key">
                                <div class="description" v-html="data.body"></div>
                                <img :src="data.images[0].path_resized" :alt="data.images[0].alt" />
                                <h2 class="title">{{ data.name }}</h2>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </no-ssr>
                </div>
            </section>
            <section id="reviews" v-else><div class="header"></div></section>
            <section id="instructors">
                <div class="overlay">
                    <div class="image">
                        <img src="/default/home/instructors-cover.png" alt="ride-revolution-instructor" />
                    </div>
                    <div class="info" v-if="!$store.state.isMobile">
                        <div class="ins_svg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="954.748" height="256.438" viewBox="0 0 954.748 256.438"> <defs> <filter id="greenGlow" height="300%" width="300%" x="-75%" y="-75%"> <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" /> <feGaussianBlur in="thicken" stdDeviation="8" result="blurred" /> <feFlood flood-color="#26a48b" result="glowColor" /> <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" /> <feMerge> <feMergeNode in="softGlow_colored" /> <feMergeNode in="SourceGraphic" /> </feMerge> </filter> <filter id="redGlow" height="300%" width="300%" x="-75%" y="-75%"> <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" /> <feGaussianBlur in="thicken" stdDeviation="8" result="blurred" /> <feFlood flood-color="#f13747" result="glowColor" /> <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" /> <feMerge> <feMergeNode in="softGlow_colored" /> <feMergeNode in="SourceGraphic" /> </feMerge> </filter> </defs> <g transform="translate(-81.619 -477.902)"> <g transform="translate(113.662 573.93)"> <path class="a" d="M124.182,559.521v77.634H106.406v-60.1" transform="translate(-106.406 -549.674)" /> <path class="a" d="M159.809,599.213A128.3,128.3,0,0,1,149.526,587.4a152.034,152.034,0,0,1,1.269,15.744v36.186H134.162v-87.1h1.777l43.551,40.882c4.188,3.936,10.157,11.808,10.157,11.808s-1.142-9.776-1.142-15.744V553h16.633v87.1h-1.779Z" transform="translate(-98.103 -551.853)" /> <path class="a" d="M196.907,622.379,211.382,614c3.808,6.22,8.76,10.791,17.52,10.791,7.365,0,12.062-3.682,12.062-8.76,0-6.094-4.825-8.252-12.95-11.808l-4.443-1.9c-12.824-5.46-21.332-12.316-21.332-26.791,0-13.331,10.157-23.49,26.028-23.49,11.3,0,19.426,3.938,25.267,14.222L239.7,575.147c-3.048-5.46-6.349-7.618-11.428-7.618-5.206,0-8.507,3.3-8.507,7.618,0,5.333,3.3,7.491,10.919,10.792l4.443,1.906c15.11,6.475,23.617,13.077,23.617,27.933,0,16-12.569,24.759-29.457,24.759C212.777,640.536,202.113,632.663,196.907,622.379Z" transform="translate(-79.334 -551.912)" /> <path class="a" d="M274.023,568.438H249.391V552.821H316.43v15.617H291.8v70.721H274.023Z" transform="translate(-63.635 -551.678)" /> <path class="a" d="M374.8,639.159h-20.57L340.01,617.32a34.29,34.29,0,0,1-5.08.381h-6.094v21.458H311.061V552.821H334.93c24.125,0,38.6,11.553,38.6,32.63,0,13.458-5.967,21.966-16.633,26.791Zm-40.377-36.947c14.476,0,20.822-4.57,20.822-16.76s-6.6-17.013-20.822-17.013h-5.586v33.774Z" transform="translate(-45.187 -551.678)" /> <path class="a" d="M369.8,607.925v-55.1h17.776v54.087c0,12.57,5.462,17.4,17.267,17.4,11.683,0,17.013-4.825,17.013-17.4V552.821h17.777v55.1c0,21.837-15.11,32.377-34.791,32.377C384.909,640.3,369.8,629.762,369.8,607.925Z" transform="translate(-27.617 -551.678)" /> <path class="a" d="M434.891,596.224c0-25.52,19.679-44.186,44.437-44.186,15.617,0,26.792,5.588,34.536,17.649l-13.585,9.65c-4.065-6.6-11.048-11.3-20.951-11.3-15.618,0-26.155,12.062-26.155,28.187s10.537,28.441,26.155,28.441c11.174,0,17.4-5.333,22.219-12.7l13.84,9.523c-7.491,11.682-19.427,19.047-36.059,19.047C454.57,640.536,434.891,621.744,434.891,596.224Z" transform="translate(-8.146 -551.912)" /> <path class="a" d="M527.84,568.438H503.207V552.821h67.04v15.617H545.615v70.721H527.84Z" transform="translate(12.29 -551.678)" /> <path class="a" d="M558.721,596.253c0-25.52,19.807-44.312,44.69-44.312S648.1,570.733,648.1,596.253s-19.807,44.312-44.693,44.312S558.721,621.773,558.721,596.253Zm71.1,0c0-16.125-10.665-28.441-26.409-28.441S577,580.128,577,596.253s10.667,28.441,26.409,28.441S629.82,612.378,629.82,596.253Z" transform="translate(28.896 -551.941)" /> <path class="a" d="M702.893,639.159H682.325L668.1,617.32a34.27,34.27,0,0,1-5.078.381h-6.094v21.458H639.156V552.821h23.869c24.124,0,38.6,11.553,38.6,32.63,0,13.458-5.968,21.966-16.632,26.791Zm-40.375-36.947c14.472,0,20.821-4.57,20.821-16.76s-6.6-17.013-20.821-17.013h-5.587v33.774Z" transform="translate(52.957 -551.678)" /> <path class="a" d="M719.859,640.178c-13.171-1.647-21.906-8.8-26.461-17.8L707.872,614c3.809,6.22,8.761,10.791,17.523,10.791,7.364,0,12.061-3.682,12.061-8.76,0-6.094-4.824-8.252-12.951-11.808l-4.443-1.9c-12.824-5.46-21.332-12.316-21.332-26.791,0-13.331,10.157-23.49,26.028-23.49,11.3,0,19.426,3.938,25.267,14.222l-13.838,8.887c-3.048-5.46-6.349-7.618-11.428-7.618-5.2,0-8.505,3.3-8.505,7.618,0,5.333,3.3,7.491,10.919,10.792l4.442,1.906c11.462,4.912,19.124,9.9,22.157,18.5" transform="translate(69.182 -551.912)" /> </g> <line class="b" filter="url(#greenGlow)" x1="69.915" y2="69.915" transform="translate(92.912 551.948)" /> <line class="b" filter="url(#greenGlow)" x1="31.254" y2="31.254" transform="translate(82.149 630.156)" /> <line class="c" filter="url(#redGlow)" x1="31.254" y2="31.254" transform="translate(93.685 661.41)" /> <line class="c" filter="url(#redGlow)" x1="29.718" y2="29.718" transform="translate(220.539 621.19)" /> <line class="c" filter="url(#redGlow)" x1="10.411" y2="10.411" transform="translate(263.879 597.157)" /> <line class="c" filter="url(#redGlow)" x1="31.302" y2="31.302" transform="translate(285.82 554.325)" /> <line class="b" filter="url(#greenGlow)" x1="18.479" y2="18.479" transform="translate(305.571 640.162)" /> <line class="b" filter="url(#greenGlow)" x1="37.71" y2="37.71" transform="translate(341.825 584.677)" /> <line class="c" filter="url(#redGlow)" x1="11.644" y2="11.644" transform="translate(367.891 644.107)" /> <line class="c" filter="url(#redGlow)" x1="23.616" y2="23.616" transform="translate(399.179 600.848)" /> <line class="b" filter="url(#greenGlow)" x1="16.585" y2="16.585" transform="translate(440.698 640.952)" /> <line class="c" filter="url(#redGlow)" x1="9.928" y2="9.928" transform="translate(473.621 614.685)" /> <line class="c" filter="url(#redGlow)" x1="12.176" y2="12.176" transform="translate(495.725 590.334)" /> <line class="c" filter="url(#redGlow)" x1="17.245" y2="17.245" transform="translate(523.162 557.828)" /> <line class="c" filter="url(#redGlow)" x1="27.282" y2="27.282" transform="translate(559.765 511.188)" /> <line class="b" filter="url(#greenGlow)" x1="27.262" y2="27.262" transform="translate(591.438 674.486)" /> <line class="b" filter="url(#greenGlow)" x1="20.554" y2="20.554" transform="translate(696.199 652.179)" /> <line class="b" filter="url(#greenGlow)" x1="26.183" y2="26.183" transform="translate(741.45 601.299)" /> <line class="b" filter="url(#greenGlow)" x1="6.653" y2="6.653" transform="translate(779.956 582.322)" /> <line class="b" filter="url(#greenGlow)" x1="14.739" y2="14.739" transform="translate(639.053 639.394)" /> <line class="b" filter="url(#greenGlow)" x1="37.857" y2="37.857" transform="translate(671.566 583.763)" /> <line class="b" filter="url(#greenGlow)" x1="30.525" y2="30.525" transform="translate(719.257 543.404)" /> <line class="c" filter="url(#redGlow)" x1="51.702" y2="51.702" transform="translate(664.733 522.354)" /> <line class="b" filter="url(#greenGlow)" x1="11.692" y2="11.692" transform="translate(761.171 520.322)" /> <line class="b" filter="url(#greenGlow)" x1="24.59" y2="24.59" transform="translate(772.864 495.732)" /> <line class="b" filter="url(#greenGlow)" x1="25.478" y2="25.478" transform="translate(519.736 638.818)" /> <line class="b" filter="url(#greenGlow)" x1="33.524" y2="33.524" transform="translate(559.295 591.213)" /> <line class="b" filter="url(#greenGlow)" x1="35.525" y2="35.525" transform="translate(605.463 543.044)" /> <line class="c" filter="url(#redGlow)" x1="29.216" y2="29.216" transform="translate(435.875 558.552)" /> <line class="b" filter="url(#greenGlow)" x1="20.124" y2="20.124" transform="translate(299.965 590.69)" /> <line class="b" filter="url(#greenGlow)" x1="24.974" y2="24.974" transform="translate(335.706 550.099)" /> <line class="b" filter="url(#greenGlow)" x1="43.954" y2="43.954" transform="translate(398.134 522.124)" /> <line class="b" filter="url(#greenGlow)" x1="18.513" y2="18.513" transform="translate(220.999 572.446)" /> <line class="b" filter="url(#greenGlow)" x1="16.564" y2="16.564" transform="translate(255.642 539.751)" /> <line class="b" filter="url(#greenGlow)" x1="17.863" y2="17.863" transform="translate(285.306 508.788)" /> <line class="c" filter="url(#redGlow)" x1="18.188" y2="18.188" transform="translate(131.222 636.941)" /> <line class="c" filter="url(#redGlow)" x1="4.587" y2="4.587" transform="translate(166.15 615.613)" /> <line class="c" filter="url(#redGlow)" x1="8.661" y2="8.661" transform="translate(182.754 594.935)" /> <line class="b" filter="url(#greenGlow)" x1="18.513" y2="18.513" transform="translate(131.1 593.947)" /> <line class="b" filter="url(#greenGlow)" x1="11.025" y2="11.025" transform="translate(160.637 571.897)" /> <line class="c" filter="url(#redGlow)" x1="15.862" y2="15.862" transform="translate(184.254 543.444)" /> <line class="c" filter="url(#redGlow)" x1="20.949" y2="20.949" transform="translate(214.894 507.717)" /> <line class="c" filter="url(#redGlow)" x1="25.333" y2="25.333" transform="translate(235.842 482.384)" /> <line class="c" filter="url(#redGlow)" x1="9.479" y2="9.479" transform="translate(796.297 590.139)" /> <line class="c" filter="url(#redGlow)" x1="52.718" y2="52.718" transform="translate(820.842 522.354)" /> <line class="b" filter="url(#greenGlow)" x1="17.176" y2="17.176" transform="translate(848.68 560.986)" /> <line class="b" filter="url(#greenGlow)" x1="26.359" y2="26.359" transform="translate(878.129 522.354)" /> <line class="c" filter="url(#redGlow)" x1="17.199" y2="17.199" transform="translate(904.852 556.967)" /> <line class="c" filter="url(#redGlow)" x1="15.427" y2="15.427" transform="translate(933.876 529.715)" /> <line class="c" filter="url(#redGlow)" x1="13.479" y2="13.479" transform="translate(960.67 504.869)" /> <line class="c" filter="url(#redGlow)" x1="36.211" y2="36.211" transform="translate(756.924 538.862)" /> <line class="b" filter="url(#greenGlow)" x1="20.121" y2="20.121" transform="translate(785.654 652.612)" /> <line class="b" filter="url(#greenGlow)" x1="19.162" y2="19.162" transform="translate(801.657 714.647)" /> <line class="b" filter="url(#greenGlow)" x1="24.684" y2="24.684" transform="translate(836.247 674.537)" /> <line class="c" filter="url(#redGlow)" x1="51.387" y2="51.387" transform="translate(927.159 626.513)" /> <line class="b" filter="url(#greenGlow)" x1="79.029" y2="79.029" transform="translate(886.976 599.15)" /> <line class="c" filter="url(#redGlow)" x1="1.861" y2="1.861" transform="translate(986.754 616.444)" /> <line class="c" filter="url(#redGlow)" x1="13.641" y2="13.641" transform="translate(988.614 602.803)" /> <line class="b" filter="url(#greenGlow)" x1="8.116" y2="8.116" transform="translate(834.14 616.131)" /> <line class="b" filter="url(#greenGlow)" x1="63.419" y2="63.419" transform="translate(930.413 520.438)" /> <line class="b" filter="url(#greenGlow)" x1="1.26" y2="1.26" transform="translate(1004.982 508.027)" /> <line class="b" filter="url(#greenGlow)" x1="29.595" y2="29.595" transform="translate(1006.242 478.432)" /> </g> </svg>
                        </div>
                        <h2 class="title">Ride with the Best.</h2>
                        <div class="description">Our awesome instructors will keep you engaged with their positive energy,<br /> exciting choreography, and catchy tunes to push you towards your best self.</div>
                        <nuxt-link rel="canonical" to="/instructors" class="default_btn">Meet our Instructors</nuxt-link>
                    </div>
                    <div class="info mobile" v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="377.117" height="108.66" viewBox="0 0 377.117 108.66"> <defs><filter id="greenGlow" height="300%" width="300%" x="-75%" y="-75%"> <feMorphology operator="dilate" radius="0" in="SourceAlpha" result="thicken" /> <feGaussianBlur in="thicken" stdDeviation="4" result="blurred" /> <feFlood flood-color="#26a48b" result="glowColor" /> <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" /> <feMerge> <feMergeNode in="softGlow_colored" /> <feMergeNode in="SourceGraphic" /> </feMerge> </filter> <filter id="redGlow" height="300%" width="300%" x="-75%" y="-75%"> <feMorphology operator="dilate" radius="0" in="SourceAlpha" result="thicken" /> <feGaussianBlur in="thicken" stdDeviation="4" result="blurred" /> <feFlood flood-color="#f13747" result="glowColor" /> <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" /> <feMerge> <feMergeNode in="softGlow_colored" /> <feMergeNode in="SourceGraphic" /> </feMerge> </filter> </defs> <g transform="translate(-81.619 -479.593)"> <g transform="translate(95.635 519.301)"> <path class="a" d="M114.013,559.521v33.224h-7.607V567.027" transform="translate(-106.406 -555.307)" /> <path class="a" d="M145.138,572.34a54.9,54.9,0,0,1-4.4-5.054,65.064,65.064,0,0,1,.543,6.738V589.51h-7.118V552.235h.761l18.638,17.5a52.623,52.623,0,0,1,4.347,5.053s-.489-4.184-.489-6.738V552.561h7.118v37.275h-.761Z" transform="translate(-118.73 -552.072)" /> <path class="a" d="M196.907,582.141l6.195-3.586c1.63,2.662,3.749,4.618,7.5,4.618,3.152,0,5.162-1.576,5.162-3.749,0-2.608-2.065-3.531-5.542-5.053l-1.9-.815c-5.488-2.337-9.129-5.271-9.129-11.465,0-5.7,4.347-10.053,11.139-10.053,4.836,0,8.313,1.685,10.813,6.086l-5.922,3.8c-1.3-2.337-2.717-3.26-4.891-3.26-2.228,0-3.641,1.413-3.641,3.26,0,2.282,1.413,3.206,4.673,4.618l1.9.816c6.467,2.771,10.107,5.6,10.107,11.954,0,6.846-5.379,10.6-12.606,10.6C203.7,589.911,199.135,586.542,196.907,582.141Z" transform="translate(-146.591 -551.984)" /> <path class="a" d="M259.932,559.5H249.391v-6.683h28.69V559.5H267.539V589.77h-7.607Z" transform="translate(-169.895 -552.332)" /> <path class="a" d="M338.338,589.77h-8.8l-6.085-9.346a14.674,14.674,0,0,1-2.174.163h-2.608v9.183h-7.607V552.821h10.215c10.324,0,16.518,4.944,16.518,13.964,0,5.759-2.554,9.4-7.118,11.465Zm-17.28-15.812c6.2,0,8.911-1.956,8.911-7.173s-2.825-7.281-8.911-7.281h-2.391v14.454Z" transform="translate(-197.279 -552.332)" /> <path class="a" d="M369.8,576.4V552.821h7.607v23.147c0,5.38,2.337,7.445,7.389,7.445,5,0,7.281-2.065,7.281-7.445V552.821h7.608V576.4c0,9.345-6.467,13.856-14.889,13.856C376.266,590.259,369.8,585.748,369.8,576.4Z" transform="translate(-223.36 -552.332)" /> <path class="a" d="M434.891,570.948a18.609,18.609,0,0,1,19.017-18.91c6.683,0,11.466,2.391,14.78,7.553l-5.814,4.13a10.075,10.075,0,0,0-8.966-4.836c-6.684,0-11.193,5.162-11.193,12.063s4.509,12.171,11.193,12.171c4.782,0,7.444-2.282,9.509-5.434l5.923,4.075c-3.206,5-8.314,8.151-15.431,8.151A18.654,18.654,0,0,1,434.891,570.948Z" transform="translate(-252.263 -551.984)" /> <path class="a" d="M513.749,559.5H503.207v-6.683H531.9V559.5H521.356V589.77h-7.607Z" transform="translate(-282.597 -552.332)" /> <path class="a" d="M558.721,570.9a19.127,19.127,0,1,1,19.125,18.964A18.712,18.712,0,0,1,558.721,570.9Zm30.427,0c0-6.9-4.564-12.171-11.3-12.171s-11.3,5.271-11.3,12.171,4.565,12.171,11.3,12.171S589.148,577.805,589.148,570.9Z" transform="translate(-307.247 -551.941)" /> <path class="a" d="M666.433,589.77h-8.8l-6.086-9.346a14.668,14.668,0,0,1-2.173.163h-2.608v9.183h-7.607V552.821h10.215c10.324,0,16.518,4.944,16.518,13.964,0,5.759-2.554,9.4-7.118,11.465Zm-17.279-15.812c6.193,0,8.911-1.956,8.911-7.173s-2.825-7.281-8.911-7.281h-2.391v14.454Z" transform="translate(-342.962 -552.332)" /> <path class="a" d="M704.722,589.758a14.115,14.115,0,0,1-11.324-7.617l6.194-3.586c1.63,2.662,3.749,4.618,7.5,4.618,3.151,0,5.162-1.576,5.162-3.749,0-2.608-2.064-3.531-5.542-5.053l-1.9-.815c-5.488-2.337-9.129-5.271-9.129-11.465,0-5.7,4.347-10.053,11.139-10.053,4.836,0,8.314,1.685,10.813,6.086l-5.922,3.8c-1.3-2.337-2.717-3.26-4.891-3.26-2.227,0-3.64,1.413-3.64,3.26,0,2.282,1.413,3.206,4.673,4.618l1.9.816c4.905,2.1,8.184,4.235,9.482,7.917" transform="translate(-367.047 -551.984)" /> </g> <line class="b" filter="url(#greenGlow)" x1="29.92" y2="29.92" transform="translate(86.755 509.894)" /> <line class="b" filter="url(#greenGlow)" x1="13.375" y2="13.375" transform="translate(82.149 543.363)" /> <line class="c" filter="url(#redGlow)" x1="13.376" y2="13.376" transform="translate(87.086 556.739)" /> <line class="c" filter="url(#redGlow)" x1="12.718" y2="12.718" transform="translate(141.374 539.527)" /> <line class="c" filter="url(#redGlow)" x1="4.456" y2="4.456" transform="translate(159.922 529.241)" /> <line class="c" filter="url(#redGlow)" x1="13.396" y2="13.396" transform="translate(169.311 510.911)" /> <line class="b" filter="url(#greenGlow)" x1="7.908" y2="7.908" transform="translate(177.764 547.646)" /> <line class="b" filter="url(#greenGlow)" x1="16.138" y2="16.138" transform="translate(193.279 523.9)" /> <line class="c" filter="url(#redGlow)" x1="4.983" y2="4.983" transform="translate(204.434 549.334)" /> <line class="c" filter="url(#redGlow)" x1="10.107" y2="10.107" transform="translate(217.824 530.821)" /> <line class="b" filter="url(#greenGlow)" x1="7.098" y2="7.098" transform="translate(235.592 547.984)" /> <line class="c" filter="url(#redGlow)" x1="4.249" y2="4.249" transform="translate(249.682 536.743)" /> <line class="c" filter="url(#redGlow)" x1="5.211" y2="5.211" transform="translate(259.141 526.321)" /> <line class="c" filter="url(#redGlow)" x1="7.38" y2="7.38" transform="translate(270.883 512.41)" /> <line class="c" filter="url(#redGlow)" x1="11.675" y2="11.675" transform="translate(286.548 492.45)" /> <line class="b" filter="url(#greenGlow)" x1="11.667" y2="11.667" transform="translate(300.102 562.335)" /> <line class="b" filter="url(#greenGlow)" x1="8.796" y2="8.796" transform="translate(344.935 552.788)" /> <line class="b" filter="url(#greenGlow)" x1="11.205" y2="11.205" transform="translate(364.301 531.014)" /> <line class="b" filter="url(#greenGlow)" x1="2.847" y2="2.847" transform="translate(380.78 522.893)" /> <line class="b" filter="url(#greenGlow)" x1="6.308" y2="6.308" transform="translate(320.479 547.317)" /> <line class="b" filter="url(#greenGlow)" x1="16.201" y2="16.201" transform="translate(334.394 523.509)" /> <line class="b" filter="url(#greenGlow)" x1="13.063" y2="13.063" transform="translate(354.803 506.237)" /> <line class="c" filter="url(#redGlow)" x1="22.126" y2="22.126" transform="translate(331.469 497.229)" /> <line class="b" filter="url(#greenGlow)" x1="5.004" y2="5.004" transform="translate(372.741 496.359)" /> <line class="b" filter="url(#greenGlow)" x1="10.524" y2="10.524" transform="translate(377.745 485.836)" /> <line class="b" filter="url(#greenGlow)" x1="10.904" y2="10.904" transform="translate(269.417 547.07)" /> <line class="b" filter="url(#greenGlow)" x1="14.347" y2="14.347" transform="translate(286.347 526.697)" /> <line class="b" filter="url(#greenGlow)" x1="15.203" y2="15.203" transform="translate(306.104 506.083)" /> <line class="c" filter="url(#redGlow)" x1="12.503" y2="12.503" transform="translate(233.528 512.72)" /> <line class="b" filter="url(#greenGlow)" x1="8.612" y2="8.612" transform="translate(175.365 526.474)" /> <line class="b" filter="url(#greenGlow)" x1="10.688" y2="10.688" transform="translate(190.66 509.102)" /> <line class="b" filter="url(#greenGlow)" x1="18.81" y2="18.81" transform="translate(217.377 497.131)" /> <line class="b" filter="url(#greenGlow)" x1="7.923" y2="7.923" transform="translate(141.571 518.666)" /> <line class="b" filter="url(#greenGlow)" x1="7.089" y2="7.089" transform="translate(156.396 504.674)" /> <line class="b" filter="url(#greenGlow)" x1="7.645" y2="7.645" transform="translate(169.091 491.423)" /> <line class="c" filter="url(#redGlow)" x1="7.784" y2="7.784" transform="translate(103.15 546.267)" /> <line class="c" filter="url(#redGlow)" x1="1.963" y2="1.963" transform="translate(118.098 537.14)" /> <line class="c" filter="url(#redGlow)" x1="3.706" y2="3.706" transform="translate(125.203 528.29)" /> <line class="b" filter="url(#greenGlow)" x1="7.923" y2="7.923" transform="translate(103.098 527.868)" /> <line class="b" filter="url(#greenGlow)" x1="4.718" y2="4.718" transform="translate(115.739 518.431)" /> <line class="c" filter="url(#redGlow)" x1="6.788" y2="6.788" transform="translate(125.846 506.254)" /> <line class="c" filter="url(#redGlow)" x1="8.965" y2="8.965" transform="translate(138.958 490.965)" /> <line class="c" filter="url(#redGlow)" x1="10.841" y2="10.841" transform="translate(147.923 480.124)" /> <line class="c" filter="url(#redGlow)" x1="4.056" y2="4.056" transform="translate(387.773 526.238)" /> <line class="c" filter="url(#redGlow)" x1="22.561" y2="22.561" transform="translate(398.277 497.229)" /> <line class="b" filter="url(#greenGlow)" x1="7.351" y2="7.351" transform="translate(410.191 513.762)" /> <line class="b" filter="url(#greenGlow)" x1="11.281" y2="11.281" transform="translate(422.793 497.229)" /> <line class="c" filter="url(#redGlow)" x1="7.36" y2="7.36" transform="translate(434.23 512.042)" /> <line class="c" filter="url(#redGlow)" x1="6.602" y2="6.602" transform="translate(446.65 500.379)" /> <line class="c" filter="url(#redGlow)" x1="15.497" y2="15.497" transform="translate(370.923 504.293)" /> <line class="b" filter="url(#greenGlow)" x1="8.611" y2="8.611" transform="translate(383.218 552.974)" /> <line class="b" filter="url(#greenGlow)" x1="8.201" y2="8.201" transform="translate(390.067 579.522)" /> <line class="b" filter="url(#greenGlow)" x1="10.563" y2="10.563" transform="translate(404.87 562.356)" /> <line class="c" filter="url(#redGlow)" x1="14.418" y2="15.102" transform="translate(443.776 548.694)" /> <line class="b" filter="url(#greenGlow)" x1="31.614" y2="31.221" transform="translate(426.58 532.694)" /> <line class="b" filter="url(#greenGlow)" x1="3.473" y2="3.473" transform="translate(403.968 537.361)" /> <line class="b" filter="url(#greenGlow)" x1="13.025" y2="12.855" transform="translate(445.168 510.694)" /> </g> </svg>
                        <h2 class="title">Ride with the Best.</h2>
                        <div class="description">Our awesome instructors will keep you engaged with their positive energy,<br /> exciting choreography, and catchy tunes to push you towards your best self.</div>
                        <nuxt-link rel="canonical" to="/instructors" class="default_btn">Meet our Instructors</nuxt-link>
                    </div>
                </div>
            </section>
            <section id="studios">
                <div class="header">
                    <h2 :class="`image_bg ${($store.state.isMobile) ? 'mobile' : ''}`">studios</h2>
                    <div class="description">
                        <p><strong>Explore our studio locations.</strong></p>
                        <nuxt-link rel="canonical" to="/studios" class="default_btn">See All</nuxt-link>
                    </div>
                </div>
                <div class="content">
                    <div class="studio_content">
                        <div class="wrapper">
                            <div class="right">
                                <div class="overlay">
                                    <div class="content_select">
                                        <div class="input">
                                            <label>Branch: </label>
                                            <div class="select">
                                                <select name="studio_id" @change="getStudio($event)">
                                                    <option :value="data.id" v-for="(data, key) in studios" :key="key" v-if="!data.online_class">{{ data.name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content_flex" v-if="!$store.state.isMobile">
                                        <h2 class="title">{{ studio.name }}</h2>
                                        <div class="description">
                                            <label>Opening Hours</label>
                                            <div class="opening" v-html="studio.opening_hours"></div>
                                        </div>
                                    </div>
                                    <div class="content_flex" v-if="!$store.state.isMobile">
                                        <div class="description">
                                            <label>Contact Details</label>
                                            <div class="link">
                                                <img src="/icons/email-icon.svg" />
                                                <a :href="`mailto:${studio.contact_email_address}`" class="email">{{ studio.contact_email_address }}</a>
                                            </div>
                                            <div class="link" v-if="studio.contact_number">
                                                <img src="/icons/phone-icon.svg"/>
                                                <a :href="`tel:${studio.contact_number}`">{{ studio.contact_number }}</a>
                                            </div>
                                            <div class="link" v-if="studio.phone">
                                                <img src="/icons/phone-icon.svg"/>
                                                <a :href="`tel:02-${studio.phone}`">(02) {{ studio.phone }}</a>
                                            </div>
                                        </div>
                                        <nuxt-link :to="`/studios/${studio.slug}`" class="default_btn">Explore</nuxt-link>
                                    </div>
                                </div>
                            </div>
                            <div class="left">
                                <no-ssr v-if="!$store.state.isMobile">
                                    <swiper :options="studioOptions" class="default">
                                        <swiper-slide class="studio_slide" v-for="(studio_image, key) in studio.albums[0].images" :key="key">
                                            <img :src="studio_image.path" :alt="studio_image.alt" />
                                            <!-- <div class="overlay">
                                                <h2 class="title">{{ studio_image.title }}</h2>
                                            </div> -->
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                        <div class="swiper-button-prev" slot="button-prev" v-if="!$store.state.isMobile"></div>
                                        <div class="swiper-button-next" slot="button-next" v-if="!$store.state.isMobile"></div>
                                    </swiper>
                                </no-ssr>
                                <no-ssr v-else>
                                    <swiper :options="mobileStudioOptions" class="default alt3">
                                        <swiper-slide class="studio_slide mob" v-for="(studio_image, key) in studio.albums[0].images" :key="key">
                                            <img :src="studio_image.path" :alt="studio_image.alt" />
                                            <!-- <div class="overlay">
                                                <h2 class="title">{{ studio_image.title }}</h2>
                                            </div> -->
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                        <div class="swiper-button-prev" slot="button-prev" v-if="!$store.state.isMobile"></div>
                                        <div class="swiper-button-next" slot="button-next" v-if="!$store.state.isMobile"></div>
                                    </swiper>
                                </no-ssr>
                                <div class="content_flex" v-if="$store.state.isMobile">
                                    <h2 class="title">{{ studio.name }}</h2>
                                    <div class="description">
                                        <label>Opening Hours</label>
                                        <div class="opening" v-html="studio.opening_hours"></div>
                                    </div>
                                </div>
                                <div class="content_flex" v-if="$store.state.isMobile">
                                    <div class="description">
                                        <label>Contact Details</label>
                                        <div class="link">
                                            <img src="/icons/email-icon.svg" />
                                            <a :href="`mailto:${studio.contact_email_address}`" class="email">{{ studio.contact_email_address }}</a>
                                        </div>
                                        <div class="link" v-if="studio.contact_number">
                                            <img src="/icons/phone-icon.svg"/>
                                            <a :href="`tel:${studio.contact_number}`">{{ studio.contact_number }}</a>
                                        </div>
                                        <div class="link" v-if="studio.phone">
                                            <img src="/icons/phone-icon.svg"/>
                                            <a :href="`tel:02-${studio.phone}`">(02) {{ studio.phone }}</a>
                                        </div>
                                    </div>
                                    <nuxt-link :to="`/studios/${studio.slug}`" class="default_btn">Explore</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="lets_ride">
                <div class="header">
                    <h2 :class="`image_bg ${($store.state.isMobile) ? 'mobile' : ''}`">studios</h2>
                    <div class="description">
                        <p>
                            <a href="https://www.instagram.com/riderevolution" target="_blank">
                                <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@riderevolution</span>
                            </a>
                        </p>
                        <a href="https://www.instagram.com/riderevolution" target="_blank" class="default_btn">Follow Now</a>
                    </div>
                </div>
                <div class="content">
                    <instagram :feeds="feeds" />
                </div>
            </section>
            <transition name="fade">
                <video-prompt v-if="$store.state.videoPrompt" :data="res" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import VideoPrompt from '../components/modals/VideoPrompt'
    import Instagram from '../components/Instagram'
    import Promo from '../components/Promo'
    export default {
        components: {
            VideoPrompt,
            Instagram,
            Promo
        },
        data () {
            return {

                loaded: false,
                res: [
                    {
                        banners: [
                            {
                                path: '',
                                alt: ''
                            }
                        ]
                    }
                ],
                studio: [
                    {
                        albums: [
                            {
                                images: [
                                    {
                                        path: '',
                                        alt: ''
                                    }
                                ]
                            }
                        ]
                    }
                ],
                mobileOptions: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    slidesPerGroup: 2,
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        1280: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            spaceBetween: 0,
                            autoHeight: true
                        }
                    }
                },
                mobileStudioOptions: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                    slidesPerGroup: 2,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        767: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            spaceBetween: 0,
                            autoHeight: true
                        }
                    }
                },
                studioOptions: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    effect: 'fade',
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                packages: [],
                feeds: [],
                testimonials: [
                    {
                        description: '<p>My instructors know my capabilities and push me to my limit every single class.</p>',
                        title: 'Barney Stinson',
                        path: '/default/review/sample-review.png'
                    },
                    {
                        description: '<p>I love taking classes with my friends. Being able to track my progress is amazing!”</p>',
                        title: 'Edi Huang',
                        path: '/default/review/sample-review.png'
                    },
                    {
                        description: '<p>I’ve posted the same thing 3 times since starting Ride Rev, but I hit a new PR tonight!</p>',
                        title: 'Phil Dunphy',
                        path: '/default/review/sample-review.png'
                    }
                ],
                studios: []
            }
        },
        computed: {
            testimonialsOptions () {
                const me = this

                let loop = false

                if (me.testimonials.length > 3) {
                    loop = true
                }

                return {
                    slidesPerView: 3,
                    spaceBetween: 60,
                    centeredSlides: true,
                    loop: loop,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        },
        methods: {
            checkIfLoggedIn (event, slug, data, type) {
                const me = this
                event.preventDefault()
                if (!me.$store.state.isAuth) {
                    me.$store.state.loginCheckerStatus = true
                    document.body.classList.add('no_scroll')
                } else {
                    if (type == 'package') {
                        me.loader(true)
                        let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
                        let formData = new FormData()
                        formData.append('class_package_id', data.id)
                        me.$axios.post('api/extras/check-package-validity', formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                me.$router.push(slug)
                            }
                        }).catch(err => {
                            document.body.classList.add('no_scroll')
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                    } else {
                        me.$router.push(slug)
                    }
                }
            },
            toggleVideo () {
                const me = this
                me.$store.state.videoPrompt = true
                document.body.classList.add('no_scroll')
            },
            scrollDown () {
                const me = this
                me.$scrollTo('#promos', {
                    offset: -65
                })
            },
            getStudio (event) {
                const me = this
                me.loader(true)
                me.studios.forEach((data, index) => {
                    if (data.id == event.target.value) {
                        setTimeout( () => {
                            me.loader(false)
                            me.studio = data
                        }, 500)
                    }
                })
            },
            async initial () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.$axios.get(`https://stamped.io/api/widget/reviews?type=instagram-feed&apiKey=pubkey-b1f9lj3ib12svBob12UI0Z3a7lwNra&storeUrl=www.riderevolution.ph&isdataonly=true&productIds=1001`).then(res => {
                        me.feeds = res.data.data
                        me.loaded = true
                        me.loader(false)
                    })
                }, 500)
            }
        },
        async mounted () {
            const me = this
            await setTimeout( () => {
                me.initial()
            }, 10)
        },
        asyncData ({ $axios, params, error }) {
            return $axios.get('api/web/home')
                .then(res => {
                    return {
                        res: res.data.home,
                        studio: res.data.studios[0],
                        studios: res.data.studios,
                        packages: res.data.classPackages,
                        testimonials: res.data.testimonials
                    }
                }).catch(err => {
                    error({ statusCode: 403, message: 'Page not found' })
                })
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `${me.res.title} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ],
                meta: [
                    { hid: 'og:title', property: 'og:title', content: `${me.res.meta_title}` },
                    { hid: 'og:description', property: 'og:description', content: `${me.res.meta_description}` },
                    { hid: 'og:keywords', property: 'og:keywords', content: `${me.res.meta_keywords}` },
                    { hid: 'og:url', property: 'og:url', content: `${host}/${me.$route.fullPath}` },
                    { hid: 'og:image', property: 'og:image', content: `${me.res.banners[0].path}` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${me.res.banners[0].alt}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
