<template>
  <Header />
  <div class="container">
    <div>
      <form @submit.prevent="onPush" class="form">
        <h2>Finalizar Compra</h2>
        <div class="username">
          <input
            type="text"
            placeholder="Name"
            name="name"
            v-model="name"
            required
            @input="validateForm('name')"
          />

          <span>{{ res.getErrors("name")[0] }}</span>
        </div>

        <div class="cepAndEnd">
          <div class="cep">
            <input
              type="number"
              placeholder="CPF"
              name="cpf"
              v-model="cpf"
              @input="validateForm('cpf')"
            />
            <span>{{ res.getErrors("cpf")[0] }}</span>
          </div>
          <div class="cep">
            <input
              type="tel"
              placeholder="Celular"
              name="celular"
              v-model="celular"
              @input="validateForm('celular')"
            />
            <span>{{ res.getErrors("celular")[0] }}</span>
          </div>
        </div>

        <div class="email">
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            v-model="email"
            @input="validateForm('email')"
          />

          <span>{{ res.getErrors("email")[0] }}</span>
        </div>

        <div class="cepAndEnd">
          <div class="cep">
            <input
              type="text"
              placeholder="CEP"
              name="cep"
              v-model="cep"
              @input="validateForm('cep')"
            />
            <span>{{ res.getErrors("cep")[0] }}</span>
          </div>

          <div class="end">
            <input
              type="text"
              placeholder="Endereço"
              name="endereco"
              v-model="endereco"
              @input="validateForm('endereco')"
            />
            <span>{{ res.getErrors("endereco")[0] }}</span>
          </div>
        </div>

        <div class="cepAndEnd">
          <div class="cep">
            <input
              type="text"
              placeholder="Cidade"
              name="cidade"
              v-model="cidade"
              @input="validateForm('cidade')"
            />
            <span>{{ res.getErrors("cidade")[0] }}</span>
          </div>

          <div class="cep">
            <input
              class="cep"
              type="text"
              placeholder="Estado"
              name="estado"
              v-model="estado"
              @input="validateForm('estado')"
            />
            <span>{{ res.getErrors("estado")[0] }}</span>
          </div>
        </div>
        <span class="buyTotal" v-if="this.$store.state.cart.length > 0"
          >Total: {{ this.$store.state.priceCart }}</span
        >
        <button type="submit" id="btnBuy" @click="submitForm">
          Finalizar Compra
        </button>
      </form>
    </div>

    <div class="ulCards">
      <div class="headerCartBuy">
        <span v-if="this.$store.state.cart.length > 0" class="hImg"
          >Imagem</span
        >
        <span v-if="this.$store.state.cart.length > 0" class="hName">Nome</span>
        <span v-if="this.$store.state.cart.length > 0" class="hQtd">Qtd</span>
        <span v-if="this.$store.state.cart.length > 0" class="hPrice"
          >Preço</span
        >
      </div>

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

        <button class="removeToCart" :id="cart.id" @click="removeToCart">
          🗑️
        </button>
      </li>
    </div>

    <div class="ModalContainerSucess" v-if="!!this.openBuyModal">
      <div class="modal">
        <span
          class="modalName"
          v-for="person in this.sucessMessage"
          :key="person.id"
          :id="person.id"
        >
          <button @click="this.closeModalBuy" class="modalBtn">X</button>
          Obrigado {{ person.name }}! 🎉🎉
        </span>

        <div class="divModal">
          <span>Sua compra foi finalizada com sucesso!</span>
          <router-link to="/" @click="closeModalBuy">
            <button>Ir para loja!</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header/Header.vue";
import suite from "@/validators";

export default {
  name: "Checkout",

  components: {
    Header,
    suite,
  },
  data() {
    return {
      totalPrice: 0,
      openBuyModal: false,
      sucessMessage: [],
      name: "",
      email: "",
      cpf: "",
      celular: "",
      cep: "",
      endereco: "",
      cidade: "",
      estado: "",
      res: suite.get(),
    };
  },

  methods: {
    validateForm(field) {
      this.res = suite(
        {
          name: this.name,
          email: this.email,
          cpf: this.cpf,
          celular: this.celular,
          cep: this.cep,
          endereco: this.endereco,
          cidade: this.cidade,
          estado: this.estado,
        },
        field
      );
    },

    onPush() {
      this.validateForm;
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
    submitForm(e) {
      e.preventDefault();
      const person = {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        celular: this.celular,
        cep: this.cep,
        endereco: this.endereco,
        cidade: this.cidade,
        estado: this.estado,
      };

      if (
        person.name !== "" &&
        person.estado !== "" &&
        person.email !== "" &&
        person.cpf !== "" &&
        person.celular !== "" &&
        person.cidade !== "" &&
        this.$store.state.cart.length > 0
      ) {
        this.sucessMessage.push(person);
        this.openBuyModal = true;
      } else {
        alert(
          "Adicione pelo menos um filme ao seu carrinho e digite as suas informações corretamente!"
        );

        ((this.name = ""), (this.email = "")),
          (this.cpf = ""),
          (this.celular = ""),
          (this.cep = ""),
          (this.endereco = ""),
          (this.cidade = ""),
          (this.estado = "");
      }
    },

    closeModalBuy() {
      this.openBuyModal = !this.openBuyModal;
      this.$store.state.cart = [];
      this.priceCart();

      (this.sucessMessage = []),
        ((this.name = ""), (this.email = "")),
        (this.cpf = ""),
        (this.celular = ""),
        (this.cep = ""),
        (this.endereco = ""),
        (this.cidade = ""),
        (this.estado = "");
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
.container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.ModalContainerSucess {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  width: 300px;
}

.modalBtn {
  position: absolute;
  margin-left: 263px;
  margin-top: -70px;
  background: transparent;
  border: none;
  color: red;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
}

.divModal {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.divModal > span {
  background-color: green;
  width: 100%;
  padding: 20px;
  align-self: center;
  align-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}

.divModal > a > button {
  width: 300px;
  padding: 20px;
  background: black;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.modalName {
  width: 100%;
  text-align: center;
  margin-top: 70px;
  font-size: 20px;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}

.buyTotal {
  text-align: center;
  align-items: center;
  align-content: center;
  align-self: center;
  color: black;
  font-family: "Nunito", sans-serif;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: -50px;
  padding: 10px;
}

.form {
  gap: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  margin-left: 10px;
}

.form > h2 {
  margin-left: 10px;
  margin-top: 10px;
  font-family: "Nunito", sans-serif;
  margin-bottom: 10px;
}

.ulCards {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  width: 400px;
  height: 60vh;
  padding: 10px;
  margin-left: 30px;
  margin-right: 30px;
  overflow-y: auto;
}

.headerCartBuy {
  width: 342px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  font-size: 16px;
}
.hImg {
  margin-left: -251px;
  margin-top: -44px;
  position: absolute;
  background: rgb(0, 0, 0);
  color: white;
  border-radius: 10px;
  padding: 3px;
}
.hName {
  margin-left: -83px;
  margin-top: -44px;
  position: absolute;
  background: rgb(0, 0, 0);
  color: white;
  border-radius: 10px;
  padding: 3px;
}
.hQtd {
  margin-left: 68px;
  margin-top: -44px;
  position: absolute;
  background: rgb(0, 0, 0);
  color: white;
  border-radius: 10px;
  padding: 3px;
}

.hPrice {
  margin-left: 199px;
  margin-top: -44px;
  position: absolute;
  background: rgb(0, 0, 0);
  color: white;
  border-radius: 10px;
  padding: 3px;
}

.username {
  display: flex;
  flex-direction: column;
}
.username > input {
  padding: 9px;
  width: 250px;
  margin-left: 10px;
  border: 2px solid #c5ced6;
  border-radius: 10px;
}

.username > span {
  padding: 7px;
  margin-left: 5px;
  max-width: 310px;
  color: red;
}

.cpfAndCelular {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.cpfAndCelular > input {
  width: auto;
  padding: 9px;
  margin-right: 10px;
  margin-left: 10px;
  border: 2px solid #c5ced6;
  border-radius: 10px;
}

.email {
  display: flex;
  flex-direction: column;
}
.email > input {
  padding: 9px;
  width: 250px;
  margin-left: 10px;
  border: 2px solid #c5ced6;
  border-radius: 10px;
}

.email > span {
  padding: 7px;
  margin-left: 5px;
  max-width: 310px;
  color: red;
}

.cepAndEnd {
  display: flex;
  width: 300px;
  justify-content: space-between;
}

.cep {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cep > span {
  padding: 7px;
  margin-left: 5px;
  max-width: 310px;
  color: red;
}

.cepAndEnd div > input {
  width: auto;
  padding: 9px;
  margin-right: 10px;
  margin-left: 10px;
  border: 2px solid #c5ced6;
  border-radius: 10px;
}

.end {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.end > span {
  padding: 7px;
  margin-left: 5px;
  max-width: 310px;
  color: red;
}

.cityAndState {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.cityAndState > input {
  width: auto;
  padding: 9px;
  margin-right: 10px;
  margin-left: 10px;
  border: 2px solid #c5ced6;
  border-radius: 10px;
}

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

#btnBuy {
  width: 100%;
  margin-left: 70px;
  margin-top: 50px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  background: black;
  color: white;
  font-family: "Nunito", sans-serif;
  cursor: pointer;
  font-weight: bold;
}

@media (max-width: 977px) {
  #btnBuy {
    margin: 0;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background: black;
    color: white;
    font-family: "Nunito", sans-serif;
    margin-bottom: 30px;
  }
  .buyTotal {
    text-align: center;
    align-items: center;
    align-content: center;
    align-self: center;
    color: black;
    font-family: "Nunito", sans-serif;
    font-size: 27px;
    font-weight: bold;
    z-index: 3000;
    margin-bottom: 0;
  }

  .hImg {
    margin-left: -374px;
    margin-top: -44px;
    position: absolute;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 10px;
    padding: 3px;
  }
  .hName {
    margin-left: -143px;
    margin-top: -44px;
    position: absolute;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 10px;
    padding: 3px;
  }
  .hQtd {
    margin-left: 98px;
    margin-top: -44px;
    position: absolute;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 10px;
    padding: 3px;
  }

  .hPrice {
    margin-left: 259px;
    margin-top: -44px;
    position: absolute;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 10px;
    padding: 3px;
  }

  .ulCards {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    width: 600px;
    height: 50vh;
    padding: 10px;
    margin-left: 30px;
    margin-right: 30px;
    overflow-y: auto;
  }
  .card {
    width: 500px;
    margin-bottom: 10px;
  }
  .card > h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    width: 130px;
    font-family: "Nunito", sans-serif;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form {
    gap: 1vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    margin-top: 20px;
    margin-left: 5px;
  }

  .cepAndEnd {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 539px) {
  #btnBuy {
    margin: 0;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background: black;
    color: white;
    font-family: "Nunito", sans-serif;
    margin-bottom: 40px;
  }

  .hImg {
    margin-left: -244px;
    margin-top: -45px;
    position: absolute;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 10px;
    padding: 3px;
  }
  .hName {
    margin-left: -81px;
    margin-top: -45px;
    position: absolute;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 10px;
    padding: 3px;
  }
  .hQtd {
    margin-left: 53px;
    margin-top: -45px;
    position: absolute;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 10px;
    padding: 3px;
  }

  .hPrice {
    margin-left: 169px;
    margin-top: -45px;
    position: absolute;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 10px;
    padding: 3px;
  }
  .card {
    width: 320px;
    margin-bottom: 10px;
  }
  .card > h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    width: 130px;
    font-family: "Nunito", sans-serif;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form {
    gap: 1vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    margin-top: 20px;
    margin-left: 5px;
  }

  .cepAndEnd {
    display: flex;
    flex-direction: column;
  }

  .ulCards {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    width: 340px;
    height: 50vh;
    padding: 10px;
    margin-left: 30px;
    margin-right: 30px;
    overflow-y: auto;
  }
}
</style>
