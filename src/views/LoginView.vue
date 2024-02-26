<template>
  <div>
    <NavbarBlank />
    <!-- <div class="mainreduce"></div> -->

    <DialogModal :visible="modalDocumentoVisible" header="Gestor - Módulo de afiliados" :modal="true" class="mainreduce"
      :style="{ width: '40vw' }" :breakpoints="{ '1199px': '40vw', '575px': '90vw' }">
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <p>
            Seleccione su tipo y número de documento para iniciar sesión en el
            portal de propietarios
          </p>
        </div>
        <div class="field col-12 md:col-3">
          <DropDown v-model="tipodocumento" :options="tiposdocumentos" optionLabel="name" class="w-full" />
        </div>
        <div class="field col-12 md:col-9">
          <InputText placeholder="Número de documento" v-model="documento" autocomplete="off" class="w-full"
            @keyup.enter="medioautenticar" />
        </div>

        <div v-show="showconsultandoinfo" class="field col-12 md:col-12">
          <ProgressBar mode="indeterminate" style="height: 0.5em" />
        </div>

        <div class="field col-12 md:col-12">
          <ButtonPrime severity="success" aria-label="Cancel" label="Iniciar sesión" class="w-full" icon="pi pi-check"
            @click="medioautenticar" />
          <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
        </div>

      </div>
    </DialogModal>

    <!-- <DialogModal
      :visible="modalAutenticarVisible"
      header="Validar autenticación"
      :modal="true"
      class="mainreduce"
      :style="{ width: '40vw' }"
      :breakpoints="{ '1199px': '40vw', '575px': '90vw' }"
    >
      <div class="formgrid grid">
        <div v-show="autenticar" class="field col-12 md:col-12">
          <p>
            Selecciona el medio de envío para recibir el código de verificación
          </p>
        </div>

        <div
          v-show="autenticar"
          v-for="category of categories"
          :key="category.key"
          class="field-radiobutton"
        >
          <RadioButton
            :id="category.key"
            name="category"
            :disabled="!category.exist"
            :value="category"
            v-model="selectedCategory"
          />
          <label :for="category.key">{{ category.name }}</label>
        </div>

        <div v-show="showenviandotoken" class="field col-12 md:col-12">
          <ProgressBar mode="indeterminate" style="height: 0.5em" />
        </div>

        <div class="field col-12 md:col-12">
          <ButtonPrime
            severity="success"
            aria-label="Cancel"
            label="Validar autenticación"
            class="w-full"
            @click="getToken"
          />
        </div>
      </div>
    </DialogModal> -->

    <DialogModal :visible="modalTokenVisible" header="Validar Token" :modal="true" class="mainreduce"
      :style="{ width: '40vw' }" :breakpoints="{ '1199px': '40vw', '575px': '90vw' }">
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <p>
            Hemos enviado un código de confirmación de seis digitos, no olvides
            ingresar el código en las casillas de texto.
          </p>
        </div>

        <div class="field col-2 md:col-2">
          <InputText v-model="token1" autocomplete="off" class="w-full" ref="token1"
            @input="focusNext($event, 'token2')" />
        </div>
        <div class="field col-2 md:col-2">
          <InputText v-model="token2" autocomplete="off" class="w-full" ref="token2"
            @input="focusNext($event, 'token3')" />
        </div>
        <div class="field col-2 md:col-2">
          <InputText v-model="token3" autocomplete="off" class="w-full" ref="token3"
            @input="focusNext($event, 'token4')" />
        </div>
        <div class="field col-2 md:col-2">
          <InputText v-model="token4" autocomplete="off" class="w-full" ref="token4"
            @input="focusNext($event, 'token5')" />
        </div>
        <div class="field col-2 md:col-2">
          <InputText v-model="token5" autocomplete="off" class="w-full" ref="token5"
            @input="focusNext($event, 'token6')" />
        </div>
        <div class="field col-2 md:col-2">
          <InputText v-model="token6" autocomplete="off" class="w-full" ref="token6" @input="validartoken" />
        </div>

        <div class="field col-12 md:col-12 mt-2">
          <p v-show="!showothertoken" :style="timerStyle">
            Podrás solicitar un nuevo Token en {{ displayTime }} segundos
          </p>
          <ButtonPrime v-show="showothertoken" label="Solicitar otro token" link @click="pedirnuevotoken" />
        </div>

        <div v-show="showvalidandotoken" class="field col-12 md:col-12">
          <ProgressBar mode="indeterminate" style="height: 0.5em" />
        </div>
      </div>
    </DialogModal>

    <ToastPrime />
    <FooterMain />
  </div>
</template>

<script>
import NavbarBlank from "@/components/NavbarBlank.vue";
import FooterMain from "@/components/FooterMain.vue";
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },

  name: "LoginView",
  data() {
    return {
      timer: null,
      currentTime: 80,
      timerStyle: {
        fontSize: "18px",
        color: "green",
      },
      showothertoken: false,

      documento: "",
      nombre: "",
      telefono: "",
      correo: "",
      token1: "",
      token2: "",
      token3: "",
      token4: "",
      token5: "",
      token6: "",
      tipodocumento: { name: "CC", code: 1 },
      tiposdocumentos: [
        { name: "CC", code: 1 },
        { name: "NIT", code: 2 },
      ],

      categories: [],
      selectedCategory: null,
      autenticar: false,
      medioenvio: null,

      //Digitar CC
      modalDocumentoVisible: true,

      // modalAutenticarVisible: false,

      //Digitar TOken
      modalTokenVisible: false,

      showconsultandoinfo: false,
      showenviandotoken: false,
      showvalidandotoken: false,
    };
  },

  components: {
    NavbarBlank,
    FooterMain
  },

  created() { },

  computed: {
    displayTime() {
      const minutes = Math.floor(this.currentTime / 60);
      const seconds = this.currentTime % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },

  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        if (this.currentTime > 0) {
          this.currentTime--;
        } else {
          clearInterval(this.timer);
          this.showothertoken = true;
        }
      }, 1000);
    },

    notify: function (severity, summary, detail, life) {
      this.toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: life,
      });
    },

    focusNext(event, nextRef) {
      const input = event.target;
      if (input.value.length >= input.maxLength) {
        const nextInput = this.$refs[nextRef];
        if (nextInput) {
          nextInput.$el.focus();
        } else {
          input.blur();
        }
      }
    },

    medioautenticar: function () {
      this.getAfiliado();
    },

    pedirnuevotoken: function () {
      // this.modalAutenticarVisible = true;
      this.modalTokenVisible = false;
    },

    validartoken: async function () {
      if (this.token6 == "") {
        return;
      }
      try {
        this.showvalidandotoken = true;

        var token_pre =
          this.token1 +
          this.token2 +
          this.token3 +
          this.token4 +
          this.token5 +
          this.token6;
        var token = token_pre.toUpperCase();

        let self = this;
        await this.axios
          .get("http://127.0.0.1:8000/api/token/" + token + "/" + this.documento + "/")
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              var data = response.data;
              if (Object.keys(data).length > 0) {
                localStorage.setItem("token", response.data.Numero);
                localStorage.setItem("documento", response.data.documento);
                localStorage.setItem("nombre", self.nombre);
                self.showvalidandotoken = false;
                self.$router.push("home");
              } else {
                self.notify(
                  self.TOAST.WARN,
                  self.MSG.WARN,
                  "El Token digitado es inválido",
                  self.TIME.SHORT
                );
              }
            } else if (
              response.status == self.APICONST.RESPONSE_STATUS_NO_FOUND
            ) {
              self.notify(
                self.TOAST.WARN,
                self.MSG.WARN,
                "El Token no corresponde al solicitado",
                self.TIME.SHORT
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
                this.TOAST.ERROR,
                this.MSG.ERROR,
                "Token inválido",
                this.TIME.SHORT
              );
            } else {
              this.notify(
                this.TOAST.ERROR,
                this.MSG.ERROR,
                "Ocurrió un problema en la validación del Token",
                this.TIME.SHORT
              );
            }
          })
          .finally(() => {
            this.showvalidandotoken = false;
          });
      } catch (error) {
        console.log("CATCH JS");
        console.log(error);
        this.notify(
          this.TOAST.WARN,
          this.MSG.WARN,
          "Error en el cliente JS",
          this.TIME.SHORT
        );
      }
    },

    getToken: async function () {
      if (this.selectedCategory == null) {
        this.notify(
          this.TOAST.WARN,
          this.MSG.WARN,
          "Opción inválida para el envío del Token",
          this.TIME.SHORT
        );

        return;
      }
      var datosEnviar = {
        key: this.selectedCategory.key,
        llave: this.selectedCategory.llave,
      };

      if (
        this.selectedCategory.key === "C" ||
        this.selectedCategory.key === "C1"
      ) {
        if (!this.UTILS.validarCorreo(this.selectedCategory.llave)) {
          this.notify(
            this.TOAST.WARN,
            this.MSG.WARN,
            "Correo inválido para el envío del Token",
            this.TIME.SHORT
          );
        } else {
          this.showenviandotoken = true;
          let vue = this;
          await this.axios
            .post("token/", datosEnviar)
            .then(function (response) {
              if (response.status == vue.APICONST.RESPONSE_STATUS_INSERT_OK) {
                // vue.modalAutenticarVisible = false;
                vue.modalTokenVisible = true;

                vue.showothertoken = false;
                vue.currentTime = 80;
                vue.startTimer();

                vue.notify(
                  vue.TOAST.SUCCESS,
                  vue.MSG.SUCCESS,
                  "Se ha enviado el token al correo: " +
                  vue.selectedCategory.llave,
                  vue.TIME.SHORT
                );
              } else {
                vue.notify(
                  vue.TOAST.ERROR,
                  vue.MSG.ERROR,
                  "Problemas al enviar el Token",
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
              vue.showenviandotoken = false;
            });
        }
      } else {
        if (!this.UTILS.validarCelular(this.selectedCategory.llave)) {
          this.notify(
            this.TOAST.WARN,
            this.MSG.WARN,
            "Teléfono inválido para el envío del Token",
            this.TIME.SHORT
          );
        } else {
          this.showenviandotoken = true;

          let vue = this;
          await this.axios
            .post("token/", datosEnviar)
            .then(function (response) {
              if (response.status == vue.APICONST.RESPONSE_STATUS_INSERT_OK) {
                // vue.modalAutenticarVisible = false;
                vue.modalTokenVisible = true;

                vue.showothertoken = false;
                vue.currentTime = 80;
                vue.startTimer();

                vue.notify(
                  vue.TOAST.SUCCESS,
                  vue.MSG.SUCCESS,
                  "Se ha enviado el token al teléfono: " +
                  vue.selectedCategory.llave,
                  vue.TIME.SHORT
                );
              } else {
                vue.notify(
                  vue.TOAST.ERROR,
                  vue.MSG.ERROR,
                  "Problemas al enviar el Token",
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
              vue.showenviandotoken = false;
            });
        }
      }
    },

    getAfiliado: async function () {
      try {
        this.showconsultandoinfo = true;

        if (this.documento == "") {
          this.notify(
            this.TOAST.WARN,
            this.MSG.WARN,
            "Debe digitar un N° de documento válido",
            this.TIME.SHORT
          );
          this.showconsultandoinfo = false;
          return;
        }

        let self = this;
        await this.axios
          .get("http://127.0.0.1:8000/api/afiliados/" + this.documento + "/")
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              var data = response.data;
              if (Object.keys(data).length > 0) {
                self.categories = response.data;
                self.nombre = self.categories[0].nombre;
                self.autenticar = true;
                self.modalDocumentoVisible = false;
                self.modalTokenVisible = true;
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
  },
};
</script>

<style>
.mainreduce {
  transform: scale(0.8) !important;
}

.custom-svg-icon {
  background: url("@/assets/icons/my-icon.svg");

  height: 30px;
  width: 30px;
}

label {
  font-size: 0.8rem;
}
</style>
