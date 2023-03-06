<template>
  <div class="default_modal alt">
    <div class="background" @click.once="toggleClose()"></div>
    <div class="confirmation_wrapper">
      <div class="form_close" @click="toggleClose()"></div>
      <!-- <div class="confirmation_image">
        <img src="/default/meme/success-meme.jpg"/>
      </div> -->
      <div class="confirmation_text">
        Success! You have updated your health waiver.
      </div>
      <div class="button_group alt">
        <div class="flex default_btn" @click.once="toggleClose()">
          Got It!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      toggleClose() {
        const me = this

        me.$store.state.healthWaiver = false
        me.$store.state.healthWaiverSuccess = false
        document.body.classList.remove('no_scroll')

        setTimeout(() => {
          if (me.$store.state.lastRoute != '') {
            me.$router.push(me.$store.state.lastRoute)
          } else {
            location.reload()
          }
        }, 500)
      }
    }
  }
</script>
