<template>
  <v-main class="bg-grey-lighten-2">
    <v-container fluid>
      <v-app-bar style="background: #dc3d4b; color: white">
        <v-toolbar-title
          class="valorant-font"
          style="cursor: pointer"
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
        <v-col cols="12" >
          <v-row class="ml-1 mb-2 mt-1">
            <v-btn @click="grid = !grid" :class="{ 'bg-primary': grid }">
              <v-icon> mdi-view-list </v-icon>
            </v-btn>
            <v-btn
              @click="grid = !grid"
              :class="{ 'bg-primary': !grid }"
              class="ml-3"
            >
              <v-icon> mdi-apps </v-icon>
            </v-btn>
          </v-row>
          <v-row v-show="grid">
            <v-col v-for="(product, i) in filteredProducts" :key="i">
              <v-card
                style="position: relative;background:#DC3D4B;"
                class="pb-2 mx-auto"
                width="296"
                height="400"
              >
                <v-card-title
                  style="
                    display: flex;
                    justify-content: center;
                    font-weight: bold;
                  "
                  class="text-capitalize"
                >
                  {{ product.displayName }}
                </v-card-title>
                <v-img :src="product.displayIcon" height="70%" class="mb-4 mx-auto" cover
                  ><v-card-text
                    :align="center"
                    justify="center"
                    class="z"
                    :style="{ position: 'absolute', top: '5px', right: '10px' }"
                    v-if="product.showDetails"
                  >
                    {{ product.description }}
                  </v-card-text>

                  <v-icon
                    @click="showDetails(i)"
                    :style="{
                      position: 'absolute',
                      bottom: '5px',
                      right: '10px',
                    }"
                    class="icon"
                    >{{
                      product.showDetails
                        ? "mdi-close-circle"
                        : "mdi-check-circle"
                    }}</v-icon
                  >
                </v-img>

                <v-card-actions>
                  <v-btn
                    class="bg-info"
                    @click="$router.push(`/agent/${product.uuid}`)"
                  >
                    Detail
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="bg-primary"
                    @click="cartStore.add(product.uuid)"
                  >
                    Add to Cart
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col v-if="filteredProducts.length == 0" :key="i" cols="12">
              <v-card class="mx-auto pb-2">
                <v-card-title class="text-capitalize"> Empty </v-card-title>

                <v-card-subtitle>Card</v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row
            v-show="!grid"
            v-for="(product, i) in filteredProducts"
            :key="i"
            class="my-4"
            style="background:#DC3D4B;"
          >
            <v-col cols="4">
              <v-img
                @click="$router.push(`/agent/${product.uuid}`)"
                :src="product.displayIcon"
                height="200px"
                cover
              >
                <template v-slot:placeholder>
                  <v-row
                    :align="center"
                    class="fill-height ma-0"
                    justify="center"
                  >
                    <v-progress-circular
                      color="grey lighten-5"
                      indeterminate
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <v-col  cols="8" md="8">
              <v-card-title class="text-capitalize">
                {{ product.displayName }}
              </v-card-title>

              <v-card-text>
                {{ product.description }}
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ml-2 bg-primary"
                  @click="cartStore.add(product.uuid)"
                >
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import axios from "axios";
import { useCartStore } from "../stores/cart";
const cartStore = useCartStore();
const products = ref([]);
const items = ref([]);

const grid = ref(true);
const sortBy = ref("name");
const order = ref("asending");
const name = ref("");
const filteredProducts = computed(() => {
  return products.value.filter((item) => {
    return name.value
      .toLocaleLowerCase()
      .split(" ")
      .every((v) => item.displayName.toLocaleLowerCase().includes(v));
  });
});
onMounted(() => {
  cartStore.fetchProducts();
  axios
    .get("https://valorant-api.com/v1/agents")
    .then((response) => {
      products.value = response.data.data.map((item) => {
        return { ...item, showDetails: false };
      });
      console.log(response.data.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
function showDetails(index) {
  products.value[index].showDetails = !products.value[index].showDetails;
}
</script>

<style>
.z {
  z-index: 1;
  background: #0000005e;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: rgb(240, 234, 234);
  transition: 1000;
  height: 260px;
}
.icon {
  z-index: 9999999999;
  width: 25px;
  height: 25px;
}


.valorant-font {
  font-family: "Valorant Font";
  font-weight: bold;
}
</style>
