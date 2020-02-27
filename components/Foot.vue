<template>
    <div id="footer">
        <div class="logo">
            <img src="/footer-logo.svg" />
        </div>
        <a class="footer_sitemap" @click="toggleSitemap()" v-if="$parent.isMobile">
            <label>Show Sitemap <img src="/icons/back-arrow-icon.svg" /></label>
        </a>
        <div class="footer_link">
            <h3>In Studio</h3>
            <ul>
                <li><nuxt-link rel="canonical" to="/riders-guide" class="footer_item">Rider's Guide</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/buy-rides" class="footer_item">Buy Rides</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/riders-guide" class="footer_item">Class Schedules</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/instructors" class="footer_item">Instructors</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/studios" class="footer_item">Studio</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/ride-rewards" class="footer_item">Ride Rewards</nuxt-link></li>
            </ul>
        </div>
        <div class="footer_link">
            <h3>Services</h3>
            <ul>
                <li><nuxt-link rel="canonical" to="/faqs" class="footer_item">FAQ's</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/contact-us" class="footer_item">Contact Us</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/news" class="footer_item">News</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/promos" class="footer_item">Promos</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/privacy-policy" class="footer_item">Privacy Policy</nuxt-link></li>
                <li><nuxt-link rel="canonical" to="/terms-and-conditions" class="footer_item">Terms &amp; Conditions</nuxt-link></li>
            </ul>
        </div>
        <div class="footer_link alt">
            <h3>Let's Stay in Touch</h3>
            <div class="social_links">
                <h4>Follow Us</h4>
                <a href="javascript:void(0)" class="fb">fb</a>
                <a href="javascript:void(0)" class="ig">ig</a>
            </div>
            <p>Email an expert at <a href="javascript:void(0)">hello@riderev.com</a></p>
            <p>or call/text us at <a href="javascript:void(0)">(02) 798-7447</a></p>
        </div>
        <div class="back_to_top" @click="backToTop()">
            <img src="/icons/back-to-top-icon.svg" />
            <span v-if="!$parent.isMobile">Back to Top</span>
        </div>
    </div>
</template>

<script>
    export default {
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
            }
        }
    }
</script>
