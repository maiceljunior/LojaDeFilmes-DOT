<template>
  <li
    class="card"
    v-for="favorites in this.$store.state.favorites"
    :key="favorites.id"
    :id="favorites.id"
  >
    <img
      :src="`https://image.tmdb.org/t/p/w500${favorites.poster_path}`"
      :alt="favorites.title"
      class="imgMovie"
    />
    <h2 class="title">{{ favorites.title }}</h2>
    <span class="price">{{ favorites.price }}</span>

    <button class="addToCart" :id="favorites.id" @click="addToCart">🛒</button>
    <button
      class="removeTofavorites"
      :id="favorites.id"
      @click="removeToFavorite"
    >
      🗑️
    </button>
  </li>
</template>

<script>
export default {
  name: "Favorites",

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

    addToCart(e) {
      const idItem = parseInt(e.target.id);

      const item = this.$store.state.favorites.find(
        (movie) => movie.id === idItem
      );

      if (this.$store.state.cart.includes(item)) {
        item.qtd++;
        this.priceCart();
      } else {
        item.qtd = 1;
        this.$store.state.cart.push(item);
        this.priceCart();
      }
    },

    removeToFavorite(e) {
      const idItem = parseInt(e.target.id);

      const itemInFavorite = this.$store.state.favorites.findIndex(
        (movie) => movie.id === idItem
      );

      if (itemInFavorite === -1) {
        alert("Item não está nos seus favoritos!");
      } else {
        this.$store.state.favorites.splice(itemInFavorite, 1);
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

.price {
  font-weight: bold;
  margin-left: 10px;
}

.removeTofavorites {
  background: transparent;
  border: none;
  font-size: 17px;
  cursor: pointer;
  margin-right: 15px;
}

.addToCart {
  background: transparent;
  border: none;
  font-size: 17px;
  cursor: pointer;
  margin-left: 15px;
  margin-right: 10px;
}

.imgMovie {
  width: 80px;
  height: 80px;
  object-fit: contain;
  align-content: flex-start;
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
