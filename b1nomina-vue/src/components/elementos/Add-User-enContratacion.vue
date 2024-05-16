<template>
    <div class="conted">
        <div class="imagen">
            <PersonasGrandeIcon />
        </div>
        <div>
            <h3>
                ¿Estas pensando en contratar un nuevo empleado para tu equipo?
            </h3>
            <p>Agrégalo para gestionar la nueva contratación, enviarle su contrato para que firme digitalmente, gestiona su AFP, datos bancarios y mucho más en un solo clic.</p>
            
            <TemplateButton text="Agregar Prospecto">
                <template #default>                        
                    <PlusCirculoIcon />
                </template>
            </TemplateButton>
        </div>
    </div>
</template>

<script setup>
import PersonasGrandeIcon from '@/components/icons/Personas-Grande-icon.vue';
import TemplateButton from '@/components/botones/Template-button2.vue';
import PlusCirculoIcon from '@/components/icons/Plus-Circulo-icon.vue';
</script>

<style scoped>

.conted{
    width: 100%; 
    height: 100%; 
    padding: 24px; 
    background: #EDF6FF; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); 
    justify-content: center; 
    align-items: center; 
    gap: 48px; 
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
    box-sizing: border-box;
}

h3 {
    color: black;
    font-size: 24px;
    font-family: Poppins;
    font-weight: 500;
    line-height: 34px;
    word-wrap: break-word
}

p {
    color: black;
    font-size: 13.46px;
    font-family: poppins;
    font-weight: 500;
    line-height: 19.23px;
    word-wrap: break-word;
}

</style>