//Documento con la configuracion de axios

import axios from 'axios';

//base de la URL

//axios.defaults.baseURL = 'http://192.168.3.54:8000/V1.0';

axios.defaults.baseURL = 'http://10.0.2.3:8000/V1.0';

//tiempo de espera predeterminado
axios.defaults.timeout = 300000; //30s

// almacena en una variable el valor del token en el localStorage
const token = localStorage.getItem('token')

// si el token existe
if(token){
    //configuracion de la cabezera con el token
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}

import router from '@/router'; // Asegúrate de importar tu instancia de Vue Router

//captura las peticiones y ejecuta codigo segun el caso

axios.interceptors.response.use(
    response => response,
    error => {
      // Verifica si el error es un error  422 internal server
      if (error.response && error.response.status ===  423 ) {
        // Elimina el token del almacenamiento local
        localStorage.clear();
  
        // Utiliza Vue Router para redirigir al usuario a la página de inicio de sesión
        router.replace('/login');
      }
      
      //error de autorizacion
      if (error.response && error.response.status ===  403 ) {
  
        // Utiliza Vue Router para redirigir al usuario a la página de inicio de sesión
        router.replace('/seccion');
      }
  
      // Retorna el error para que pueda ser manejado posteriormente
      return Promise.reject(error);
    }
  );


