<template>
    <div>
        <svg class="icon" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Iconos">
                <path id="Vector" d="M17.9304 12.6315V15.9648C17.9304 16.4068 17.7548 16.8308 17.4423 17.1433C17.1297 17.4559 16.7058 17.6315 16.2638 17.6315H4.59709C4.15506 17.6315 3.73114 17.4559 3.41858 17.1433C3.10601 16.8308 2.93042 16.4068 2.93042 15.9648V12.6315" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path id="Vector_2" d="M6.26373 8.46481L10.4304 12.6315L14.5971 8.46481" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path id="Vector_3" d="M10.4304 12.6315V2.63147" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
        </svg>
        <span v-if="text" class="tooltiptext">{{text}}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Stroke: {
        type: String,
        default: "#1A245B",
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