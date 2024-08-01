<template>
  <div>
    <Breadcrumb />
    <div class="pt-5">
      <ul class="list-none pl-5">
        <li
          v-for="(file, index) in markdownFiles"
          :key="index"
          class="p-2 transition-colors duration-300"
        >
          <router-link
            :to="{ name: 'MarkdownView', params: { file: file.name } }"
            class="text-gray-800 hover:text-gray-600 hover:underline font-semibold"
          >
            {{ file.title || file.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import matter from "gray-matter";
import { Buffer } from "buffer";
const markdownFiles = import.meta.glob("../writings/*.md", { as: "raw" });

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
  async created() {
    this.markdownFiles = await Promise.all(
      Object.keys(markdownFiles).map(async (file) => {
        console.log(file);
        const fileName = file.split("/").pop().replace(".md", "");
        const fileContent = await markdownFiles[file]();
        console.log("content", fileContent);
        const { data } = matter(Buffer.from(fileContent));
        console.log("data", data);

        return {
          path: file,
          name: fileName,
          title: data.title || fileName,
        };
      })
    );
  },
};
</script>
