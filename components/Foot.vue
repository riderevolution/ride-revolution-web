<template>
    <div id="footer">
        <div class="logo">
            <img src="/footer-logo.svg" />
        </div>
        <a class="footer_sitemap" @click="toggleSitemap()" v-if="isMobile">
            <label>Show Sitemap <img src="/icons/back-arrow-icon.svg" /></label>
        </a>
        <div class="footer_link">
            <h3>In Studio</h3>
            <ul itemscope itemtype="https://schema.org/SiteNavigationElement">
                <meta itemprop="name" content="Footer Menu In Studio">
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/riders-guide" class="footer_item">Rider's Guide</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/buy-rides" class="footer_item">Buy Rides</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/book-a-bike" class="footer_item">Book a Bike</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/instructors" class="footer_item">Instructors</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/studios" class="footer_item">Studio</nuxt-link></li>
            </ul>
        </div>
        <div class="footer_link">
            <h3>About</h3>
            <ul itemscope itemtype="https://schema.org/SiteNavigationElement">
                <meta itemprop="name" content="Footer Menu About">
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/faqs" class="footer_item">FAQ's</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/contact-us" class="footer_item">Contact Us</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/news" class="footer_item">News</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/promos" class="footer_item">Promos</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/privacy-policy" class="footer_item">Privacy Policy</nuxt-link></li>
                <li itemprop="name"><nuxt-link rel="canonical" itemprop="url" to="/terms-and-conditions" class="footer_item">Terms &amp; Conditions</nuxt-link></li>
            </ul>
        </div>
        <div class="footer_link">
            <h3>Services</h3>
            <ul itemscope itemtype="https://schema.org/SiteNavigationElement">
                <meta itemprop="name" content="Footer Menu Services">
                <li itemprop="name"><a href="https://shop.riderevolution.ph/" class="footer_item" itemprop="name">Shop</a></li>
                <li itemprop="name"><a href="https://ondemand.riderevolution.ph/" class="footer_item" itemprop="name">On Demand</a></li>
            </ul>
        </div>
        <div class="footer_link alt">
            <h3>Let's Stay in Touch</h3>
            <div class="social_links">
                <h4>Follow Us</h4>
                <a href="https://www.facebook.com/riderevolutionph" target="_blank" class="fb">fb</a>
                <a href="https://www.instagram.com/riderevolution" target="_blank" class="ig">ig</a>
            </div>
            <p>Email an expert at <a href="mailto:hello@riderevolution.ph">hello@riderevolution.ph</a></p>
            <!-- <p>or call/text us at <a href="tel:02-798-7447">(02) 798-7447</a></p> -->
        </div>
        <div class="back_to_top" @click="backToTop()">
            <img src="/icons/back-to-top-icon.svg" />
            <span v-if="!isMobile">Back to Top</span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isMobile: false
            }
        },
        methods: {
            toggleSitemap () {
                const me = this
                let target = document.querySelector('.footer_sitemap')
                let elements = document.querySelectorAll('#footer .footer_link')
                target.classList.add('oops')
                elements.forEach((element, index) => {
                    if (!element.classList.contains('alt')) {
                        if (element.classList.contains('active')) {
                            element.classList.remove('active')
                            target.classList.remove('toggled')
                            element.style.height = `0px`
                        } else {
                            target.classList.add('toggled')
                            setTimeout( () => {
                                element.classList.add('active')
                            }, 250)
                            element.style.height = `${element.scrollHeight + 10}px`
                        }
                    }
                })
                setTimeout( () => {
                    target.classList.remove('oops')
                }, 500)
            },
            backToTop () {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            },
            onResize() {
                const me = this
                if (document.documentElement && document.documentElement.clientWidth) {
                    if (document.documentElement.clientWidth <= 1024) {
                        me.isMobile = true
                    } else {
                        me.isMobile = false
                    }
                }
            }
        },
        mounted () {
            const me = this
            me.onResize()
        },
        beforeMount () {
            window.addEventListener('load', this.onResize)
            window.addEventListener('resize', this.onResize)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.onResize)
            window.removeEventListener('load', this.onResize)
        }
    }
</script>
