import axios from "axios";

/*
const nombreFuncion = async (parametro) =>{
    await axios.get()
    .then(
        respuesta => {
            return respuesta?.data, respuesta.status
        }
    )
    .catch(
        error => {

        }
    )
}
*/
// Definición de un objeto que contiene funciones para realizar diversas operaciones relacionadas con contrataciones, incluyendo subir CVs, contratos, activar prospectos, y solicitar datos de prospectos.
const peticiones_EnContratacion = {

    // Función para cargar un CV de un empleado.
    cargarCV(idEmpleado, idMaster, Data){     
        const formData = new FormData();
        formData.append('File', Data); // Asume que 'Data' es un objeto File
        try {
            // Realiza una petición POST para subir el CV del empleado.
            return axios.post(`user/${idEmpleado}/upload_cv_user?creatorUserId=${idMaster}`, formData, {
                headers: {
                    'Content-Type':'multipart/form-data',
                },
            })
          .then(respuesta => {
                // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
                return { success: true, data: respuesta.data?.data };
            })
          .catch(error => {
                // En caso de error, devuelve un objeto indicando el fallo y el mensaje de error.
                return { success: false, error: error?.response?.data.message };
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }                    
    },

    // Función para descartar el CV de un empleado.
    descartarCV(idEmpleado, idMaster){
        try {
            // Realiza una petición PUT para descartar el CV del empleado.
            return axios.put(`user/${idEmpleado}/skip_cv_user?creatorUserId=${idMaster}`)
          .then(respuesta => {
                // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
                return { success: true, data: respuesta?.data?.data };
            })
          .catch(error => {
                // En caso de error, devuelve un objeto indicando el fallo y el mensaje de error.
                return { success: false, error: error.response?.data?.message };
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }  
    },      

    // Función para retomar el CV de un empleado.
    RetomarCV(idEmpleado, idMaster){
        try {
            // Realiza una petición PUT para retomar el CV del empleado.
            return axios.put(`user/${idEmpleado}/activate_contrato_user?creatorUserId=${idMaster}`)
          .then(respuesta => {
                // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
                return { success: true, data: respuesta?.data?.data };
            })
          .catch(error => {
                // En caso de error, devuelve un objeto indicando el fallo y el mensaje de error.
                return { success: false, error: (error.response.data.message)?error.response.data?.message: error};
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }
    },  

    // Función para cargar un contrato de un empleado.
    cargarContrato(idEmpleado, idMaster, Data){
        const formData = new FormData();
        formData.append('File', Data); // Asume que 'Data' es un objeto File
        try {
            // Realiza una petición POST para subir el contrato del empleado.
            return axios.post(`user/${idEmpleado}/upload_contrato_user?creatorUserId=${idMaster}`, formData, {
                headers: {
                    'Content-Type':'multipart/form-data',
                },
            })
          .then(respuesta => {
                // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
                return { success: true, data: respuesta.data.data };
            })
          .catch(error => {
                // En caso de error, devuelve un objeto indicando el fallo y el mensaje de error.
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }
    },  

    // Función para descartar un contrato de un empleado.
    descartarContrato(idEmpleado, idMaster){
        try {
            // Realiza una petición PUT para descartar el contrato del empleado.
            return axios.put(`user/${idEmpleado}/skip_contrato_user?creatorUserId=${idMaster}`)
          .then(respuesta => {
                // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
                return { success: true, data: respuesta?.data.data };
            })
          .catch(error => {
                // En caso de error, devuelve un objeto indicando el fallo y el mensaje de error.
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }  
    }, 

    // Función para retomar un contrato de un empleado.
    RetomarContrato(idEmpleado, idMaster){
        try {
            // Realiza una petición PUT para retomar el contrato del empleado.
            return axios.put(`user/${idEmpleado}/activate_contrato_user?creatorUserId=${idMaster}`)
          .then(respuesta => {
                // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
                return { success: true, data: respuesta?.data.data };
            })
          .catch(error => {
                // En caso de error, devuelve un objeto indicando el fallo y el mensaje de error.
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }  
    },

    // Función para activar un prospecto.
    ActivarProspecto(idMaster, Data){
        try {
            // Realiza una petición POST para activar un prospecto.
            return axios.post(`/user/contratar?creatorUserId=${idMaster}`, Data)
          .then(
                respuesta => {
                    // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
                    return { success: true, data: respuesta.data?.data };
                }
            )
          .catch(error => {
                    // Manejo de errores específicos según el estado de la respuesta.
                    if (error.status == 422) {
                        return { success: false, error: error.response }; // Problema al pedir los datos, resuelve con null
                    } else if (error.status == 404) {
                        return { success: false, error: {} }; // Si no hay datos, resuelve con un objeto vacío                    
                    } else if (error.status == 523) {
                        return { success: false, error: error.response?.data.data.message }; // Si no hay datos, resuelve con un objeto vacío
                    } else {
                        return { success: false, error: error.response?.data.message }; // Rechaza la promesa con el error
                    }
                }
            );
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }  

    }, 
    
    // Función para descargar un prospecto.
    DescarProspecto(idEmpleado, idMaster,){
        return axios.get(`user/${id}/profile`) // Nota: Parece haber un error tipográfico en el parámetro 'id'
          .then(respuesta => {
                // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
                return { success: true, data: respuesta.data.data };
            })
          .catch(error => {
                // En caso de error, devuelve un objeto indicando el fallo y el mensaje de error.
                return { success: false, error: error };
            });
    }, 

    // Función para solicitar datos de un prospecto.
    PedirDatosProspecto(ID_empleado){
        return new Promise((resolve, reject) => {
            if (ID_empleado == null) {
                resolve(null);
            } else if (ID_empleado >= 0) {
                axios.get(`/user/${ID_empleado}/precarga`)
              .then((respuesta) => {
                    if (respuesta.data?.data) {
                        resolve({ success: true, data: respuesta.data.data });
                    } else {
                        resolve({ success: true, data: respuesta.data }); // Si no hay datos, resuelve con un objeto vacío
                    }
                })
              .catch((error) => {
                    console.error(error)
                    if (error.status == 422) {
                        resolve({ success: false, error: error }); // Problema al pedir los datos, resuelve con null
                    } else if (error.status == 404) {
                        resolve({ success: false, error: {} }); // Si no hay datos, resuelve con un objeto vacío
                    } else {
                        reject({ success: false, error: error }); // Rechaza la promesa con el error
                    }
                });

            } else {
                resolve({ success: false, error: error });
            }
        });
    },

    // Función para solicitar datos completos de un prospecto.
    PedirDatosProspectoCompleto(ID_empleado){
        return new Promise((resolve, reject) => {
            if (ID_empleado == null) {
                resolve(null);
            } else if (ID_empleado >= 0) {
                axios.get(`/user/${ID_empleado}/precarga_all`)
              .then((respuesta) => {
                    if (respuesta.data?.data) {
                        resolve({ success: true, data: respuesta.data.data });
                    } else {
                        resolve({ success: true, data: respuesta.data }); // Si no hay datos, resuelve con un objeto vacío
                    }
                })
              .catch((error) => {
                    console.error(error)

                    if (error.status == 422) {
                        resolve({ success: false, error: error }); // Problema al pedir los datos, resuelve con null
                    } else if (error.status == 404) {
                        resolve({ success: false, error: {} }); // Si no hay datos, resuelve con un objeto vacío
                    } else {
                        reject({ success: false, error: error }); // Rechaza la promesa con el error
                    }
                });

            } else {
                resolve({ success: false, error: error });
            }
        });
    },
}

// Exporta el objeto peticiones_EnContratacion para su uso en otros módulos.
export default peticiones_EnContratacion
