<template>
  <div class="btnShowcase">
    <button class="arrow" @click="previewPage">
      <img src="../../assets/After.png" alt="After" />
    </button>
    <button
      class="home"
      v-if="this.$store.state.movies.length < 10"
      @click="home"
    >
      Página Inicial
    </button>
    <button class="arrow" @click="nextPage">
      <img src="../../assets/Next.png" alt="Next" />
    </button>
  </div>

  <ul>
    <li
      class="card"
      v-for="card in this.$store.state.movies"
      :key="card.id"
      :id="card.id"
    >
      <div class="content">
        <div class="front">
          <div class="containerMovie">
            <img
              :src="`https://image.tmdb.org/t/p/w500${card.poster_path}`"
              :alt="card.title"
              class="imgMovie"
            />
          </div>
          <h2 class="title">{{ card.title }}</h2>

          <span class="date">{{ card.date }}</span>
          <div class="overall">
            <img id="stars" src="../../assets/Star.png" alt="Stars" />
            <span>{{ card.vote_average }}</span>

            <span>{{ card.genre }}</span>
          </div>
          <span class="price">{{ card.price }}</span>
        </div>

        <div class="back">
          <img
            src="../../assets/Favorite.png"
            alt="Favorite"
            class="favorite"
            :id="card.id"
            @click="addToFavorite"
          />
          <p class="description">
            {{ card.overview }}
          </p>

          <button class="addToCart" :id="card.id" @click="addToCart">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { apiMoviePopular } from "../../services/config";
import Favorite from "../../components/Header/Favorite.vue";

export default {
  name: "Products",
  components: {
    Favorite,
  },

  data() {
    return {
      page: 1,
    };
  },
  mounted() {
    this.getMovies();
  },
  methods: {
    addToCart(e) {
      const idItem = parseInt(e.target.id);

      const item = this.$store.state.movies.find(
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

    addToFavorite(e) {
      const idItem = parseInt(e.target.id);

      const item = this.$store.state.movies.find(
        (movie) => movie.id === idItem
      );

      if (this.$store.state.favorites.includes(item)) {
        alert("Filme já incluso em seus favoritos!");
      } else {
        this.$store.state.favorites.push(item);
      }
    },

    previewPage() {
      if (this.page > 1) {
        this.page--;

        setTimeout(() => {
          this.$store.commit("clear");
          this.getMovies();
        }, 950);
      }
    },
    nextPage() {
      if (this.page < 500) {
        this.page++;

        setTimeout(() => {
          this.$store.commit("clear");
          this.getMovies();
        }, 950);
      }
    },
    home() {
      this.page = 1;

      setTimeout(() => {
        this.$store.commit("clear");
        this.getMovies();
      }, 950);
    },

    getMovies() {
      apiMoviePopular
        .get(
          `/3/movie/popular?api_key=037964c26ddf600e6e90c24d7bde7ce9&language=pt-BR&page=${this.page}&include_adult=false`
        )
        .then((response) => {
          const data = response.data.results;
          data.forEach((cards) => this.createCards(cards));
        })
        .catch((err) => console.log(err));
    },

    createCards(cards) {
      const {
        id,
        title,
        vote_average,
        release_date,
        poster_path,
        genre_ids,
        overview,
      } = cards;

      const price = vote_average * 12;

      const newDay = [];
      const newMonth = [];
      const newYear = [];

      if (!!release_date) {
        const date = release_date.split("");
        const remove = date.filter((i) => i !== "-");

        newDay.push(`${remove[6]}${remove[7]}`);
        newMonth.push(`${remove[4]}${remove[5]}`);
        newYear.push(`${remove[0]}${remove[1]}${remove[2]}${remove[3]}`);

        var day = newDay.toString();
        var month = newMonth.toString();
        var year = newYear.toString();

        var newDate = `${day}/${month}/${year}`;
      }

      let movieGenres = [];

      movieGenres.push(genre_ids[0]);

      const genres = [
        { id: 28, name: "Ação" },
        { id: 12, name: "Aventura" },
        { id: 16, name: "Animação" },
        { id: 35, name: "Comédia" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentario" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Familia" },
        { id: 14, name: "Fantasia" },
        { id: 36, name: "Historia" },
        { id: 27, name: "Terror" },
        { id: 10402, name: "Musical" },
        { id: 9648, name: "Misterio" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Ficção Cientifica" },
        { id: 53, name: "Ação" },
        { id: 10770, name: "Filme de TV" },
        { id: 10752, name: "Guerra" },
        { id: 37, name: "Ocidental" },
      ];

      var genreM;

      movieGenres.forEach((movie) => {
        genres.forEach((genre) => {
          if (movie === genre.id) {
            genreM = genre.name;
          }
        });
      });
      const cardMovies = {
        id: id,
        title: title,
        genre: genreM,
        overview: overview,
        date: newDate,
        price: price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        poster_path: poster_path,
        vote_average: Math.round(vote_average),
        qtd: 1,
      };

      if (
        this.$store.state.movies.length < 9 &&
        parseInt(year) < 2023 &&
        parseInt(month) < 8 &&
        parseInt(vote_average) > 0 &&
        overview
      ) {
        this.$store.state.movies.push(cardMovies);
      }
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: space-evenly;
  gap: 3vw;
  padding: 60px;
  flex-wrap: wrap;
  max-width: 100%;
}

.imgMovie {
  height: 250px;
  width: 100%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}

.containerMovie {
  width: 125%;
  margin-top: -48px;
}

.overall {
  display: flex;
  align-items: center;
}

#stars {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.overall > span {
  font-size: 15px;
  font-family: "Nunito", sans-serif;
  color: white;
  margin-top: 1px;
  padding-top: 2px;
  margin-right: 10px;
  font-weight: bold;
}

.date,
.price {
  color: white;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}
.favorite {
  position: absolute;
  filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg)
    saturate(600%) contrast(0.8);
  margin-left: 294px;
  margin-top: -470px;
  color: transparent;
  width: 40px;
  background: transparent;
}
.favorite:hover {
  filter: invert(100%);
  cursor: pointer;
}
.card {
  list-style: none;
}
.content {
  text-align: center;
  position: relative;
  transition: all 1s;
  background-color: #202525;
  padding: 10em;
  padding-bottom: 22em;
  transform-style: preserve-3d;
  border-radius: 50px;
  border: none;
  box-shadow: 9px 11px 20px -4px rgba(0, 0, 0, 0.58);
}
.card:hover .content {
  transform: rotateY(0.5turn);
}

.front,
.back {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  border-radius: 50px;
  box-shadow: 9px 11px 20px -4px rgba(0, 0, 0, 0.58);
}
.title {
  transform: translateZ(5rem);
  font-size: 17px;
  font-family: "Nunito", sans-serif;
  color: rgb(255, 255, 255);
}
.back {
  transform: rotateY(0.5turn);
  background-color: #2b2e2d;
}
.description {
  transform: translateZ(3rem);
  color: white;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  text-justify: justify;
  font-weight: 500;
  line-height: 16.5px;
}
.btnShowcase {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
}
.arrow {
  background: transparent;
  color: transparent;
  border: none;
}
.arrow > img {
  width: 50px;
  object-fit: cover;
}
.arrow > img:hover {
  cursor: pointer;
}
.home {
  padding: 10px;
  width: 160px;
  font-size: 20px;
  cursor: pointer;
  background: rgb(0, 0, 0);
  color: white;
  border: none;
  border-radius: 15px;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}
.home:hover {
  background: #550606;
}
.addToCart {
  width: 80%;
  height: 35px;
  border: none;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  cursor: pointer;
  position: absolute;
  margin-top: 441px;
  background: #6558f5;
  color: white;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}

.addToCart:hover {
  color: white;
  background: black;
}

@media (max-width: 840px) {
  ul {
    display: flex;
    justify-content: space-evenly;
    gap: 10vw 5vw;
    padding: 20px;
    flex-wrap: wrap;
    max-width: 100%;
    margin-top: 50px;
  }

  .imgMovie {
    height: 250px;
    width: 100%;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
  }

  .containerMovie {
    width: 128.4%;
    margin-top: -35px;
  }

  .overall {
    display: flex;
    align-items: center;
  }

  #stars {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  .overall > span {
    font-size: 15px;
    font-family: "Nunito", sans-serif;
    color: white;
    margin-top: 1px;
    padding-top: 2px;
    margin-right: 10px;
    font-weight: bold;
  }

  .date,
  .price {
    color: white;
    font-family: "Nunito", sans-serif;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .favorite {
    position: absolute;
    filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg)
      saturate(600%) contrast(0.8);
    margin-left: 265px;
    margin-top: -415px;
    color: transparent;
    width: 40px;
    background: transparent;
  }
  .favorite:hover {
    filter: invert(100%);
    cursor: pointer;
  }
  .card {
    list-style: none;
  }
  .content {
    text-align: center;
    position: relative;
    transition: all 1s;
    background-color: #202525;
    padding: 9em;
    padding-bottom: 21em;
    transform-style: preserve-3d;
    border-radius: 50px;
    border: none;
    box-shadow: 9px 11px 20px -4px rgba(0, 0, 0, 0.58);
  }
  .card:hover .content {
    transform: rotateY(0.5turn);
  }

  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    border-radius: 50px;
    box-shadow: 9px 11px 20px -4px rgba(0, 0, 0, 0.58);
  }
  .title {
    transform: translateZ(5rem);
    font-size: 17px;
    font-family: "Nunito", sans-serif;
    color: rgb(255, 255, 255);
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .back {
    transform: rotateY(0.5turn);
    background-color: #2b2e2d;
  }
  .description {
    transform: translateZ(3rem);
    color: white;
    font-family: "Nunito", sans-serif;
    font-size: 13px;
    text-justify: justify;
    font-weight: bold;
    line-height: 14.5px;
  }
  .btnShowcase {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
  }
  .arrow {
    background: transparent;
    color: transparent;
    border: none;
  }
  .arrow > img {
    width: 50px;
    object-fit: cover;
  }
  .arrow > img:hover {
    cursor: pointer;
  }
  .home {
    padding: 10px;
    width: 160px;
    font-size: 20px;
    cursor: pointer;
    background: rgb(0, 0, 0);
    color: white;
    border: none;
    border-radius: 15px;
    font-family: "Nunito", sans-serif;
    font-weight: bold;
  }
  .home:hover {
    background: #550606;
  }
  .addToCart {
    width: 80%;
    height: 35px;
    border: none;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    cursor: pointer;
    position: absolute;
    margin-top: 420px;
    background: #6558f5;
    color: white;
    font-family: "Nunito", sans-serif;
  }
}
</style>
