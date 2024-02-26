<template>
  <div>
    <NavbarMain />
    <div class="label-user mb-2">
      <ChipPrime class="pl-0 pr-3 reduce-setenta">
        <span class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center"><i
            class="pi pi-user"></i></span>
        <span class="ml-2 font-medium">{{ usuario }}</span>
      </ChipPrime>
    </div>
    <div class="container">
      <div class="formgrid grid mt-4 containercards">
        <router-link to="/extractos" class="card25">
          <div class="field col-12 md:col-3 card25 cardsz">
            <CardView class="centro-card">
              <template #header>
                <img alt="user header" src="@/assets/file_132.png" />
              </template>
              <template #title> <i class="pi pi-file"></i> Extractos </template>
              <template #content>
                <p>Descargue el extracto y planilla mensual de su vehículo afiliado a la compañía</p>
              </template>
            </CardView>
          </div>
        </router-link>
        <router-link to="/producido" class="card25">
          <div class="field col-12 md:col-3 card25 cardsz">
            <CardView class="centro-card">
              <template #header>
                <img alt="user header" src="@/assets/chart_132.png" />
              </template>
              <template #title><i class="pi pi-chart-bar"></i> Análisis </template>
              <template #content>
                <p>
                  Analice los datos de su extracto de manera gráfica, comparando
                  mes a mes.
                </p>
              </template>
            </CardView>
          </div>
        </router-link>
        <router-link to="/tributaria" class="card25">
          <div class="field col-12 md:col-3 card25 cardsz">
            <CardView class="centro-card">
              <template #header>
                <img alt="user header" src="@/assets/certificado_132.png" />
              </template>
              <template #title>
                <i class="pi pi-user"></i> Certificados
              </template>
              <template #content>
                <p>Descargue los certificados de ICA y certificado de Renta, para su declaración</p>
              </template>
            </CardView>
          </div>
        </router-link>
        <router-link to="/info" class="card25">
          <div class="field col-12 md:col-3 card25 cardsz">
            <CardView class="centro-card">
              <template #header>
                <img alt="user header" src="@/assets/contactus_132.png" />
              </template>
              <template #title>
                <i class="pi pi-user"></i> Información
              </template>
              <template #content>
                <p>Actualice su información personal para su inicio de sesión.</p>
              </template>
            </CardView>
          </div>
        </router-link>
      </div>
    </div>
    <ToastPrime />
    <FooterMain />
  </div>
</template>

<script>
import NavbarMain from "@/components/NavbarMain.vue";
import FooterMain from "@/components/FooterMain.vue";
import { MenuItemService } from "@/service/ParamServices";
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  name: "HomeView",
  data() {
    return {
      usuario: "",
      propietario: {
        nombre: "DIEGO MARTINEZ",
        documento: "1082924533",
        departamento: 0,
        ciudad: 0,
        direccion: "CLL 27 N° 2B 51 PARAISO, RODADERO SUR",
        telefono: "3012555457",
        correo: "diegojmp@gmail.com",
      },

      items: [],

      departamentos: [
        {
          id: 0,
          detalle: "ATLÁNTICO",
        },
        {
          id: 1,
          detalle: "CUNDINAMARCA",
        },
      ],
    };
  },

  methods: {
    notify: function (severity, summary, detail, life) {
      this.toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: life,
      });
    },
  },

  components: {
    NavbarMain,
    FooterMain
  },

  created: function () {
    this.items = MenuItemService;
    this.usuario = localStorage.getItem("nombre");
  },

  mounted() {
    if (!localStorage.getItem("documento")) {
      this.$router.push("/");
    } else {
      //let nombre = localStorage.getItem("nombre");
      // this.notify(
      //   this.TOAST.SUCCESS,
      //   this.MSG.SUCCESS,
      //             "Bienvenido: " + nombre,
      //             this.TIME.SHORT
      //           );
      //this.mensajeOK('Bienvenido: ' + localStorage.getItem('name'));
    }
  },
};
</script>

<style scoped>
@import "../assets/css/styles.css";

.centro {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
