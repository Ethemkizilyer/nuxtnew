<template>
  <v-main>
      <v-container fluid>
        
    <v-row>
       <v-col cols="3" >
          <v-card class="py-2 px-3">
            <v-text-field placeholder="Search Product..." v-model="name"></v-text-field>
 
          </v-card>
        </v-col>
      <v-col md="10">
        <v-card class="py-5 px-4" style="max-height: 500px; overflow-y: auto">
          <v-card-title class="mb-5"> My Cart </v-card-title>
          <v-card-text v-if="cartStore.formattedCart.length">
            <div v-for="item in filteredProducts" :key="item.uuid" class="mb-3">
              <v-row>
                <v-col sm="4">
                  <div class="d-flex align-center no-wrap">
                    <img
                      style="width: 90px; height: 90px; object-fit: cover"
                      :src="item.displayIcon"
                    />
                    <h3 class="text-capitalize ml-3">
                      {{ item.displayName }}
                    </h3>
                  </div>
                </v-col>
                <v-col sm="8">
                  <div
                    class="d-flex justify-space-between align-center no-wrap w-full h-100"
                  >
                    <div class="d-flex align-center bg-primary rounded">
                      <!-- <span
                        class="icon d-flex align-center pa-3"
                        style="cursor: pointer"
                        @click="cartStore.add(item.id)"
                      >
                        <v-icon> mdi-plus </v-icon>
                      </span>
                      <span class="number d-flex align-center pa-3 ">
                        {{ item.quantity }}
                      </span>
                      <span
                        style="cursor: pointer"
                        class="icon d-flex align-center pa-3"
                        @click="cartStore.remove(item.id)"
                      >
                        <v-icon> mdi-minus </v-icon>
                      </span> -->
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
          <v-card-text class="text-center" v-if="filteredProducts.length == 0">
            <v-btn class="mx-auto" @click="$router.push('/')" color="primary">
              Your cart is empty. Fill it
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
   
    </v-row>
  </v-container>
  </v-main>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js';
const cartStore = useCartStore();
const name = ref('')
console.log(cartStore.formattedCart)
const filteredProducts= computed(()=>{
  return cartStore.formattedCart.filter((item)=>{
    return name.value.toLocaleLowerCase().split(" ").every((v)=>item.displayName.toLocaleLowerCase().includes(v))
  })
})
</script>

<style lang="scss" scoped></style>