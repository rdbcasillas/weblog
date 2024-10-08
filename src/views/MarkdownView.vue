<template>
  <Breadcrumb />
  <div class="prose markdown-content">
    <h1 v-if="title" class="text-3xl font-bold mb-4">{{ title }}</h1>
    <vue-markdown-it :source="content" :options="options" />
  </div>
</template>

<script setup>
//import matter from "gray-matter";
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router"; // Import useRoute
import { VueMarkdownIt } from "@f3ve/vue-markdown-it";
import Breadcrumb from "../components/Breadcrumb.vue";

const route = useRoute();
const title = ref("");
const content = ref("");
const options = {
  html: true,
  linkify: true,
};

onMounted(async () => {
  let filePath;
  const isProduction = import.meta.env.PROD;
  const basePath = isProduction ? "" : "/src";
  if (route.name === "WritingMarkdownView") {
    filePath = `${basePath}/writings/${route.params.file}.md`;
    //filePath = `/writings/${route.params.file}.md`;
  } else if (route.name === "LinksMarkdownView") {
    filePath = `${basePath}/links/${route.params.year}/${route.params.file}.md`;
  } else if (route.name === "NotesMarkdownView") {
    filePath = `${basePath}/notes/${route.params.file}.md`;
  }

  try {
    //const response = await fetch(new URL(filePath, import.meta.url).href);
    const response = await fetch(filePath);
    if (response.ok) {
      let markdown = await response.text();
      markdown = markdown.replace(/---\n[\s\S]*?\n---/, "");
      const [fileTitle, ...fileContent] = markdown.split("\n");
      title.value = fileTitle.replace(/^#\s*/, ""); // Remove Markdown heading symbol
      content.value = fileContent.join("\n");

      await nextTick();

      const lastModified = new Date(response.headers.get("last-modified"));
      const lastModifiedElement = document.getElementById("last-modified");
      if (lastModifiedElement) {
        lastModifiedElement.textContent = lastModified.toLocaleDateString();
      }
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
.markdown-content div > ul {
  list-style-type: none; /* Remove default bullets */
  padding-left: 1.5em; /* Adjust padding */
}

.markdown-content div > ul > li {
  position: relative;
  padding-left: 1em;
}

.markdown-content div > ul > li::before {
  content: "*"; /* Custom bullet character */
  color: #2c3e50; /* Bullet color */
  font-size: 1.4em; /* Bullet size */
  position: absolute;
  left: 0;
  top: 0;
}
.markdown-content a:hover {
  color: brown;
}
</style>
