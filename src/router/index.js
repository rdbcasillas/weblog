import { createRouter, createWebHistory } from "vue-router";
import HomeMenu from "../components/HomeMenu.vue";
import Writing from "../views/Writing.vue";
import Links from "../views/Links.vue";
import MarkdownView from "../views/MarkdownView.vue";

const routes = [
  { path: "/", component: HomeMenu },
  { path: "/writing", component: Writing },
  { path: "/links", name: "Links", component: Links },
  {
    path: "/writing/:file",
    name: "WritingMarkdownView",
    component: MarkdownView,
  },
  {
    path: "/links/:year/:file",
    name: "LinksMarkdownView",
    component: MarkdownView,
  },
  //   { path: "/programming", component: Programming },
  //   { path: "/podcasts", component: Podcasts },
  //   { path: "/youtube", component: YouTube },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
