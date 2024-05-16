<template>
    <div class="input-line-contend">
        <label class="input-label">{{Text}}</label>
        <div class="input-group">
            <span class="form-icon-conted">
                <slot name="FirtIcon" class="form-icon-conted"></slot>
            </span>

            <input 
                required 
                :placeholder="Placeholder" 
                :type="InputType" 
                class="form-control" 
                v-model="DataInput"
                minlength="3"
                maxlength="32"    
            >
                
            
            <span class="form-icon-conted">
                <slot name="SecondIcon" class="form-button-conted"></slot>
            </span> 
        
        </div>
    </div>
</template>

<script>
export default {
    //nombre del componente
    name: 'Input',
    //atribitos enviados desde el componente padre
    props:[
        'Text',
        'Placeholder',
        'InputType',
    ],

    data(){
        return{
            DataInput: '',
        }
    },
    //Se mantiene a la escuacha del texto recibido con v-model="DataInput"
    watch: {
        //Funcion que emite la data ingresada al componente padre <<Recibir como  @message:'funtion'>>
        DataInput: function () {
            this.$emit('message', this.DataInput)
       }
    }
}

</script>

<style scoped>
/*Contenedor General*/
div.input-line-contend {
    background-color: #FFFFFF;
    margin-bottom: 4px;
}

/*Texto mostrado en la parte superior de input*/
div.input-line-contend .input-label {
color: #999999;
font-size: 11px;
font-weight: 500;
word-wrap: break-word;
background: #FFFFFF;
}

/* fila contenedora del input y los iconos*/
div.input-line-contend .input-group {
    display: flex;
    align-self: center;
    border-bottom: #000842 3px solid;
}

/*Estilos del input*/
.input-line-contend .input-group input{
    border-style: none; 
    border-bottom-right-radius: 0%; 
    width: 100%;
    outline: none;
    padding: 6px;
}
/* Contenedor de los iconos*/
.input-line-contend .input-group .form-icon-conted {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    padding: 6px 12px;
}

</style>