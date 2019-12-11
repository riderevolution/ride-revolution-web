<template>
    <div class="instructors">
        <div class="instructors_nav">
            <div :class="`left ${(toggled) ? 'active' : ''}`" @click="toggleSpecialization()">
                <div class="select" v-click-outside="outsideSpecialization">
                    <label class="label">
                        Specialization
                        <div class="count">
                            <span>{{ count }}</span>
                        </div>
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
        </div>
        <breadcrumb :hasPadding="true" />
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
            }
        },
        methods: {
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
