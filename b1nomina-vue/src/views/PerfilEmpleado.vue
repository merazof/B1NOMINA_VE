<!-- Plantilla -->
<template>
    <!-- Muestra el componente NotFount si 'estado' es falso -->
    <NotFount v-if="estado == false"/>
    <!-- Uso del componente LayoutPanel si 'estado' es verdadero -->
    <LayoutPanel v-else>
        <!-- Slot para la cabecera de la página -->
        <template #cabecera>
            <!-- Muestra el componente HeaderVue con el nombre de la página establecido como "Empleados > Perfil del Empleado" -->
            <Headervue nombrePagina="Empleados > Perfil del Empleado" />
        </template>
        
        <!-- Slot para el panel principal de la página -->
        <template #panel>
            <!-- Renderiza el componente PanelPerfilEmpleado -->
            <PanelPerfilEmpleado/>
        </template>
    </LayoutPanel>
</template>

<!-- Configuración del script -->
<script setup>
    // Importa los componentes necesarios para la página
    import Headervue from '@/components/Header.vue';
    import NotFount from '@/components/Not-fount.vue';
    import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
    import PanelPerfilEmpleado from '@/components/panel/Panel-PerfilEmpleado.vue';
    import CargandoInformaciónVue from '@/components/animation/Cargando-Informacion.vue';

    // Importa funciones para realizar peticiones HTTP
    import peticiones from '@/peticiones/p_empleado';

    // Importa hook para acceder a la ruta actual
    import { useRoute } from 'vue-router';

    // Importa funciones de Vue para manejo de eventos y reactividad
    import { onMounted, ref, watch, provide } from 'vue'

    // Acceso a la ruta actual
    const route = useRoute();

    // Variables reactivas para almacenar el estado y los datos del empleado
    const estado = ref(false)
    const dataEmpleado = ref(null)
    const parametros = ref({})

    const props = defineProps({
        sociedadId: {
            type: String,
            required: true
        },
        empleadoId: {
            type: String,
            required: true
        }
    });


    // Variable reactiva para almacenar información temporal
    const Informacion = ref('')

    // Observa cambios en 'Informacion' para actualizar el estado y los datos del empleado
    watch(Informacion, (nuevo) => {
        estado.value = nuevo.success;
        dataEmpleado.value = nuevo;
    });

    // Función para solicitar datos del empleado
    const pedirDatos = async () => {
        try {
            if (props.empleadoId) {
                const resultado = await peticiones.datosDelEmpleado(props.empleadoId);
                if (resultado.success){
                    Informacion.value = resultado?.data;
                } else {
                    console.error(resultado.error);
                }
            }
        } catch (error) {
            console.error("Error al solicitar datos del empleado:", error);
        }
    }

    // Función para solicitar parámetros de los formularios
    const pedirParametros = async (id) => {
        try {
            if (id != null) {
                const resultado = await peticiones.pedirParametros(id);
                if (resultado.success){
                    parametros.value = resultado?.data;
                } else {
                    console.error(resultado.error);
                }
            }
        } catch (error) {
            console.error("Error al solicitar los parametros de los formularios", error);
        }
    }

    // Provee los datos y funciones a los componentes hijos
    provide('dataEmpleado', dataEmpleado);
    provide('parametros', parametros);
    provide('actualizarData', pedirDatos)

    // Ejecuta las funciones al montar el componente
    onMounted(async () => {
       await pedirDatos();
       await pedirParametros(props.sociedadId);
    });
</script>
