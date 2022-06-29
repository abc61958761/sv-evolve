<template>
  <v-app>
    <!-- <v-app-bar v-if="!$vuetify.display.mobile" app>
    </v-app-bar> -->
    <v-main style="background: #011E33">
      <v-container class="grey lighten-5">
        <router-view />
      </v-container>
    </v-main>
    <v-bottom-navigation class="footer_bar"
      grow
    >
      <v-btn @click="goPage('')">
        <v-icon>mdi-home</v-icon>
        <span>Home</span>
      </v-btn>

      <v-btn @click="goPage('card-list')">
        <v-icon>mdi-cards-outline</v-icon>
        <span>Card</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
  created() {
  },
  methods: {
    goPage(param) {
      this.$router.push(`/${param}`)
    }
  }
}
</script>
<style lang="scss">
.footer_bar {
  background: #011E33!important;
  box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.71), 0px 0px 10px #B0E0E6!important;
  .v-btn {
    color: #ffffff!important;

    &.v-btn--selected {
      color: #B0E0E6!important;
    }
  }
}

</style>
