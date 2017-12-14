<template lang='pug'>
.datatables.fl
    div(v-loading="loading" element-loading-text="数据加载中")
        data-tables(:data="tableData" :actions-def='actionsDef' v-show='show' :table-props="tableProps" :search-def="searchDef" :pagination-def="paginationDef" @filtered-data="handleFilteredData")
            el-table-column(v-for="title in tableTitles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom")
</template>

<script>
import XLSX from 'xlsx'
import alasql from 'alasql'

/*
// let XLSX = require('xlsx')
console.log(alasql)
*/
console.log(XLSX)

var json2csv = require('json2csv')
let CsvExport = function (data, fields, fieldNames, fileName) {
    try {
        var result = json2csv({
            data: data,
            fields: fields,
            fieldNames: fieldNames
        })
        var csvContent = 'data:text/csvcharset=GBK,\uFEFF' + result
        var encodedUri = encodeURI(csvContent)
        var link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        /*
        console.log('encodedUri=')
        console.log(encodedUri)
        alasql(['CREATE TABLE IF NOT EXISTS geo.country', 'SELECT * INTO geo.country FROM CSV(encodedUri,{headers:true})'])
            .then(function (res) {
                // results from the file asia.xlsx
                console.log(res)
            })
        */
        link.setAttribute('download', `${(fileName || 'file')}.csv`)
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
                    /*
                    let XLSX = require('xlsx')
                    console.log(XLSX)
                    */
                    alasql('SELECT * INTO XLSX("restest280b.xlsx") FROM ?', [this.tableData])
                            .then(function (data) {
                                console.log('Data saved')
                            })
                            .catch(function (err) {
                                console.log('Error:', err)
                            })
                    /*
                    alasql([['SELECT * FROM ?', [this.tableData]]])
                        .then(data => {
                            console.log(data)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    */
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
