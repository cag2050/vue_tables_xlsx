<template lang='pug'>
.datatables.fl
    div(v-loading='loading' element-loading-text='数据加载中')
        div(ref='doAClick') aaa
        data-tables(:data='tableData' :actions-def='actionsDef' v-show='show' :table-props='tableProps' :search-def='searchDef' :pagination-def='paginationDef' @filtered-data='handleFilteredData')
            el-table-column(v-for='title in tableTitles' :prop='title.prop' :label='title.label' :key='title.label' sortable='custom')
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

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
            filteredData: [],
            data: [[1, 2], [3, 4]]
        }
    },
    created () {
        this.actionsDef = {
            colProps: {
                span: 6,
                offset: 0
            },
            def: [{
                name: '全部导出',
                handler: () => {
                    this.exportFile(this.getFileData(this.tableData), 'sheet1', 'all')
                },
                icon: 'plus'
            }, {
                name: '过滤导出',
                handler: () => {
                    this.exportFile(this.getFileData(this.filteredData), 'sheet1', 'filtered')
                },
                icon: 'upload'
            }]
        }
    },
    methods: {
        handleFilteredData (filteredData) {
            this.filteredData = filteredData
        },
        exportFile (data, sheetName, fileName) {
            const ws = XLSX.utils.aoa_to_sheet(data)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, sheetName)
            const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'})
            FileSaver.saveAs(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}), fileName + '.xlsx')
            console.log('all end')
            console.log(this.$refs.doAClick.click())
            this.$refs.doAClick.click()
        },
        s2ab (s) {
            const buf = new ArrayBuffer(s.length)
            const view = new Uint8Array(buf)
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF
            }
            return buf
        },
        getFileData (tableDataParam) {
            let allData = []
            let titlesData = []
            let lineData = []
            let allLineData = []
            for (let item of this.tableTitles) {
                titlesData.push(item.label)
            }
            let titleLen = this.tableTitles.length
            for (let item of tableDataParam) {
                lineData = []
                for (let i = 0; i < titleLen; i++) {
                    lineData.push(item[this.tableTitles[i].prop])
                }
                allLineData.push(lineData)
            }
            allData.push(titlesData)
            allData = allData.concat(allLineData)
            return allData
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
