import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

import PrimeVue from "primevue/config";
import 'primeflex/primeflex.css';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DropDown from 'primevue/dropdown';
import Skeleton from 'primevue/skeleton';
import ProgressSpinner from 'primevue/progressspinner';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import TabMenu from 'primevue/tabmenu';
import InputSwitch from 'primevue/inputswitch';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Galleria from 'primevue/galleria';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Dialog from 'primevue/dialog';
import PanelMenu from 'primevue/panelmenu';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import RadioButton from 'primevue/radiobutton';
import ProgressBar from 'primevue/progressbar';
import Chip from 'primevue/chip';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import "primevue/resources/themes/saga-green/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import 'primeicons/primeicons.css';

import constantes from "./util/constantes";
import utilidades from "./util/utilidades";
import toastapi from "./util/toast";
import msg from "./util/message";
import time from "./util/time";

const app = createApp(App).use(router);

app.config.globalProperties.APICONST = constantes;
app.config.globalProperties.UTILS = utilidades;
app.config.globalProperties.TOAST = toastapi;
app.config.globalProperties.MSG = msg;
app.config.globalProperties.TIME = time;

app.component("InputText", InputText);
app.component("ButtonPrime", Button);
app.component("DropDown", DropDown);
app.component("SkeletonLoading", Skeleton);
app.component("ProgressSpinner", ProgressSpinner);
app.component("ProgressBar", ProgressBar);
app.component("TextArea", Textarea);
app.component("TabMenu", TabMenu);
app.component("InputSwitch", InputSwitch);
app.component("RadioButton", RadioButton);
app.component("CalendarDate", Calendar);
app.component("ToastPrime", Toast);
app.component("MessageText", Message);
app.component("DataTable", DataTable);
app.component("BadgePrime", Badge);
app.component("DialogModal", Dialog);
app.component("GalleriaMedia", Galleria);
app.component("ColumnBasic", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("RowBasic", Row);
app.component("CardView", Card);
app.component("ChartView", Chart);
app.component("ChipPrime", Chip);
app.component("PanelMenu", PanelMenu);

library.add(faUserSecret)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false

app.directive('badge', BadgeDirective);
app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(VueAxios, axios);

app.mount("#app");
export { app };
