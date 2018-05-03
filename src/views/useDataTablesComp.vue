<template lang='pug'>
#DataTableDemo.textLeft
    div
        DataTablesComp(:tableTitles='tableTitles' :tableData='tableData' :formatterColumn='formatColumn'
    :loading='tableLoading' :renderHeaderFunc='renderHeader')
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
                tableTitles: [
                    {label: '日期', prop: 'dt'},
                    {label: '用户类型', prop: 'user_type'},
                    {label: '渠道名', prop: 'dimension'},
                    {label: 'dnu', prop: 'dnu'},
                    {label: '占比%', prop: 'dnu_ratio'}
                ],
                tableData: [
                    {dt: '20180304'}
                ]
            }
        },
        mounted () {

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
    #DataTableDemo
        .echarts
            width 400px
            height 400px
        .is-circle
            border-radius: 50%;
            padding: 12px;
</style>

