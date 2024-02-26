<template>
  <div class="about">
    <h1>Redirect Logout...</h1>
  </div>
</template>

<script>

export default {
  name: "AboutView",
  data() {
    return {
      
    };
  },

  components: {

  },

  methods: {
    cerrarsesion: function () {
      //localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("documento");

      this.$router.push("/");
    },
  },

  created: function () {
    this.cerrarsesion();
  },
};
</script>

<style>

</style>
