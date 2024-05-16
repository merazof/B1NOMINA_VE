// Importa las bibliotecas necesarias para crear el router de Vue.js
import { createRouter, createWebHashHistory } from 'vue-router';

// Creación del router con la historia de navegación basada en hash y la URL base
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  // Definición de las rutas disponibles en la aplicación
  routes: [
    // Redirección inicial a la página de Login
    {
      path: '/',
      redirect: '/Login',
      meta: {
        requiereToken: false, // Indica que no se requiere autenticación para acceder a esta ruta
      },
      children: [], // No tiene sub-rutas directamente asociadas
    },
    // Ruta para la página de inicio de sesión
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        requiereToken: false, // No se requiere autenticación para acceder a esta ruta
      },
    },
    // Ruta principal para seleccionar la sociedad después de iniciar sesión
    {
      path: '/sociedad',
      name: 'sociedad',
      component: () => import('@/views/SociedadView.vue'),
      meta: {
        requiereToken: true, // Se requiere autenticación para acceder a esta ruta
      },
    },
    // Ruta para mostrar detalles de una sociedad específica
    {
      path: '/sociedad/:sociedadId',
      component: () => import('@/views/TemplateView.vue'),
      meta: {
        requiereToken: true, // Se requiere autenticación para acceder a esta ruta
      },
      // Sub-rutas derivadas de la selección de una sociedad
      children: [
        // Panel de dashboard
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          alias: ['dashboard'], // Alias alternativo para la ruta
        },
        // Panel de gestión de nómina
        {
          path: 'gestionNomina',
          component: () => import('@/views/GestionNominaView.vue'),
          alias: ['gestiosNomina', 'nomina'], // Alias alternativos para la ruta
        },
        // Panel de empleados
        {
          path: 'empleados',
          name: 'empleados',
          alias: ['empleados'],
          component: () => import('@/views/EmpleadosView.vue'),
          props: true, // Permite pasar props a los componentes hijos
          // Componentes hijos de la ruta empleados
          children: [
            // Lista de empleados
            {
              path: "",
              component: () => import('@/components/panel/Panel-empleados.vue'),
              name: 'listar',
              alias: 'listar',
              props: true, // Permite pasar props a los componentes hijos
            },
            // Empleados en contratación
            {
              path: 'enContratacion',
              name: 'enContratacion',
              component: () => import('@/components/panel/Panel-EnContratacion.vue'),
              alias: 'enContratacion',
            },
            // Empleados inactivos
            {
              path: 'inactivos',
              name: 'inactivos',
              component: () => import('@/components/panel/Panel-Inactivos.vue'),
              alias: 'inactivos',
            },
          ],
        },
        // Ruta para panel de empleado individual
        {
          path: 'panelEmpleado/:empleadoId',
          name: 'panel-empleado',
          component: () => import('@/views/PerfilEmpleado.vue'),
          props: true, // Permite pasar props a los componentes hijos
          alias: ['/sociedad/:sociedadId/panelEmpleado/:empleadoId'], // Alias para la ruta
          beforeEnter: (to, from, next) => {
            // Lógica personalizada antes de entrar en la ruta
            next(); // Continúa con la navegación
          },
        },
         
        //panel informes
        {
          path: 'informes',
          name: 'informes',
          component: () => import('@/views/InformesView.vue'),
          alias: ['informes']
        },
        //panel configuracion
        {
          path: 'configuracion',
          name: 'configuracion',
          component: () => import('@/views/ConfiguracionView.vue'),
          alias: 'configuracion',
          children: [
            {
              path: "",
              component: () => import('@/components/panel/Panel-Configuraciones.vue'),
              name: 'opciones',
              alias: 'opciones',              
              props: true,
               
            },
            {
              path: "datos-de-la-empresa",
              component: () => import('@/components/panel/configuracion/Panel-Datos-Empresa.vue'),
              name: 'datos-de-la-empresa',
              alias: ['datos-de-la-empresa',],              
               
            },
            {
              path: "datos-previsionales",
              component: () => import('@/components/panel/configuracion/Panel-DatosPrevisionales.vue'),
              name: 'datos-previsionales',
              alias: ['datos-previsionales',],              
               
            },
            {
              path: "periodos",
              component: () => import('@/components/panel/configuracion/Panel-Periodos.vue'),
              name: 'periodos',
              alias: ['periodos',],              
               
            },
            {
              path: "centralizacion",
              component: () => import('@/components/panel/configuracion/Panel-Centralizacion.vue'),
              name: 'centralizacion',
              alias: ['centralizacion',],              
               
            },
            {
              path: "gestion-usuarios",
              component: () => import('@/components/panel/configuracion/Panel-GestionUsuarios.vue'),
              name: 'gestion-usuarios',
              alias: ['gestion-usuarios',],              
               
            },
            {
              path: "parametros-conexion",
              component: () => import('@/components/panel/configuracion/Panel-ParametrosConexion.vue'),
              name: 'parametros-conexion',
              alias: ['parametros-conexion',],              
               
            },
            {
              path: "base-eventos",
              component: () => import('@/components/panel/configuracion/Panel-Base-Eventos.vue'),
              name: 'base-eventos',
              alias: ['base-eventos',],              
               
            },
            {
              path: "historial-acciones",
              component: () => import('@/components/panel/configuracion/Panel-HistorialAcciones.vue'),
              name: 'historial-acciones',
              alias: ['historial-acciones',],              
               
            },
            {
              path: "alertas",
              component: () => import('@/components/panel/Panel-EnDesarrollo.vue'),
              name: 'alertas',
              alias: ['alertas',],              
               
            },
          ]
        },
        //panel eventos
        {
          path: 'eventos',
          name: 'eventos',
          component: () => import('@/views/EventosView.vue'),
          alias: ['eventos']
        },
        //panel notificaciones
        {
          path: 'notificaciones',
          name: 'notificaciones',
          component: () => import('@/views/NotificacionesView.vue'),
          alias: ['notificaciones']
        },
        //si la ruta buscada no existe
        {
          path: ':pathMatch(.*)*',
          name: 'not-fount',
          component: () => import('@/components/Not-fount.vue')
        }
      ]       
    },
    //panel de ayuda general
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue'),
      meta: {
        requiereToken: false, //establece si es requerido autorizacion para acceder
      },
      
    },
  ]
})

/*

//antes de acceder a cada ruta //en construccion
router.beforeEach((to, from, next) => {
  
  //verifica que se tenga un token
  const auht = localStorage.getItem('token') != null
  //verifica si la ruta requiere autentificacion
  const needAuth = to.meta.requiereToken

  // compara los resultados
  (needAuth && !auht )? 
  next('Login'): //si la ruta requiere authentificacion y no lo esta redirige al login
  next() //permite el acceso a la ruta
})

*/
//permite mantener el acceso al router
export default router
