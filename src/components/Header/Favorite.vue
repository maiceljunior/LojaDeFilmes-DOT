<template>
  <button>
    <img src="../../assets/Favorite.png" alt="Favorite" />
  </button>
</template>

<script>
export default {
  name: "Favorite",
};
</script>

<style scoped>
button {
  color: transparent;
  background: transparent;
  border: none;
  margin-right: 40px;
  cursor: pointer;
}

button > img {
  width: 40px;
}

button > img:hover {
  filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg)
    saturate(600%) contrast(0.8);
}
</style>
