<template>
  <v-app-bar>
    <v-toolbar-title @click="$router.push('/')">
      Shopping Website
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="$router.push('/Cart')" class="text-none" stacked>
      <v-badge :content="cartStore.productsTotal" color="error">
        <v-icon> mdi-cart-outline </v-icon>
      </v-badge>
    </v-btn>
    <v-btn @click="cartStore.toogleTheme"
      :prepend-icon="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' "
      
    >
      Toggle Theme
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useCartStore } from "../stores/cart.js";
const cartStore = useCartStore();
console.log(cartStore.theme)
</script>

<style lang="scss" scoped>
</style>