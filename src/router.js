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
            component: resolve => require(['./views/UseDataTablesExportCsvComp'], resolve)
        },
        {
            path: '/',
            name: '',
            component: resolve => require(['./views/UseDataTablesExportExcelComp'], resolve)
        },
        {
            path: '/render_table_header_cell',
            name: '',
            component: resolve => require(['./views/useDataTablesComp'], resolve)
        },
        {
            path: '/writexlsx',
            name: '',
            component: resolve => require(['./views/WriteXlsx'], resolve)
        },
        {
            path: '/hello',
            name: 'HelloWorld',
            component: HelloWorld
        }
    ]
})
