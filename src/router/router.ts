import { createRouter, createWebHistory } from '../../router'
import ComponentA from '../components/ComponentA.vue'
import ComponentB from '../components/ComponentB.vue'


const routers = [
    {
        path: '/',
        component: ComponentA
    },
    {
        path: '/B',
        component: ComponentB
    }
]


export const router = createRouter({
    history: createWebHistory(),
    routers
})

