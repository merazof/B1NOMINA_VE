import axios from "axios";
import almacen from "@/store/almacen";

/*

async nombreFuncion(parametro,){
        try {
            return await axios.METODO(`RUTA`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data.data };
            })
            .catch(error => {
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    },
*/
// Objeto que agrupa todas las funciones para interactuar con la API de empleados y usuarios.
const peticiones = {

    // Función asíncrona para obtener datos del perfil de un empleado específico.
    async datosDelEmpleado(id){
        try {
            // Intenta realizar una petición GET para obtener los datos del empleado.
            const respuesta = await axios.get(`user/${id}/profile`);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta.data?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error };
        }
    },
        
    // Función asíncrona para obtener datos del perfil de un usuario específico.
    async datosDelUsuario(id){
        try {
            // Intenta realizar una petición GET para obtener los datos del usuario.
            const respuesta = await axios.get(`user/${id}/profile`);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta.data?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error };
        }
    },

    // Función para actualizar los valores de navegación de un empleado.
    actualizarValoresNavegacionEmpleado(id){
        return new Promise((resolve, reject) => {
            // Intenta realizar una petición GET para obtener los datos de los empleados.
            axios.get(`/sociedad/${id}/resumen_empleados`)
           .then((respuesta) => {
                // Si la petición es exitosa, resuelve la promesa con éxito y los datos obtenidos.
                if (respuesta.data?.data) {
                    resolve({ success: true, data: respuesta.data?.data });
                } else {
                    resolve({ success: true, data: respuesta.data });
                }
            })
           .catch((error) => {
                // Maneja errores específicos según el estado de la respuesta.
                if (error.status == 422 || error.status == 404) {
                    resolve({ success: false, error: error });
                } else {
                    reject({ success: false, error: error });
                }
            });
        });
    },

    // Función asíncrona para obtener un listado de regiones.
    async ListadoRegiones(){
        try {
            // Intenta realizar una petición GET para obtener el listado de regiones.
            const respuesta = await axios.get(`parametros_regionales`);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data.parametros };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error };
        }
    },

    // Función asíncrona para pedir parámetros específicos para crear un usuario.
    async pedirParametros(idSociedad){
        try {
            // Intenta realizar una petición GET para obtener los parámetros necesarios.
            const respuesta = await axios.get(`/sociedad/${idSociedad}/parametros_crear_usuario`);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data?.parametros };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error };
        }
    },

    // Función asíncrona para actualizar el salario de un empleado.
    async ActualizarSalario(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar el salario del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_laborales_salario?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar el contrato de un empleado.
    async ActualizarContrato(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar el contrato del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_laborales_contrato?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar el puesto de un empleado.
    async ActualizarPuesto(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar el puesto del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_laborales_puesto?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar los datos principales de un empleado.
    async ActualizarDatosPrincipales(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar los datos principales del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_personales?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar el contacto y ubicación de un empleado.
    async ActualizarContacto(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar el contacto y ubicación del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_contacto_ubicacion?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar los datos bancarios de un empleado.
    async ActualizarDatosPago(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar los datos bancarios del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_bancarios?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },
}

// Exporta el objeto peticiones para su uso en otros módulos.
export default peticiones;
