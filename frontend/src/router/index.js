import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ChargersView from "../views/ChargersView.vue";
import ProfileView from "../views/ProfileView.vue";
import CreateView from "../views/CreateView.vue";
import UpdateView from "../views/UpdateView.vue";
import MapView from "../views/MapView.vue";
import { authState } from "../stores/auth";

const routes = [
  { path: "/", component: LoginView },
  {
    path: "/register",
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: "/chargers",
    component: ChargersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    component: CreateView,
    meta: { requiresAuth: true },
  },
  {
    path: "/update/:id",
    component: UpdateView,
    meta: { requiresAuth: true },
  },
  {
    path: "/map",
    component: MapView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authState.isLoggedIn) {
    next("/");
  } else if (!to.meta.requiresAuth && authState.isLoggedIn) {
    next("/chargers");
  } else {
    next();
  }
});

export default router;
