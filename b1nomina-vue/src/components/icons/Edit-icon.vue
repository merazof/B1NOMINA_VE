<template>
    <div>
        <!--SVG-->
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Iconos" clip-path="url(#clip0_2022_9662)">
                <path id="Vector" d="M9.66699 4.06903H3.83366C3.39163 4.06903 2.96771 4.24463 2.65515 4.55719C2.34259 4.86975 2.16699 5.29367 2.16699 5.7357V17.4024C2.16699 17.8444 2.34259 18.2683 2.65515 18.5809C2.96771 18.8934 3.39163 19.069 3.83366 19.069H15.5003C15.9424 19.069 16.3663 18.8934 16.6788 18.5809C16.9914 18.2683 17.167 17.8444 17.167 17.4024V11.569" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_2" d="M15.917 2.81901C16.2485 2.48749 16.6982 2.30124 17.167 2.30124C17.6358 2.30124 18.0855 2.48749 18.417 2.81901C18.7485 3.15053 18.9348 3.60016 18.9348 4.06901C18.9348 4.53785 18.7485 4.98749 18.417 5.31901L10.5003 13.2357L7.16699 14.069L8.00033 10.7357L15.917 2.81901Z" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_2022_9662">
                    <rect width="20" height="20" fill="white" transform="translate(0.5 0.735687)"/>
                </clipPath>
            </defs>
        </svg>  
        <span v-if="text" class="tooltiptext">{{text}}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Stroke: {
        type: String,
        default: "#F8F8F8",
    },
    text: {
        String
    }
});
</script>

<style scoped>
div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
}
svg {
    cursor:pointer;
}

div > span {
  visibility: hidden;
  width: fit-content;
  height: 20px;
  background-color: #fffFFF;
  color: #1A245B;
  text-align: center;
  padding: 10px 12px;
  margin-top: 24px;
  border-radius: 6px;
  border: solid 2px #1A245B;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
div:hover > span {
    visibility: visible;
}
</style>