<template>
  <div>
    <form @submit="searchMovies">
      <input
        type="text"
        placeholder="Pesquise o seu filme favorito!"
        v-model="input_search"
      />
    </form>
    <img src="../../assets/Search.png" alt="Search" @click="searchMovies" />
  </div>
</template>

<script>
import { apiMoviePopular } from "../../services/config";

export default {
  name: "Input",
  data() {
    return {
      search: "",
      input_search: "",
    };
  },

  methods: {
    searchMovies(e) {
      this.search = this.input_search;
      e.preventDefault();

      this.input_search = "";

      if (this.search !== "") {
        apiMoviePopular
          .get(
            `/3/search/movie?query=${this.search}&api_key=037964c26ddf600e6e90c24d7bde7ce9&language=pt-BR&page=1&include_adult=false`
          )
          .then((response) => {
            const data = response.data.results;

            if (data.length > 0) {
              this.$store.commit("clear");
              data.forEach((cards) => this.createCards(cards));
            } else {
              alert("Não temos esse filme.");
            }
          })
          .catch((err) => console.log(err));
      } else {
        alert("Insira um dado na pesquisa");
      }
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
        date: newDate,
        overview: overview,
        price: price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        poster_path: poster_path,
        vote_average: Math.round(vote_average) || vote_average,
      };

      if (this.$store.state.movies.length < 6) {
        this.$store.state.movies.push(cardMovies);
      }
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
}

input {
  width: 470px;
  height: 45px;
  padding: 15px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  background: #f0f4f7;
}

img {
  width: 20px;
  position: absolute;
  margin-left: 435px;
  margin-top: 1px;
  cursor: pointer;
}

@media (max-width: 840px) {
  input {
    width: 300px;
    height: 45px;
    padding: 15px;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    font-family: "Nunito", sans-serif;
    font-weight: 400;
    background: #f0f4f7;
    margin: 0;
  }

  img {
    width: 20px;
    position: absolute;
    margin-left: 265px;
    margin-top: 1px;
    cursor: pointer;
  }
}
</style>
