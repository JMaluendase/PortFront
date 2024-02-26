export const MenuItemService = [
  {
    label: "",
    icon: "pi pi-fw pi-user",
    url: "/informacion",
  },

  {
    label: "",
    icon: "pi pi-fw pi-dollar",
    url: "/producido",
  },
  {
    label: "",
    icon: "pi pi-fw pi-file",
    url: "/extractos",
  },
  {
    label: "",
    icon: "pi pi-chart-bar",
    url: "/vehiculos",
  },
  ];



  export const OptionsLineService = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  export const OptionsBarService =  {
    plugins: {
      legend: {
        labels: {
          fontColor: "rgb(128, 128, 128)",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(73, 80, 87)",
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: "rgb(73, 80, 87)",
        },
        grid: {
          color: "rgb(235, 237, 239)",
          drawBorder: false,
        },
      },
    },
  };

/*
  export const MenuItemService = [
    {
      label: "Datos personales",
      icon: "pi pi-fw pi-user",
      url: "/informacion",
    },
    {
      label: "Mis Vehículos",
      icon: "pi bus-svg-icon",
      url: "/vehiculos",
    },
    {
      label: "Mi producido",
      icon: "pi pi-fw pi-dollar",
      url: "/producido",
    },
    {
      label: "Extractos",
      icon: "pi pi-fw pi-file",
      url: "/extractos",
    },
  ];

  */