<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Writing</h2>
    <ul class="list-disc pl-5">
      <li v-for="(file, index) in markdownFiles" :key="index">
        <router-link
          :to="{ name: 'MarkdownView', params: { file: file.name } }"
        >
          {{ file.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
const markdownFiles = import.meta.glob("../writings/*.md");

export default {
  name: "Writing",
  data() {
    return {
      markdownFiles: Object.keys(markdownFiles).map((file) => {
        const fileName = file.split("/").pop().replace(".md", "");
        return { path: file, name: fileName };
      }),
    };
  },
};
</script>
