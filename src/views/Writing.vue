<template>
  <div>
    <Breadcrumb />
    <Filters
      @toggle-tags="showTags = $event"
      @search-posts="searchQuery = $event"
    />
    <div class="pt-5">
      <ul class="list-none pl-5">
        <li
          v-for="(file, index) in filteredFiles.filter(
            (file) => file.tags && !file.tags.includes('notes')
          )"
          :key="index"
          class="p-2 transition-colors duration-300"
        >
          <router-link
            :to="{ name: 'WritingMarkdownView', params: { file: file.name } }"
            class="text-gray-800 hover:text-gray-600 hover:underline font-semibold post-title"
          >
            {{ file.title || file.name }}
          </router-link>
          <span v-if="file.date" class="text-gray-500 text-sm ml-1">
            <span class="pipe"> | </span> {{ formatDate2(file.date) }}
          </span>
          <div v-if="showTags" class="tags">
            <span v-for="(tag, idx) in file.tags" :key="idx" class="tag-item">
              {{ tag }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import matter from "gray-matter";
import { Buffer } from "buffer";
import Filters from "../components/Filters.vue";
const markdownFiles = import.meta.glob("../writings/*.md", { as: "raw" });

export default {
  name: "Writing",
  components: { Filters },
  data() {
    return {
      markdownFiles: Object.keys(markdownFiles).map((file) => {
        const fileName = file.split("/").pop().replace(".md", "");
        return { path: file, name: fileName };
      }),
      showTags: false,
      searchQuery: "",
    };
  },
  computed: {
    sortedMarkdownFiles() {
      return this.markdownFiles.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    },
    filteredFiles() {
      if (!this.searchQuery) {
        return this.sortedMarkdownFiles;
      }
      const query = this.searchQuery.toLowerCase();
      return this.sortedMarkdownFiles.filter(
        (file) =>
          file.title.toLowerCase().includes(query) ||
          file.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    },
    formatDate2(dateString) {
      const date = new Date(dateString);
      const options = { month: "short" };
      const month = date.toLocaleDateString("en-US", options);
      const day = date.getDate();
      const suffix = this.getOrdinalSuffix(day);
      const year = date.getFullYear().toString().slice(-2);

      return `${day}${suffix} ${month}, ${year}`;
    },
    getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th"; // special case for 11th-13th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
  },
  async created() {
    this.markdownFiles = await Promise.all(
      Object.keys(markdownFiles).map(async (file) => {
        const fileName = file.split("/").pop().replace(".md", "");
        const fileContent = await markdownFiles[file]();
        const { data } = matter(Buffer.from(fileContent));

        return {
          path: file,
          name: fileName,
          title: data.title || fileName,
          date: data.date || "1970-01-01",
          tags: data.tags || [],
        };
      })
    );
  },
};
</script>

<style>
.post-title {
  color: #654321; /* Dark Olive Green */
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag-item {
  background-color: #c4d6a3;
  color: #555;
  font-size: 0.675rem;
  padding: 0.15rem 0.2rem;
  border-radius: 0.25rem;
  display: inline-block;
}
.pipe {
  font-size: 22px;
  color: forestgreen;
}
</style>
