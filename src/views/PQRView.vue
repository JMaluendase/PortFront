<template>
  <div>
    <NavbarMain />
    <div class="container mt-4">
      <div class="formgrid grid">
        <div class="field col-12 md:col-1"></div>

        <div class="field col-12 md:col-11">
          <div class="p-fluid grid formgrid">
            <div class="field col-12 md:col-8">
              <label for="nombre">Remitente</label>
              <InputText id="nombre" placeholder="Nombre" v-model="propietario.Nombre" :readonly="true" disabled="true"
                autocomplete="off" class="reduce-input" v-show="!cargaskeletonscombo" />
              <SkeletonLoading height="2rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>
            <div class="field col-12 md:col-4">
              <label for="documento">Documento</label>
              <InputText id="documento" placeholder="Documento" v-model="propietario.AfiliadoID" autocomplete="off"
                :readonly="true" disabled="true" class="reduce-input" v-show="!cargaskeletonscombo" />
              <SkeletonLoading height="2rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-12">
              <DropDown v-show="!cargaskeletonscombo" v-model="destinatario" :options="destinatarios" optionLabel="Nombre"
                placeholder="Seleccionar un destinatario" class="w-full" @change="seleccionarDestinatario($event)" />

              <SkeletonLoading height="2rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-12">
              <TextArea v-model="mensaje" rows="5" placeholder="Escribe tu solicitud" v-show="!cargaskeletonscombo" />
              <SkeletonLoading height="8rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-12">
              <ButtonPrime icon="pi pi-save" severity="success" aria-label="Cancel" class="reduce-button"
                label="Enviar solicitud" @click="sendPQR()" />
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
        Corre2: "",
      },
      destinatario: 0,
      destinatarios: [],

      mensaje: "",

      showconsultandoinfo: false,
      cargaskeletonscombo: false,

      items: [],
    };
  },

  components: {
    NavbarMain,
  },

  created: function () {
    this.getDestinatarios();
  },

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

    sendPQR: async function () {
      if (this.mensaje == "" || this.mensaje.length > 355) {
        this.notify(
          this.TOAST.WARN,
          this.MSG.WARN,
          "Debe digitar una solicitud válida, no debe superar los 355 caracteres",
          this.TIME.SHORT
        );
        return;
      }

      if (this.destinatario == 0) {
        this.notify(
          this.TOAST.WARN,
          this.MSG.WARN,
          "Debe seleccionar un destinatario",
          this.TIME.SHORT
        );
        return;
      }



      this.cargaskeletonscombo = true;
      var datosEnviar = {
        afiliado: this.propietario.AfiliadoID,
        mensaje: this.mensaje,
        nombre: this.propietario.Nombre,
        telefono: this.propietario.Telefono,
        correo: this.propietario.Correo,
        destinatario: this.destinatario.Correo,
        destinatarioId: this.destinatario.id,
      };

      let vue = this;
      await this.axios
        .post("newpqr/", datosEnviar)
        .then(function (response) {
          if (response.status == vue.APICONST.RESPONSE_STATUS_INSERT_OK) {
            vue.notify(
              vue.TOAST.SUCCESS,
              vue.MSG.SUCCESS,
              "Se ha enviado la solicitud correctamente: ",
              vue.TIME.SHORT
            );
            vue.mensaje = "";
            vue.destinatario = 0;
          } else {
            vue.notify(
              vue.TOAST.ERROR,
              vue.MSG.ERROR,
              "Problemas al enviar solicitud",
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
            "Problemas al enviar solicitud",
            this.TIME.SHORT
          );
        })
        .then(function () {
          vue.cargaskeletonscombo = false;
        });
    },

    getDestinatarios: async function () {
      try {
        this.cargaskeletonscombo = true;
        let self = this;
        await this.axios
          .get("http://127.0.0.1:8000/api/destinatarios/getall/")
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              var data = response.data;
              if (Object.keys(data).length > 0) {
                self.destinatarios = response.data;
              } else {
                self.notify(
                  self.TOAST.WARN,
                  self.MSG.WARN,
                  "Respuesta vacía: []",
                  self.TIME.SHORT
                );
              }
            } else {
              self.notify(
                self.TOAST.WARN,
                self.MSG.WARN,
                "No se cargaron destinatarios",
                self.TIME.SHORT
              );
            }
          })
          .catch((error) => {
            console.log("CATCH AXIOS");
            console.log(error);

            this.notify(
              this.TOAST.ERROR,
              this.MSG.ERROR,
              "Error al consultar vehículos",
              this.TIME.SHORT
            );
          })
          .finally(() => {
            this.cargaskeletonscombo = false;
          });
      } catch (error) {
        console.log("CATCH JS");
        console.log(error);
        alert("Error en el cliente JS");
      }
    },

    seleccionarDestinatario: function (event) {
      this.destinatario = event.value;
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
