export default {

  TRANSACTION_OK: {
    code: "TRANSACTION_OK",
    message: "La transacción se ha completado de manera exitosa",
  },

  TRANSACTION_EMPTY: {
    code: "TRANSACTION_EMPTY",
    message: "No hubo cambios en la transacción",
  },

  RESPONSE_EMPTY: {
    code: "RESPONSE_EMPTY",
    message: "No se encontraron registros",
  },

  TRANSACTION_FAIL: {
    code: "TRANSACTION_FAIL",
    message: "La transacción no se pudo completar por un error en el Backend",
  },

  ERR_INTERNAL_SERVER: {
    code: "ERR_INTERNAL_SERVER",
    message:
      "La transacción no se pudo completar por un error interno en el servidor",
  },

  ERR_DUPLICATE_KEY: {
    code: "ERR_DUPLICATE_KEY",
    message: "La llave primaria ya existe en la tabla",
  },


  SUCCESSFUL_PROCESS_MESSAGE: "Proceso Exitoso!",

  ERR_NETWORK: "ERR_NETWORK",
  RESPONSE_STATUS_GET_OK: 200,
  RESPONSE_STATUS_EMPTY: 204,
  RESPONSE_STATUS_INSERT_OK: 201,
  RESPONSE_STATUS_FAIL_SERVER: 500,
  RESPONSE_STATUS_NO_FOUND: 404,
  RESPONSE_STATUS_UNPROCESSABLE: 422,
  RESPONSE_ERROR_MESSAGE: "ERROR EN LA RESPUESTA AXIOS",
  RESPONSE_DUPLICATE_MESSAGE: "El elemento que trata de guardar ya existe",
  FRONTEND_EXCEPTION_MESSAGE: "ERROR EN EL FRONTEND",
  TOAST_SUCCESS_MESSAGE: "Mensaje de Confirmación",
  TOAST_INFO_MESSAGE: "Mensaje de Información",
  TOAST_ALERT_MESSAGE: "Mensaje de Alerta",
  TOAST_ERROR_MESSAGE: "Mensaje de Error",

  ZERO: 0,
  OPTION_DEFAULT: 1,
  NULL: null,
  TYPE_PRODUCTO: 1,
  TYPE_SERVICE: 2,
  CODE_DUPLICATE_KEY: 23505,
  SUCCESS_SEVERITY: "success",
  INFO_SEVERITY: "info",
  WARN_SEVERITY: "warn",
  ERROR_SEVERITY: "error",
  TIMELIFE_SHORT: 3000,
  TIMELIFE_LONG: 6000,

  SIZE_MAX_FILE: 1500,
  MEGA_BASE: 1024,

};
