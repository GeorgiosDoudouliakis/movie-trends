import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import decodeUri from "@/helpers/decodeUri";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../views/home/HomeView.vue"),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import("../views/movies/MoviesView.vue"),
    meta: {
      title: 'Movies'
    }
  },
  {
    path: '/tv-series',
    name: 'TvSeries',
    component: () => import("../views/tv-series/TvSeriesView.vue"),
    meta: {
      title: 'Tv Series'
    }
  },
  {
    path: "/people",
    children: [
      {
        path: "",
        name: 'People',
        component: () => import("../views/people/PeopleView.vue"),
        meta: {
          title: 'People'
        },
      },
      {
        path: ":idName",
        name: 'Person',
        component: () => import("../views/people/PersonView.vue")
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import("../views/search/SearchView.vue"),
    meta: {
      title: 'Search'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.params.idName) {
    document.title = `${decodeUri(to.params.idName as string)} | MovieTrends`;
  } else {
    document.title = `${to.meta.title} | MovieTrends`;
  }
  next();
});

export default router;
