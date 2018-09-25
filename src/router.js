import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexPage from './components/index-page.vue';
import Login from './components/login.vue';
import Register from '@/components/register';
import Evaluation from '@/components/evaluation.vue';
import IndustryNews from '@/components/industry-news';
import Lifestyle from '@/components/lifestyle';
import ArticleContent from '@/components/article/article-content';
import Activity from '@/components/activity';
import Home from '@/components/home/home';
import SearchResult from '@/components/search/search-result';
import Vip from '@/components/vip/vip';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: IndexPage
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/evaluation',
    component: Evaluation
  },
  {
    path: '/industry-news',
    component: IndustryNews
  },
  {
    path: '/lifestyle',
    component: Lifestyle
  },
  {
    path: '/article/:id',
    component: ArticleContent,
    props: true
  },
  {
    path: '/home/:id',
    component: Home,
    props: true
  },
  {
    path: '/vip/:id',
    component: Vip,
    props: true
  },
  {
    path: '/activity',
    component: Activity
  },
  {
    path: '/search/:keyword',
    component: SearchResult,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
