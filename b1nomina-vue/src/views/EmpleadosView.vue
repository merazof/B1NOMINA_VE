<!-- Plantilla -->
<template>
    <!-- Uso del componente LayoutPanel para estructurar la página -->
    <LayoutPanel>
        <!-- Slot para la cabecera de la página -->
        <template #cabecera>
            <!-- Muestra el componente HeaderVue con el nombre de la página establecido como "Empleados" -->
            <Headervue nombrePagina="Empleados" />
        </template>
        
        <!-- Slot para el panel principal de la página -->
        <template v-slot:panel>
            <!-- Uso del componente LayoutForm para contener el formulario y los botones de navegación -->
            <LayoutForm>
                <!-- Slot para la cabecera del formulario, que contiene botones de navegación -->
                <template v-slot:cabecera>
                    <!-- Botón de navegación para listar empleados -->
                    <NavButtonPanel text="Empleados" direccion="listar" :cantidad="datos?.empleados" :seleccionado="$route.name === 'listar'" />
                    <!-- Botón de navegación para empleados en contratación -->
                    <NavButtonPanel text="En Contratacion" direccion="enContratacion" :cantidad="datos?.contratacion" :seleccionado="$route.name == 'enContratacion'" />
                    <!-- Botón de navegación para empleados inactivos -->
                    <NavButtonPanel text="Inactivos" direccion="inactivos" :cantidad="datos?.inactivos" :seleccionado="$route.name == 'inactivos'" />
                </template>
                <!-- Slot para el formulario, que renderiza el componente correspondiente a la ruta actual -->
                <template v-slot:formulario>
                    <router-view />
                </template>
            </LayoutForm>
        </template>
    </LayoutPanel>
</template>

<!-- Configuración del script -->
<script setup>
    // Importa los componentes necesarios para la página
    import Headervue from '@/components/Header.vue';
    import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
    import LayoutForm from '@/components/Layouts/LayoutForm.vue';
    import NavButtonPanel from '@/components/botones/Nav-button-panel.vue';
    import almacen from '@/store/almacen.js';

    // Importa funciones de Vue para manejo de eventos y reactividad
    import { onMounted, ref, provide, watch } from 'vue';

    // Importa hook para acceder a la ruta actual
    import { useRoute } from 'vue-router';
    // Importa funciones para realizar peticiones HTTP
    import peticiones from '@/peticiones/p_empleado';

    // Acceso a la ruta actual
    const route = useRoute();

    // Acceso a un parámetro de la ruta, por ejemplo, 'id' de la sociedad
    const IDsociedad = ref(Number(route.params.sociedadId));
    almacen.updatedSociedadID(IDsociedad.value)

    // Almacena los datos obtenidos de la API
    const datos = ref({})

    // Función para actualizar los valores de navegación de empleados
    const actualizarValoresNavegacionEmpleado = async () => {
        const respuesta = await peticiones.actualizarValoresNavegacionEmpleado(IDsociedad.value)
        if (respuesta.success){
            datos.value = respuesta.data
        } else {
            console.error(respuesta.error)
        }
    }

    // Provee los valores a los componentes hijos
    provide('IDsociedad', IDsociedad.value);
    provide('ActualizarValoresNavegacion', actualizarValoresNavegacionEmpleado);

    // Solicita la cantidad total de elementos para el panel cuando el componente se monta
    onMounted(() => {
        actualizarValoresNavegacionEmpleado();
    })
</script>
