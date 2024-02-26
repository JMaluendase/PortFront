<template>
  <div class="colorpanel">
    <NavbarMain />
    <div class="container">
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <TabMenu v-model="active" :model="items" />
        </div>

        <div class="field col-12 md:col-12">
          <div class="p-fluid grid formgrid container">
            <div class="field col-12 md:col-4">
              <DropDown
                v-model="vehiculo"
                :options="misvehiculos"
                optionLabel="name"
                placeholder="Seleccionar vehículo"
                class="w-full"
                @change="cargarIngresosEgresos($event)"
              />
            </div>

            <div class="field col-12 md:col-4">
              <DropDown
                v-model="anio"
                :options="anios"
                optionLabel="name"
                placeholder="Seleccionar año"
                class="w-full"
              />
            </div>

            <div class="field col-12 md:col-4">
              <DropDown
                v-model="mes"
                :options="meses"
                optionLabel="name"
                placeholder="Seleccionar mes"
                class="w-full"

              />
            </div>
          </div>
        </div>

        <div class="field col-12 md:col-12">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <CardView role="region" class="card-default">
                <template #subtitle> {{ tittle }} </template>
                <template #content>
                  <ChartView
                    v-show="!loading"
                    type="line"
                    :data="dataEgresosIngresos"
                    :options="OptionsLines"
                    :responsive="true"
                  />
                  <SkeletonLoading
                    v-show="loading"
                    width="100%"
                    class="mb-2"
                  ></SkeletonLoading>
                  <SkeletonLoading
                    v-show="loading"
                    width="100%"
                    height="150px"
                  ></SkeletonLoading>
                </template>
              </CardView>
            </div>

            <div class="field col-12 md:col-6">
              <CardView role="region" class="card-default">
                <template #subtitle> {{ tittle }} </template>
                <template #content>
                  <ChartView
                    v-show="!loading"
                    type="bar"
                    :data="dataEgresosIngresosBar"
                    :options="OptionsBar"
                    class="w-full"
                    :responsive="true"
                  />
                  <SkeletonLoading
                    v-show="loading"
                    width="100%"
                    class="mb-2"
                  ></SkeletonLoading>
                  <SkeletonLoading
                    v-show="loading"
                    width="100%"
                    height="150px"
                  ></SkeletonLoading>
                </template>
              </CardView>
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
                  <ChartView
                    v-show="!loadingDona"
                    type="doughnut"
                    :data="dataEgresos"
                    :options="optionsDoughnut"
                    class="centro w-full md:w-20rem"
                    :responsive="true"
                  />
                  <SkeletonLoading
                    v-show="loadingDona"
                    width="100%"
                    class="mb-2"
                  ></SkeletonLoading>
                  <SkeletonLoading
                    v-show="loadingDona"
                    width="100%"
                    height="150px"
                  ></SkeletonLoading>
                </template>
              </CardView>
            </div>

            <div class="field col-12 md:col-4">
              <CardView role="region" class="card-default centro">
                <template #subtitle>
                  {{ tittleDonnaIngresos }}
                </template>
                <template #content>
                  <ChartView
                    v-show="!loadingDona"
                    type="doughnut"
                    :data="dataIngresos"
                    :options="optionsDoughnut"
                    class="centro w-full md:w-20rem"
                    :responsive="true"
                  />
                  <SkeletonLoading
                    v-show="loadingDona"
                    width="100%"
                    class="mb-2"
                  ></SkeletonLoading>
                  <SkeletonLoading
                    v-show="loadingDona"
                    width="100%"
                    height="150px"
                  ></SkeletonLoading>
                </template>
              </CardView>
            </div>

            <div class="field col-12 md:col-4">
              <CardView role="region" class="card-default centro">
                <template #subtitle>  </template>
                <template #content>
                  <SkeletonLoading
                    v-show="loadingDona"
                    width="100%"
                    class="mb-2"
                  ></SkeletonLoading>
                  <SkeletonLoading
                    v-show="loadingDona"
                    width="100%"
                    height="150px"
                  ></SkeletonLoading>
                </template>
              </CardView>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarMain from "@/components/NavbarMain.vue";

import { MenuItemService, OptionsLineService, OptionsBarService } from "@/service/ParamServices";
import {

  MisVehiculosService,
  MesesService,
} from "@/service/DBServices";

let mes = { name: "Ninguno", code: 6 };

export default {
  name: "MisVehiculosView",
  data() {
    return {
      loading: false,
      loadingDona: false,
      vehiculo: null,
      tittle: "Ingresos/Egresos (Año actual)",
      mes: { name: "Ninguno", code: 6 },
      anio: { name: "2023", code: 1 },
      tittleDonnaEgresos: "Egresos del mes de " + mes.name,
      tittleDonnaIngresos: "Ingresos del mes de " + mes.name,

      meses: [],

      anios: [{ name: "2023", code: 1 }],

      misvehiculos: [],

      active: {
        label: "",
        icon: "pi pi-fw pi-dollar",
        url: "/producido",
      },
      
      items: [],

      dataEgresosIngresos: [],
      dataEgresosIngresosBar: [],
      dataEgresos: [],
      dataIngresos: [],

      optionsDoughnut: {
        cutout: "40%",
      },

      OptionsLines: [],

      OptionsBar: [],
    };
  },

  components: {
    NavbarMain,
  },

  created: function () {
    this.items = MenuItemService;
    this.misvehiculos = MisVehiculosService;
    this.meses = MesesService;
    this.OptionsLines = OptionsLineService;
    this.OptionsBar = OptionsBarService;
  },

  methods: {
    cargarIngresosEgresos: function (event) {
      console.log(event.value);
      this.tittle = "Cargando Información...";
      this.loading = true;

      setTimeout(() => {
        this.dataEgresosIngresos = {
          labels: [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
          ],
          datasets: [
            {
              label: "Egresos",
              data: [
                12250200, 18250200, 11250200, 9500000, 15250200, 23250200,
                19250200,
              ],
              fill: false,
              borderColor: "rgb(237, 28, 35)",
              tension: 0.4,
            },
            {
              label: "Ingresos",
              data: [
                11250200, 21250200, 10250200, 9800000, 13250200, 20250200,
                12250200,
              ],
              fill: false,
              borderColor: "rgb(34, 177, 76)",
              tension: 0.4,
            },
          ],
        };

        this.dataEgresosIngresosBar = {
          labels: [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
          ],
          datasets: [
            {
              label: "Ingresos",
              backgroundColor: "rgb(34, 177, 76)",
              borderColor: "rgb(34, 177, 76)",
              data: [
                11250200, 21250200, 10250200, 9800000, 13250200, 20250200,
                12250200,
              ],
            },
            {
              label: "Egresos",
              backgroundColor: "rgb(237, 28, 35)",
              borderColor: "rgb(237, 28, 35)",
              data: [
                12250200, 18250200, 11250200, 9500000, 15250200, 23250200,
                19250200,
              ],
            },
          ],
        };

        this.tittle = "Ingresos/Egresos (Año actual)";
        this.loading = false;
      }, 2000);
    },


  },
};
</script>

<style>
@import "../assets/css/styles.css";

label {
  font-size: 0.8rem;
}
</style>
