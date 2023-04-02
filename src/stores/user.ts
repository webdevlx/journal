import { defineStore } from "pinia";
import type User from "@/types/User";

interface State {
  user: User;
}

export const useUserStore = defineStore("UserStore", {
  state: (): State => ({
    user: {
      id: 1,
      username: "webdevlx",
      teacher: "Daniel Kelly",
    },
  }),
});
