<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Please choose where we will deduct your credits.</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_custom_checkbox">
                            <div :id="`package_${key}`" :class="`custom_checkbox ${(key == 0) ? 'active' : ''}`" v-for="(classPackage, key) in classPackages" :key="key" @click="togglePackage(classPackage, key)">
                                <label>{{ classPackage.title }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info">
                                    <p>Available: {{ classPackage.available }}</p>
                                    <p>Expires on {{ formatDate(classPackage.expire) }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form_button">
                            <button type="submit" class="default_btn">Select</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                classPackages: [
                    {
                        id: 1,
                        title: '10 Class Package',
                        available: '8',
                        expire: '01/31/2021'
                    },
                    {
                        id: 2,
                        title: 'Monthly Unlimited',
                        available: '∞',
                        expire: '01/31/2021'
                    }
                ],
                selectedPackage: 0
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                if (me.selectedPackage) {
                    me.$store.state.bookerChoosePackageStatus = false
                    document.body.classList.remove('no_scroll')
                }
            },
            togglePackage (data, unique) {
                const me = this
                let formData = new FormData()
                formData.append('class_package_id', data.id)
                me.selectedPackage = data.id
                document.getElementById(`package_${unique}`).classList.add('active')
                me.classPackages.forEach((element, index) => {
                    if (unique != index) {
                        document.getElementById(`package_${index}`).classList.remove('active')
                    }
                })
            },
            formatDate (value) {
                if (value) {
                    return this.$moment(value).format('MMM DD, YYYY')
                }
            },
            toggleClose () {
                const me = this
                me.$store.state.bookerChoosePackageStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
