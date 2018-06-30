<template lang='pug'>
#DataTableDemo.textLeft
    div
        //DataTablesComp(:tableTitles='tableTitles' :tableData='tableData' :formatterColumn='formatColumn' :loading='tableLoading' :renderHeaderFunc='renderHeader')
        DataTablesComp(:tableFixedTitles.sync='tableFixedTitles' :tableTitles='tableTitles' :tableData='tableData' :loading='tableLoading')
</template>

<script>
    import DataTablesComp from '../components/DataTablesComp'

    export default {
        name: '',
        components: {
            DataTablesComp
        },
        data () {
            return {
                tableLoading: false,
                tableFixedTitles: [
                    {label: '日期', prop: 'dt'},
                    {label: '用户类型', prop: 'user_type'}
                ],
                tableTitles: [
                    {label: 'dau', prop: 'dau'}
                ],
                tableData: []
            }
        },
        created () {
            this.tableData = [
                {
                    dt: '20180304',
                    user_type: '全部',
                    dau: 1100
                }
            ]
        },
        mounted () {
            // this.tableData = [
            //     {
            //         dt: '20180304',
            //         user_type: '全部',
            //         dau: 1100
            //     }
            // ]
        },
        computed: {},
        methods: {
            formatColumn (row, column) {
                let key = column.property
                let h = this.$createElement
                return h('div', {style: 'color:#ff7b4d;'}, [
                    h('a', {attrs: {href: '/' + row[key]}}, row[key]),
                    h('span', {style: 'width:10px;display: inline-block;'}, ''),
                    h('a', {attrs: {href: '/aaa'}}, [
                        // h('i', {class: 'icon icon-account', style: 'color:gray'}, '')
                        h('i', {class: 'el-icon-document', style: 'color:gray'}, '')
                    ])
                ])
            },
            renderHeader (h, {column, $index}) {
                if ($index === 0) {
                    return h('span', {}, [
                        h('span', {}, column.label + 'aaa'),
                        h('el-popover', {props: {placement: 'top-start', title: '标题', width: '200', trigger: 'hover', content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。'}}, [
                            h('i', {slot: 'reference', class: 'el-icon-question', style: 'color:gray;font-size:16px;margin-left:10px;'}, '')
                        ])
                    ])
                } else {
                    return column.label
                }
            }
        }
    }
</script>

<style lang='stylus' type="text/stylus">
    .el-table td.is-hidden>*, .el-table th.is-hidden>*
        visibility visible
</style>

