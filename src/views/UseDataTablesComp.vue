<template lang='pug'>
DataTables(:tableTitles='tableTitles' :tableData='tableData' :tableProps='tableProps' :loading='tableLoading')
</template>

<script>
import DataTables from '../components/DataTables'

export default {
    name: '',
    components: {
        DataTables
    },
    data () {
        return {
            tableTitles: [],
            tableData: [],
            tableProps: {
                height: 350
            },
            tableLoading: false
        }
    },
    mounted () {

    },
    computed: {

    },
    methods: {

    }
}
</script>

<style lang='stylus'>

</style>
