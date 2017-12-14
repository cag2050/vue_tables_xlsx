<template lang='pug'>
.datatables.fl
    div(v-loading="loading" element-loading-text="数据加载中")
        data-tables(:data="tableData" :actions-def='actionsDef' v-show='show' :table-props="tableProps" :search-def="searchDef" :pagination-def="paginationDef")
            el-table-column(v-for="title in tableTitles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom")
</template>

<script>
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
                        offset: 0
                    },
                    inputProps: {
                        placeholder: '表格全局搜索'
                    }
                }
            }
        },
        actionsDef: {
            type: Object,
            default: function () {
                return {
                    colProps: {
                        span: 6,
                        offset: 16
                    },
                    def: [{
                        name: 'export all',
                        handler: () => {
                        },
                        icon: 'plus'
                    }, {
                        name: 'export filtered',
                        handler: () => {
                        },
                        icon: 'upload'
                    }]
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
        }
    },
    created () {
    }
}
</script>

<style lang='stylus'>
.datatables
    width 100%
    margin 20px 0
    .el-loading-mask
        min-height 300px
</style>
