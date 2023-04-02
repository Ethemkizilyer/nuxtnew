import { defineStore } from "pinia";
import axios from "axios";
// import products from "~~/data";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartContent: {},
    theme: "light",
    products: [],
  }),
  getters: {
    formattedCart() {
      return Object.keys(this.cartContent).map((productId) => {
        const product = this.cartContent[productId];
        return {
          uuid: product.productId,
          displayIcon: this.products.find((p) => p.uuid === product.productId)
            .displayIcon,
          displayName: this.products.find((p) => p.uuid === product.productId)
            .displayName,
          description: this.products.find((p) => p.uuid === product.productId)
            .description,
          // price: products.find((p) => p.uuid === product.productId).price,
          quantity: product.quantity,
          // cost:
          //   product.quantity *
          //   products.find((p) => p.id === product.productId).price,
        };
      });
    },
    total() {
      return Object.keys(this.cartContent).reduce((acc, id) => {
        const product = this.products.find((p) => p.uuid === id);
        if (product) {
          return acc + product.price * this.cartContent[id].quantity;
        }
        return acc + 0;
      }, 0);
    },
    productsTotal() {
      return Object.keys(this.cartContent).reduce((acc, id) => {
        return acc + this.cartContent[id].quantity;
      }, 0);
    },
    getTheme() {
      return this.theme;
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get("https://valorant-api.com/v1/agents");
        this.products = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    add(productId) {
      if (this.cartContent.hasOwnProperty(productId)) {
        this.cartContent[productId] = {
          productId,
          quantity: this.cartContent[productId].quantity + 1,
        };
      } else {
        this.cartContent[productId] = {
          productId,
          quantity: 1,
        };
      }
    },
    remove(productId) {
      if (!this.cartContent[productId]) {
        return;
      }
      this.cartContent[productId].quantity -= 1;

      if (this.cartContent[productId].quantity === 0) {
        delete this.cartContent[productId];
      }
    },
    removeProduct(productId) {
      delete this.cartContent[productId];
    },
    toogleTheme() {
      console.log(this.theme);
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  },
});
