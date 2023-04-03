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

        <v-card class="mx-auto" color="transparent" width="400">
          <v-card-text>
            <v-text-field
              v-model="name"
              density="compact"
              variant="solo"
              label="Search agent"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              @click:append-inner="onClick"
              bg-color="transparent"
              style="border: 2px solid white; border-radius: 5px; color: white"
            ></v-text-field>
          </v-card-text>
        </v-card>

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
        <v-col md="12">
          <v-card-title class="mb-5"> My Card </v-card-title>
          <v-card
            class="py-5 px-4"
            v-if="cartStore.formattedCart.length"
            style="max-height: 500px; overflow-y: auto"
          >
            <v-card-text>
              <div
                v-for="item in filteredProducts"
                :key="item.uuid"
                class="mb-3"
              >
                <v-row>
                  <v-col sm="2">
                    <div class="d-flex align-center no-wrap">
                      <img
                        style="max-width: 200px"
                        :src="item.displayIcon"
                      />
                      <h3 class="text-capitalize ml-3">
                        {{ item.displayName }}
                      </h3>
                    </div>
                  </v-col>
                  <v-col sm="10">
                    <div
                      class="d-flex justify-space-between align-center no-wrap w-full h-100"
                    >
                      <div
                        class="d-flex align-center mr-12 bg-primary px-4 py-4 rounded"
                      >
                        {{ item.description }}
                      </div>

                      <v-btn @click="cartStore.removeProduct(item.uuid)" icon>
                        <v-icon color="red"> mdi-delete </v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
          <v-card
            style="
              height: 350px;
              justify-content: center;
              align-items: center;
              gap: 3rem;
            "
            class="d-flex"
            v-if="filteredProducts.length == 0"
          >
            <v-btn
              class=""
              @click="$router.push('/')"
              color="#DC3D4B"
              style="color: white"
            >
              Your card is empty. Fill it
            </v-btn>
            <img style="height: 80%; object-fit: cover" src="../Group.png" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { useCartStore } from "../stores/cart.js";
const cartStore = useCartStore();
const name = ref("");
console.log(cartStore.formattedCart);
const filteredProducts = computed(() => {
  return cartStore.formattedCart.filter((item) => {
    return name.value
      .toLocaleLowerCase()
      .split(" ")
      .every((v) => item.displayName.toLocaleLowerCase().includes(v));
  });
});
</script>

<style lang="scss" scoped></style>
