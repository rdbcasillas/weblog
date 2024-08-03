<template>
  <div>
    <Breadcrumb />
    <div class="pt-5">
      <div v-for="year in groupedLinks" :key="year.year" class="mb-8">
        <h2 class="text-3xl font-bold text-purple-800 mb-4">{{ year.year }}</h2>
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="month in year.months"
            :key="month.name"
            class="border p-2"
          >
            <router-link
              :to="{
                name: 'LinksMarkdownView',
                params: { year: year.year, file: month.file },
              }"
              class="text-blue-800 hover:underline"
            >
              {{ month.name }}
            </router-link>
          </div>
        </div>
        <hr class="my-4" />
      </div>
    </div>
  </div>
</template>

<script>
const markdownFiles = import.meta.glob("../links/**/*.md");
console.log("hi", markdownFiles);
export default {
  name: "Links",
  data() {
    return {
      links: [],
    };
  },
  created() {
    this.links = Object.keys(markdownFiles).map((file) => {
      const parts = file.split("/");
      const year = parts[2];
      const month = parts[3].replace(".md", "");
      console.log("hi", parts, year, month);
      return { year, month, file };
    });
  },
  computed: {
    groupedLinks() {
      const grouped = this.links.reduce((acc, link) => {
        const year = acc.find((y) => y.year === link.year);
        if (year) {
          year.months.push({ name: link.month, file: link.file });
        } else {
          acc.push({
            year: link.year,
            months: [{ name: link.month, file: link.file }],
          });
        }
        return acc;
      }, []);
      return grouped.sort((a, b) => b.year - a.year);
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
