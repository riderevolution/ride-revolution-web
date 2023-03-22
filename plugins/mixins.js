import Vue from 'vue'

Vue.mixin({
    methods: {
        debugger (payload, route) {
            this.$axios.$post('api/extras/debug', {
                text: `${route} | ${payload}`
            })
        },
        cardType (data) {
            const me = this
            let card_type = ''

            switch (data.cardType) {
                case 'visa':
                    card_type = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="19" viewBox="0 0 60 19"> <g fill="none" fill-rule="evenodd"> <g fill-rule="nonzero"> <g> <g> <g> <path fill="#3C58BF" d="M21.6 17.462L24.592 0.631 29.268 0.631 26.369 17.462z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#293688" d="M21.6 17.462L25.434 0.631 29.268 0.631 26.369 17.462z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#3C58BF" d="M43.294.818C42.358.444 40.862.07 38.992.07c-4.675 0-8.041 2.338-8.041 5.704 0 2.525 2.337 3.834 4.207 4.675 1.87.842 2.432 1.403 2.432 2.151 0 1.122-1.496 1.683-2.806 1.683-1.87 0-2.898-.28-4.488-.935l-.654-.28-.655 3.833c1.122.468 3.18.935 5.33.935 4.956 0 8.228-2.337 8.228-5.89 0-1.964-1.215-3.46-4.02-4.676-1.683-.841-2.712-1.309-2.712-2.15 0-.749.842-1.497 2.712-1.497 1.59 0 2.711.28 3.553.655l.467.187.749-3.647z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#293688" d="M43.294.818C42.358.444 40.862.07 38.992.07c-4.675 0-7.2 2.338-7.2 5.704 0 2.525 1.496 3.834 3.366 4.675 1.87.842 2.432 1.403 2.432 2.151 0 1.122-1.496 1.683-2.806 1.683-1.87 0-2.898-.28-4.488-.935l-.654-.28-.655 3.833c1.122.468 3.18.935 5.33.935 4.956 0 8.228-2.337 8.228-5.89 0-1.964-1.215-3.46-4.02-4.676-1.683-.841-2.712-1.309-2.712-2.15 0-.749.842-1.497 2.712-1.497 1.59 0 2.711.28 3.553.655l.467.187.749-3.647z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#3C58BF" d="M51.335.631c-1.122 0-1.964.094-2.431 1.216L41.89 17.462h5.05l.934-2.805h5.985l.56 2.805h4.49L54.981.632h-3.647zm-2.15 11.22c.28-.84 1.87-4.955 1.87-4.955s.374-1.028.654-1.683l.28 1.59s.936 4.207 1.123 5.142h-3.928v-.093z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#293688" d="M52.457.631c-1.122 0-1.963.094-2.431 1.216l-8.135 15.615h5.05l.934-2.805h5.985l.56 2.805h4.49L54.981.632h-2.525zm-3.273 11.22c.374-.934 1.87-4.955 1.87-4.955s.375-1.028.655-1.683l.28 1.59s.936 4.207 1.123 5.142h-3.928v-.093z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#3C58BF" d="M12.997 12.413l-.467-2.431c-.842-2.805-3.553-5.891-6.546-7.387l4.208 14.96h5.05L22.816.726h-5.05l-4.769 11.688z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#293688" d="M12.997 12.413l-.467-2.431c-.842-2.805-3.553-5.891-6.546-7.387l4.208 14.96h5.05L22.816.726H18.7l-5.704 11.688z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#FFBC00" d="M0 .631l.842.187C6.826 2.221 10.94 5.774 12.53 9.982l-1.683-7.948C10.567.912 9.725.63 8.697.63H0z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#F7981D" d="M0 .631c5.984 1.403 10.94 5.05 12.53 9.257L10.94 3.25c-.28-1.122-1.215-1.776-2.244-1.776L0 .63z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <path fill="#ED7C00" d="M0 .631c5.984 1.403 10.94 5.05 12.53 9.257l-1.122-3.646c-.28-1.123-.655-2.245-1.964-2.712L0 .63z" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41)"/> <g fill="#051244"> <path d="M11.595 9.397l-3.18-3.179L6.92 9.771l-.374-2.337C5.704 4.629 2.992 1.543 0 .047l4.208 14.96h5.05l2.337-5.61zM20.291 15.008L16.27 10.894 15.522 15.008zM31.044 9.21c.374.374.561.655.468 1.029 0 1.122-1.496 1.683-2.806 1.683-1.87 0-2.898-.28-4.488-.935l-.654-.28-.655 3.833c1.122.468 3.18.935 5.33.935 2.992 0 5.423-.841 6.826-2.337l-4.02-3.928zM36.468 15.008h4.394l.935-2.805h5.985l.56 2.805h4.49l-1.59-6.826-5.61-5.424.28 1.497s.935 4.207 1.122 5.142h-3.928c.375-.935 1.87-4.955 1.87-4.955s.375-1.029.655-1.684" transform="translate(-212 -720) translate(146 300) translate(43 379) translate(23 41) translate(6.078 2.455)"/> </g> </g> </g> </g> </g> </g> </svg>'
                    break
                case 'master-card':
                    card_type = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="32" viewBox="0 0 50 32"> <g fill="none" fill-rule="evenodd"> <g fill-rule="nonzero"> <g> <g> <g> <g transform="translate(-212 -511) translate(146 300) translate(43 146) translate(0 33) translate(23 32)"> <circle cx="15.4" cy="16.131" r="15.273" fill="#EE0005"/> <circle cx="34.376" cy="16.131" r="15.273" fill="#F9A000"/> <path fill="#FF6300" d="M19.103 16.13c0 4.85 2.26 9.171 5.785 11.969 3.525-2.798 5.786-7.119 5.786-11.968 0-4.85-2.261-9.171-5.786-11.969-3.524 2.798-5.785 7.12-5.785 11.969z"/> </g> </g> </g> </g> </g> </g> </svg>'
                    break
            }

            return card_type
        },
        properFormat (value) {
            let newValue = value.split('The ')[1].split(' field')[0].split('.')
            if (newValue.length > 1) {
                newValue = newValue[1].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                }
            } else {
                newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
            }
            let message = value.split('The ')[1].split(' field')
            if (message.length > 1) {
                message = message[1]
                return `The ${newValue} field${message}`
            } else {
                if (message[0].split('file').length > 1) {
                    message = message[0].split('file')[1]
                    return `The ${newValue} field${message}`
                } else {
                    if (message[0].split('image').length > 1) {
                        message = message[0].split('image[]')[1]
                        return `The ${newValue} ${message}`
                    } else {
                        return `The ${newValue}`
                    }
                }
            }
        },
        parseInputToDate (target) {
            const me = this
            let lastValue = ''
            let value = target.split('-').join('')
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join('-')
                let valueArrayChecker = value.split('-')
                if (valueArrayChecker[1]) {
                    if (valueArrayChecker[1].length > 0) {
                        value = value.split('-')
                        lastValue = `${value[0]}-`
                        lastValue += value[1].match(new RegExp('.{1,2}', 'g')).join('-')
                    }
                } else {
                    lastValue = value
                }
            }
            return lastValue
        },
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
        paypalSubscribe (page, type, paypal_details) {
            const me = this
            let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
            me.validateToken()
            let formData = new FormData()

            formData.append('type', 'class-package')
            formData.append('class_package_id', page.res.id)
            formData.append('price', (page.res.is_promo == 1) ? page.res.discounted_price : page.res.package_price)
            formData.append('promo_code', page.form.promo)
            formData.append('quantity', page.form.quantity)
            formData.append('discount', page.form.discount)
            formData.append('is_paypal_subscription', 1)
            formData.append('paymaya_token_id', 0)

            formData.append('total', page.form.total)
            formData.append('payment_method', 'paypal')

            formData.append('paypal_subscription_details', JSON.stringify(paypal_details))

      			if (page.promoApplied) {
      				formData.append('promo_applied', page.promoApplied)
      			}

            if (me.$store.state.inApp) {
                formData.append('in_app', 1)
            }

            me.loader(true)
            me.$axios.post('api/web/pay', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    setTimeout( () => {
                        page.step = 0
                        me.$store.state.buyRidesSuccessStatus = true
                    }, 500)
                }
            }).catch(err => {
                me.debugger(`${JSON.stringify(err)} <> ${JSON.stringify(err.response)}`, 'plugins/mixins.js(paypalSubscribe)')
                if (err.response.data && err.response.data.errors) {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                }
            }).then(() => {
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            })
        },
        ncPay (page, type) {
            const me = this
            let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
            me.validateToken()
            let formData = new FormData()
            switch (type) {
                case 'class-package':
                    formData.append('type', 'class-package')
                    formData.append('class_package_id', page.res.id)
                    formData.append('price', (page.res.is_promo == 1) ? page.res.discounted_price : page.res.package_price)
                    formData.append('promo_code', page.form.promo)
                    formData.append('quantity', page.form.quantity)
                    formData.append('discount', page.form.discount)
                    break
                case 'store-credit-page':
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
            formData.append('paymaya_token_id', 0)

            if (page.promoApplied) {
                formData.append('promo_applied', page.promoApplied)
            }

            if (me.$store.state.inApp) {
                formData.append('in_app', 1)
            }
            me.loader(true)
            me.$axios.post('api/web/nc-pay', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    setTimeout( () => {
                        page.step = 0
                        me.$store.state.buyRidesSuccessStatus = true
                    }, 500)
                }
            }).catch(err => {
                me.debugger(`${JSON.stringify(err)} <> ${JSON.stringify(err.response)}`, 'plugins/mixins.js(ncPay)')
                if (err.response.data && err.response.data.errors) {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                }
            }).then(() => {
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            })
        },
        payment (page, paypal_details, type, paymaya_token_id = 0, paymaya_extra_user_details = null, isPaymongo = false) {
            const me = this
            let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
            me.validateToken()
            let formData = new FormData()
            switch (type) {
                case 'class-package':
                    formData.append('type', 'class-package')
                    formData.append('class_package_id', page.res.id)
                    formData.append('price', (page.res.is_promo == 1) ? page.res.discounted_price : page.res.package_price)
                    formData.append('promo_code', page.form.promo)
                    formData.append('quantity', page.form.quantity)
                    formData.append('discount', page.form.discount)
                    break
                case 'store-credit-page':
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
            formData.append('paymaya_token_id', paymaya_token_id)

            if (isPaymongo) {
                formData.append('paymongo_source_id', page.paymongoData.id)
                formData.append('paymongo_source_type', page.paymongoData.type)
                formData.append('save_payment_source', 1)
            }

            if (page.promoApplied) {
                formData.append('promo_applied', page.promoApplied)
            }

            if (paymaya_extra_user_details != null) {
                formData.append('contact_number', paymaya_extra_user_details.contact_number)
                formData.append('sex', paymaya_extra_user_details.sex)
            }

            if (paymaya_token_id != 0) {
                formData.append('summary', JSON.stringify(page.summary))
            }
            if (paypal_details != null) {
                formData.append('paypal_details', JSON.stringify(paypal_details))
            }
            if (me.$store.state.inApp) {
                formData.append('in_app', 1)
            }
            me.loader(true)
            me.$axios.post('api/web/pay', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    setTimeout( () => {
                        if (paymaya_token_id != 0) {
                            location.href = res.data.verificationUrl
                        } else {
                            if (isPaymongo) {
                                location.href = page.paymongoData.attributes.redirect.checkout_url
                            }

                            page.step = 0
                            me.$store.state.buyRidesSuccessStatus = true
                        }
                    }, 500)
                }
            }).catch(err => {
                me.debugger(`${JSON.stringify(err)} <> ${JSON.stringify(err.response)}`, 'plugins/mixins.js(payment)')
                if (err.response.data && err.response.data.errors) {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                }
            }).then(() => {
                setTimeout( () => {
                    me.loader(false)
                }, 500)
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
                this.$axios.post('/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    this.$cookies.remove('70hokc3hhhn5')
                    if (this.$store.state.isAuth) {
                        setTimeout(() => {
                            this.loader(false)
                            window.location.assign('/')
                        }, 500)
                    } else {
                        this.$store.state.isAuth = false
                    }
                })
            }
        },
        validateToken () {
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
                        if (res.data.user) {
                            this.$store.state.user = res.data.user
                        }
                    } else {
                        this.logout()
                    }
                }).catch(err => {
                    this.debugger(err.response)
                    this.logout()
                })
            } else {
                this.logout()
            }
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
