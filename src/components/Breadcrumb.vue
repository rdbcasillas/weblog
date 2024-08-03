<template>
  <nav v-if="breadcrumbs.length" class="text-gray-600 mb-4">
    <ul class="flex space-x-2">
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <router-link
          v-if="breadcrumb.path"
          :to="breadcrumb.path"
          class="underline text-blue-600 hover:text-blue-800"
        >
          {{ breadcrumb.name }}
        </router-link>
        <span v-else>{{ breadcrumb.name }}</span>
        <span v-if="index < breadcrumbs.length - 1">/</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  computed: {
    breadcrumbs() {
      const pathArray = this.$route.path.split("/").filter((path) => path);
      const breadcrumbs = pathArray.map((path, index) => {
        const to = `/${pathArray.slice(0, index + 1).join("/")}`;
        return {
          name: path.charAt(0).toUpperCase() + path.slice(1),
          path: index < pathArray.length - 1 ? to : null,
        };
      });
      const route = useRoute();
      if (route.path.startsWith("/links")) {
        return [
          { name: "Home", path: "/" },
          { name: "Links", path: "/links" },
        ];
      }
      return [{ name: "Home", path: "/" }, ...breadcrumbs];
    },
  },
};
</script>

<style scoped>
nav {
  font-size: 0.875rem; /* Equivalent to text-sm */
}
</style>
