<template>
    <!--Contenedor General-->
    <div class="switch">
        <input 
            type="checkbox" 
            :id="Objid" 
            :checked="Estado"
            :value="Estado"
            @change="updateValue"
        >
        <label :for="Objid"></label>
        <span>{{ Texto }}</span>
    </div>       
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    Estado: {
        type: Boolean,
        default: false,
    },
    Objid: {
        type: [String, Number] 
    },
    Texto: {
        type: String,
        default: ""
    },
    Tipo: {
        String,
        default: "multiple"
    }
});

const emit = defineEmits(["ValorEstado"]);

const updateValue = (event) => {
    if(props.Tipo == 'individual'){
        emit('ValorEstado', event.target.checked ? true : false);
    } else {
        emit('ValorEstado', event.target.checked ? props.Objid : props.Objid);
    }
    
};

</script>


<style scoped>
/*elimina la apariencia regular */
.switch {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 12px;
}

.switch > span {
    color: #000842;
    font-size: 20px;
    font-family: Poppins;
    font-weight: 400;
    word-wrap: break-word;
}
.switch > input {
    display: none;
}

/**Estilo fondo default */
.switch > label {
    display: block;
    position: relative;
    background: #F8F8F8;
    width: 44px;
    height: 25px;
    border-radius: 35px;
    border: 1px solid #D7CDF1;
    cursor: pointer;
}

/**Estilo interno default */
.switch > label::before{
    content: "";
    position: absolute;
    width: 23px;
    height: 22px;
    background: #D7CDF1;
    border-radius: 9999px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    top: 1px;
    left: 1px;
    transition: all 0.3s;
}

/**Estilo fondo al ser selecionado */
.switch > input:checked + label {
    background: #2F1570;
}

/**Estilo interno al ser selecionado */
.switch > input:checked + label::before {
    left: 20px;
    top: 1px;
    background: #F8F8F8;
}
</style>