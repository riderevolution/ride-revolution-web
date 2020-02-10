<template>
    <div class="waitlisted_classes fish">
        <section id="banner" class="alt_3">
            <img src="/default/upcoming-classes/upcoming-classes-banner.jpg" />
            <div class="overlay_mid">
                <h1>{{ totalItems(classes.length) }}</h1>
                <h2>Waitlisted Classes</h2>
            </div>
        </section>
        <section id="content">
            <div class="classes">
                <div class="class" v-for="(data, key) in classes" :key="key">
                    <div class="left">
                        <div class="date">{{ $moment().format('MMM D, h:mm A') }}</div>
                        <div class="info">
                            <div class="text">{{ data.class }} with {{ data.instructor }}</div>
                            <div class="divider">|</div>
                            <div class="text">{{ data.studio }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <img src="/icons/filter-close.svg" @click="toggleConfirmation(data)" />
                    </div>
                </div>
            </div>
        </section>
        <transition name="slideXAlt">
            <div class="confirmation" v-if="isConfirmed">
                <div class="wrapper">
                    <h3>Are you sure you want to remove yourself from the waitlist of this class?</h3>
                    <div class="info">
                        <div class="text">{{ $moment().format('MMM D, h:mm A') }}</div>
                        <div class="text">{{ confirmingClass.class }} {{ confirmingClass.instructor }}</div>
                        <div class="text">{{ confirmingClass.studio }}, Place</div>
                    </div>
                    <div class="action">
                        <div class="default_btn_out" @click="checkConfirmation('cancel')"><span>No, Keep Me On</span></div>
                        <div class="default_btn" @click="checkConfirmation('proceed')">Yes, I'm Sure</div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <waitlisted-classes-prompt v-if="$store.state.waitlistedClassesPromptStatus" :message="message" />
        </transition>
    </div>
</template>

<script>
    import WaitlistedClassesPrompt from '../../../components/modals/WaitlistedClassesPrompt'
    export default {
        layout: 'fish',
        components: {
            WaitlistedClassesPrompt
        },
        data () {
            return {
                isConfirmed: false,
                message: '',
                confirmingClass: [],
                classes: [
                    {
                        id: 1,
                        class: 'Ride Rev',
                        instructor: 'Billie Capistrano',
                        studio: 'Greenbelt 5'
                    },
                    {
                        id: 2,
                        class: 'Ride Rev',
                        instructor: 'Billie Capistrano',
                        studio: 'Shangri-la Plaza'
                    },
                    {
                        id: 3,
                        class: 'Ride Rev',
                        instructor: 'Billie Capistrano',
                        studio: 'Kenny Sports Manila'
                    }
                ]
            }
        },
        methods: {
            checkConfirmation (type) {
                const me = this
                switch (type) {
                    case 'proceed':
                        me.loader(true)
                        me.classes.forEach((data, index) => {
                            if (me.confirmingClass.id == data.id) {
                                me.classes.splice(index, 1)
                            }
                        })
                        setTimeout( () => {
                            me.message = 'You have been successfully removed from the waitlist.'
                            me.$store.state.waitlistedClassesPromptStatus = true
                            me.loader(false)
                        }, 500)
                        break
                    case 'cancel':
                        me.isConfirmed = false
                        break
                }
                confirmingClass: []
                me.isConfirmed = false
            },
            toggleConfirmation (data) {
                const me = this
                me.isConfirmed = true
                me.confirmingClass = data
            }
        }
    }
</script>
