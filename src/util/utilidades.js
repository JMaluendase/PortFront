function validarNumeroEntero(num) {
  var numero = parseInt(num, 10);
  if (typeof numero === "number") {
    if (numero % 1 == 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function validarCorreo(correo) {
  var emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (emailRegex.test(correo)) {
    return true;
  } else {
    return false;
  }
}

function validarCelular(telefono) {
  var numero = parseInt(telefono, 10);
  if (typeof numero === "number") {
    if (numero % 1 == 0) {
      if (numero > 3000000000 && numero <= 3259999999) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function formatCurrency(value) {
  if (typeof value !== "number") {
    return value;
  }
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

function formatCurrencyInput(value) {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

function completeCompany(query, DataCompany) {
  for (let i = 0; i < query.length; i++) {
    let result = DataCompany.find((item) => item.code === query[i].EmpresaID);
    if (result) {
      query[i].name = result.name;
    }
  }
  return query;
}

function completeMoth(query, DataMoth) {
  for (let i = 0; i < query.length; i++) {
    let result = DataMoth.find((item) => item.Per_MM === query[i].Per_MM);
    if (result) {
      query[i].Name_MM = result.Name_MM;
    }
  }
  return query;
}

function repairConcepts(query, DataConcepts) {
  // Iteramos sobre el arreglo query
  for (let i = 0; i < query.length; i++) {
    // Buscamos el registro en el arreglo DataMoth con el mismo valor de "Per_MM"
    let result = DataConcepts.find((item) => query[i].Cto_Des.includes(item.Cto_Des));
    // Si el registro existe, asignamos su valor de "Name_MM" al registro del arreglo query
    if (result) {
      query[i].Cto_Des_new = result.Cto_Des_repairted;
    } else {
      query[i].Cto_Des_new = query[i].Cto_Des;
    }
  }
  // Devolvemos el arreglo query completado
  return query;
}

function completeMothReduce(query, DataMoth) {
  // Iteramos sobre el arreglo query
  for (let i = 0; i < query.length; i++) {
    // Buscamos el registro en el arreglo DataMoth con el mismo valor de "Per_MM"
    let result = DataMoth.find((item) => item.Per_MM === query[i].Per_MM);
    // Si el registro existe, asignamos su valor de "Name_MM" al registro del arreglo query
    if (result) {
      query[i].Name_MM = result.Name_MM.substring(0, 3);
    }
  }
  // Devolvemos el arreglo query completado
  return query;
}

function getMonthLabel(num){
  let meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  return meses[num - 1];
}


function groupByArrayEgresos(arreglo_completo) {
  const resultado = arreglo_completo.reduce((accumulator, current) => {
    const existingGroup = accumulator.find(
      (item) =>
        item.NivelID === current.NivelID && item.Nvl_Name === current.Nvl_Name
    );

    if (existingGroup) {
      // Si el grupo ya existe, actualiza la sumatoria total y agrega el subConcepto.
      existingGroup.totalCost += current.ValorEgr;
      existingGroup.subConceptos.push({
        ConceptoID: current.ConceptoID,
        Cto_Des: current.Cto_Des,
        ValorEgr: current.ValorEgr,
      });
    } else {
      // Si el grupo no existe, crea uno nuevo.
      accumulator.push({
        NivelID: current.NivelID,
        Nvl_Name: current.Nvl_Name,
        totalCost: current.ValorEgr,
        Nivel0: current.Nivel0,
        subConceptos: [
          {
            ConceptoID: current.ConceptoID,
            Cto_Des: current.Cto_Des,
            ValorEgr: current.ValorEgr,
          },
        ],
        Afiliado1_id: current.Afiliado1_id,
        RSAfiliado1: current.RSAfiliado1,
      });
    }

    return accumulator;
  }, []);
  return resultado;
}

function groupByArrayIngresos(arreglo_completo) {
  const resultado = arreglo_completo.reduce((accumulator, current) => {
    const existingGroup = accumulator.find(
      (item) =>
        item.NivelID === current.NivelID && item.Nvl_Name === current.Nvl_Name
    );

    if (existingGroup) {
      // Si el grupo ya existe, actualiza la sumatoria total y agrega el subConcepto.
      existingGroup.totalCost += current.ValorIng;
      existingGroup.subConceptos.push({
        ConceptoID: current.ConceptoID,
        Cto_Des: current.Cto_Des,
        ValorIng: current.ValorIng,
      });
    } else {
      // Si el grupo no existe, crea uno nuevo.
      accumulator.push({
        NivelID: current.NivelID,
        Nvl_Name: current.Nvl_Name,
        totalCost: current.ValorIng,
        Nivel0: current.Nivel0,
        subConceptos: [
          {
            ConceptoID: current.ConceptoID,
            Cto_Des: current.Cto_Des,
            ValorIng: current.ValorIng,
          },
        ],
        Afiliado1_id: current.Afiliado1_id,
        RSAfiliado1: current.RSAfiliado1,
      });
    }

    return accumulator;
  }, []);
  return resultado;
}

function hello() {
  alert("HELLO");
}

function getSeverity(option) {
  switch (option) {
    case 1:
      return "success";
    case 2:
      return "info";
    case 3:
      return "warn";
    case 4:
      return "error";
    default:
      return "Error desconocido";
  }
}

function APIERROR(code) {
  switch (code) {
    case 0:
      return "No hay respuesta del servidor";
    case 400:
      return "Solicitud incorrecta";
    case 401:
      return "Acceso no autorizado";
    case 403:
      return "Acceso prohibido";
    case 404:
      return "Recurso no encontrado";
    case 422:
      return "Registro duplicado, el dato ya existe";
    case 500:
      return "Error interno del servidor";
    default:
      return "Error desconocido";
  }
}

export default {
  validarNumeroEntero,
  formatCurrency,
  formatCurrencyInput,
  hello,
  APIERROR,
  getSeverity,
  validarCorreo,
  validarCelular,
  completeMoth,
  groupByArrayEgresos,
  groupByArrayIngresos,
  getMonthLabel,
  completeMothReduce,
  repairConcepts,
  completeCompany
};
