import { createRouter, createWebHistory } from 'vue-router';
import PortfolioView from '../views/PortfolioView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: PortfolioView
        },
        {
            path: '/about',
            name: 'about me',
            redirect: '/'
        },
        {
            path: '/portfolio',
            name: 'portfolio',
            redirect: '/'
        },
        {
            path: '/artworks',
            name: 'artworks',
            component: () => import('../views/ArtworksView.vue')
        },
        {
            path: '/development',
            name: 'development',
            component: () => import('../views/DevelopmentView.vue')
        }
    ]
});

router.beforeEach(function (to, from, next) {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    next();
});

export default router;
