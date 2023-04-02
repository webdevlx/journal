<script setup lang="ts">
// import stores
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <h1 class="text-3xl leading-normal font-bold">
    📄 {{ userStore.user.username }}'s journal
  </h1>
</template>
