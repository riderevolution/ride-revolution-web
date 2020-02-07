<template>
    <div class="book_a_bike landing">
        <section id="banner">
            <img src="/default/book-a-bike/book-a-bike-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Book a Bike</h1>
                <h2>See you in the studio!</h2>
            </div>
        </section>
        <section id="content">
            <div class="left">
                <div class="filter">
                    <div class="wrapper studio_filter">
                        <h3>Studios</h3>
                        <div class="group select_all">
                            <label :class="`custom_check ${(checkStudio) ? 'checked' : ''}`" @click="toggleAllStudio($event)">All Studio</label>
                        </div>
                        <div class="group" v-for="(studio, key) in studios" :key="key">
                            <input type="checkbox" class="check" name="studios" :id="`studio_${key}`" v-model="studio.checked" @change="toggleStudio()">
                            <label :for="`studio_${key}`">{{ studio.name }}</label>
                        </div>
                    </div>
                    <div class="wrapper instructor_filter">
                        <h3>Instructors</h3>
                        <div :class="`autocomplete ${(toggledAutocomplete) ? 'toggled' : ''}`" v-click-outside="toggleAutoCompleteOutside">
                            <input type="text" name="instructor" class="text" placeholder="Search for an instructor" @click="toggleAutoComplete()">
                            <transition name="slideAlt">
                                <div class="autocomplete_dropdown" v-if="toggledAutocomplete">
                                    <div class="list" v-for="(n, key) in 8" :key="key">
                                        <img src="/default/book-a-bike/autodd-sample.png" />
                                        <p>Billie Capistrano</p>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="date_navigator">
                    <div :id="`date_${key}`" :class="`date ${($moment().format('D') == result.day) ? 'active' : ''}`" v-for="(result, key) in results" :key="key" @click="toggleDate(key)">
                        <div class="overlay">
                            <div class="abbr">{{ result.abbr }}</div>
                            <div class="month">{{ result.month }}</div>
                            <div class="day">{{ result.day }}</div>
                        </div>
                    </div>
                    <div class="date_controls">
                        <div class="prev" @click="generatePrevClasses()"></div>
                        <div class="next" @click="generateNextClasses()"></div>
                    </div>
                </div>
                <div class="schedule_list">
                    <div class="header">
                        <span>Showing rides in </span>
                        <span class="label">all studios</span>
                        <span>with</span>
                        <span class="label">all instructors</span>
                    </div>
                    <div class="content">

                    </div>
                </div>
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
                isPrev: false,
                toggledAutocomplete: false,
                current: 0,
                last: 0,
                currentMonth: '',
                currentYear: '',
                results: [],
                studios: [
                    {
                        id: 1,
                        name: 'Shangri-La Plaza',
                        checked: false
                    },
                    {
                        id: 2,
                        name: 'Greenbelt',
                        checked: false
                    },
                    {
                        id: 3,
                        name: 'Bonifacio Global City',
                        checked: false
                    }
                ]
            }
        },
        computed: {
            checkStudio () {
                const me = this
                let ctr = 0
                let result = false
                me.studios.forEach((studio, index) => {
                    if (studio.checked) {
                        ctr++
                    }
                })
                if (ctr == me.studios.length) {
                    result = true
                } else {
                    result = false
                }
                return result
            }
        },
        methods: {
            toggleAutoComplete () {
                const me = this
                me.toggledAutocomplete ^= true
            },
            toggleAutoCompleteOutside () {
                const me = this
                me.toggledAutocomplete = false
            },
            toggleAllStudio ($event) {
                const me = this
                if (me.checkStudio) {
                    me.studios.forEach((data, index) => {
                        data.checked = false
                    })
                } else {
                    me.studios.forEach((data, index) => {
                        data.checked = true
                    })
                }
                if (event.target.classList.contains('checked')) {
                    event.target.classList.remove('checked')
                } else {
                    event.target.classList.add('checked')
                }
            },
            removeActive () {
                const me = this
                let elements = document.querySelectorAll('.date_navigator .date')
                elements.forEach((element, index) => {
                    element.classList.remove('active')
                })
            },
            toggleDate (unique) {
                const me = this
                let elements = document.querySelectorAll('.date_navigator .date')
                document.getElementById(`date_${unique}`).classList.add('active')
                elements.forEach((element, index) => {
                    if (unique != index) {
                        element.classList.remove('active')
                    }
                })
            },
            generateNextClasses () {
                const me = this
                if (me.isPrev) {
                    me.isPrev = false
                    me.current = me.current + 8
                }
                me.results = []
                for (let i = 0; i < 7; i++) {
                    if (me.current > me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()) {
                        me.current = me.current - me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()
                        me.currentMonth = me.currentMonth + 1
                        if (me.currentMonth == 13) {
                            me.currentMonth = 1
                            me.currentYear = me.currentYear + 1
                        }
                    }
                    me.populateResults(me.current, 'next')
                    if (i == 0) {
                        me.last = me.current - 1
                    }
                    me.current++
                }
            },
            generatePrevClasses () {
                const me = this
                if (!me.isPrev) {
                    me.isPrev = true
                    me.current = me.current - 8
                }
                me.results = []
                for (let i = 0; i < 7; i++) {
                    if (me.current <= 0) {
                        me.currentMonth = me.currentMonth - 1
                        if (me.currentMonth == 0) {
                            me.currentMonth = 12
                            me.currentYear = me.currentYear - 1
                            if (me.current <= 0) {
                                if (me.last <= 0) {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()
                                } else {
                                    if (me.currentMonth == 12) {
                                        me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-1`, 'YYYY-MM').daysInMonth()
                                    } else {
                                        me.current = me.last
                                    }
                                }
                            } else {
                                me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${me.last}`, 'YYYY-MM-D').daysInMonth()
                            }
                        } else {
                            if (me.current == 0) {
                                if (me.last == 0) {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${1}`, 'YYYY-MM-D').daysInMonth()
                                } else {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${me.last}`, 'YYYY-MM-D').daysInMonth()
                                }
                            } else {
                                me.current = me.last
                            }
                        }
                    }
                    me.populateResults(me.current, 'prev')
                    me.current--
                    if (i == 6) {
                        me.last = me.current
                    }
                }
            },
            populateResults (data, type) {
                const me = this
                me.loader(true)
                switch (type) {
                    case 'next':
                        me.results.push({
                            abbr: (me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('M-D') == me.$moment().format('M-D')) ? 'Today' : me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('ddd'),
                            month: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('MMM'),
                            day: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('D'),
                            value: data
                        })
                        break
                    case 'prev':
                        me.results.unshift({
                            abbr: (me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('M-D') == me.$moment().format('M-D')) ? 'Today' : me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('ddd'),
                            month: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('MMM'),
                            day: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('D'),
                            value: data
                        })
                        break
                }
                me.removeActive()
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            },
            populateClasses () {
                const me = this
                me.results = []
                me.loader(true)
                let currentDate = parseInt(me.$moment().format('D'))
                me.current = currentDate
                me.last = currentDate
                me.currentMonth = parseInt(me.$moment().format('M'))
                me.currentYear = parseInt(me.$moment().format('YYYY'))
                for (let i = 0; i < 7; i++) {
                    if (currentDate > me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()) {
                        currentDate = 1
                        me.currentMonth = me.currentMonth + 1
                        if (me.currentMonth == 13) {
                            me.currentMonth = 1
                            me.currentYear = me.currentYear + 1
                        }
                    }
                    me.results.push({
                        abbr: (me.$moment(`${me.currentYear}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('M-D') == me.$moment().format('M-D')) ? 'Today' : me.$moment(`${me.currentYear}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('ddd'),
                        month: me.$moment(`${me.currentYear}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('MMM'),
                        day: me.$moment(`${me.currentYear}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('D'),
                        value: currentDate
                    })
                    currentDate++
                    me.current = currentDate
                    me.isPrev = false
                }
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            }
        },
        mounted() {
            const me = this
            me.populateClasses()
        }
    }
</script>
