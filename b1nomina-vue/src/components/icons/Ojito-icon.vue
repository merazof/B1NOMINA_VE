<template>
    <div>
        <!--SVG-->
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Iconos" clip-path="url(#clip0_1194_7153)">
                <path id="Vector" d="M1.26373 10.1315C1.26373 10.1315 4.59707 3.4648 10.4304 3.4648C16.2637 3.4648 19.5971 10.1315 19.5971 10.1315C19.5971 10.1315 16.2637 16.7981 10.4304 16.7981C4.59707 16.7981 1.26373 10.1315 1.26373 10.1315Z" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path id="Vector_2" d="M10.4304 12.6315C11.8111 12.6315 12.9304 11.5122 12.9304 10.1315C12.9304 8.75076 11.8111 7.63147 10.4304 7.63147C9.04971 7.63147 7.93042 8.75076 7.93042 10.1315C7.93042 11.5122 9.04971 12.6315 10.4304 12.6315Z" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1194_7153">
                    <rect width="20" height="20" fill="white" transform="translate(0.43042 0.13147)" />
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
        default: "black",
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