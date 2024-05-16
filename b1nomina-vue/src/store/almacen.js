import { reactive } from "vue";

const almacen = reactive({
    userID: Number(localStorage.getItem("userId")),
    updatedUserID(userID) {
        this.userID = userID;
    },
    SociedadID: null,
    updatedSociedadID(SociedadID) {
        if(SociedadID == Number) {
            this.SociedadID = SociedadID
        }  
    },
    diasLaborales: {
        "1": "Lunes",
        "2": "Martes",
        "3": "Miércoles",
        "4": "Jueves",
        "5": "Viernes",
        "6": "Sabado",
        "7": "Domingo",
    },
    ValoresPanelNavegacion: null,
    updatedValoresPanelNavegacion(valores) {
        this.ValoresPanelNavegacion = valores;
    },

});

export default almacen