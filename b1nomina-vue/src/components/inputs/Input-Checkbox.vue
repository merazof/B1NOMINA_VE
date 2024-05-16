<template>
  <div class="conted-Input">
     <input type="checkbox" :value="Objid" :id="'checkbox'+Objid" :checked="checked" @change="updateValue">    
     <label :for="'checkbox'+Objid"></label>
     <span>{{texto}}</span>
  </div>
 </template>
 
 <script setup>
 import { defineProps, defineEmits } from 'vue';
 
 const props = defineProps({
     texto: {
         type: String,
         default: ''
     },
     Objid: {
         type: [String, Number],
         default: ''
     },
     checked: {
         type: Boolean,
         default: false
     }
 });
 
 const emit = defineEmits(['update']);
 
 const updateValue = (event) => {
     emit('update', event.target.checked ? props.Objid : props.Objid);
 };
 </script>
 


<style scoped> 
/* Oculta el estilo por default*/
[type="checkbox"] {
  opacity: 4;
}
/*Estilo del texto*/
[type="checkbox"] + label {
  position: relative;
  padding-left: 3px;
  cursor: pointer;
  display: inline-block;
  color:#12013D;
  line-height: 25px;
}
 /* Estilo del fondo por defecto*/
[type="checkbox"] + label::before {
  content: "";
  position: absolute;
  left: -21px;
  top: -16px;
  width: 20px;
  height: 20px;
  outline: 1px solid #CDE0f1;

  background: #F8F8F8; 
  border-radius: 5px; 
}

[type="checkbox"]:checked + label::after {
  content: "";
  position: absolute;
  left: -17.5px;
  top: -11.5px;
  width: 14px;
  height: 12px;

  background-image:url(../icons/svg/check.svg); 
  background-size: contain;
}

.conted-input {
  display: flex;
  align-items: center;
  align-self: center;
  width: 100%;
}

.conted-input > span{
  color: #12013D;
  font-size: 16px;
  font-family: Inter;
  font-weight: 400;
  line-height: 32px;
  word-wrap: break-word;
}
</style>