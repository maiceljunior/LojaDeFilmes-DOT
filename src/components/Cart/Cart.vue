<template>
  <li
    class="card"
    v-for="cart in this.$store.state.cart"
    :key="cart.id"
    :id="cart.id"
  >
    <img
      :src="`https://image.tmdb.org/t/p/w500${cart.poster_path}`"
      :alt="cart.title"
      class="imgMovie"
    />
    <h2 class="title">{{ cart.title }}</h2>
    <span class="qtd">{{ cart.qtd }}</span>
    <span class="price">{{ cart.price }}</span>

    <button class="removeToCart" :id="cart.id" @click="removeToCart">🗑️</button>
  </li>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      totalPrice: 0,
    };
  },
  methods: {
    priceCart() {
      const some = this.$store.state.cart.reduce((acc, data) => {
        const value = data.price.replace("R$", "").replace(",", ".");

        const priceOriginal = data.qtd * parseInt(value);
        acc += priceOriginal;

        return acc;
      }, 0);

      this.$store.state.priceCart = some.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },

    removeToCart(e) {
      const idItem = parseInt(e.target.id);

      const itemInCart = this.$store.state.cart.findIndex(
        (movie) => movie.id === idItem
      );

      if (itemInCart === -1) {
        alert("Item não está no carrinho!");
      } else {
        this.$store.state.cart.splice(itemInCart, 1);
        this.priceCart();
      }
    },
  },
};
</script>

<style scoped>
.card {
  list-style: none;
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-self: center;
  align-items: center;
  margin-bottom: 10px;
  border: none;
  box-shadow: 4px 6px 6px -2px rgba(0, 0, 0, 0.66);
  background: white;
  border-radius: 10px;
  padding: 10px;
  font-family: "Nunito", sans-serif;
}

.card > h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  width: 130px;
  font-family: "Nunito", sans-serif;
}

.qtd {
  font-weight: bold;
  color: black;
  margin-left: 7px;
  margin-right: 14px;
}

.price {
  font-weight: bold;
}

.removeToCart {
  background: transparent;
  border: none;
  font-size: 17px;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 10px;
}

.imgMovie {
  width: 80px;
  height: 80px;
  object-fit: contain;
  align-content: flex-start;
}

@media (max-width: 900px) {
  .card > h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    width: 130px;
    font-family: "Nunito", sans-serif;
  }
}

@media (max-width: 840px) {
  .card > h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    width: 90px;
    font-family: "Nunito", sans-serif;
  }
}

@media (max-width: 400px) {
  .imgMovie {
    width: 80px;
    height: 80px;
    object-fit: contain;
    align-content: flex-start;
    margin-left: -5px;
    margin-right: 5px;
  }
}
</style>
