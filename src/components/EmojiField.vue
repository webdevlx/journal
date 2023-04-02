<script setup lang="ts">
// import composables
import { useEmojis } from "@/composables/UseEmojis";

// props
defineProps(["modelValue"]);

// emits
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="my-2 h-12 flex items-center justify-between text-lg">
    <button
      class="w-6 h-6 flex justify-center items-center duration-150"
      :class="[emoji === modelValue ? 'scale-150' : '']"
      v-for="emoji in useEmojis"
      @click="$emit('update:modelValue', emoji === modelValue ? null : emoji)"
    >
      {{ emoji }}
    </button>
  </div>
</template>
