<template>
  <v-main class="bg-grey-lighten-2">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="2">
          <v-card class="py-2 px-3">
            <v-text-field
              placeholder="Search Product..."
              v-model="name"
            ></v-text-field>
          </v-card>
        </v-col>

        <v-col cols="12" md="10">
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
            <v-col
              v-for="(product, i) in filteredProducts"
              :key="i"
              cols="12"
              lg="3"
              sm="4"
              md="4"
            >
              <v-card
                style="position: relative"
                class="mx-auto pb-2"
                max-width="244"
              >
                <v-card-title
                  style="
                    display: flex;
                    justify-content: center;
                    font-weight: bold;"
                  
                  class="text-capitalize"
                >
                  {{ product.displayName }}
                </v-card-title>
                <v-img @click="$router.push(`/agent/${product.uuid}`)" :src="product.displayIcon" height="200px" cover
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
                <v-card-title class="text-capitalize">
                  Burası Boş
                </v-card-title>

                <v-card-subtitle>Burası</v-card-subtitle>
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
          >
            <v-col cols="4">
              <v-img :src="product.displayIcon" height="200px" cover>
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
            <v-col cols="8" md="8">
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
import data from "../data";
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
  height: 190px;
}
.icon {
  z-index: 9999999999;

  width: 25px;
  height: 25px;
}
</style>
