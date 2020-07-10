import Vue from 'vue'

Vue.mixin({
    methods: {
        checkBadges () {
            const me = this
            let token = me.$cookies.get('70hokc3hhhn5')
            if (token != null && token != undefined) {
                me.$axios.get('api/new-badges', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data.badges.length > 0) {
                        me.$store.state.badgePromptStatus = true
                        me.$store.state.badges = res.data.badges
                        document.body.classList.add('no_scroll')
                    }
                })
            }
        },
        scrollAnimate (elementNames) {
            elementNames.forEach((elementName, elementIndex) => {
                if (elementName.single) {
                    let element = document.querySelector(elementName.target)
                    if (element && !element.classList.contains('ov')) {
                        let bounding = element.getBoundingClientRect()
                        if (bounding.bottom > 0 &&
                            bounding.right > 0 &&
                            bounding.left < (window.innerWidth || document.documentElement.clientWidth) &&
                            bounding.top < (window.innerHeight || document.documentElement.clientHeight)) {
                            setTimeout(() => {
                                element.classList.add('ov')
                            }, 350 * elementIndex)
                        }
                    }
                } else {
                    let elements = document.querySelectorAll(elementName.target)
                    elements.forEach((element, elementIndex) => {
                        if (element && !element.classList.contains('ov')) {
                            let bounding = element.getBoundingClientRect()
                            if (bounding.bottom > 0 &&
                                bounding.right > 0 &&
                                bounding.left < (window.innerWidth || document.documentElement.clientWidth) &&
                                bounding.top < (window.innerHeight || document.documentElement.clientHeight)) {
                                setTimeout(() => {
                                    element.classList.add('ov')
                                }, 350 * elementIndex)
                            }
                        }
                    })
                }
            })
        },
        payment (page, paypal_details, type, paymaya = 0) {
            const me = this
            let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
            let formData = new FormData()
            switch (type) {
                case 'class-package':
                    formData.append('type', 'class-package')
                    formData.append('class_package_id', page.res.id)
                    formData.append('price', (page.res.is_promo == 1) ? page.res.discounted_price : page.res.package_price)
                    formData.append('promo_code', page.form.promo)
                    formData.append('quantity', 1)
                    formData.append('discount', page.form.discount)
                    break
                case 'store-credit':
                    formData.append('type', 'store-credit')
                    formData.append('store_credit_id', page.res.id)
                    formData.append('price', page.res.amount)
                    formData.append('quantity', page.form.quantity)
                    break
                case 'digital-gift-card':
                    formData.append('type', 'digital-gift-card')
                    formData.append('class_package_id', page.selectedPackage.id)
                    formData.append('price', (page.selectedPackage.is_promo == 1) ? page.selectedPackage.discounted_price : page.selectedPackage.package_price)
                    formData.append('digital_gift_card_form', JSON.stringify(page.form))
                    formData.append('quantity', 1)
                    formData.append('promo_code', page.form.promo)
                    formData.append('discount', page.form.discount)
                    break
            }
            formData.append('total', page.form.total)
            formData.append('payment_method', page.paymentType)
            formData.append('paymaya', paymaya)
            if (paypal_details != null) {
                formData.append('paypal_details', JSON.stringify(paypal_details))
            }
            me.loader(true)
            me.$axios.post('api/web/pay', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    if (paymaya == 1) {
                        let redirectUrl = res.data.redirectUrl
                        window.location.href = redirectUrl
                    } else {
                        me.$store.state.buyRidesSuccessStatus = true
                    }
                }
            }).catch(err => {
                me.$store.state.errorList = err.response.data.errors
                me.$store.state.errorPromptStatus = true
            }).then(() => {
                page.step = 0
                setTimeout( () => {
                    me.loader(false)
                }, 500)
                me.validateToken()
            })
        },
        sharer (type) {
            let link = location.href
            let shareLink = ''
            switch (type) {
                case 'fb':
                    shareLink = `https://www.facebook.com/sharer/sharer.php?u=${link}`
                    break
                case 'tw':
                    shareLink = `https://twitter.com/home?status=${link}`
                    break
            }
            window.open(shareLink, "shareWindow", "status=1,width=600,height=450")
        },
        randomCode () {
            return Math.random().toString(36).substring(5).toUpperCase()
        },
        randomString () {
            return Math.random().toString(36).substring(2)
        },
        totalItems (value) {
            if (value != 0) {
                return parseFloat(value).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            } else {
                return 0
            }
        },
        totalCount (value) {
            let count = 0
            if (value) {
                count = parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            return count
        },
        notify (action) {
            this.$store.state.notificationMessage = action
            setTimeout( () => {
                this.$store.state.isNotify = true
            }, 500)
            setTimeout( () => {
                this.$store.state.isNotify = false
            }, 2000)
        },
        toJSON (data) {
            if (data) {
                return JSON.parse(JSON.stringify(Object.fromEntries(data)))
            }
        },
        parser (data) {
            if (data) {
                return JSON.parse(data)
            }
        },
        replacer (data) {
            if (data) {
                return data.replace(/\-/g, ' ')
            }
        },
        convertToSlug (data) {
            let slug = ''
            if (data.match(/[!@#$%^&*(){}:;"’'<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g)) {
                slug = data.toLowerCase().replace(/[!@#$%^&*(){}:;"'’<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g, '').replace(/\s/g, '-')
            } else {
                slug = data.toLowerCase().replace(/\s/g, '-')
            }
            return slug
        },
        loader (data) {
            this.$store.state.isLoading = data
            if (data) {
                document.body.classList.add('no_click')
            } else {
                document.body.classList.remove('no_click')
            }
        },
        logout () {
            let token = (this.$route.query.token != null) ? this.$route.query.token : this.$cookies.get('70hokc3hhhn5')
            if (token) {
                this.loader(true)
            }
            this.$axios.post('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                // wala
            }).catch(err => {
                this.loader(false)
                console.log(err)
            }).then(() => {
                this.$cookies.remove('70hokc3hhhn5'
                if (this.$store.state.isAuth) {
                    setTimeout(() => {
                        this.loader(false)
                        window.location.assign('/')
                    }, 500)
                } else {
                    this.$store.state.isAuth = false
                }
            })
        },
        validateToken () {
            return new Promise((resolve, reject) => {
                let token = (this.$route.query.token != null) ? this.$route.query.token : this.$cookies.get('70hokc3hhhn5')
                if (token != null || token != undefined) {
                    this.$axios.get('api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        if (res.data != 0) {
                            this.$store.state.isAuth = true
                            this.$store.state.token = token
                            this.$store.state.user = res.data.user
                        } else {
                            this.logout()
                        }
                    }).catch(err => {
                        console.log(err)
                        this.logout()
                    }).then(() =>{
                        resolve('ok')
                    })
                } else {
                    this.logout()
                }
            })
        },
        async fetchData (apiRoute) {
            const me = this
            await me.validateToken()
            let api = await me.$axios.get(apiRoute)
            return api
        },
        async initFB () {
            await FB.init({
                appId            : '3306202862739419',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.3'
            })
        }
    }
})
