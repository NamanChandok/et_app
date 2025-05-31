import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ChargersView from "../views/ChargersView.vue";
import ProfileView from "../views/ProfileView.vue";
import { getToken } from "../stores/auth";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !getToken()) {
    next("/");
  } else {
    next();
  }
});

export default router;
