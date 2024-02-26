<template>
  <div>
    <NavbarMain />
    <div class="container mt-4">
      <div class="formgrid grid">
        <div class="field col-12 md:col-1"></div>

        <div class="field col-12 md:col-11">
          <div class="p-fluid grid formgrid">
            <div class="field col-12 md:col-8">
              <label for="nombre">Nombre (Fijo)</label>
              <InputText id="nombre" placeholder="Nombre" v-model="propietario.Nombre" :readonly="true" disabled="true"
                autocomplete="off" class="reduce-input" v-show="!cargaskeletonscombo" />
              <SkeletonLoading height="2rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>
            <div class="field col-12 md:col-4">
              <label for="documento">Documento (Fijo)</label>
              <InputText id="documento" placeholder="Documento" v-model="propietario.AfiliadoID" autocomplete="off"
                :readonly="true" disabled="true" class="reduce-input" v-show="!cargaskeletonscombo" />
              <SkeletonLoading height="2rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-4">
              <label for="telefono">Teléfono</label>
              <InputText id="telefono" placeholder="Teléfono" v-model="propietario.Telefono" autocomplete="off"
                class="reduce-input" v-show="!cargaskeletonscombo" />
              <SkeletonLoading height="2rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-4">
              <label for="correo">Correo electrónico (Fijo)</label>
              <InputText id="correo" placeholder="Correo electrónico" v-model="propietario.Correo" :readonly="true"
                disabled="true" autocomplete="off" class="reduce-input" v-show="!cargaskeletonscombo" />
              <SkeletonLoading height="2rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-4">
              <label for="correo">Correo electrónico adicional</label>
              <InputText id="correo" placeholder="Correo electrónico adicional" v-model="propietario.Correo2"
                autocomplete="off" class="reduce-input" v-show="!cargaskeletonscombo" />
              <SkeletonLoading height="2rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-12">
              <ButtonPrime icon="pi pi-save" severity="success" aria-label="Cancel" class="reduce-button"
                label="Actualizar información" @click="updateAfiliado()" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastPrime />
  </div>
</template>

<script>
import NavbarMain from "@/components/NavbarMain.vue";
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  name: "InfoView",
  data() {
    return {
      editcedula: false,
      propietario: {
        Nombre: "",
        AfiliadoID: "",
        Telefono: "",
        Correo: "",
        Correo2: "",
      },

      showconsultandoinfo: false,
      cargaskeletonscombo: false,

      items: [],
    };
  },

  components: {
    NavbarMain,
  },

  created: function () { },

  mounted() {
    if (!localStorage.getItem("documento")) {
      this.$router.push("/");
    } else {
      this.propietario.AfiliadoID = localStorage.getItem("documento");
      this.getAfiliado();
      //this.mensajeOK('Bienvenido: ' + localStorage.getItem('name'));
    }
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

    getAfiliado: async function () {
      try {
        this.showconsultandoinfo = true;

        let self = this;
        await this.axios
          .get("http://127.0.0.1:8000/api/afiliados/getdatos/" + this.propietario.AfiliadoID + "/")
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              var data = response.data;
              if (Object.keys(data).length > 0) {
                self.propietario = data[0];
                // self.categories = response.data;
                // self.nombre = self.categories[0].nombre;
                // self.autenticar = true;
                // self.modalDocumentoVisible = false;
                // self.modalAutenticarVisible = true;
              } else {
                this.notify(
                  this.TOAST.WARN,
                  this.MSG.WARN,
                  "El N° de documento no corresponde a ningún propietario",
                  this.TIME.SHORT
                );
              }
              // SEPARATOR
            } else if (
              response.status == self.APICONST.RESPONSE_STATUS_NO_FOUND
            ) {
              this.notify(
                this.TOAST.WARN,
                this.MSG.WARN,
                "El N° de documento no corresponde a ningún propietario",
                this.TIME.SHORT
              );
            }
          })
          .catch((error) => {
            console.log("CATCH AXIOS");
            console.log(error);

            if (
              error.request.status == this.APICONST.RESPONSE_STATUS_NO_FOUND
            ) {
              this.notify(
                this.TOAST.WARN,
                this.MSG.WARN,
                "El N° de documento no corresponde a ningún propietario",
                this.TIME.SHORT
              );
            } else {
              this.notify(
                this.TOAST.ERROR,
                this.MSG.ERROR,
                "Error al consultar afiliado",
                this.TIME.SHORT
              );
            }
          })
          .finally(() => {
            this.showconsultandoinfo = false;
          });
      } catch (error) {
        alert(error);
        console.log(error);
        this.notify(
          this.TOAST.WARN,
          this.MSG.WARN,
          "Error en el cliente JS",
          this.TIME.SHORT
        );
      }
    },

    updateAfiliado: async function () {
      if (this.propietario.Telefono == null || this.propietario.Correo == "") {
        this.notify(
          this.TOAST.WARN,
          this.MSG.WARN,
          "Debe digitar un teléfono y Correo electrónico válidos",
          this.TIME.SHORT
        );
        return;
      }

      if (this.propietario.Correo2 != "") {
        if (
          !this.UTILS.validarCorreo(this.propietario.Correo2) ||
          this.propietario.Correo.length > 45
        ) {
          this.notify(
            this.TOAST.WARN,
            this.MSG.WARN,
            "El correo digitado es inválido",
            this.TIME.SHORT
          );
          return;
        }

      } if (
        !this.UTILS.validarCelular(this.propietario.Telefono) ||
        this.propietario.Telefono.length > 15
      ) {
        this.notify(
          this.TOAST.WARN,
          this.MSG.WARN,
          "el teléfono digitado es inválido",
          this.TIME.SHORT
        );
        return;
      } else {

        this.cargaskeletonscombo = true;
        var datosEnviar = {
          id: this.propietario.AfiliadoID,
          nombre: this.propietario.Nombre,
          correo: this.propietario.Correo,
          correo2: this.propietario.Correo2,
          telefono: this.propietario.Telefono,
        };

        let vue = this;
        await this.axios
          .put("http://127.0.0.1:8000/api/afiliadosvehiculos/actualizarafiliado/", datosEnviar)
          .then(function (response) {
            if (response.status == vue.APICONST.RESPONSE_STATUS_GET_OK) {
              vue.notify(
                vue.TOAST.SUCCESS,
                vue.MSG.SUCCESS,
                "Se ha modificado la información correctamente: ",
                vue.TIME.SHORT
              );
            } else {
              vue.notify(
                vue.TOAST.ERROR,
                vue.MSG.ERROR,
                "Problemas al actualizar información",
                vue.TIME.SHORT
              );
            }
          })
          .catch((error) => {
            console.log("CATCH AXIOS");
            console.log(error);

            this.notify(
              this.TOAST.ERROR,
              this.MSG.ERROR,
              "Problemas al enviar el Token",
              this.TIME.SHORT
            );
          })
          .then(function () {
            vue.cargaskeletonscombo = false;
          });
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/styles.css";

label {
  font-size: 0.8rem;
}
</style>
