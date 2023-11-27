import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useDecodingUtilities } from '@/composables/useDecodingUtilities';

const { decodeIdNameParam } = useDecodingUtilities();

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
    redirect: { name: 'Now playing movies' },
    component: () => import("../views/movies/MoviesView.vue"),
    children: [
      {
        path: "now-playing",
        name: 'Now playing movies',
        component: () => import("../views/movies/NowPlayingMoviesView.vue"),
        meta: {
          title: 'Now playing movies'
        },
      },
      {
        path: "popular",
        name: 'Popular movies',
        component: () => import("../views/movies/PopularMoviesView.vue"),
        meta: {
          title: 'Popular movies'
        },
      },
      {
        path: "top-rated",
        name: 'Top rated movies',
        component: () => import("../views/movies/TopRatedMoviesView.vue"),
        meta: {
          title: 'Top rated movies'
        },
      },
      {
        path: "upcoming",
        name: 'Upcoming movies',
        component: () => import("../views/movies/UpcomingMoviesView.vue"),
        meta: {
          title: 'Upcoming movies'
        },
      }
    ]
  },
  {
    path: '/tv-series',
    name: 'TvSeries',
    redirect: { name: 'Airing today tv series' },
    component: () => import("../views/tv-series/TvSeriesView.vue"),
    children: [
      {
        path: "airing-today",
        name: 'Airing today tv series',
        component: () => import("../views/tv-series/AiringTodayTvSeriesView.vue"),
        meta: {
          title: 'Airing today tv series'
        },
      },
      {
        path: "on-the-air",
        name: 'On the air tv series',
        component: () => import("../views/tv-series/OnTheAirTvSeriesView.vue"),
        meta: {
          title: 'On the air tv series'
        },
      },
      {
        path: "popular",
        name: 'Popular tv series',
        component: () => import("../views/tv-series/PopularTvSeriesView.vue"),
        meta: {
          title: 'Popular tv series'
        },
      },
      {
        path: "top-rated",
        name: 'Top rated tv series',
        component: () => import("../views/tv-series/TopRatedTvSeriesView.vue"),
        meta: {
          title: 'Top rated tv series'
        },
      }
    ]
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
        props: true,
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
    document.title = `${decodeIdNameParam(to.params.idName as string)} | MovieTrends`;
  } else {
    document.title = `${to.meta.title} | MovieTrends`;
  }
  next();
});

export default router;
