import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/csv',
            name: '',
            component: resolve => require(['../views/UseDataTablesExportCsvComp'], resolve)
        },
        {
            path: '/',
            name: '',
            component: resolve => require(['../views/UseDataTablesExportExcelComp'], resolve)
        },
        {
            path: '/hello',
            name: 'HelloWorld',
            component: HelloWorld
        }
    ]
})
