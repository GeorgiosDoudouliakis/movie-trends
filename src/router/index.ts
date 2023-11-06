import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import MoviesView from "@/views/movies/MoviesView.vue";
import TvSeriesView from "@/views/tv-series/TvSeriesView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesView,
    meta: {
      title: 'Movies'
    }
  },
  {
    path: '/tv-series',
    name: 'TvSeries',
    component: TvSeriesView,
    meta: {
      title: 'Tv Series'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | MovieTrends`;
  next();
});

export default router;
