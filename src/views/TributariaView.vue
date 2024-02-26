<template>
  <div class="colorpanel">
    <NavbarMain />
    <div class="label-user mb-2">
      <ChipPrime class="pl-0 pr-3 reduce-setenta">
        <span class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center"><i
            class="pi pi-user"></i></span>
        <span class="ml-2 font-medium">{{ usuario }}</span>
      </ChipPrime>
    </div>
    <div class="container">
      <div class="formgrid grid">
        <!-- Card-->
        <div class="field col-12 md:col-12 mt-2">
          <div class="p-fluid grid formgrid">
            <div class="field col-12 md:col-3">
              <DropDown v-show="!cargaskeletonscombo" v-model="vehiculo" :options="misvehiculos" optionLabel="name"
                placeholder="Seleccionar vehículo" class="w-full" @change="consultarEmpresas($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-3">
              <DropDown v-show="!cargaskeletonscombo" v-model="company" :options="companies" optionLabel="name"
                placeholder="Seleccionar empresa" class="w-full" @change="consultarPeriodo($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-3">
              <DropDown v-show="!cargaskeletonscombo" v-model="anio" :options="anios" optionLabel="name"
                placeholder="Seleccionar año" class="w-full" @change="consultarMes($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-3">
              <DropDown v-show="!cargaskeletonscombo" v-model="mes" :options="meses" optionLabel="Name_MM"
                placeholder="Seleccionar mes" class="w-full" @change="consultarExtractos($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>
          </div>
        </div>

        <!-- Card Skeleton-->
        <!-- <div class="field col-12 md:col-12 mt-4">
          <div class="p-fluid grid formgrid">
            <div class="field col-12 md:col-4">
              
            </div>

            <div class="field col-12 md:col-4">
              <SkeletonLoading v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-4">
              <SkeletonLoading v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>
          </div>
        </div> -->

        <!-- DataTable -->
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <div class="field col-12 md:col-12">
              <DataTable v-show="!cargaskeletons" :value="extractos" stripedRows showGridlines
                tableStyle="min-width: 50rem" responsiveLayout="scroll" class="small-datatable">
                <!-- <ColumnBasic
                  style="width: 10%"
                  field="NumVehiculo"
                  header="Vehículo"
                ></ColumnBasic> -->

                <ColumnBasic style="width: 10%" field="Periodo" header="Periodo"></ColumnBasic>

                <ColumnBasic style="width: 40%" header="Cert. Retención">
                  <template #body="slotProps">
                    <ButtonPrime icon="pi pi-download" severity="success" aria-label="Cancel" label="Descargar" rounded
                      outlined @click="verCertificado(slotProps.data.Certificado)" />
                  </template>
                </ColumnBasic>
              </DataTable>
            </div>
            <!-- DataTable Skeleton -->
            <div class="field col-12 md:col-12">
              <DataTable :value="skeletons" v-show="cargaskeletons">
                <ColumnBasic field="ske1" header="Cargando...">
                  <template #body>
                    <SkeletonLoading></SkeletonLoading>
                  </template>
                </ColumnBasic>
                <ColumnBasic field="ske2" header="Cargando...">
                  <template #body>
                    <SkeletonLoading></SkeletonLoading>
                  </template>
                </ColumnBasic>
                <ColumnBasic field="ske3" header="Cargando...">
                  <template #body>
                    <SkeletonLoading></SkeletonLoading>
                  </template>
                </ColumnBasic>
                <ColumnBasic field="ske4" header="Cargando...">
                  <template #body>
                    <SkeletonLoading></SkeletonLoading>
                  </template>
                </ColumnBasic>
              </DataTable>
            </div>
          </div>

          <div class="field col-12 md:col-6">
            <div class="field col-12 md:col-12">
              <DataTable v-show="!cargaskeletons" :value="extractosanuales" stripedRows showGridlines
                tableStyle="min-width: 50rem" responsiveLayout="scroll" class="small-datatable">
                <!-- <ColumnBasic
                  style="width: 10%"
                  field="NumVehiculo"
                  header="Vehículo"
                ></ColumnBasic> -->

                <ColumnBasic style="width: 10%" field="Periodo" header="Periodo"></ColumnBasic>

                <ColumnBasic style="width: 40%" header="Cert. Renta">
                  <template #body="slotProps">
                    <ButtonPrime icon="pi pi-download" severity="success" aria-label="Cancel" label="Descargar" rounded
                      outlined @click="verCertificado(slotProps.data.Certificado)" />
                  </template>
                </ColumnBasic>
              </DataTable>
            </div>
            <!-- DataTable Skeleton -->
            <div class="field col-12 md:col-12">
              <DataTable :value="skeletons" v-show="cargaskeletons">
                <ColumnBasic field="ske1" header="Cargando...">
                  <template #body>
                    <SkeletonLoading></SkeletonLoading>
                  </template>
                </ColumnBasic>
                <ColumnBasic field="ske2" header="Cargando...">
                  <template #body>
                    <SkeletonLoading></SkeletonLoading>
                  </template>
                </ColumnBasic>
                <ColumnBasic field="ske3" header="Cargando...">
                  <template #body>
                    <SkeletonLoading></SkeletonLoading>
                  </template>
                </ColumnBasic>
                <ColumnBasic field="ske4" header="Cargando...">
                  <template #body>
                    <SkeletonLoading></SkeletonLoading>
                  </template>
                </ColumnBasic>
              </DataTable>
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
import { MenuItemService } from "@/service/ParamServices";
import { useToast } from "primevue/usetoast";

import {
  //ExtractoService,
  MesesService,
  SkeletonService,
  DataCompany,
} from "@/service/DBServices";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  name: "TributarioView",
  data() {
    return {
      usuario: "",
      documento: "",
      extractos: [],
      extractosanuales: [],
      skeletons: [],
      companies: [],
      companiesApi: [],

      afiliados: [],
      vehiculo: 0,
      company: 0,

      mes: 0,
      anio: 0,
      anios: [],

      meses: [],
      dataMoth: [],
      dataExtarct: [],

      misvehiculos: [],

      active: {
        label: "Datos personales",
        icon: "pi pi-fw pi-user",
        url: "/informacion",
      },

      items: [],

      cargaskeletons: false,
      cargaskeletonscombo: false,
    };
  },

  components: {
    NavbarMain,
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


    consultarEmpresas: async function (event) {
      try {
        this.vehiculo = event.value;
        this.cargaskeletonscombo = true;
        let self = this;
        await this.axios
          .get(
            "http://127.0.0.1:8000/api/afiliadosvehiculos/consultaempresa/" +
            this.documento +
            "/" +
            this.vehiculo.code +
            "/"
          )
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              var data = response.data;
              if (Object.keys(data).length > 0) {


                self.companies = self.UTILS.completeCompany(data, self.companiesApi);
                self.company = 0;
                self.extractos = [];

                self.notify(
                  self.TOAST.INFO,
                  self.MSG.INFO,
                  "En la opción: 'Seleccionar empresa', elija la empresa ",
                  self.TIME.MEDIUM
                );
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
                "No se cargaron las empresas",
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
              "Error al consultar empresas",
              this.TIME.SHORT
            );
          })
          .finally(() => {
            this.cargaskeletonscombo = false;
            this.anios = [];
            this.meses = [];

            this.dataExtarct = [];
            this.dataYear = [];
          });
      } catch (error) {
        console.log("CATCH JS");
        console.log(error);
        alert("Error en el cliente JS");
      }
    },


    consultarPeriodo: async function (event) {
      try {
        this.company = event.value;
        this.cargaskeletonscombo = true;
        let self = this;
        await this.axios
          .get(
            "http://127.0.0.1:8000/api/afiliadosvehiculos/consultaperiodo/" +
            this.documento +
            "/" +
            this.vehiculo.code +
            "/" +
            this.company.EmpresaID +
            "/"
          )
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              var data = response.data;
              if (Object.keys(data).length > 0) {
                self.anios = response.data;
                self.anio = 0;
                self.extractos = [];

                self.notify(
                  self.TOAST.INFO,
                  self.MSG.INFO,
                  "En la opción: 'Seleccionar año', elija el periodo a consultar  ",
                  self.TIME.MEDIUM
                );
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
                "No se cargaron los años",
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
              "Error al consultar años",
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

    consultarMes: async function (event) {
      try {
        this.anio = event.value;
        this.cargaskeletonscombo = true;
        let self = this;
        await this.axios
          .get(
            "http://127.0.0.1:8000/api/afiliadosvehiculos/consultaextractoreport/" +
            this.documento +
            "/" +
            this.vehiculo.code +
            "/" +
            this.anio.code +
            "/" +
            this.company.EmpresaID +
            "/"
          )
          .then(function (response) {
            let respuesta = response.data;
            let arreglo = self.UTILS.completeMoth(respuesta, self.dataMoth);

            self.meses = arreglo;
            self.extractos = respuesta;
          })
          .catch((error) => {
            console.log("CATCH AXIOS");
            console.log(error);
            console.log(error.request.status);
          })
          .finally(() => {
            this.cargaskeletonscombo = false;
          });
      } catch (error) {
        console.log("CATCH JS");
        console.log(error);
      }
    },

    consultarExtractos: async function (event) {
      try {
        this.mes = event.value;
        this.cargaskeletonscombo = true;
        let self = this;
        await this.axios
          .get(
            "http://127.0.0.1:8000/api/afiliadosvehiculos/consultaextractoreport/" +
            this.documento +
            "/" +
            this.vehiculo.code +
            "/" +
            this.anio.code +
            "/" +
            this.mes.Per_MM +
            "/" +
            this.company.EmpresaID +
            "/"
          )
          .then(function (response) {
            console.log(response.data);
            let respuesta = response.data;
            self.dataExtarct = respuesta;
            self.extractos = respuesta;
          })
          .catch((error) => {
            console.log("CATCH AXIOS");
            console.log(error);
            console.log(error.request.status);
          })
          .finally(() => {
            this.cargaskeletonscombo = false;
          });
      } catch (error) {
        console.log("CATCH JS");
        console.log(error);
      }
    },

    verCertificado: function (nombre) {
      // var link = this.axios.defaults.baseURL + "descargar/" + nombre + "/";
      var link = this.axios.get("http://127.0.0.1:8000/api/descargar/" + nombre + "/");
      //var link = "http://gestor.berlinasdelfonce.com/pdf_extractos/" + nombre;
      window.open(link, "_blank");
    },

    verPlanilla: function (nombre) {
      if (nombre != null) {
        // var link = this.axios.defaults.baseURL + "descargar/" + nombre + "/";
        var link = this.axios.get("http://127.0.0.1:8000/api/descargar/" + nombre + "/");
        //var link = "http://gestor.berlinasdelfonce.com/pdf_extractos/" + nombre;
        window.open(link, "_blank");
      }
    },

    getMyVehicles: async function () {
      try {
        this.cargaskeletonscombo = true;
        let self = this;
        await this.axios
          .get("http://127.0.0.1:8000/api/afiliadosvehiculos/consultaxafiliado/" + this.documento + "/")
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              var data = response.data;
              if (Object.keys(data).length > 0) {
                self.misvehiculos = response.data;

                self.notify(
                  self.TOAST.INFO,
                  self.MSG.INFO,
                  "En la opción: 'Seleccionar vehículo' por favor elija uno",
                  self.TIME.MEDIUM
                );
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
                "No se cargaron vehículos",
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
  },

  created: function () {
    this.documento = localStorage.getItem("documento");
    this.usuario = localStorage.getItem("nombre");
    this.skeletons = SkeletonService;

    this.items = MenuItemService;

    //this.misvehiculos = MisVehiculosService;
    this.dataMoth = MesesService;
    this.companiesApi = DataCompany;

    this.getMyVehicles();
  },

  mounted() {
    if (!localStorage.getItem("documento")) {
      this.$router.push("/");
    } else {
      this.documento = localStorage.getItem("documento");
      //this.mensajeOK('Bienvenido: ' + localStorage.getItem('name'));
    }
  },
};
</script>

<style>
@import "../assets/css/styles.css";

label {
  font-size: 0.8rem;
}

.small-datatable {
  font-size: 0.8rem;
  /* reducir el tamaño de fuente en un 20% */
}

.small-datatable .p-datatable-thead th {
  padding: 0.25rem 0.5rem;
  /* reducir el padding en un 20% */
}
</style>
