import { createStore, } from "vuex";
import  perfilModulo  from './modulos/perfil-vuex'

const store = createStore({    
    modules:{
        perfil: perfilModulo
    }

})

export default store