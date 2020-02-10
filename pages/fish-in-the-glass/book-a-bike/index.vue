<template>
    <div class="book_a_bike landing">
        <section id="content">
            <div class="left">
                <div class="filter_accordion" v-if="$parent.$parent.isMobile">
                    <label>Filter</label>
                    <div class="toggler" @click="toggleFilter($event)"></div>
                </div>
                <div class="filter">
                    <div class="wrapper studio_filter">
                        <h3>Studios</h3>
                        <div class="group">
                            <input type="radio" class="radio" name="studios" id="studio_0" value="0" checked @change="toggleStudio(studio, 'static')">
                            <label for="studio_0">All Studios</label>
                        </div>
                        <div class="group" v-for="(studio, key) in studios" :key="key">
                            <input type="radio" class="radio" name="studios" :id="`studio_${key + 1}`" v-model="studio.id" @change="toggleStudio(studio, 'dynamic')">
                            <label :for="`studio_${key + 1}`">{{ studio.name }}</label>
                        </div>
                    </div>
                    <div class="wrapper instructor_filter">
                        <h3>Instructors</h3>
                        <div :class="`autocomplete ${(toggledAutocomplete) ? 'toggled' : ''}`" v-click-outside="toggleAutoCompleteOutside">
                            <input type="text" name="instructor" class="text" placeholder="Search for an instructor" v-model="searchedInstructor" @click="toggleAutoComplete()">
                            <transition name="slideAlt">
                                <div class="autocomplete_dropdown" v-if="toggledAutocomplete">
                                    <div class="list" v-for="(n, key) in 8" :key="key" @click="selectIntructor('Billie Capistrano')">
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
                    <div :id="`date_${key}`" :class="`date ${($moment().format('MMM-D') == `${result.month}-${result.day}`) ? 'active' : ''}`" v-for="(result, key) in results" :key="key" @click="toggleDate(key)">
                        <div class="overlay">
                            <div class="abbr">{{ result.abbr }}</div>
                            <div class="month">{{ result.month }}</div>
                            <div class="day">{{ result.day }}</div>
                        </div>
                    </div>
                    <div class="date_controls" v-if="!$parent.$parent.isMobile">
                        <div class="prev" @click="generatePrevClasses()"></div>
                        <div class="next" @click="generateNextClasses()"></div>
                    </div>
                </div>
                <div class="date_controls_mobile" v-if="$parent.$parent.isMobile">
                    <div class="prev" @click="generatePrevClasses()"></div>
                    <div class="next" @click="generateNextClasses()"></div>
                </div>
                <div class="schedule_list">
                    <div class="header">
                        <span>Showing rides in </span>
                        <span :class="`label ${(hasStudioFilter) ? 'active' : ''}`">{{ studioFilter }}<img v-if="hasStudioFilter" @click="resetFilter('studio')" src="/icons/filter-close.svg" /></span>
                        <span>with</span>
                        <span :class="`label ${(hasSearchedInstructor) ? 'active' : ''}`">{{ checkSearchedInstructor }}<img v-if="hasSearchedInstructor" @click="resetFilter('instructor')" src="/icons/filter-close.svg" /></span>
                    </div>
                    <div class="content" v-if="!$parent.$parent.isMobile">
                        <div class="schedule">
                            <div class="time">10:30 AM</div>
                            <div class="class">
                                <img class="image" src="/default/book-a-bike/class-image-sample.png" />
                                <div class="info">
                                    <h2>Billie Capistrano</h2>
                                    <div class="ride"><p>50 Minute Ride</p> <img src="/icons/info-booker-icon.svg" /></div>
                                    <h3>Greenbelt</h3>
                                </div>
                            </div>
                            <div class="action">
                                <nuxt-link to="/fish-in-the-glass/book-a-bike/asdasdasd" class="btn default_btn_out">
                                    <span>Book Now</span>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="schedule">
                            <div class="time">10:30 AM</div>
                            <div class="class">
                                <img class="image" src="/default/book-a-bike/class-image-sample.png" />
                                <div class="info">
                                    <h2>Billie Capistrano</h2>
                                    <div class="ride"><p>50 Minute Ride</p> <img src="/icons/info-booker-icon.svg" /></div>
                                    <h3>Greenbelt</h3>
                                </div>
                            </div>
                            <div class="action">
                                <nuxt-link to="/fish-in-the-glass/book-a-bike/asdasdasd" class="btn default_btn_out">
                                    <span>Waitlist</span>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="schedule">
                            <div class="time">10:30 AM</div>
                            <div class="class">
                                <img class="image" src="/default/book-a-bike/class-image-sample.png" />
                                <div class="info">
                                    <h2>Billie Capistrano</h2>
                                    <div class="ride"><p>50 Minute Ride</p> <img src="/icons/info-booker-icon.svg" /></div>
                                    <h3>Greenbelt</h3>
                                </div>
                            </div>
                            <div class="action">
                                <div class="btn default_btn_out disabled">
                                    <span>Waitlisted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content_mobile" v-else>
                        <a class="schedule">
                            <img class="image" src="/default/book-a-bike/class-image-sample.png" />
                            <div class="info">
                                <div class="time">10:30 AM</div>
                                <h2>Billie Capistrano</h2>
                                <div class="ride"><p>50 Minute Ride</p> <img src="/icons/info-booker-icon.svg" /></div>
                                <h3>Greenbelt</h3>
                            </div>
                            <div class="action">
                                <nuxt-link to="/fish-in-the-glass/book-a-bike/asdasdasd" class="btn default_btn_out">
                                    <span>Book Now</span>
                                </nuxt-link>
                            </div>
                        </a>
                        <a class="schedule">
                            <img class="image" src="/default/book-a-bike/class-image-sample.png" />
                            <div class="info">
                                <div class="time">10:30 AM</div>
                                <h2>Billie Capistrano</h2>
                                <div class="ride"><p>50 Minute Ride</p> <img src="/icons/info-booker-icon.svg" /></div>
                                <h3>Greenbelt</h3>
                            </div>
                            <div class="action">
                                <nuxt-link to="/fish-in-the-glass/book-a-bike/asdasdasd" class="btn default_btn_out">
                                    <span>Waitlist</span>
                                </nuxt-link>
                            </div>
                        </a>
                        <a class="schedule">
                            <img class="image" src="/default/book-a-bike/class-image-sample.png" />
                            <div class="info">
                                <div class="time">10:30 AM</div>
                                <h2>Billie Capistrano</h2>
                                <div class="ride"><p>50 Minute Ride</p> <img src="/icons/info-booker-icon.svg" /></div>
                                <h3>Greenbelt</h3>
                            </div>
                            <div class="action">
                                <div class="btn default_btn_out disabled">
                                    <span>Waitlisted</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        layout: 'fish',
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
                        name: 'Shangri-La Plaza'
                    },
                    {
                        id: 2,
                        name: 'Greenbelt'
                    },
                    {
                        id: 3,
                        name: 'Bonifacio Global City'
                    }
                ],
                studioFilter: 'all studios',
                hasStudioFilter: false,
                searchedInstructor: '',
                hasSearchedInstructor: false
            }
        },
        computed: {
            checkSearchedInstructor () {
                const me = this
                let result = ''
                if (me.searchedInstructor != '') {
                    result = `${me.searchedInstructor}`
                    me.hasSearchedInstructor = true
                } else {
                    result = 'all instructors '
                }
                return result
            }
        },
        methods: {
            toggleFilter (event) {
                const me = this
                let target = event.target
                let element = document.querySelector('.filter')
                target.parentNode.classList.add('oops')
                if (element.classList.contains('active')) {
                    element.classList.remove('active')
                    target.parentNode.classList.remove('toggled')
                    element.style.height = `0px`
                } else {
                    target.parentNode.classList.add('toggled')
                    setTimeout( () => {
                        element.classList.add('active')
                    }, 250)
                    element.style.height = `${element.scrollHeight + 10}px`
                }
                setTimeout( () => {
                    target.parentNode.classList.remove('oops')
                }, 500)
            },
            resetFilter (type) {
                const me = this
                let elements = document.querySelectorAll('.studio_filter .group')
                switch (type) {
                    case 'studio':
                        me.hasStudioFilter = false
                        break
                    case 'instructor':
                        me.hasSearchedInstructor = false
                        break
                }
                elements.forEach((element, index) => {
                    element.querySelector('.radio').checked = false
                })
                me.studioFilter = 'select a studio'
                me.searchedInstructor = ''
            },
            selectIntructor (data) {
                const me = this
                me.searchedInstructor = data
                me.toggledAutocomplete = false
            },
            toggleStudio (data, type) {
                const me = this
                switch (type) {
                    case 'static':
                        me.studioFilter = 'all studios'
                        break
                    case 'dynamic':
                        me.studioFilter = data.name
                        me.hasStudioFilter = true
                        break
                }
            },
            toggleAutoComplete () {
                const me = this
                me.toggledAutocomplete ^= true
            },
            toggleAutoCompleteOutside () {
                const me = this
                me.toggledAutocomplete = false
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
                    me.current = me.current + (!me.$parent.$parent.isMobile ? 8 : 6)
                }
                me.results = []
                for (let i = 0; i < (!me.$parent.$parent.isMobile ? 7 : 5); i++) {
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
                    me.current = me.current - (!me.$parent.$parent.isMobile ? 8 : 6)
                }
                me.results = []
                for (let i = 0; i < (!me.$parent.$parent.isMobile ? 7 : 5); i++) {
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
                    if (i == (!me.$parent.$parent.isMobile ? 6 : 4)) {
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
                    for (let i = 0; i < (!me.$parent.$parent.isMobile ? 7 : 5); i++) {
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
        mounted () {
            const me = this
            setTimeout( () => {
                me.populateClasses()
            }, 10)
        }
    }
</script>
