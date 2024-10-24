<script setup>
import {onMounted, onUnmounted, ref} from "vue";

let props = defineProps({
  title: {
    type: String,
    required: true
  }
})

let slider = ref(null)
let arrow = ref(false);

const handleResize = () => {
  arrow.value = slider.value.scrollWidth > document.body.clientWidth;
};

onMounted(() => {
  if (slider.value.scrollWidth > document.body.clientWidth) {
    arrow.value = true;
  }

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  console.log('unmounted');
  window.removeEventListener('resize', handleResize);
});

const leftSlide = () => {
  slider.value.scrollBy(-200, 0)
}

const rightSlide = () => {
  slider.value.scrollBy(200, 0)
}
</script>

<template>

  <div class="grid w-full items-center gap-3">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">{{ title }}</h2>
      <div v-if="arrow" class="flex gap-5 items-center">
        <div class="rotate-180 cursor-pointer" @click="leftSlide">
          <svg height="1em" viewBox="0 0 12 24" width="0.5em" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path id="weuiArrowOutlined0" class="fill-gray-500"
                    d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"/>
            </defs>
            <use fill-rule="evenodd" href="#weuiArrowOutlined0" transform="rotate(-180 5.02 9.505)"/>
          </svg>
        </div>
        <div class="cursor-pointer" @click="rightSlide">
          <svg height="1em" viewBox="0 0 12 24" width="0.5em" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path id="weuiArrowOutlined0" class="fill-gray-500"
                    d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"/>
            </defs>
            <use fill-rule="evenodd" href="#weuiArrowOutlined0" transform="rotate(-180 5.02 9.505)"/>
          </svg>
        </div>
      </div>
    </div>
    <div ref="slider"
         class="flex gap-x-3 overflow-x-scroll overflow-y-hidden justify-start snap-mandatory scrollbar scrollbar-thumb-white scroll-smooth">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>