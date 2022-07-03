import { createStore } from "vuex";

export default createStore({
  state: {
    movies: [],
    cart: [],
    favorites: [],
    priceCart: 0,
  },
  mutations: {
    clear() {
      this.state.movies = [];
    },
  },
});
