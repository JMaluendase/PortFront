# Portal de propietarios

Este proyecto contiene el Frontend del portal de propietarios, el cual se conectará a una API REST en Django para la consulta de información de extractos de propietarios de las empresas Compañía Libertador SA y Berlinas del Fonce SA, Está contruido en VueJS 3

## Caracteristicas

- VueJS 3 (Frontend Framework - https://vuejs.org/)
- Prime Vue 3.29 (Librería de componentes - https://primevue.org/)
- Axios 1.4 (Librería de peticiones HTTP - https://axios-http.com/)
- Primeflex 3.3 (Utilidad CSS Responsiva - https://primeflex.org/) 
- Prime Icons 6.0 (Librería de Íconos - https://primevue.org/icons/) 

## Requirimientos
- Node.js 
- npm (Node Package Manager) para gestionar las dependencias del proyecto Vue.js.

## Instalación
```
npm install
```

### Clona el repositorio
```
git config --global user.name "Su nombre"
git config --global user.email "sucorreo@sudominio.com"
git clone https://github.com/solincosta/frontendportal.git
```

### Instala la versión de Vue funcional del proyecto
```
npm install vue@^3.3.4
```

### Instala Vue-Rouert
```
npm install vue-router@4
```

### Instala Axios 
```
npm install --save axios vue-axios
```

### Instala la librería de componentes PrimeVue en su versión funcional 
```
npm install primevue@^3.29.2 --save
```

### Instala PrimeFlex y Prime Icons
```
npm install primeflex
npm install primeicons
```

### Instala los componentes Gráficos Chart
```
npm install chart.js --save
```

### El proyecto original corre con las dependencias
```
   "dependencies": {
    "axios": "^1.4.0",
    "chart.js": "^4.3.0",
    "core-js": "^3.8.3",
    "primeflex": "^3.3.1",
    "primeicons": "^6.0.1",
    "primevue": "^3.29.2",
    "vue": "^3.3.4",
    "vue-axios": "^3.5.2",
    "vue-router": "^4.0.3"
  },
```

### Corre el servidor npm
```
npm run serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Cargar cambios (Trabaje en otra rama)
```
git checkout -b [otra-rama]

git add .
git commit -m "Mensaje del commit"
git push origin [otra-rama]
```

