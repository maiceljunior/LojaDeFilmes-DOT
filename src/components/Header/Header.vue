<template>
  <header>
    <router-link to="/"
      ><img src="../../assets/Logo.png" alt="Logo" id="Logo"
    /></router-link>

    <Input class="inputSearch" />

    <div class="cartSection">
      <Favorite @click="openModalFavorite" />

      <div class="ModalContainer" v-if="!!this.modalOpenFavorite">
        <div class="headerFavorite">
          <h1 class="Title">Meus Favoritos</h1>
          <button
            @click="clearFavorite"
            class="emptyCart"
            v-if="this.$store.state.favorites.length > 0"
          >
            Esvaziar
          </button>
        </div>

        <ul class="ulFavorites">
          <Favorites />
        </ul>
      </div>

      <button
        id="Cart"
        :data-count="this.$store.state.cart.length"
        @click="openModalCart"
      >
        <img src="../../assets/Cart.png" alt="Cart" />
      </button>

      <div class="ModalContainer" v-if="!!this.modalOpenCart">
        <div class="headerCart">
          <h1 class="Title">Carrinho</h1>
          <button
            @click="clearCart"
            class="emptyCart"
            v-if="this.$store.state.cart.length > 0"
          >
            Esvaziar
          </button>
        </div>

        <ul class="ulCart">
          <Cart />
        </ul>

        <div class="footerCart">
          <div class="priceCart">
            <span>Total: </span>
            <span>{{ this.$store.state.priceCart }}</span>
          </div>
          <router-link
            to="/checkout"
            id="checkoutBtn"
            v-if="this.$store.state.cart.length > 0"
          >
            <button class="checkout">Finalizar compra</button>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Input from "./Input.vue";
import Cart from "../Cart/Cart.vue";
import Favorite from "./Favorite.vue";
import Favorites from "../Favorites/Favorites.vue";

export default {
  name: "Header",
  components: {
    Input,
    Favorite,
    Cart,
    Favorites,
  },
  data() {
    return {
      modalOpenCart: false,
      modalOpenFavorite: false,
    };
  },
  mounted() {
    this.priceCart();
  },

  methods: {
    openModalCart() {
      setTimeout(() => {
        this.modalOpenCart = !this.modalOpenCart;

        if (this.modalOpenCart) {
          this.modalOpenFavorite = false;
        }
      }, 300);
    },

    openModalFavorite() {
      setTimeout(() => {
        this.modalOpenFavorite = !this.modalOpenFavorite;

        if (this.modalOpenFavorite) {
          this.modalOpenCart = false;
        }
      }, 300);
    },

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

    clearCart() {
      this.$store.state.cart = [];
      this.priceCart();

      setTimeout(() => {
        this.modalOpenCart = false;
      }, 600);
    },

    clearFavorite() {
      this.$store.state.favorites = [];

      setTimeout(() => {
        this.modalOpenFavorite = false;
      }, 600);
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #393f3e;
  height: 100px;
}

.ulCart {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 60vh;
  margin-top: 10px;
}

.ulFavorites {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 70vh;
  margin-top: 5px;
  margin-bottom: 15px;
}

.emptyCart {
  background: black;
  font-size: 15px;
  border: 1px solid black;
  padding: 6px;
  color: white;
  font-family: "Nunito", sans-serif;
  border-radius: 7px;
  cursor: pointer;
}

.emptyCart:hover {
  background: #6558f5;
  border: 1px solid #6558f5;
}

#Logo {
  width: 85px;
  height: 85px;
  object-fit: cover;
  margin-left: 30px;
}

.cartSection {
  margin-right: 30px;
}

#Cart {
  color: transparent;
  background: transparent;
  border: none;
  margin-right: 40px;
  cursor: pointer;
}

#Cart > img {
  width: 40px;
  object-fit: cover;
}

#Cart::before {
  content: attr(data-count);
  color: black;
  background: #fbe192;
  padding: 4px;
  border-radius: 40px;
  position: absolute;
  margin-left: 30px;
  margin-top: -4px;
  font-size: 13px;
  font-weight: bold;
}

.ModalContainer {
  position: absolute;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  background-color: #f0f4f7;
  z-index: 3000;
  top: 100px;
  right: 0px;
  width: 400px;
  box-shadow: -6px 6px 5px -1px rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 10px;
  animation: myAnim 1s ease 0s 1 normal forwards;
}

@keyframes myAnim {
  0% {
    opacity: 0;
    transform: translateY(-25px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.headerCart {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: stretch;
}

.headerFavorite {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: stretch;
}

.footerCart {
  background: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
}

.priceCart {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 12px;
  color: black;
  font-weight: bold;
  font-family: "Nunito", sans-serif;
}

.checkout {
  border: none;
  height: 30px;
  color: white;
  background: black;
  font-weight: 500;
  font-family: "Nunito", sans-serif;
  cursor: pointer;
  width: 100%;
}
.Title {
  font-family: "Nunito", sans-serif;
}
.checkout:hover {
  background: #6558f5;
}

@media (max-width: 840px) {
  header {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    align-self: center;
    background: #393f3e;
    height: 220px;
  }

  #Logo {
    width: 75px;
    height: 75px;
    object-fit: cover;
    margin-left: 0;
  }

  .cartSection {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0;
    margin-top: 5px;
  }

  #Cart {
    color: transparent;
    background: transparent;
    border: none;
    cursor: pointer;
    margin: 0;
  }

  #Cart > img {
    width: 40px;
    object-fit: cover;
    margin: 0;
  }

  #Cart::before {
    content: attr(data-count);
    color: black;
    background: #fbe192;
    padding: 4px;
    border-radius: 40px;
    position: absolute;
    margin-left: 30px;
    margin-top: -4px;
    font-size: 13px;
    font-weight: bold;
  }

  .ModalContainer {
    position: absolute;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    background-color: #f0f4f7;
    z-index: 3000;
    top: 220px;
    width: 100%;
    box-shadow: -6px 6px 5px -1px rgba(0, 0, 0, 0.5);
    border-bottom-left-radius: 10px;
    animation: myAnim 1s ease 0s 1 normal forwards;
  }

  @keyframes myAnim {
    0% {
      opacity: 0;
      transform: translateY(-25px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .headerCart {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: stretch;
  }

  .headerFavorite {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: stretch;
  }

  .footerCart {
    background: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
  }

  .priceCart {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    margin-bottom: 12px;
    color: black;
    font-weight: bold;
    font-family: "Nunito", sans-serif;
  }

  .checkout {
    border: none;
    height: 30px;
    color: white;
    background: black;
    font-weight: 500;
    font-family: "Nunito", sans-serif;
    cursor: pointer;
  }
  .Title {
    font-family: "Nunito", sans-serif;
  }
  .checkout:hover {
    background: #6558f5;
  }
}
</style>
