
<template>
    <div>
        <!--SVG-->
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.125 7.33333C16.125 5.97409 15.585 4.67053 14.6239 3.70941C13.6628 2.74828 12.3592 2.20833 11 2.20833C9.64077 2.20833 8.3372 2.74828 7.37608 3.70941C6.41495 4.67053 5.875 5.97409 5.875 7.33333C5.875 13.3125 3.3125 15.0208 3.3125 15.0208H18.6875C18.6875 15.0208 16.125 13.3125 16.125 7.33333Z" 
                    :stroke=Stroke
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
            />
            <path 
                d="M12.4778 18.4375C12.3276 18.6964 12.112 18.9113 11.8527 19.0606C11.5934 19.21 11.2993 19.2886 11 19.2886C10.7008 19.2886 10.4067 19.21 10.1474 19.0606C9.88806 18.9113 9.67251 18.6964 9.52234 18.4375" 
                :stroke="Stroke" 
                stroke-width="2" 
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
        <span v-if="text" class="tooltiptext">{{text}}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Stroke: {
        type: String,
        default: "white",
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