<template>
    <div class="instructors">
        <section id="instructors_nav">
            <div :class="`left ${(toggled) ? 'active' : ''}`" @click="toggleSpecialization()" v-click-outside="outsideSpecialization">
                <div class="select">
                    <label class="label">
                        Specialization
                        <!-- <div class="count">
                            <span>{{ count }}</span>
                        </div> -->
                    </label>
                    <div class="custom_select">
                        <div :class="`check ${(checkSpecialization) ? 'active' : ''}`">
                            <label for="specialization_all">All Specializations</label>
                            <input type="checkbox" id="specialization_all" name="select_all" value="0" :checked="checkSpecialization" @change="toggleAllSpecialization($event)">
                        </div>
                        <div :class="`check ${(data.checked) ? 'active' : ''}`" v-for="(data, key) in specializations" :key="key">
                            <label class="label" :for="`specialization_${key}`"><img :src="data.path" /><span>{{ data.name }}</span></label>
                            <input type="checkbox" :id="`specialization_${key}`" name="specialization[]" v-model="data.checked" @change="getSpecialization($event, key)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="input">
                    <input type="text" name="search" placeholder="Search for an instructor">
                </div>
            </div>
        </section>
        <breadcrumb :hasPadding="true" />
        <section id="instructors_content">
            <div class="header">
                <h1>Instructors</h1>
                <div class="subheader">
                    <h2>Show instructors by</h2>
                    <div class="select">
                        <select name="sort">
                            <option :value="convertToSlug(data.name)" v-for="(data, key) in sorts" :key="key" :selected="(key == 2) ? true : false">{{ data.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="content">
                <div :id="`item_${key}`" class="wrapper" v-for="(data, key) in populateInstructors" :key="key" @mouseover="toggleActionHover(key)" @mouseleave="toggleActionLeave(key)">
                    <a class="follow" href="javascript:void(0)"><img src="/icons/ig-white-icon.svg" /><span>Follow</span></a>
                    <img class="main" src="/default/instructor/sample-instructor.png" />
                    <svg id="stripe" xmlns="http://www.w3.org/2000/svg" width="97.432" height="115.914" viewBox="0 0 97.432 115.914"> <g transform="translate(0.53 0.53)"> <g transform="translate(0 0)"> <line class="border" x1="33.924" y2="34.37" transform="translate(16.619 21.021)" /> <line class="border" x1="58.028" y2="58.028" transform="translate(30.755 13.488)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(70.036 2.329)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(12.008 54.554)" /> <line class="border" x1="59.707" y2="59.684" /> </g> <path class="border" d="M-95.6,47.944-48.945,0" transform="translate(99.627 66.91)" /> <line class="border" x1="11.606" y2="11.606" transform="translate(84.766 22.416)" /> <line class="border" x1="25.059" y2="25.197" transform="translate(2.125 2.775)" /> <line class="border" x1="25.889" y2="25.889" transform="translate(18.703 0.097)" /> <line class="border" x1="29.46" y2="29.46" transform="translate(39.683 11.256)" /> </g> </svg>
                    <div class="overlay">
                        <div class="title">{{ data.name }}</div>
                        <div class="action">
                            <nuxt-link rel="canonical" to="/instructors/asdasd" class="default_btn_wht mb">See Profile</nuxt-link>
                            <nuxt-link rel="canonical" to="/" class="default_btn">Book A Ride</nuxt-link>
                        </div>
                    </div>
                </div>
                <div v-if="!showLoadedInstructors" class="default_btn load" @click="loadMoreInstructors()">Load More</div>
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    export default {
        components: {
            Breadcrumb
        },
        data () {
            return {
                showLoadedInstructors: false,
                toShow: 12,
                count: 0,
                toggled: false,
                specializations: [
                    {
                        path: '/default/specialization/drill-sergeant.svg',
                        name: 'Drill Sergeant',
                        checked: false
                    },
                    {
                        path: '/default/specialization/speed-freak.svg',
                        name: 'Speed Freak',
                        checked: false
                    },
                    {
                        path: '/default/specialization/uphill-battle.svg',
                        name: 'Uphill Battle',
                        checked: false
                    },
                    {
                        path: '/default/specialization/ohm-licious.svg',
                        name: 'Ohm-Licious',
                        checked: false
                    },
                    {
                        path: '/default/specialization/party-animal.svg',
                        name: 'Party Animal',
                        checked: false
                    },
                    {
                        path: '/default/specialization/coachella-afterparty.svg',
                        name: 'Coachella Afterparty',
                        checked: false
                    },
                ],
                sorts: [
                    {
                        name: 'A-Z'
                    },
                    {
                        name: 'Z-A'
                    },
                    {
                        name: 'Ride Rev Recommendation'
                    },
                    {
                        name: 'New Instructors'
                    },
                ],
                instructors: [
                    {
                        name: 'Billie',
                        checked: true
                    },
                    {
                        name: 'Bianca',
                        checked: true
                    },
                    {
                        name: 'Niqui',
                        checked: true
                    },
                    {
                        name: 'Wanda',
                        checked: true
                    },
                    {
                        name: 'Maxo',
                        checked: true
                    },
                    {
                        name: 'Jeff',
                        checked: true
                    },
                    {
                        name: 'Gelo',
                        checked: true
                    },
                    {
                        name: 'Vicky',
                        checked: true
                    },
                    {
                        name: 'Amanda',
                        checked: true
                    },
                    {
                        name: 'Jasper',
                        checked: true
                    },
                    {
                        name: 'Nicole',
                        checked: true
                    },
                    {
                        name: 'Antonette',
                        checked: true
                    },
                    {
                        name: 'Billie',
                        checked: false
                    },
                    {
                        name: 'Bianca',
                        checked: false
                    },
                    {
                        name: 'Niqui',
                        checked: false
                    },
                    {
                        name: 'Wanda',
                        checked: false
                    },
                    {
                        name: 'Maxo',
                        checked: false
                    },
                    {
                        name: 'Jeff',
                        checked: false
                    },
                    {
                        name: 'Gelo',
                        checked: false
                    },
                    {
                        name: 'Vicky',
                        checked: false
                    },
                    {
                        name: 'Amanda',
                        checked: false
                    },
                    {
                        name: 'Jasper',
                        checked: false
                    },
                    {
                        name: 'Nicole',
                        checked: false
                    },
                    {
                        name: 'Antonette',
                        checked: false
                    },
                ]
            }
        },
        computed: {
            checkSpecialization () {
                const me = this
                let count = 0
                let result = false
                me.specializations.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.specializations.length) {
                    result = true
                } else {
                    result = false
                }
                me.count = count
                return result
            },
            populateInstructors () {
                const me = this
                let result = []
                let count = 0
                for (let i = 0; i < me.toShow; i++) {
                    if (me.instructors[i]) {
                        count++
                        me.instructors[i].checked = true
                        result.push(me.instructors[i])
                    }
                }
                if (count == me.instructors.length) {
                    me.showLoadedInstructors = true
                } else {
                    me.showLoadedInstructors = false
                }
                return result
            }
        },
        methods: {
            loadMoreInstructors () {
                const me = this
                if (!me.showLoadedInstructors) {
                    me.toShow += 4
                    me.$scrollTo('.load', {
                        offset: 0
                    })
                }
            },
            toggleActionHover (key) {
                const me = this
                let element = document.getElementById(`item_${key}`)
                element.querySelector('.action').style.height = `${element.querySelector('.action').scrollHeight}px`
            },
            toggleActionLeave (key) {
                const me = this
                let element = document.getElementById(`item_${key}`)
                element.querySelector('.action').style.height = `0px`
            },
            toggleAllSpecialization (event) {
                const me = this
                if (me.checkSpecialization) {
                    me.specializations.forEach((data, index) => {
                        data.checked = false
                    })
                } else {
                    me.specializations.forEach((data, index) => {
                        data.checked = true
                    })
                }
            },
            getSpecialization (event, key) {
                const me = this
                if (event.target.checked) {
                    me.count++
                } else {
                    if (me.count != 0) {
                        me.count--
                    }
                }
            },
            outsideSpecialization () {
                const me = this
                me.toggled = false
            },
            toggleSpecialization () {
                const me = this
                me.toggled ^= true
            }
        }
    }
</script>
