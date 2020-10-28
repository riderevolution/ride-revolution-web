<template>
    <div class="update_profile">
        <breadcrumb :overlay="false" />
        <section id="content" v-if="loaded">
            <div class="side_menu_tab">
                <div class="left">
                    <h1>Settings</h1>
                    <ul class="side_menu">
                        <li :class="`side_menu_item ${(category == data.unique) ? 'active' : ''}`" @click="toggledTab(key, data.unique)" v-for="(data, key) in tabs" :key="key">
                            <div v-html="data.icon"></div>
                            <div class="item">
                                {{ data.name }}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <update-profile-tab-content ref="updateProfileTab" :category="category" />
                </div>
            </div>
        </section>
        <transition name="fade">
            <complete-profile-prompt v-if="$store.state.completeProfilePromptStatus" />
        </transition>
    </div>
</template>

<script>
    import CompleteProfilePrompt from '../../../components/modals/CompleteProfilePrompt'
    import Breadcrumb from '../../../components/Breadcrumb'
    import UpdateProfileTabContent from '../../../components/UpdateProfileTabContent'
    export default {
        components: {
            CompleteProfilePrompt,
            Breadcrumb,
            UpdateProfileTabContent
        },
        data () {
            return {
                loaded: false,
                tabs: [
                    {
                        name: 'Profile',
                        unique: 'profile-overview',
                        icon: '<svg id="side_icon" class="profile" xmlns="http://www.w3.org/2000/svg" width="17.869" height="17.748" viewBox="0 0 15.977 17.724"><g transform="translate(1 1)"> <path class="a fill" d="M198.5,190.5Z" /> <g class="b" transform="translate(-188.5 -176.327)"> <path class="c" d="M188.5,192.052a6.989,6.989,0,1,1,13.977,0Z" /> <path class="d fill_2" d="M 202.4770202636719 192.051513671875 C 202.4770202636719 188.1915588378906 199.3479919433594 185.0630035400391 195.488525390625 185.0630035400391 C 191.6290283203125 185.0630035400391 188.5 188.1915588378906 188.5 192.051513671875 L 202.4770202636719 192.051513671875 M 203.4770202636719 193.051513671875 L 202.4770202636719 193.051513671875 L 188.5 193.051513671875 L 187.5 193.051513671875 L 187.5 192.051513671875 C 187.5 187.6466369628906 191.0836334228516 184.0630035400391 195.488525390625 184.0630035400391 C 199.8934020996094 184.0630035400391 203.4770202636719 187.6466369628906 203.4770202636719 192.051513671875 L 203.4770202636719 193.051513671875 Z" /> </g> <g class="a fill" transform="translate(4.077)"> <circle class="c" cx="3.203" cy="3.203" r="3.203" /> <circle class="e" cx="3.203" cy="3.203" r="3.703" /> </g> </g> </svg>'
                    },
                    {
                        name: 'Address Book',
                        unique: 'address',
                        icon: '<svg id="side_icon" class="address" xmlns="http://www.w3.org/2000/svg" width="17.869" height="17.748" viewBox="0 0 17.497 17.151"><g transform="translate(0.5 0.5)"> <path class="a fill" d="M603.295,264.046l-.268-.638a.432.432,0,0,1,0-.343,13.882,13.882,0,0,0,.808-2.1l-1.282-1.252a13.789,13.789,0,0,0-2.107.834.436.436,0,0,1-.343.007l-.663-.268a.428.428,0,0,1-.24-.238,14.012,14.012,0,0,0-.945-2.047h-1.81a13.217,13.217,0,0,0-.885,2.044.431.431,0,0,1-.244.249l-.661.268a.439.439,0,0,1-.334,0,14.741,14.741,0,0,0-2.153-.794l-1.28,1.254a13.155,13.155,0,0,0,.849,2.055.434.434,0,0,1,.006.354l-.268.637a.437.437,0,0,1-.244.238,14.88,14.88,0,0,0-2.092.923V267a13.668,13.668,0,0,0,2.089.868.437.437,0,0,1,.253.241l.268.636a.432.432,0,0,1,0,.344,14.077,14.077,0,0,0-.809,2.1l1.282,1.255a14.166,14.166,0,0,0,2.1-.835.436.436,0,0,1,.344-.006l.663.269a.432.432,0,0,1,.241.238,13.885,13.885,0,0,0,.946,2.046h1.81a13.17,13.17,0,0,0,.884-2.044.432.432,0,0,1,.245-.249l.664-.269a.437.437,0,0,1,.334,0,14.906,14.906,0,0,0,2.148.8l1.283-1.254a13.131,13.131,0,0,0-.851-2.055.431.431,0,0,1-.006-.354l.267-.636a.437.437,0,0,1,.244-.238,14.717,14.717,0,0,0,2.093-.926v-1.773a13.792,13.792,0,0,0-2.088-.864A.435.435,0,0,1,603.295,264.046Zm-3.262,2.029a2.645,2.645,0,1,1-2.644-2.586A2.62,2.62,0,0,1,600.033,266.075Z" transform="translate(-589.14 -258)" /> </g> </svg>'
                    },
                    // {
                    //     name: 'One-time Purchase Cards',
                    //     unique: 'card',
                    //     icon: '<svg id="side_icon" class="card" viewBox="0 0 26 26" width="18.869" height="20.748" xmlns="http://www.w3.org/2000/svg"><path d="M23.25,5.0644531H2.75c-0.9648438,0-1.75,0.7851563-1.75,1.75v12.3710938  c0,0.9648438,0.7851563,1.75,1.75,1.75h20.5c0.9648438,0,1.75-0.7851563,1.75-1.75V6.8144531  C25,5.8496094,24.2148438,5.0644531,23.25,5.0644531z M2.75,6.5644531h20.5c0.1376953,0,0.25,0.1123047,0.25,0.25v2.1333008h-21  V6.8144531C2.5,6.6767578,2.6123047,6.5644531,2.75,6.5644531z M23.25,19.4355469H2.75c-0.1376953,0-0.25-0.1123047-0.25-0.25  v-7.2363281h21v7.2363281C23.5,19.3232422,23.3876953,19.4355469,23.25,19.4355469z" class="a fill_2"/></svg>'
                    // },
                    {
                        name: 'Account',
                        unique: 'account-settings',
                        icon: '<svg id="side_icon" class="account" xmlns="http://www.w3.org/2000/svg" width="17.869" height="17.748" viewBox="0 0 17.869 17.748"><path class="a fill" d="M948.206,4929.7l7.885-6.309a.55.55,0,0,1,.686,0l7.885,6.309a.548.548,0,0,1,.206.429v9.308a.549.549,0,0,1-.549.549H959.8a.549.549,0,0,1-.549-.549v-4.524a.549.549,0,0,0-.549-.55h-4.524a.549.549,0,0,0-.549.55v4.524a.549.549,0,0,1-.549.549h-4.524a.549.549,0,0,1-.549-.549v-9.308A.548.548,0,0,1,948.206,4929.7Z" transform="translate(-947.5 -4922.742)" /> </svg>'
                    }
                ],
                category: 'profile-overview'
            }
        },
        methods: {
            toggledTab (key, category) {
                const me = this
                me.category = category
                setTimeout( () => {
                    me.$refs.updateProfileTab.getHeight()
                    me.$refs.updateProfileTab.ctr = 0
                    me.$refs.updateProfileTab.unique = key
                }, 10)
            },
            initialization () {
                const me = this
                let token = me.$cookies.get('70hokc3hhhn5')
                me.loader(true)
                if (token == null || token == undefined) {
                    me.$store.state.loginSignUpStatus = true
                    me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                } else {
                    me.$axios.get('api/check-token', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        if (res.data) {
                            if (res.data.user.new_user == 1) {
                                me.$store.state.completeProfilePromptStatus = true
                            } else {
                                if (me.$route.hash) {
                                    me.category = me.$route.hash.split('#')[1]
                                }
                            }
                            me.loaded = true
                            me.loader(false)
                        }
                    }).catch(err => {
                        me.$store.state.needLogin = true
                        me.$store.state.errorList = err.response.data.errors
                        me.$store.state.errorPromptStatus = true
                        me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                        me.loader(false)
                    })
                }
            }
        },
        mounted () {
            const me = this
            me.initialization()
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `Update Profile | Ride Revolution`,
                link: [
                    {
                        rel: 'nofollow',
                        href: `${host}${me.$route.fullPath}`
                    }
                ]
            }
        }
    }
</script>
