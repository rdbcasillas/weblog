import { createRouter, createWebHistory } from "vue-router";
import HomeMenu from "../components/HomeMenu.vue";
import Writing from "../views/Writing.vue";
import MarkdownView from "../views/MarkdownView.vue";

const routes = [
  { path: "/", component: HomeMenu },
  { path: "/writing", component: Writing },
  {
    path: "/writing/:file",
    name: "MarkdownView",
    component: MarkdownView,
  },
  //   { path: "/programming", component: Programming },
  //   { path: "/podcasts", component: Podcasts },
  //   { path: "/youtube", component: YouTube },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
