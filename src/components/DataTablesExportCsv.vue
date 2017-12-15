<template lang='pug'>
.datatables.fl
    div(v-loading='loading' element-loading-text='数据加载中')
        data-tables(:data='tableData' :actions-def='actionsDef' v-show='show' :table-props='tableProps' :search-def='searchDef' :pagination-def='paginationDef' @filtered-data='handleFilteredData')
            el-table-column(v-for='title in tableTitles' :prop='title.prop' :label='title.label' :key='title.label' sortable='custom')
</template>

<script>
var json2csv = require('json2csv')
let CsvExport = function (data, fields, fieldNames, fileName) {
    try {
        var result = json2csv({
            data: data,
            fields: fields,
            fieldNames: fieldNames
        })
        var csvContent = 'data:text/xlscharset=GBK,\uFEFF' + result
        var encodedUri = encodeURI(csvContent)
        var link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', `${(fileName || 'file')}.xls`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    } catch (err) {
        console.error(err)
    }
}

export default {
    props: {
        tableTitles: {
            type: Array,
            required: true,
            default: function () {
                return []
            }
        },
        tableData: {
            type: Array,
            required: true,
            default: function () {
                return []
            }
        },
        tableProps: {
            type: Object,
            default: function () {
                return { height: 250 }
            }
        },
        loading: {
            type: Boolean,
            default: function () {
                return true
            }
        },
        show: {
            type: Boolean,
            default: function () {
                return true
            }
        },
        searchDef: {
            type: Object,
            default: function () {
                return {
                    show: true,
                    colProps: {
                        span: 6,
                        offset: 12
                    },
                    inputProps: {
                        placeholder: '表格全局搜索'
                    }
                }
            }
        },
        paginationDef: {
            type: Object,
            default: function () {
                return {
                    pageSize: 30,
                    pageSizes: [30, 50, 100, 500],
                    currentPage: 1
                }
            }
        }
    },
    data () {
        return {
            actionsDef: {},
            filteredData: []
        }
    },
    created () {
        let columns = []
        let columnNames = []
        for (let item of this.tableTitles) {
            columns.push(item.prop)
            columnNames.push(item.prop)
        }
        this.actionsDef = {
            colProps: {
                span: 6,
                offset: 0
            },
            def: [{
                name: '全部导出',
                handler: () => {
                    CsvExport(this.tableData, columns, columnNames, 'all')
                },
                icon: 'plus'
            }, {
                name: '过滤导出',
                handler: () => {
                    CsvExport(this.filteredData, columns, columnNames, 'filtered')
                },
                icon: 'upload'
            }]
        }
    },
    methods: {
        handleFilteredData (filteredData) {
            this.filteredData = filteredData
        }
    }
}
</script>

<style lang='stylus'>
.datatables
    width 100%
    margin 20px 0
    .el-loading-mask
        min-height 300px
    .sc-table
        .tool-bar
            text-align left
</style>
