<template>
  <v-main>
    <v-container fluid>
      <v-app-bar style="background: #dc3d4b; color: white">
        <v-toolbar-title
          style="cursor: pointer"
          class="valorant-font"
          @click="$router.push('/')"
        >
          VMW
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn @click="$router.push('/saved')" class="text-none" stacked>
          <v-badge :content="cartStore.formattedCart.length" color="error">
            <span
              style="font-size: 32px"
              class="mdi mdi-card-account-details-star-outline"
            ></span>
          </v-badge>
        </v-btn>
        <v-btn
          @click="cartStore.toogleTheme"
          :prepend-icon="
            theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
        >
        </v-btn>
      </v-app-bar>
      <v-row>
        <v-col cols="7">
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in products.abilities"
              :key="i"
              :src="products.displayIconSmall"
              cover
            >
              <v-card
                style="
                  background: rgba(0, 0, 0, 0.5);
                  position: absolute;
                  bottom: 3rem;
                  color: white;
                "
              >
                <v-img :src="item.displayIcon" height="100"></v-img>
                <v-card-title>
                  <h2>{{ item.slot }}</h2>
                </v-card-title>
                <v-card-text>
                  <p>{{ item.description }}</p>
                </v-card-text>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="5">
          <v-card>
            <v-img :src="products.fullPortrait" height="400"></v-img>
            <v-card-title>
              <h2>{{ products.displayName }}</h2>
            </v-card-title>
            <v-card-text>
              <p>{{ products.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useCartStore } from "../../stores/cart";
const cartStore = useCartStore();
const route = useRoute();
const products = ref({});
onMounted(() => {
  axios
    .get("https://valorant-api.com/v1/agents/" + route.params.uuid)
    .then((response) => {
      products.value = response.data.data;
      console.log(response.data.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<style></style>
