<script setup lang="ts">
// import methods
import formatDate from "date-fns/formatRFC7231";
import formatTime from "date-fns/formatISO9075";
import { ref } from "vue";
// import types
import type Entry from "@/types/Entry";
// import stores
import { useUserStore } from "@/stores/user";

// userStore
const userStore = useUserStore();

// props
defineProps<{
  entry: Entry;
}>();

// emits
defineEmits<{
  (event: "@remove", id: number): void;
}>();

// remove data
const showRemove = ref(false);
</script>

<template>
  <div
    class="bg-gradient-to-r from-gray-900 from-10% via-gray-950 via-50% to-gray-900 to-90% p-4 rounded-md border border-gray-900 relative overflow-hidden"
    @mousemove="showRemove = true"
    @mouseleave="showRemove = false"
  >
    <Transition name="remove-btn">
      <button
        class="absolute left-0 top-0 bottom-0 bg-gray-950 text-lg select-none"
        v-if="showRemove"
        @click="$emit('@remove', entry.id)"
      >
        ✂️
      </button>
    </Transition>
    <div class="flex items-center gap-4">
      <div class="text-7xl select-none">
        {{ entry.emoji }}
      </div>
      <p>{{ entry.body }}</p>
    </div>
    <div class="mt-4 flex justify-end items-center gap-1">
      <p class="text-emerald-500">
        {{ formatDate(new Date(entry.createdAt)).slice(0, -13) }} |
        {{ formatTime(new Date(entry.createdAt)).slice(11, 19) }} |
      </p>
      <p class="text-emerald-600 text-sm">{{ userStore.user.username }}</p>
    </div>
  </div>
</template>
