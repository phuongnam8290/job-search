<template>
  <header class="w-full text-sm" :class="headerHeightClass">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8">
        <router-link :to="{ name: 'Home' }" class="flex h-full items-center text-xl"> Bobo Careers </router-link>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem of menuItems" :key="menuItem.text" class="ml-9 h-full first:ml-0">
              <router-link :to="{ name: menuItem.name }" class="5 flex h-full items-center py-2.5">
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sign in" @click="loginUser" />
        </div>
      </div>

      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/shared/ActionButton.vue";
import ProfileImage from "@/components/navigation/ProfileImage.vue";
import TheSubnav from "@/components/navigation/TheSubnav.vue";

import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav,
  },
  data() {
    return {
      menuItems: [
        { text: "Teams", name: "Home" },
        { text: "Locations", name: "Home" },
        { text: "Life at Bobo Corp", name: "Home" },
        { text: "How we hire", name: "Home" },
        { text: "Students", name: "Home" },
        { text: "Jobs", name: "JobResults" },
      ],
    };
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    },
  },
  methods: {
    ...mapActions(useUserStore, { loginUser: "loginUser" }),
  },
};
</script>

<style scoped></style>
