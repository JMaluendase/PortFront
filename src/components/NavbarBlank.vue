<template>
  <div>

    <body>
      <header class="header jcc">

        <router-link :to="{ name: 'home' }">
          <div class="logo">
            <img src="@/assets/logo_berlinas.png" class="logo_img" />

          </div>
        </router-link>
        <router-link :to="{ name: 'home' }">
          <div class="logo">
            <img src="@/assets/logo_berlinastur.png" class="logo_img" />
          </div>
        </router-link>
        <router-link :to="{ name: 'home' }">
          <div class="logo">
            <img src="@/assets/logo_colibertador.png" class="logo_img" />
          </div>
        </router-link>
        <router-link :to="{ name: 'home' }">
          <div class="logo">
            <img src="@/assets/logo_tourline.png" class="logo_img" />
          </div>
        </router-link>
        <router-link :to="{ name: 'home' }">
          <div class="logo">
            <img src="@/assets/logo_transcarga.png" class="logo_img" />
          </div>
        </router-link>
        <!-- <nav>
          <ul class="nav-links">
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
          </ul>
        </nav> -->

        <a @click="openNav" class="menu" href="#"><button>Menu</button></a>

        <div class="overlay" id="mobile-menu">
          <a @click="closeNav" href="" class="close">&times;</a>
          <div class="overlay-content">


            <!-- 
              <a href="#">Inicio</a>
              <a href="#">Soporte</a>
              <a href="#">Nosotros</a>
              <a href="#">Articulos</a>
              <a href="#">Solinpos</a>
              -->
          </div>
        </div>
      </header>
    </body>
  </div>
</template>
  
<script>
export default {
  name: "NavbarBlank",

  data() {
    return {
      isMenuOpen: false,
    };
  },

  methods: {
    openNav: function () {
      document.getElementById("mobile-menu").style.width = "100%";
    },
    closeNav: function () {
      document.getElementById("mobile-menu").style.width = "0%";
    },
  },

  created: function () { },
};
</script>
  
<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
  font-size: 20px;
}

body {}

.header {
  display: flex;
  background-color: #fff;
  justify-content: flex-end;
  align-items: center;
  height: 85px;
  width: 100%;
  padding: 5px 10%;
  gap: 13px;
}

.jcc {
  justify-content: center;
}

.header .logo {
  cursor: pointer;
  margin-right: auto;
}

.header .logo img {
  /* height: auto; */
  width: auto;
  transition: all 0.3s;
}

.header .logo img:hover {
  transform: scale(1.2);
}

.header .nav-links {
  list-style: none;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  margin-bottom: 0;
}

@media (min-width: 800px) {
  .header .nav-links {
    display: flex;
  }
}

.header .nav-links li {
  display: flex;
  border-radius: 10px;
  padding: 4px 7px;
  transition: all 300ms ease-in-out;
}

.header .nav-links li:hover,
.overlay a:hover {
  background-color: #e1c805;
  transform: scale(1.06);
}

.header .nav-links a {
  font-size: 700;
  color: #ffffff;
}

.header .nav-links li a:hover {
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.menu {
  display: none;
}

.header .btn button {
  margin-left: 20px;
  font-weight: 700;
  color: #ffffff;
  padding: 9px 25px;
  background: #e1c805;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.header .menu button {
  margin-left: 20px;
  font-weight: 700;
  color: #253030;
  padding: 9px 25px;
  background: #eceff1;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.header .btn button:hover,
.header .menu button:hover {
  background-color: #e2f1f8;
  color: #e1c805;
  transform: scale(1.1);
}

@media screen and (max-width: 800px) {

  .nav-links,
  .btn {
    display: none;
  }

  .menu {
    display: inherit;
  }
}

/* NAV */

.header a {
  text-decoration: none;
}

.logo_img {
  max-width: 200px;
}

.header .overlay {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: #253030;
  overflow: hidden;
  transition: all 0.3s ease 0s;
}

.header .overlay .overlay-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header .overlay a {
  padding: 15px;
  font-size: 36px;
  display: block;
  transition: all 0.3s ease 0s;
  font-weight: 700;
  color: #eceff1;
}

.header .overlay a:hover,
.header .overlay a:focus {
  color: #e1c805;
}

.header .overlay .close {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 65px;
}

@media screen and (max-height: 450px) {
  .header .overlay a {
    font-size: 20px;
  }

  .header .overlay .close {
    top: 15px;
    right: 35px;
    font-size: 40px;
  }
}

.containercards {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.card25 {
  width: 25%;
  text-decoration: none;
}

@media screen and (max-width: 1024px) {
  .card25 {
    width: 30%;
  }

  .container {
    max-width: 100%;
  }
}

@media screen and (max-width: 900px) {
  .card25 {
    width: 50%;
  }

  .container {
    max-width: 90%;
  }
}

@media screen and (max-width: 625px) {
  .card25 {
    width: 80%;
  }

  .container {
    max-width: 90%;
  }
}

@media screen and (max-width: 480px) {
  .card25 {
    width: 90%;
  }

  .container {
    max-width: 90%;
  }
}

@media screen {
  .cardsz {
    width: 100% !important;
  }
}
</style>
  