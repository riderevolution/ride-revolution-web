<template>
    <div id="footer">
        <div class="logo">
            <img src="/footer-logo.svg" />
        </div>
        <div class="footer_sitemap">
            <label @click="toggleSitemap($event)">Show Sitemap <img src="/icons/back-arrow-icon.svg" /></label>
        </div>
        <div class="footer_link">
            <h3>In Studio</h3>
            <ul>
                <li><a href="javascript:void(0)" class="footer_item">Rider's Guide</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Buy Credits</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Class Schedules</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Instructors</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Studio</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Ride Rewards</a></li>
            </ul>
        </div>
        <div class="footer_link">
            <h3>Services</h3>
            <ul>
                <li><a href="javascript:void(0)" class="footer_item">FAQ's</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Contact Us</a></li>
                <li><a href="javascript:void(0)" class="footer_item">News</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Shop</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Privacy Policy</a></li>
                <li><a href="javascript:void(0)" class="footer_item">Terms &amp; Conditions</a></li>
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
            toggleSitemap (event) {
                const me = this
                let target = event.target
                let elements = document.querySelectorAll('#footer .footer_link')
                target.parentNode.classList.add('oops')
                elements.forEach((element, index) => {
                    if (!element.classList.contains('alt')) {
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
                    }
                })
                setTimeout( () => {
                    target.parentNode.classList.remove('oops')
                }, 500)
            },
            backToTop () {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }
</script>
