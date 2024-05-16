<template>

    <button class="button" type="button" @click="show">
        <!--icono de ojo cerrado-->
        <div class="icon-conted" v-show="!showPassword">
            <HiddeIcon />
        </div>
        <!--icono de ojo abierto-->
        <div class="icon-conted" v-show="showPassword">
            <ShowIcon />
        </div>
    </button>
    
</template>

<script>
import HiddeIcon from '../icons/Hidde-icon.vue';
import ShowIcon from '../icons/Show-icon.vue';

export default {
    data() {
        return {
            //valor inicial
            showPassword: false
        }
    },
    //comonentes utilizados
    components: {
        HiddeIcon,
        ShowIcon
    },
    methods: {
        //metodo que emite el estado de las variables
        show(){
            this.showPassword = !this.showPassword;
            (this.showPassword) ? this.$emit("inputType",'text'): this.$emit("inputType", 'password')
        }
    },
}

</script>

<style scoped>
.button {
    border: none;
    background: white;
    cursor: pointer;
}


</style>