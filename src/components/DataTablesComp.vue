<template lang='pug'>
.datatables.fl
    div(v-loading="loading" element-loading-text="数据加载中")
        data-tables(:data="tableData" :actions-def='actionsDef' v-show='show' :table-props="tableProps" :search-def="searchDef" :pagination-def="paginationDef" @filtered-data='handleFilteredData')
            el-table-column(v-for="title in tableFixedTitles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom" fixed='left' :formatter='formatterColumn')
            el-table-column(v-for="title in tableTitles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom" :formatter='formatterColumn')
</template>

<script>
import FileSaver from 'file-saver'

export default {
    props: {
        tableFixedTitles: {
            type: Array,
            required: false,
            default: function () {
                return []
            }
        },
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
                return { height: 560 }
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
                    pageSize: 10,
                    pageSizes: [10, 20, 30, 50, 100],
                    currentPage: 1
                }
            }
        },
        actionsDef: {
            type: Object,
            default: function () {
                return {
                    colProps: {
                        span: 6,
                        offset: 0
                    },
                    def: [{
                        name: '导出表格数据',
                        handler: () => {
                            this.exportFile(this.getFileData(this.tableData), 'sheet1', 'all')
                        },
                        icon: ''
                    /*
                    }, {
                        name: '过滤导出',
                        handler: () => {
                            this.exportFile(this.getFileData(this.filteredData), 'sheet1', 'filtered')
                        },
                        icon: ''
                    */
                    }]
                }
            }
        },
        // 作用：父组件使用该子组件时，格式化单元格内容或样式
        formatterColumn: {
            type: Function,
            required: false,
            default: (row, column) => {
                let key = column.property
                return row[key]
            }
        }
    },
    data () {
        return {
            filteredData: []
        }
    },
    created () {
    },
    methods: {
        handleFilteredData (filteredData) {
            this.filteredData = filteredData
        },
        exportFile (data, sheetName, fileName) {
            const ws = this.$XLSX.utils.aoa_to_sheet(data)
            const wb = this.$XLSX.utils.book_new()
            this.$XLSX.utils.book_append_sheet(wb, ws, sheetName)
            const wbout = this.$XLSX.write(wb, {type: 'binary', bookType: 'xlsx'})
            FileSaver.saveAs(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}), fileName + '.xlsx')
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
            for (let item of this.tableFixedTitles) {
                titlesData.push(item.label)
            }
            for (let item of this.tableTitles) {
                titlesData.push(item.label)
            }
            let fixedTitleLen = this.tableFixedTitles.length
            let titleLen = this.tableTitles.length
            for (let item of tableDataParam) {
                lineData = []
                for (let i = 0; i < fixedTitleLen; i++) {
                    lineData.push(item[this.tableFixedTitles[i].prop])
                }
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

<style lang='stylus' type="text/stylus">
.datatables
    width 100%
    margin 20px 0
    .sc-table
        .tool-bar
            text-align left
</style>
