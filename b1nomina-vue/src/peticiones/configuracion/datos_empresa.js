import axios from "axios";
/**
 * Peticion(idEmpleado, idMaster,){
        try {
            return axios.put(`user/${idEmpleado}/skip_contrato_user?creatorUserId=${idMaster}`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data.data };
            })
            .catch(error => {
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
            return { success: false, error: error }
        }  
    }, 
 * 
 */
// Definición de un objeto que contiene funciones para realizar peticiones HTTP a una API relacionada con datos de empresas.
const peticiones_configuracion_datosEmpresa = {

    // Función para obtener los datos básicos de una empresa mediante su ID.
    getDatosBasicosEmpresa(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos básicos de la empresa.
            return axios.get(`sociedad/${sociedadID}/datos_basicos`)
            // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
           .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            // En caso de error en la petición, devuelve un objeto indicando el fallo y el mensaje de error.
           .catch(error => {
                return { success: false, error: error?.response };
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }  
    }, 

    // Función para obtener los datos del representante de una empresa mediante su ID.
    getDatosRepresentanteEmpresa(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/datos_representante`)
            // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
           .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            // En caso de error en la petición, devuelve un objeto indicando el fallo y el mensaje de error.
           .catch(error => {
                return { success: false, error: error?.response };
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }  
    }, 

}

// Exporta el objeto peticiones_configuracion_datosEmpresa para su uso en otros módulos.
export default peticiones_configuracion_datosEmpresa
