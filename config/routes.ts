export default [
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            {
                name: 'login',
                path: '/user/login',
                component: './user/login',
            },
        ],
    },


{
    path: '/todo',
    component: '../layouts/BasicLayout',
    routes: [
        {
            name: 'todo-list',
            path: '/todo/list',
            component: './todo/list',
        },
        {
            name: 'todo-detail',
            path: '/todo/detail/:id',
            component: './todo/detail',
        },
    ],
},

    {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
            {
                path: '/',
                component: '../layouts/BasicLayout',
                authority: ['admin', 'user'],
                routes: [
                    {
                        path: '/',
                        redirect: '/welcome',
                    },
                    {
                        path: '/welcome',
                        name: 'welcome',
                        icon: 'smile',
                        component: './Welcome',
                    },
                    {
                        path: '/admin',
                        name: 'admin',
                        icon: 'crown',
                        component: './Admin',
                        authority: ['admin'],
                    },
                    {
                        component: './404',
                    },
                ],
            },
            {
                component: './404',
            },
        ],
    },

    {
        component: './404',
    },
];
