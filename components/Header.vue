<template>
  <v-app-bar>
    <v-toolbar-title class="valorant-font" @click="$router.push('/')">
      VMW
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="$router.push('/saved')" class="text-none" stacked>
      <v-badge :content="cartStore.formattedCart.length" color="error">
       <span style="font-size: 32px;" class="mdi mdi-card-account-details-star-outline"></span>
      </v-badge>
    </v-btn>
    <v-btn @click="cartStore.toogleTheme"
      :prepend-icon="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' "
      
    >

    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useCartStore } from "../stores/cart.js";
const cartStore = useCartStore();
console.log(cartStore.theme)
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'Valorant Font';
  src: url('static/fonts/ValorantFont.ttf') format('truetype');
}


.valorant-font {
  font-family: 'Valorant Font';
  font-weight: bold;
}
</style>