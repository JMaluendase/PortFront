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
        <div class="field col-12 md:col-4">
          <div class="card card-green" v-show="!cargaskeletons">
            <div class="row">
              <div class="col-70">
                <p class="text ml-1 mt-2">Ingreso acumulado</p>
              </div>
              <div class="col-30">
                <i class="pi pi-dollar mr-2 mt-1" style="font-size: 1.3rem; color: white"></i>
              </div>
            </div>
            <div class="row">
              <p class="number ml-1 mt-2">
                {{ UTILS.formatCurrency(medidas.acumuladoverde) }}
              </p>
            </div>
          </div>

          <div class="card" v-show="cargaskeletons">
            <SkeletonLoading height="6rem"></SkeletonLoading>
          </div>
        </div>

        <div class="field col-12 md:col-4">
          <div class="card card-red" v-show="!cargaskeletons">
            <div class="row">
              <div class="col-70">
                <p class="text ml-1 mt-2">Egresos acumulados</p>
              </div>
              <div class="col-30">
                <i class="pi pi-sort-amount-down mr-2 mt-1" style="font-size: 1.3rem; color: white"></i>
              </div>
            </div>
            <div class="row">
              <p class="number ml-1 mt-2">
                {{ UTILS.formatCurrency(medidas.acumuladorojo) }}
              </p>
            </div>
          </div>

          <div class="card" v-show="cargaskeletons">
            <SkeletonLoading height="6rem"></SkeletonLoading>
          </div>
        </div>

        <div class="field col-12 md:col-4">
          <div class="card card-blue" v-show="!cargaskeletons">
            <div class="row">
              <div class="col-70">
                <p class="text ml-1 mt-2">Diferencia</p>
              </div>
              <div class="col-30">
                <i class="pi pi-wallet mr-2 mt-1" style="font-size: 1.3rem; color: white"></i>
              </div>
            </div>
            <div class="row">
              <p class="number ml-1 mt-2">
                {{ UTILS.formatCurrency(medidas.acumuladoutilidad) }}
              </p>
            </div>
          </div>

          <div class="card" v-show="cargaskeletons">
            <SkeletonLoading height="6rem"></SkeletonLoading>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <div class="p-fluid grid formgrid container">
            <div class="field col-12 md:col-4">
              <DropDown v-show="!cargaskeletonscombo" v-model="vehiculo" :options="misvehiculos" optionLabel="name"
                placeholder="Seleccionar vehículo" class="w-full" @change="consultarEmpresas($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-4">
              <DropDown v-show="!cargaskeletonscombo" v-model="company" :options="companies" optionLabel="name"
                placeholder="Seleccionar empresa" class="w-full" @change="consultarPeriodo($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-4">
              <DropDown v-show="!cargaskeletonscombo" v-model="anio" :options="anios" optionLabel="name"
                placeholder="Seleccionar año" class="w-full" @change="queryDataYear($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>
          </div>
        </div>

        <div class="field col-12 md:col-12">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <CardView role="region" class="card-default">
                <template #subtitle> {{ tittle }} </template>
                <template #content>
                  <ChartView v-show="!loading" type="line" :data="dataEgresosIngresos" :options="OptionsLines"
                    :responsive="true" />
                  <SkeletonLoading v-show="loading" width="100%" class="mb-2"></SkeletonLoading>
                  <SkeletonLoading v-show="loading" width="100%" height="150px"></SkeletonLoading>
                </template>
              </CardView>
            </div>

            <div class="field col-12 md:col-6">
              <CardView role="region" class="card-default">
                <template #subtitle> {{ tittle }} </template>
                <template #content>
                  <ChartView v-show="!loading" type="bar" :data="dataEgresosIngresosBar" :options="OptionsBar"
                    class="w-full" :responsive="true" />
                  <SkeletonLoading v-show="loading" width="100%" class="mb-2"></SkeletonLoading>
                  <SkeletonLoading v-show="loading" width="100%" height="150px"></SkeletonLoading>
                </template>
              </CardView>
            </div>
          </div>
        </div>

        <div class="field col-12 md:col-12">
          <div class="p-fluid grid formgrid container">
            <div class="field col-12 md:col-4">
              <DropDown v-show="!cargaskeletonscombo" v-model="mes" :options="meses" placeholder="Seleccionar mes"
                class="w-full" optionLabel="Name_MM" @change="consultarExtractos($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-4">
              <DropDown v-show="!cargaskeletonscombo" v-model="concepto" :options="conceptos" optionLabel="name"
                placeholder="Seleccionar concepto" class="w-full"
                @change="consultarSubConceptosExtractosEgreso($event)" />
              <!-- cargarDonaConceptos -->
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>

            <div class="field col-12 md:col-4">
              <DropDown v-show="!cargaskeletonscombo" v-model="subconcepto" :options="subconceptos" optionLabel="name"
                placeholder="Seleccionar Item concepto" class="w-full" @change="cargarSubConceptos($event)" />
              <SkeletonLoading height="3rem" v-show="cargaskeletonscombo"></SkeletonLoading>
            </div>
          </div>
        </div>

        <div class="field col-12 md:col-12">
          <div class="formgrid grid">
            <div class="field col-12 md:col-4">
              <CardView role="region" class="card-default centro">
                <template #subtitle>
                  {{ tittleDonnaEgresos }}
                </template>
                <template #content>
                  <ChartView v-show="!loadingDona" type="doughnut" :data="dataEgresos" :options="optionsDoughnut"
                    class="centro w-full md:w-20rem" :responsive="true" />
                  <SkeletonLoading v-show="loadingDona" width="100%" class="mb-2"></SkeletonLoading>
                  <SkeletonLoading v-show="loadingDona" width="100%" height="150px"></SkeletonLoading>
                </template>
              </CardView>
            </div>

            <div class="field col-12 md:col-4">
              <CardView role="region" class="card-default centro">
                <template #subtitle>
                  {{ tittleDonnaConceptos }}
                </template>
                <template #content>
                  <ChartView v-show="!loadingDonaConceptos" type="doughnut" :data="dataConceptos"
                    :options="optionsDoughnutConcepts" class="centro w-full md:w-20rem" :responsive="true" />
                  <SkeletonLoading v-show="loadingDonaConceptos" width="100%" class="mb-2"></SkeletonLoading>
                  <SkeletonLoading v-show="loadingDonaConceptos" width="100%" height="150px"></SkeletonLoading>
                </template>
              </CardView>
            </div>

            <div class="field col-12 md:col-4">
              <CardView role="region" class="card-default centro">
                <template #subtitle>
                  {{ tittleDonnaSubConceptos }}
                </template>
                <template #content>
                  <!-- 
                    <ChartView
                    v-show="!loadingDonaSubConceptos"
                    type="bar"
                    :data="dataSubConceptos"
                    :options="optionsSubConcepts"
                    class="centro w-full md:w-20rem"
                    :responsive="true"
                  />


                  -->

                  <ChartView v-show="!loadingDonaSubConceptos" type="bar" :data="dataSubConceptos"
                    :options="optionsSubConcepts" />

                  <SkeletonLoading v-show="loadingDonaSubConceptos" width="100%" class="mb-2"></SkeletonLoading>
                  <SkeletonLoading v-show="loadingDonaSubConceptos" width="100%" height="150px"></SkeletonLoading>
                </template>
              </CardView>
            </div>
          </div>
        </div>

        <div class="field col-12 md:col-12">
          <div class="p-fluid grid formgrid container">
            <div class="field col-12 md:col-6">
              <DropDown v-model="conceptoIngreso" :options="conceptosIngreso" optionLabel="name"
                placeholder="Seleccionar concepto Ingreso" class="w-full"
                @change="consultarSubConceptosExtractosIngreso($event)" />
            </div>

            <div class="field col-12 md:col-6">
              <DropDown v-model="subconceptoIngreso" :options="subconceptosIngreso" optionLabel="name"
                placeholder="Seleccionar Item ingreso" class="w-full" @change="cargarSubConceptosIngreso($event)" />
            </div>
          </div>
        </div>

        <div class="field col-12 md:col-12">
          <div class="formgrid grid">
            <div class="field col-12 md:col-4">
              <CardView role="region" class="card-default centro">
                <template #subtitle>
                  {{ tittleDonnaIngresos }}
                </template>
                <template #content>
                  <ChartView v-show="!loadingDona" type="doughnut" :data="dataIngresos" :options="optionsDoughnut"
                    class="centro w-full md:w-20rem" :responsive="true" />
                  <SkeletonLoading v-show="loadingDona" width="100%" class="mb-2"></SkeletonLoading>
                  <SkeletonLoading v-show="loadingDona" width="100%" height="150px"></SkeletonLoading>
                </template>
              </CardView>
            </div>

            <div class="field col-12 md:col-4">
              <CardView role="region" class="card-default centro">
                <template #subtitle>
                  {{ tittleDonnaConceptosIngreso }}
                </template>
                <template #content>
                  <ChartView v-show="!loadingDonaConceptosIngreso" type="doughnut" :data="dataConceptosIngreso"
                    :options="optionsDoughnutConceptsIngreso" class="centro w-full md:w-20rem" :responsive="true" />
                  <!-- <ButtonPrime
                    icon="pi pi-file-pdf"
                    severity="danger"
                    aria-label="Cancel"
                    label=""
                    @click="zoomChartConceptosIngresos()"
                  /> -->
                  <SkeletonLoading v-show="loadingDonaConceptosIngreso" width="100%" class="mb-2"></SkeletonLoading>
                  <SkeletonLoading v-show="loadingDonaConceptosIngreso" width="100%" height="150px"></SkeletonLoading>
                </template>
              </CardView>
            </div>

            <div class="field col-12 md:col-4">
              <CardView role="region" class="card-default centro">
                <template #subtitle>
                  {{ tittleDonnaSubConceptosIngreso }}
                </template>
                <template #content>
                  <ChartView v-show="!loadingDonaSubConceptosIngreso" type="bar" :data="dataSubConceptosIngreso"
                    :options="optionsSubConcepts" />

                  <SkeletonLoading v-show="loadingDonaSubConceptosIngreso" width="100%" class="mb-2"></SkeletonLoading>
                  <SkeletonLoading v-show="loadingDonaSubConceptosIngreso" width="100%" height="150px"></SkeletonLoading>
                </template>
              </CardView>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ToastPrime />

    <DialogModal :visible="zoomChartConceptsIngresos" @update:visible="ocultarChartConceptsIngresos" :modal="true"
      maximizable :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <ChartView v-show="!loadingDonaConceptosIngreso" type="doughnut" :data="dataConceptosIngreso"
        :options="optionsDoughnutConceptsIngreso" class="centro w-full md:w-20rem" :responsive="true" />
    </DialogModal>
    <FooterMain />
  </div>
</template>

<script>
import NavbarMain from "@/components/NavbarMain.vue";
import FooterMain from "@/components/FooterMain.vue";

import { useToast } from "primevue/usetoast";

import { ColorService } from "@/service/ColorServices";
import { OptionsLineService, OptionsBarService } from "@/service/ParamServices";
import {
  MesesService,
  FilterConceptService,
  DataCompany,
} from "@/service/DBServices";

// let mes = { name: "Ninguno", code: 6 };
// let concepto = { name: "Ninguno", code: 0 };
// let subconcepto = { name: "Ninguno", code: 0 };
// let conceptoIngreso = { name: "Ninguno", code: 0 };
// let subconceptoIngreso = { name: "Ninguno", code: 0 };

const TYPE_NVL = { INGRESO: 1, EGRESO: 2 };

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },

  name: "MisVehiculosView",
  data() {
    return {
      usuario: "",
      documento: "",
      vehiculo: 0,
      empresa: 0,
      company: 0,

      mes: 0,
      anio: 0,
      anios: [],
      companies: [],
      companiesApi: [],

      meses: [],
      apiMoth: [],
      dataExtarct: [],
      dataYear: [],
      apiConcepts: [],

      codeingreso: 1,
      codeegreso: 2,

      misvehiculos: [],
      loading: false,
      loadingDona: false,
      loadingDonaConceptos: false,
      loadingDonaSubConceptos: false,
      loadingDonaConceptosIngreso: false,
      loadingDonaSubConceptosIngreso: false,

      zoomChartConceptsIngresos: false,

      tittle: "Ingresos/Egresos (Año ?)",

      tittleDonnaEgresos: "Egresos del mes de: ",
      tittleDonnaIngresos: "Ingresos del mes de: ",
      tittleDonnaConceptos: "Concepto: ",
      tittleDonnaConceptosIngreso: "Concepto: ",
      tittleDonnaSubConceptos: "Concepto: ",
      tittleDonnaSubConceptosIngreso: "Concepto: ",
      concepto: null,
      conceptos: [],
      subconcepto: null,
      subconceptos: [],
      conceptoIngreso: null,
      conceptosIngreso: [],
      subconceptoIngreso: null,
      subconceptosIngreso: [],

      cargaskeletonscombo: false,

      active: {
        label: "",
        icon: "pi pi-fw pi-dollar",
        url: "/producido",
      },

      medidas: {
        acumuladoverde: 0,
        acumuladorojo: 0,
        acumuladoutilidad: 0,
        movilizados: 0,
        lineas: 0,
      },

      items: [],

      dataEgresosIngresos: [],
      dataEgresosIngresosBar: [],
      dataEgresos: [],
      dataIngresos: [],
      dataConceptos: [],
      dataSubConceptos: [],

      dataExtractEgresosJS: [],
      dataExtractIngresosJS: [],

      dataConceptosIngreso: [],
      dataSubConceptosIngreso: [],

      optionsDoughnut: {
        cutout: "40%",
      },

      optionsDoughnutConcepts: [],
      optionsDoughnutConceptsIngreso: [],

      OptionsLines: [],

      OptionsBar: [],

      optionsSubConcepts: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },

      cargaskeletons: false,
    };
  },

  components: {
    NavbarMain,
    FooterMain
  },

  created: function () {
    this.documento = localStorage.getItem("documento");
    this.usuario = localStorage.getItem("nombre");

    this.getMyVehicles();

    this.apiMoth = MesesService;
    this.OptionsLines = OptionsLineService;
    this.OptionsBar = OptionsBarService;
    this.apiConcepts = FilterConceptService;
    this.companiesApi = DataCompany;
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

    ocultarChartConceptsIngresos: function (value) {
      if (!value) {
        this.zoomChartConceptsIngresos = false;
      }
    },

    zoomChartConceptosIngresos: function () {
      this.zoomChartConceptsIngresos = true;
    },

    cargarIngresosEgresos: function () {
      const queryIngresos = this.dataYear.filter(
        (element) => element.Nivel0 === TYPE_NVL.INGRESO
      );

      const queryEgresos = this.dataYear.filter(
        (element) => element.Nivel0 === TYPE_NVL.EGRESO
      );

      //CHECK-POINT

      const arregloSumatoriaIngresos = queryIngresos.reduce(
        (acumulador, item) => {
          const { Per_MM, ValorIng } = item;

          if (!acumulador[Per_MM]) {
            acumulador[Per_MM] = { Per_MM, sumatoria: 0 };
          }

          acumulador[Per_MM].sumatoria += ValorIng;

          return acumulador;
        },
        {}
      );

      const arregloSumatoriaEgresos = queryEgresos.reduce(
        (acumulador, item) => {
          const { Per_MM, ValorEgr } = item;

          if (!acumulador[Per_MM]) {
            acumulador[Per_MM] = { Per_MM, sumatoria: 0 };
          }

          acumulador[Per_MM].sumatoria += ValorEgr;

          return acumulador;
        },
        {}
      );

      const queryIngresosTotales = Object.values(arregloSumatoriaIngresos);
      const queryEgresosTotales = Object.values(arregloSumatoriaEgresos);

      queryIngresosTotales.forEach((item) => {
        this.medidas.acumuladoverde += item.sumatoria;
      });

      queryEgresosTotales.forEach((item) => {
        this.medidas.acumuladorojo += item.sumatoria;
      });

      this.medidas.acumuladoutilidad =
        this.medidas.acumuladoverde - this.medidas.acumuladorojo;

      let labelsIngresos = queryIngresosTotales.map((concepto) =>
        this.UTILS.getMonthLabel(concepto.Per_MM)
      );
      let dataIngresos = queryIngresosTotales.map(
        (concepto) => concepto.sumatoria
      );

      let labelsEgresos = queryEgresosTotales.map((concepto) =>
        this.UTILS.getMonthLabel(concepto.Per_MM)
      );
      let dataEgresos = queryEgresosTotales.map(
        (concepto) => concepto.sumatoria
      );

      setTimeout(() => {
        this.dataEgresosIngresos = {
          labels: labelsEgresos,
          datasets: [
            {
              label: "Ingresos",
              data: dataIngresos,
              fill: false,
              borderColor: "rgb(34, 177, 76)",
              tension: 0.4,
            },
            {
              label: "Egresos",
              data: dataEgresos,
              fill: false,
              borderColor: "rgb(237, 28, 35)",
              tension: 0.4,
            },
          ],
        };

        this.dataEgresosIngresosBar = {
          labels: labelsIngresos,
          datasets: [
            {
              label: "Ingresos",
              backgroundColor: "rgb(34, 177, 76)",
              borderColor: "rgb(34, 177, 76)",
              data: dataIngresos,
            },
            {
              label: "Egresos",
              backgroundColor: "rgb(237, 28, 35)",
              borderColor: "rgb(237, 28, 35)",
              data: dataEgresos,
            },
          ],
        };
      }, 200);
    },

    cargarDona: function (dataImportIngresos, dataImportEgresos) {
      this.tittleDonnaEgresos = "Cargando Información...";
      this.tittleDonnaIngresos = "Cargando Información...";
      this.loadingDona = true;

      setTimeout(() => {
        this.conceptos = dataImportEgresos.map((item) => ({
          code: item.NivelID,
          name: item.Nvl_Name,
        }));

        let labels = dataImportEgresos.map((concepto) => concepto.Nvl_Name);
        let data = dataImportEgresos.map((concepto) => concepto.totalCost);

        let size = labels.length;
        let startIndex = 0;
        let backgroundColorSelected = ColorService.slice(
          startIndex,
          startIndex + size
        ).map((color) => color.rgb);

        this.dataEgresos = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColorSelected,
              hoverBackgroundColor: backgroundColorSelected,
            },
          ],
        };

        this.conceptosIngreso = dataImportIngresos.map((item) => ({
          code: item.NivelID,
          name: item.Nvl_Name,
        }));

        labels = dataImportIngresos.map((concepto) => concepto.Nvl_Name);
        data = dataImportIngresos.map((concepto) => concepto.totalCost);

        size = labels.length;
        startIndex = 0;
        backgroundColorSelected = ColorService.slice(
          startIndex,
          startIndex + size
        ).map((color) => color.rgb);

        this.dataIngresos = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColorSelected,
              hoverBackgroundColor: backgroundColorSelected,
            },
          ],
        };

        this.optionsDoughnut = {
          plugins: {
            legend: {
              labels: {
                generateLabels: function (chart) {
                  const data = chart.data.datasets[0].data;
                  const total = data.reduce((acc, val) => acc + val);
                  return data.map((value, index) => {
                    const percentage = ((value / total) * 100).toFixed(2);
                    return {
                      text: `${chart.data.labels[index]} ${percentage}%`,
                      fillStyle: chart.data.datasets[0].backgroundColor[index],
                      hidden:
                        isNaN(value) ||
                        chart.getDatasetMeta(0).data[index].hidden,
                      index,
                      datasetIndex: 0,
                    };
                  });
                },
              },
            },
          },
        };

        this.tittleDonnaEgresos =
          "Egresos del mes de: " + this.mes.Name_MM + "-" + this.anio.name;
        this.tittleDonnaIngresos =
          "Ingresos del mes de: " + this.mes.Name_MM + "-" + this.anio.name;
        this.loadingDona = false;

        this.dataConceptos = [];
        this.optionsDoughnutConcepts = [];
      }, 200);
    },

    cargarDonaConceptos: function (subconceptos) {
      this.tittleDonnaConceptos = "Cargando Información...";
      this.loadingDonaConceptos = true;

      setTimeout(() => {
        this.subconceptos = subconceptos.map((item) => ({
          code: item.ConceptoID,
          name: item.Cto_Des,
        }));

        let labels = subconceptos.map((concepto) => concepto.Cto_Des);
        let data = subconceptos.map((concepto) => concepto.ValorEgr);

        let size = labels.length;
        let startIndex = 0;
        let backgroundColorSelected = ColorService.slice(
          startIndex,
          startIndex + size
        ).map((color) => color.rgb);

        this.dataConceptos = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColorSelected,
              hoverBackgroundColor: backgroundColorSelected,
            },
          ],
        };

        this.optionsDoughnutConcepts = {
          plugins: {
            legend: {
              labels: {
                generateLabels: function (chart) {
                  const data = chart.data.datasets[0].data;
                  const total = data.reduce((acc, val) => acc + val);
                  return data.map((value, index) => {
                    const percentage = ((value / total) * 100).toFixed(2);
                    return {
                      text: `${chart.data.labels[index]} ${percentage}%`,
                      fillStyle: chart.data.datasets[0].backgroundColor[index],
                      hidden:
                        isNaN(value) ||
                        chart.getDatasetMeta(0).data[index].hidden,
                      index,
                      datasetIndex: 0,
                    };
                  });
                },
              },
            },
          },
        };

        this.tittleDonnaConceptos = "Concepto: " + this.concepto.name;
        this.loadingDonaConceptos = false;

        this.dataSubConceptos = [];
      }, 200);
    },

    cargarDonaConceptosIngreso: function (subconceptos) {
      this.tittleDonnaConceptosIngreso = "Cargando Información...";
      this.loadingDonaConceptosIngreso = true;

      setTimeout(() => {
        this.subconceptosIngreso = subconceptos.map((item) => ({
          code: item.ConceptoID,
          name: item.Cto_Des_new,
        }));

        let labels = subconceptos.map((concepto) => concepto.Cto_Des_new);
        let data = subconceptos.map((concepto) => concepto.ValorIng);

        let size = labels.length;
        let startIndex = 0;
        let backgroundColorSelected = ColorService.slice(
          startIndex,
          startIndex + size
        ).map((color) => color.rgb);

        this.dataConceptosIngreso = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColorSelected,
              hoverBackgroundColor: backgroundColorSelected,
            },
          ],
        };

        this.optionsDoughnutConceptsIngreso = {
          plugins: {
            legend: {
              labels: {
                generateLabels: function (chart) {
                  const data = chart.data.datasets[0].data;
                  const total = data.reduce((acc, val) => acc + val);
                  return data.map((value, index) => {
                    const percentage = ((value / total) * 100).toFixed(2);
                    return {
                      text: `${chart.data.labels[index]} ${percentage}%`,
                      fillStyle: chart.data.datasets[0].backgroundColor[index],
                      hidden:
                        isNaN(value) ||
                        chart.getDatasetMeta(0).data[index].hidden,
                      index,
                      datasetIndex: 0,
                    };
                  });
                },
              },
            },
          },
        };

        this.tittleDonnaConceptosIngreso =
          "Concepto: " + this.conceptoIngreso.name;
        this.loadingDonaConceptosIngreso = false;

        this.dataSubConceptosIngreso = [];
      }, 200);
    },

    cargarSubConceptos: function (event) {
      this.subConcepto = event.value;

      //const dataIngresosBrutos = self.dataExtarct.filter((item) => item.Nivel0 === TYPE_NVL.INGRESO);
      const dataEgresosBrutos = this.dataYear.filter(
        (item) => item.Nivel0 === TYPE_NVL.EGRESO
      );

      // this.tittleDonnaSubConceptos = "Cargando Información...";
      // this.loadingDonaSubConceptos = true;

      // setTimeout(() => {
      const queryEgresos = dataEgresosBrutos.filter(
        (element) => element.ConceptoID === this.subConcepto.code
      );

      queryEgresos.sort((a, b) => a.Per_MM - b.Per_MM);

      let arreglo = this.UTILS.completeMothReduce(queryEgresos, this.apiMoth);

      // let labels = queryEgresos.map((concepto) => concepto.Name_MM);
      // let data = queryEgresos.map((concepto) => concepto.ValorEgr);

      let labels = arreglo.map((concepto) => concepto.Name_MM);
      let data = arreglo.map((concepto) => concepto.ValorEgr);

      let size = labels.length;
      let startIndex = 0;
      let backgroundColorSelected = ColorService.slice(
        startIndex,
        startIndex + size
      ).map((color) => color.rgb);

      this.dataSubConceptos = {
        labels: labels,
        datasets: [
          {
            label: this.subconcepto.name,
            data: data,
            backgroundColor: backgroundColorSelected,
            borderWidth: 1,
          },
        ],
      };

      this.tittleDonnaSubConceptos = "Concepto: " + this.subconcepto.name;
      //   this.loadingDonaSubConceptos = false;
      // }, 200);
    },

    cargarSubConceptosIngreso: function (event) {
      this.subconceptoIngreso = event.value;

      const dataIngresosBrutos = this.dataYear.filter(
        (item) => item.Nivel0 === TYPE_NVL.INGRESO
      );

      const queryIngresos = dataIngresosBrutos.filter(
        (element) => element.ConceptoID === this.subconceptoIngreso.code
      );

      const queryIngresosConceptSelected = queryIngresos.filter(
        (element) => element.NivelID === this.conceptoIngreso.code
      );

      queryIngresosConceptSelected.sort((a, b) => a.Per_MM - b.Per_MM);

      console.log(queryIngresosConceptSelected);

      let arreglo = this.UTILS.completeMothReduce(queryIngresosConceptSelected, this.apiMoth);

      let labels = arreglo.map((concepto) => concepto.Name_MM);
      let data = arreglo.map((concepto) => concepto.ValorIng);

      let size = labels.length;
      let startIndex = 0;
      let backgroundColorSelected = ColorService.slice(
        startIndex,
        startIndex + size
      ).map((color) => color.rgb);

      this.dataSubConceptosIngreso = {
        labels: labels,
        datasets: [
          {
            label: this.subconceptoIngreso.name,
            data: data,
            backgroundColor: backgroundColorSelected,
            borderWidth: 1,
          },
        ],
      };

      this.tittleDonnaSubConceptosIngreso =
        "Concepto: " + this.subconceptoIngreso.name;
      //   this.loadingDonaSubConceptos = false;
      // }, 200);
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
                  self.TIME.LONG
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
                self.empresa = response.data[0].EmpresaID;
                self.anio = 0;
                self.notify(
                  self.TOAST.INFO,
                  self.MSG.INFO,
                  "En la opción: 'Seleccionar año', elija el periodo a consultar  ",
                  self.TIME.LONG
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

    queryDataYear: async function (event) {
      try {
        this.anio = event.value;
        this.cargaskeletons = true;
        this.cargaskeletonscombo = true;
        this.tittle = "Cargando Información...";
        this.loading = true;

        let self = this;
        await this.axios
          .get(
            "http://127.0.0.1:8000/api/afiliadosvehiculos/consultaextracto/" +
            this.company.EmpresaID +
            "/" +
            this.vehiculo.code +
            "/" +
            this.anio.code +
            "/"
          )
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              let respuesta = response.data;
              if (Object.keys(respuesta).length > 0) {
                self.dataYear = respuesta;
                const uniquePerMM = new Set();
                for (const item of self.dataYear) {
                  uniquePerMM.add(item.Per_MM);
                }

                let result = Array.from(uniquePerMM).map((Per_MM) => ({
                  Per_MM: Per_MM,
                }));

                result.sort((a, b) => a.Per_MM - b.Per_MM);

                let arreglo = self.UTILS.completeMoth(result, self.apiMoth);
                self.meses = arreglo;

                self.notify(
                  self.TOAST.INFO,
                  self.MSG.INFO,
                  "Se ha cargado la información del vehículo: " +
                  self.vehiculo.name +
                  " para el año: " +
                  self.anio.code +
                  "",
                  self.TIME.MEDIUM
                );

                self.notify(
                  self.TOAST.INFO,
                  self.MSG.INFO,
                  "Desplace hacia abajo y en la opción: 'Seleccionar mes' puede revisar en detalle los: Ingresos y Egresos",
                  self.TIME.EXTRALONG
                );
              } else {
                self.notify(
                  self.TOAST.WARN,
                  self.MSG.WARN,
                  "Respuesta vacía: []",
                  self.TIME.SHORT
                );
              }
            }
          })
          .catch((error) => {
            console.log("CATCH AXIOS");
            console.log(error);

            this.notify(
              this.TOAST.ERROR,
              this.MSG.ERROR,
              "Error al consultar información del año: queryDataYear ",
              this.TIME.SHORT
            );
          })
          .finally(() => {
            this.cargaskeletonscombo = false;
            this.cargarIngresosEgresos();

            this.dataIngresos = [];
            this.dataEgresos = [];
            this.optionsDoughnut = [];

            this.dataConceptos = [];
            this.optionsDoughnutConcepts = [];

            this.dataSubConceptos = [];

            this.dataConceptosIngreso = [];
            this.optionsDoughnutConceptsIngreso = [];
            this.dataSubConceptosIngreso = [];

            this.tittle = "Ingresos/Egresos (Año " + this.anio.code + ")";
            this.loading = false;
            this.cargaskeletons = false;
          });
      } catch (error) {
        console.log("CATCH JS");
        console.log(error);
        alert("Error en el cliente JS");
      }
    },

    consultarExtractos: async function (event) {
      try {
        this.mes = event.value;

        this.cargaskeletonscombo = true;
        let self = this;
        await this.axios
          .get(
            "http://127.0.0.1:8000/api/afiliadosvehiculos/consultaextracto/" +
            this.empresa +
            "/" +
            this.vehiculo.code +
            "/" +
            this.anio.code +
            "/" +
            this.mes.Per_MM +
            "/"
          )
          .then(function (response) {
            if (response.status == self.APICONST.RESPONSE_STATUS_GET_OK) {
              let respuesta = response.data;
              if (Object.keys(respuesta).length > 0) {
                self.dataExtarct = respuesta;

                const dataIngresosBrutos = self.dataExtarct.filter(
                  (item) => item.Nivel0 === TYPE_NVL.INGRESO
                );

                const dataEgresosBrutos = self.dataExtarct.filter(
                  (item) => item.Nivel0 === TYPE_NVL.EGRESO
                );

                self.dataExtractIngresosJS =
                  self.UTILS.groupByArrayIngresos(dataIngresosBrutos);
                self.dataExtractEgresosJS =
                  self.UTILS.groupByArrayEgresos(dataEgresosBrutos);

                self.cargarDona(
                  self.dataExtractIngresosJS,
                  self.dataExtractEgresosJS
                );

                self.notify(
                  self.TOAST.INFO,
                  self.MSG.INFO,
                  "Se ha cargado la información del vehículo: " +
                  self.vehiculo.name +
                  " para el pediodo: " +
                  self.mes.Name_MM +
                  "-" +
                  self.anio.code +
                  " ",
                  self.TIME.MEDIUM
                );

                self.notify(
                  self.TOAST.INFO,
                  self.MSG.INFO,
                  "En la opción: 'Seleccionar concepto' puede revisarlo al detalle",
                  self.TIME.BIGLONG
                );

                //self.dataYear = respuesta;
                //console.log(respuesta);
              } else {
                self.notify(
                  self.TOAST.WARN,
                  self.MSG.WARN,
                  "Respuesta vacía: []",
                  self.TIME.SHORT
                );
              }
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

    consultarSubConceptosExtractosEgreso: function (event) {
      try {
        this.concepto = event.value;

        let conceptoSelected = this.dataExtractEgresosJS.filter(
          (element) => element.NivelID === this.concepto.code
        );
        this.cargarDonaConceptos(conceptoSelected[0].subConceptos);

        this.notify(
          this.TOAST.INFO,
          this.MSG.INFO,
          "Se ha cargado la información del concepto: " +
          this.concepto.name +
          " (Egreso) para el pediodo: " +
          this.mes.Name_MM +
          "-" +
          this.anio.code +
          " ",
          this.TIME.LONG
        );

        this.notify(
          this.TOAST.INFO,
          this.MSG.INFO,
          "En la opción: 'Seleccionar Item concepto' puede revisar su comparativo mensual durante el " +
          this.anio.code,
          this.TIME.BIGLONG
        );
      } catch (error) {
        console.log("CATCH JS");
        console.log(error);
        alert("Error en el cliente JS: consultarSubConceptosExtractosEgreso");
      }
    },

    consultarSubConceptosExtractosIngreso: function (event) {
      try {
        this.conceptoIngreso = event.value;

        let conceptoIngresoSelected = this.dataExtractIngresosJS.filter(
          (element) => element.NivelID === this.conceptoIngreso.code
        );

        let arreglo = this.UTILS.repairConcepts(
          conceptoIngresoSelected[0].subConceptos,
          this.apiConcepts
        );
        //console.log(conceptoIngresoSelected[0].subConceptos);
        console.log(arreglo);

        this.cargarDonaConceptosIngreso(
          conceptoIngresoSelected[0].subConceptos
        );

        this.notify(
          this.TOAST.INFO,
          this.MSG.INFO,
          "Se ha cargado la información del concepto: " +
          this.conceptoIngreso.name +
          " (Ingreso) para el pediodo: " +
          this.mes.Name_MM +
          "-" +
          this.anio.code +
          " ",
          this.TIME.LONG
        );

        this.notify(
          this.TOAST.INFO,
          this.MSG.INFO,
          "En la opción: 'Seleccionar Item ingreso' puede revisar su comparativo mensual durante el " +
          this.anio.code,
          this.TIME.BIGLONG
        );
      } catch (error) {
        console.log("CATCH JS");
        console.log(error);
        alert("Error en el cliente JS: consultarSubConceptosExtractosIngreso");
      }
    },
  },

  mounted() {
    if (!localStorage.getItem("documento")) {
      this.$router.push("/");
    } else {
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
</style>
