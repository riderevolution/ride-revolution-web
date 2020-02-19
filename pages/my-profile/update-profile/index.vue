<template>
    <div class="update_profile">
        <breadcrumb :overlay="false" />
        <section id="content">
            <div class="side_menu_tab">
                <div class="left">
                    <h1>Update Profile</h1>
                    <ul class="side_menu">
                        <li :class="`side_menu_item ${(category == 'profile-overview') ? 'active' : ''}`" @click="toggledTab(0, 'profile-overview')">
                            <svg id="side_icon" xmlns="http://www.w3.org/2000/svg" width="17.869" height="17.748" viewBox="0 0 15.977 17.724"> <defs> <style>.a,.b,.e{fill:none;}.a,.b{stroke-miterlimit:10;}.c,.d{stroke:none;}</style> </defs> <g transform="translate(1 1)"> <path class="a fill" d="M198.5,190.5Z" /> <g class="b" transform="translate(-188.5 -176.327)"> <path class="c" d="M188.5,192.052a6.989,6.989,0,1,1,13.977,0Z" /> <path class="d fill_2" d="M 202.4770202636719 192.051513671875 C 202.4770202636719 188.1915588378906 199.3479919433594 185.0630035400391 195.488525390625 185.0630035400391 C 191.6290283203125 185.0630035400391 188.5 188.1915588378906 188.5 192.051513671875 L 202.4770202636719 192.051513671875 M 203.4770202636719 193.051513671875 L 202.4770202636719 193.051513671875 L 188.5 193.051513671875 L 187.5 193.051513671875 L 187.5 192.051513671875 C 187.5 187.6466369628906 191.0836334228516 184.0630035400391 195.488525390625 184.0630035400391 C 199.8934020996094 184.0630035400391 203.4770202636719 187.6466369628906 203.4770202636719 192.051513671875 L 203.4770202636719 193.051513671875 Z" /> </g> <g class="a fill" transform="translate(4.077)"> <circle class="c" cx="3.203" cy="3.203" r="3.203" /> <circle class="e" cx="3.203" cy="3.203" r="3.703" /> </g> </g> </svg>
                            <div class="item">
                                Profile Overview
                            </div>
                        </li>
                        <li :class="`side_menu_item ${(category == 'address') ? 'active' : ''}`" @click="toggledTab(1, 'address')">
                            <svg id="side_icon" xmlns="http://www.w3.org/2000/svg" width="17.869" height="17.748" viewBox="0 0 17.497 17.151"> <defs> <style>.a{fill:none;stroke-linecap:round;stroke-miterlimit:10;}</style> </defs> <g transform="translate(0.5 0.5)"> <path class="a fill" d="M603.295,264.046l-.268-.638a.432.432,0,0,1,0-.343,13.882,13.882,0,0,0,.808-2.1l-1.282-1.252a13.789,13.789,0,0,0-2.107.834.436.436,0,0,1-.343.007l-.663-.268a.428.428,0,0,1-.24-.238,14.012,14.012,0,0,0-.945-2.047h-1.81a13.217,13.217,0,0,0-.885,2.044.431.431,0,0,1-.244.249l-.661.268a.439.439,0,0,1-.334,0,14.741,14.741,0,0,0-2.153-.794l-1.28,1.254a13.155,13.155,0,0,0,.849,2.055.434.434,0,0,1,.006.354l-.268.637a.437.437,0,0,1-.244.238,14.88,14.88,0,0,0-2.092.923V267a13.668,13.668,0,0,0,2.089.868.437.437,0,0,1,.253.241l.268.636a.432.432,0,0,1,0,.344,14.077,14.077,0,0,0-.809,2.1l1.282,1.255a14.166,14.166,0,0,0,2.1-.835.436.436,0,0,1,.344-.006l.663.269a.432.432,0,0,1,.241.238,13.885,13.885,0,0,0,.946,2.046h1.81a13.17,13.17,0,0,0,.884-2.044.432.432,0,0,1,.245-.249l.664-.269a.437.437,0,0,1,.334,0,14.906,14.906,0,0,0,2.148.8l1.283-1.254a13.131,13.131,0,0,0-.851-2.055.431.431,0,0,1-.006-.354l.267-.636a.437.437,0,0,1,.244-.238,14.717,14.717,0,0,0,2.093-.926v-1.773a13.792,13.792,0,0,0-2.088-.864A.435.435,0,0,1,603.295,264.046Zm-3.262,2.029a2.645,2.645,0,1,1-2.644-2.586A2.62,2.62,0,0,1,600.033,266.075Z" transform="translate(-589.14 -258)" /> </g> </svg>
                            <div class="item">
                                Address
                            </div>
                        </li>
                        <li :class="`side_menu_item ${(category == 'account-settings') ? 'active' : ''}`" @click="toggledTab(2, 'account-settings')">
                            <svg id="side_icon" xmlns="http://www.w3.org/2000/svg" width="17.869" height="17.748" viewBox="0 0 17.869 17.748"> <defs> <style>.a{fill:none;}</style> </defs> <path class="a fill" d="M948.206,4929.7l7.885-6.309a.55.55,0,0,1,.686,0l7.885,6.309a.548.548,0,0,1,.206.429v9.308a.549.549,0,0,1-.549.549H959.8a.549.549,0,0,1-.549-.549v-4.524a.549.549,0,0,0-.549-.55h-4.524a.549.549,0,0,0-.549.55v4.524a.549.549,0,0,1-.549.549h-4.524a.549.549,0,0,1-.549-.549v-9.308A.548.548,0,0,1,948.206,4929.7Z" transform="translate(-947.5 -4922.742)" /> </svg>
                            <div class="item">
                                Account Settings
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <update-profile-tab-content ref="updateProfileTab" :category="category" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    import UpdateProfileTabContent from '../../../components/UpdateProfileTabContent'
    export default {
        components: {
            Breadcrumb,
            UpdateProfileTabContent
        },
        data () {
            return {
                category: 'profile-overview'
            }
        },
        methods: {
            toggledTab (key, category) {
                const me = this
                me.category = category
                setTimeout( () => {
                    me.$refs.updateProfileTab.getHeight()
                    me.$refs.updateProfileTab.unique = key
                }, 10)
            }
        }
    }
</script>
