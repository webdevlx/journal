<script setup lang="ts">
// import components
import EmojiField from "./EmojiField.vue";
// import methods
import { ref, computed, onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";
// import types
import type Emoji from "@/types/Emoji";
import type Entry from "@/types/Entry";
// import stores
import { useUserStore } from "@/stores/user";

// userStore
const userStore = useUserStore();

// display width
const { width } = useWindowSize();

// textarea data
const textarea = ref<HTMLTextAreaElement | null>(null);
const body = ref("");
const charCount = computed(() => body.value.length);
const maxChars = 280;
// textarea methods
onMounted(() => textarea.value?.focus());
const handleTextInput = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement;
  if (textarea.value.length <= maxChars) {
    body.value = textarea.value;
  } else {
    body.value = textarea.value = textarea.value.substring(0, maxChars);
  }
};

// emoji data
const emoji = ref<Emoji | null>(null);

// form events
const emit = defineEmits<{
  (e: "@create", entry: Entry): void;
}>();
// form methods
const handleForm = () => {
  if (body.value === "" && emoji.value === null) {
    alert("Please write text and choose emoji");
  } else if (body.value === "") {
    alert("Please write text");
  } else if (emoji.value === null) {
    alert("Please choose emoji");
  } else {
    emit("@create", {
      id: Math.random(),
      body: body.value,
      emoji: emoji.value,
      createdAt: new Date(),
      userId: 1,
    });
    body.value = "";
    emoji.value = null;
    if (width.value >= 1024) {
      textarea.value?.focus();
    }
  }
};
</script>

<template>
  <div class="p-4 bg-gray-900 my-4 rounded-md">
    <textarea
      class="w-full bg-gray-950 placeholder:text-gray-500 rounded-md p-4 outline-none resize-none"
      :placeholder="`New Journal Entry for ${userStore.user.username}`"
      rows="4"
      ref="textarea"
      :value="body"
      @keyup="handleTextInput"
    ></textarea>
    <EmojiField v-model="emoji"></EmojiField>
    <div class="flex justify-between items-center">
      <p class="py-1 px-4 bg-gray-950 rounded-md">
        {{ charCount }} / {{ maxChars }}
      </p>
      <button class="py-1 px-4 bg-emerald-600 rounded-md" @click="handleForm">
        Remember
      </button>
    </div>
  </div>
</template>
