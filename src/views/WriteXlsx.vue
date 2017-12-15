<template lang='pug'>
    button(@click='exportFile(data,"sheet1","all")') 导出为.xlsx文件
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

export default {
    name: '',
    data () {
        return {
            data: [[1, 2], [3, 4]]
        }
    },
    methods: {
        exportFile (data, sheetName, fileName) {
            const ws = XLSX.utils.aoa_to_sheet(data)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, sheetName)
            const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'})
            FileSaver.saveAs(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}), fileName + '.xlsx')
        },
        s2ab (s) {
            const buf = new ArrayBuffer(s.length)
            const view = new Uint8Array(buf)
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF
            }
            return buf
        }
    }
}
</script>

<style lang='stylus'>

</style>
