<script setup lang="ts">
// import components
import TheHeader from "../components/TheHeader.vue";
import EntryEditor from "../components/EntryEditor.vue";
import EntryCard from "../components/EntryCard.vue";
// import methods
import { reactive } from "vue";
// import types
import type Entry from "../types/Entry";

// entry methods
const handleCreateEntry = (entry: Entry) => {
  entries.unshift(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
};
const handleRemoveEntry = (id: number) => {
  entries.forEach((entry: Entry, index: number) => {
    if (entry.id === id) {
      entries.splice(index, 1);
    }
  });
  localStorage.setItem("entries", JSON.stringify(entries));
};

// entry data
const entries: Entry[] = reactive(
  JSON.parse(localStorage.getItem("entries") || "[]")
);
</script>

<template>
  <main class="max-w-lg mx-auto p-4">
    <TheHeader></TheHeader>
    <EntryEditor @@create="handleCreateEntry"></EntryEditor>
    <ul v-if="entries.length > 0" class="space-y-1">
      <li v-for="entry in entries" :key="entry.id">
        <EntryCard
          :entry="entry"
          :key="entry.id"
          @@remove="handleRemoveEntry"
        ></EntryCard>
      </li>
    </ul>
  </main>
</template>
