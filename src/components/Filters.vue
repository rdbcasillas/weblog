<template>
  <!-- <div class="flex space-x-12 mb-4">
    <label
      class="text-sm font-serif flex items-center w-3 h-3 text-amber-800 bg-gray-100"
    >
      <input
        type="checkbox"
        v-model="showTags"
        @change="toggleTags"
        class="mr-2 w-3 h-3 text-blue-600 dark:text-gray-300"
      />
      Tags
    </label>
    <input
      type="text"
      v-model="searchQuery"
      @input="searchPosts"
      placeholder="Search by title or tag"
      class="ml-6 border border-gray-200 rounded placeholder-amber-800 placeholder-opacity-50"
    />
  </div> -->
  <div class="flex items-center space-x-4 mb-4">
    <label class="flex items-center space-x-2">
      <input type="checkbox" v-model="showTags" @change="toggleTags" />
      <span class="font-serif text-amber-800">Tags</span>
    </label>
    <!-- Separator -->
    <div class="border-l border-gray-500 h-6 mx-2"></div>

    <input
      type="text"
      v-model="searchQuery"
      @input="searchPosts"
      placeholder="Search by title or tag"
      class="custom-placeholder pl-2 border border-amber-300 rounded focus:outline-none focus:border-blue-500 placeholder-amber-800 placeholder-opacity-60 placeholder-f"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTags: false,
      searchQuery: "",
    };
  },
  methods: {
    toggleTags() {
      this.$emit("toggle-tags", this.showTags);
    },
    searchPosts() {
      this.$emit("search-posts", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.custom-placeholder::placeholder {
  font-size: 0.895rem;
  font-family: "sans-serif";
}
</style>
