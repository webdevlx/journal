import { defineStore } from "pinia";

export const useEntryStore = defineStore("EntryStore", {
  state: () => ({
    entries: JSON.parse(localStorage.getItem("entries") || "[]"),
  }),
});
