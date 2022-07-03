<template>
  <Header />

  <Products />
</template>

<script>
import Header from "../components/Header/Header.vue";
import Products from "../components/Cards/Products.vue";

export default {
  name: "Home",
  components: {
    Header,
    Products,
  },
  methods: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f0f4f7;
}
</style>
