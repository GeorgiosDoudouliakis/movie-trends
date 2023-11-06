import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import MoviesView from "@/views/movies/MoviesView.vue";
import TvSeriesView from "@/views/tv-series/TvSeriesView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesView
  },
  {
    path: '/tv-series',
    name: 'TvSeries',
    component: TvSeriesView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
