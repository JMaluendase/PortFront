<template>
  <div>

    <body>
      <header class="header bg_ber">
        <router-link :to="{ name: 'home' }">
          <div class="logo">
            <img src="@/assets/iconlogobus.png" class="logo_img" />
          </div>
        </router-link>
        <nav>
          <ul class="nav-links">
            <li>
              <router-link :to="{ name: 'extractos' }">
                <i class="pi pi-file"></i> Extractos</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'producido' }"><i class="pi pi-chart-bar"></i> Estadísticas</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'info' }"><i class="pi pi-user"></i> Información</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'tributaria' }"><i class="pi pi-file-export"></i> Certificados</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'pqr' }"><i class="pi pi-comment"></i> PQR</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'about' }"><i class="pi pi-power-off"></i> Salir</router-link>
            </li>
          </ul>
        </nav>

        <a @click="openNav" class="menu" href="javascript:void(0)"><button>Menu</button></a>

        <div class="overlay" id="mobile-menu">
          <a @click="closeNav" href="javascript:void(0)" class="close">&times;</a>
          <div class="overlay-content">
            <router-link :to="{ name: 'extractos' }"><i class="pi pi-file"></i> Extractos</router-link>
            <router-link :to="{ name: 'producido' }"><i class="pi pi-chart-bar"></i> Estadísticas</router-link>
            <router-link :to="{ name: 'info' }"><i class="pi pi-user"></i> Información</router-link>
            <router-link :to="{ name: 'tributaria' }"><i class="pi pi-file-export"></i> Cert. Tributario</router-link>
            <router-link :to="{ name: 'pqr' }"><i class="pi pi-comment"></i> PQR</router-link>
            <router-link :to="{ name: 'about' }"><i class="pi pi-power-off"></i> Salir</router-link>

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
  name: "NavbarMain",

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
  background-color: #138939;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 85px;
  padding: 5px 10%;
}

.bg_ber {
  background-color: #138939 !important;

}

.header .logo {
  cursor: pointer;
  margin-right: auto;
}

.header .logo img:hover {
  transform: scale(1.2);
}

.header .nav-links {
  list-style: none;
}

.header .nav-links li {
  display: inline-block;
  padding: 0 20px;
}

.header .nav-links li:hover,
.overlay a:hover {
  transform: scale(1.1);
}

.header .nav-links a {
  font-size: 700;
  color: #ffffff;
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
</style>
