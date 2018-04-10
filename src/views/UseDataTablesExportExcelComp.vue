<template lang='pug'>
    DataTablesExportExcel(:tableTitles='titles' :tableData='data' :tableProps='tableProps' :loading='tableLoading' :formatterColumn='formatColumnMethod')
</template>

<script>
import DataTablesExportExcel from '../components/DataTablesExportExcel'

export default {
    name: '',
    components: {
        DataTablesExportExcel
    },
    data () {
        return {
            titles: [{
                label: '用户', prop: 'user'
            }, {
                label: '用户类型', prop: 'user_type'
            }],
            data: [{
                user: 'cag',
                user_type: '原创'
            }, {
                user: 'jeff',
                user_type: '非原创'
            }],
            tableProps: {
                height: 350
            },
            tableLoading: false
        }
    },
    created () {

    },
    computed: {

    },
    methods: {
        // 可用于格式化单元格内容和样式
        formatColumnMethod (row, column) {
            let key = column.property
            let h = this.$createElement
            return h('div', {style: 'color: red;'}, row[key])
        }
    }
}
</script>

<style lang='stylus'>

</style>
