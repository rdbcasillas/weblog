<template>
  <Breadcrumb />
  <div class="prose">
    <h1 v-if="title" class="text-3xl font-bold mb-4">{{ title }}</h1>
    <vue-markdown-it :source="content" />
  </div>
</template>

<script setup>
import matter from "gray-matter";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // Import useRoute
import { VueMarkdownIt } from "@f3ve/vue-markdown-it";
import Breadcrumb from "../components/Breadcrumb.vue";

const route = useRoute();
const title = ref("");
const content = ref("");

onMounted(async () => {
  let filePath;
  if (route.name === "WritingMarkdownView") {
    filePath = `../writings/${route.params.file}.md`;
  } else if (route.name === "LinksMarkdownView") {
    filePath = `${route.params.file}`;
    //filePath = `../links/${route.params.year}/${route.params.file}.md`;
  }
  console.log("Attempting to load:", filePath);
  try {
    const response = await fetch(new URL(filePath, import.meta.url).href);
    if (response.ok) {
      const markdown = await response.text();
      const [fileTitle, ...fileContent] = markdown.split("\n");
      title.value = fileTitle.replace(/^#\s*/, ""); // Remove Markdown heading symbol
      content.value = fileContent.join("\n");
    } else {
      console.error("Failed to fetch markdown file:", response.statusText);
      content.value = "# Error: Unable to load content";
    }
  } catch (error) {
    console.error("Error fetching markdown:", error);
    content.value = `# Error: Unable to load content - ${error.message}`;
  }
});
</script>

<style>
.prose {
  max-width: 100%;
  margin: auto;
  padding: 1rem;
  font-family: sans-serif;
  line-height: 1.6;
}
</style>
