<template>
    <div class="ride_rewards">
        <section id="banner" class="mt">
            <img src="/default/ride-rewards/ride-rewards-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Ride Rewards</h1>
                <h2>We’re revolutionizing Manila’s fitness industry.</h2>
            </div>
        </section>
        <section id="content">
            <div class="top">
                <div class="title">What is Ride Rewards?</div>
                <div class="description">Ride classes and earn RR Points(RRP), which can be redeemed to purchase RR classes or merchandise. Birthday treats, promos, perks and exclusive events awaits for Ride Rewards members!</div>
            </div>
            <div class="bottom">
                <div class="header_title">How it Works</div>
                <div class="icons">
                    <div class="wrapper" v-for="(data, key) in icons" :key="key">
                        <div class="icon_top">
                            <div class="icon" v-html="data.path"></div>
                        </div>
                         <div class="icon_bottom">
                             <div class="title">{{ data.title }}</div>
                             <div class="description">{{ data.description }}</div>
                         </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="rewards_levels">
            <div class="main">
                <div class="title">Reward Levels</div>
                <div class="description">Keep riding and earn points (RRP) based on your level.</div>
                <div class="levels">
                    <div :class="`wrapper ${data.class}`" v-for="(data, key) in levels" :key="key">
                        <div class="icon" v-html="data.path"></div>
                        <div class="info">
                            <div class="info_top">
                                <div class="number">{{ data.number }}</div>
                                <div class="icon_title" v-html="data.title"></div>
                            </div>
                            <div class="info_bottom">
                                <div class="info_description" v-html="data.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="ride_with">
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
                <h3>Visit any studio to get your card now</h3>
                <nuxt-link to="/studios" rel="canonical" class="default_btn">Visit our Studios</nuxt-link>
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
                icons: [
                    {
                        title: 'Step 1',
                        description: 'Visit any studio to get your card now',
                        path: '<svg id="work_icon" xmlns="http://www.w3.org/2000/svg" width="103.615" height="63.805" viewBox="0 0 103.615 63.805"> <defs> <style>.a1{fill:none;stroke:#53565c;stroke-miterlimit:10;stroke-width:1.4px;}</style> </defs> <g transform="translate(0.707 0.506)"> <path class="a1 stroke" d="M981.924,612.356l.671.641a9.7,9.7,0,0,0,6.694,2.681h5.451l10.441,40.665" transform="translate(-922.354 -612.356)" /> <line class="a1 stroke" x1="56.09" y2="28.639" transform="translate(19.383 15.349)" /> <line class="a1 stroke" x2="4.71" y2="4.9" transform="translate(43.069 23.52)" /> <line class="a1 stroke" x2="10.125" y2="10.534" transform="translate(29.35 9.248)" /> <path class="a1 stroke" d="M1019.633,637.944a19.38,19.38,0,1,1-20.407-6.839" transform="translate(-921.482 -606.911)" /> <path class="a1 stroke" d="M1002.046,630.728a19.273,19.273,0,0,1,7.843,2.932" transform="translate(-916.513 -607.021)" /> <path class="a1 stroke" d="M967.14,665.425a19.384,19.384,0,1,1,1.869-28.764" transform="translate(-935.758 -606.994)" /> <line class="a1 stroke" x2="17.766" transform="translate(18.196 8.872)" /> <path class="a1 stroke" d="M969.453,643.5a8.013,8.013,0,1,1,10.183,11.658" transform="translate(-925.975 -604.343)" /> <path class="a1 stroke" d="M983.409,641.466,971,655.5a5.781,5.781,0,0,1-4.409,2.042h-4.209" transform="translate(-928.029 -603.902)" /> </g> </svg>'
                    },
                    {
                        title: 'Step 2',
                        description: 'Pay PHP250 membership fee',
                        path: '<svg id="work_icon" xmlns="http://www.w3.org/2000/svg" width="106.436" height="93.045" viewBox="0 0 106.436 93.045"> <defs> <style>.a2{fill:none;stroke:#26a48b;stroke-width:1.4px;}</style> </defs> <g transform="translate(0.344 0.816)"> <path class="a2 stroke" d="M17552.059-18674.428l18.125-11.613-40.469-22.68-62.77,40.434,39.652,23.086,17.879-12.047" transform="translate(-17465.451 18708.721)" /> <path class="a2 stroke" d="M17480.332-18691.541l39.2,22.824v29.316l13.133-8.512v-29.395l-39.633-23.012" transform="translate(-17453.662 18716.123)" /> <path class="a2 stroke" d="M17511.535-18687.943l-7.207,4.531" transform="translate(-17432.531 18727.018)" /> <path class="a2 stroke" d="M17512.418-18680.418l17.809-10.926" transform="translate(-17425.408 18724.021)" /> <path class="a2 stroke" d="M17512.418-18680.418l17.809-10.926" transform="translate(-17425.408 18733.426)" /> <path class="a2 stroke" d="M17512.418-18680.418l17.809-10.926" transform="translate(-17425.408 18740.947)" /> <path class="a2 stroke" d="M17525.121-18670.437l-17.895,11.184-41.078-23.187" transform="translate(-17466.148 18731.861)" /> <path class="a2 stroke" d="M17525.121-18670.437l-17.895,11.184-41.078-23.187" transform="translate(-17466.148 18741.264)" /> <path class="a2 stroke" d="M17525.121-18670.437l-17.895,11.184-41.078-23.187" transform="translate(-17466.148 18750.668)" /> </g> </svg>'
                    },
                    {
                        title: 'Step 3',
                        description: 'Activate via mobile number registration',
                        path: '<svg id="work_icon" xmlns="http://www.w3.org/2000/svg" width="94.449" height="97.79" viewBox="0 0 94.449 97.79"> <defs> <style>.a,.c{fill:none;}.a{stroke:#f13747;stroke-width:1.4px;}.b{stroke:none;}</style> </defs> <g transform="translate(-444.551 -710)"> <path class="a stroke" d="M17740.7-18721.047s-10.469,9.074,0,24.77" transform="translate(-17290.766 19440.361)" /> <path class="a stroke" d="M17736.043-18721.047s10.473,9.074,0,24.77" transform="translate(-17202.422 19440.361)" /> <path class="a stroke" d="M17738.775-18721.047s-6.141,5.32,0,14.527" transform="translate(-17283.246 19444.965)" /> <path class="a stroke" d="M17736.043-18721.047s6.141,5.32,0,14.527" transform="translate(-17208.02 19444.965)" /> <g class="a stroke" transform="translate(465.881 710)"> <rect class="b stroke" width="54.537" height="97.79" rx="2" /> <rect class="c stroke" x="0.7" y="0.7" width="53.137" height="96.39" rx="1.3" /> </g> <path class="a stroke" d="M17775.637-18719.611h51.926" transform="translate(-17308.563 19441.625)" /> <path class="a stroke" d="M17775.637-18685.346h52.1" transform="translate(-17308.563 19471.799)" /> <g class="a stroke" transform="translate(486.567 788.984)"> <circle class="b stroke" cx="7.522" cy="7.522" r="7.522" /> <circle class="c stroke" cx="7.522" cy="7.522" r="6.822" /> </g> <g transform="translate(484.688 716.957)"> <path class="a stroke" d="M17782.316-18722.3h9.965" transform="translate(-17782.316 18722.301)" /> <path class="a stroke" d="M17793.754-18722.3h3.484" transform="translate(-17781.391 18722.301)" /> </g> </g> </svg>'
                    }
                ],
                levels: [
                    {
                        class: 'green',
                        number: '1',
                        title: '<p>st ride<br>of the year</p>',
                        description: '<div class="desc_top"> <p>Teal</p> <p class="capital">Level 1</p> <br> <p class="capital reg">Outright Purchase</p> <p>After registration, you’re automatically a Teal level 1 member.</p> </div> <br><br> <b>Earn 110 RRP per ride<br>10% Rebate</b>',
                        path: '<svg id="level_icon" xmlns="http://www.w3.org/2000/svg" width="135.576" height="53.161" viewBox="0 0 135.576 53.161"> <defs> <style>.a1,.b1{fill:none;stroke:#26a48b;stroke-width:1.4px;}.a1{stroke-miterlimit:10;}</style> </defs> <g transform="translate(-233 -1291.734)"> <g transform="translate(283.047 1292.24)"> <path class="a1 stroke" d="M981.924,612.356l.557.532a8.047,8.047,0,0,0,5.556,2.225h4.524l8.665,33.75" transform="translate(-932.484 -612.356)" /> <line class="a1 stroke" x1="46.552" y2="23.769" transform="translate(16.087 12.739)" /> <line class="a1 stroke" x2="3.909" y2="4.067" transform="translate(35.745 19.521)" /> <line class="a1 stroke" x2="8.403" y2="8.743" transform="translate(24.359 7.675)" /> <path class="a1 stroke" d="M1013.731,636.781a16.084,16.084,0,1,1-16.937-5.676" transform="translate(-932.271 -611.025)" /> <path class="a1 stroke" d="M1002.046,630.728a15.994,15.994,0,0,1,6.509,2.433" transform="translate(-931.057 -611.052)" /> <path class="a1 stroke" d="M961.8,659.541a16.088,16.088,0,1,1,1.551-23.873" transform="translate(-935.758 -611.045)" /> <line class="a1 stroke" x2="14.745" transform="translate(15.102 7.363)" /> <path class="a1 stroke" d="M969.453,642.894a6.65,6.65,0,1,1,8.452,9.675" transform="translate(-933.368 -610.397)" /> <path class="a1 stroke" d="M979.833,641.466l-10.3,11.647a4.8,4.8,0,0,1-3.659,1.694h-3.493" transform="translate(-933.87 -610.289)" /> </g> <path class="b1 stroke" d="M20270.906-18893.389h-25.727" transform="translate(-19990.979 20220.08)" /> <path class="b1 stroke" d="M20260.047-18893.389h-4.871" transform="translate(-20012.219 20220.08)" /> <path class="b1 stroke" d="M20277.768-18893.908h-32.59" transform="translate(-19996.018 20230.625)" /> <path class="b1 stroke" d="M20258.188-18893.908h-13.01" transform="translate(-20012.178 20230.625)" /> <path class="b1 stroke" d="M20287.3-18893.908h-42.127" transform="translate(-19997.773 20206.217)" /> <path class="b1 stroke" d="M20254.857-18893.908h-9.68" transform="translate(-20008.564 20206.217)" /> </g> </svg>'
                    },
                    {
                        class: 'red',
                        number: '50',
                        title: '<p>rides<br>in a year</p>',
                        description: '<div class="desc_top"> <p>Red</p> <p class="capital">Level 2</p> <br> <p class="capital reg">CUMULATIVE ATTENDANCE</p> <p>Take 50 classes within a one-year period to level up.</p> </div> <br><br> <b>Earn 165RRP per ride<br>15% Rebate</b>',
                        path: '<svg id="level_icon" xmlns="http://www.w3.org/2000/svg" width="168.347" height="64.236" viewBox="0 0 168.347 64.236"> <defs> <style>.a2,.b2{fill:none;stroke:#f13747;stroke-width:2px;}.a2{stroke-miterlimit:10;}</style> </defs> <g transform="translate(-533.719 -1280.961)"> <g transform="translate(599 1281.684)"> <path class="a2 stroke" d="M981.924,612.356l.67.641a9.682,9.682,0,0,0,6.685,2.678h5.443l10.426,40.609" transform="translate(-922.437 -612.356)" /> <line class="a2 stroke" x1="56.012" y2="28.599" transform="translate(19.356 15.328)" /> <line class="a2 stroke" x2="4.703" y2="4.893" transform="translate(43.009 23.488)" /> <line class="a2 stroke" x2="10.111" y2="10.52" transform="translate(29.309 9.235)" /> <path class="a2 stroke" d="M1019.584,637.935a19.353,19.353,0,1,1-20.378-6.83" transform="translate(-921.571 -606.944)" /> <path class="a2 stroke" d="M1002.046,630.728a19.245,19.245,0,0,1,7.832,2.927" transform="translate(-916.632 -607.053)" /> <path class="a2 stroke" d="M967.1,665.378a19.357,19.357,0,1,1,1.866-28.724" transform="translate(-935.758 -607.027)" /> <line class="a2 stroke" x2="17.741" transform="translate(18.171 8.86)" /> <path class="a2 stroke" d="M969.453,643.493a8,8,0,1,1,10.169,11.642" transform="translate(-926.036 -604.392)" /> <path class="a2 stroke" d="M983.38,641.466,970.985,655.48a5.773,5.773,0,0,1-4.4,2.039h-4.2" transform="translate(-928.077 -603.953)" /> </g> <path class="b2 stroke" d="M20276.137-18893.389h-30.957" transform="translate(-19680.885 20216.525)" /> <path class="b2 stroke" d="M20261.037-18893.389h-5.861" transform="translate(-19704.408 20216.525)" /> <path class="b2 stroke" d="M20284.391-18893.908h-39.211" transform="translate(-19686.949 20229.107)" /> <path class="b2 stroke" d="M20260.832-18893.908h-15.652" transform="translate(-19706.395 20229.107)" /> <path class="b2 stroke" d="M20295.867-18893.908h-50.687" transform="translate(-19689.064 20199.738)" /> <path class="b2 stroke" d="M20256.824-18893.908h-11.645" transform="translate(-19702.047 20199.738)" /> <path class="b2 stroke" d="M20295.867-18893.908h-50.687" transform="translate(-19698.479 20206.98)" /> <path class="b2 stroke" d="M20256.824-18893.908h-11.645" transform="translate(-19711.461 20206.98)" /> </g> </svg>'
                    },
                    {
                        class: 'black',
                        number: '100',
                        title: '<p>rides<br>in a year</p>',
                        description: '<div class="desc_top"> <p>Black</p> <p class="capital">Level 3</p> <br> <p class="capital reg">CUMULATIVE ATTENDANCE</p> <p>You made it! You reached 100 classes within a year and reached Black level 3!</p> </div> <br><br> <b>Earn 220RRP per ride<br>20% Rebate</b>',
                        path: '<svg id="level_icon" xmlns="http://www.w3.org/2000/svg" width="268.402" height="89.949" viewBox="0 0 268.402 89.949"> <defs> <style>.a3,.b3,.c3,.d3{fill:none;stroke-width:2.4px;}.a3{stroke:#fffdfe;stroke-miterlimit:10;}.b3{stroke:#a8a8a8;}.c3{stroke:#f13747;}.d3{stroke:#26a48b;}</style> </defs> <g transform="translate(-888.758 -1255.451)"> <g transform="translate(1012.475 1256.318)"> <path class="a3 stroke" d="M981.924,612.356l.942.9a13.611,13.611,0,0,0,9.4,3.764h7.652l14.657,57.089" transform="translate(-898.297 -612.356)" /> <line class="a3 stroke" x1="78.742" y2="40.205" transform="translate(27.211 21.548)" /> <line class="a3 stroke" x2="6.612" y2="6.879" transform="translate(60.462 33.02)" /> <line class="a3 stroke" x2="14.214" y2="14.789" transform="translate(41.203 12.983)" /> <path class="a3 stroke" d="M1033.648,640.706A27.206,27.206,0,1,1,1005,631.1" transform="translate(-895.86 -597.139)" /> <path class="a3 stroke" d="M1002.046,630.728a27.056,27.056,0,0,1,11.01,4.115" transform="translate(-881.969 -597.445)" /> <path class="a3 stroke" d="M979.814,679.4a27.212,27.212,0,1,1,2.623-40.381" transform="translate(-935.758 -597.372)" /> <line class="a3 stroke" x2="24.941" transform="translate(25.545 12.455)" /> <path class="a3 stroke" d="M969.453,644.932a11.249,11.249,0,1,1,14.3,16.366" transform="translate(-908.416 -589.963)" /> <path class="a3 stroke" d="M991.9,641.466l-17.424,19.7a8.116,8.116,0,0,1-6.19,2.866h-5.909" transform="translate(-914.156 -588.73)" /> </g> <path class="b3 stroke" d="M20288.7-18893.389h-43.521" transform="translate(-19281.49 20207.982)" /> <path class="b3 stroke" d="M20263.416-18893.389h-8.24" transform="translate(-19310.506 20207.982)" /> <path class="b3 stroke" d="M20300.3-18893.908h-55.125" transform="translate(-19290.018 20225.457)" /> <path class="b3 stroke" d="M20267.186-18893.908h-22.006" transform="translate(-19317.354 20225.457)" /> <path class="c3 stroke" d="M20316.438-18893.908h-71.258" transform="translate(-19292.99 20184.172)" /> <path class="c3 stroke" d="M20261.549-18893.908h-16.369" transform="translate(-19311.242 20184.172)" /> <path class="c3 stroke" d="M20316.438-18893.908h-71.258" transform="translate(-19306.227 20194.354)" /> <path class="c3 stroke" d="M20261.549-18893.908h-16.369" transform="translate(-19324.477 20194.354)" /> <path class="d3 stroke" d="M20328.432-18891.311h-83.252" transform="translate(-19311.242 20230.531)" /> <path class="d3 stroke" d="M20267.186-18891.311h-22.006" transform="translate(-19356.422 20230.531)" /> <path class="c3 stroke" d="M20316.438-18893.908h-71.258" transform="translate(-19269.975 20176.5)" /> <path class="c3 stroke" d="M20261.549-18893.908h-16.369" transform="translate(-19288.229 20176.5)" /> </g> </svg>'
                    }
                ]
            }
        },
        methods: {

        },
        mounted () {
            const me = this

        }
    }
</script>
