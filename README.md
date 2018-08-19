# vue_tables_xlsx_demo

### 官方地址
* vue-data-tables:
https://www.njleonzhang.com/vue-data-tables/#/
* js-xlsx:
https://github.com/sheetjs/js-xlsx

### vue-data-tables 使用
1. 操作按钮的样式：
官方地址：https://njleonzhang.github.io/vue-data-tables/#/tableActionCol?id=define-action-col-bar ,
按钮样式 type， 除了页面上列出的，还可以加上`is-plain`等样式，比如：`type: 'primary is-plain'`。

### 例子
1. 导出.xlsx（vue-data-tables结合js-xlsx实现导出.xlsx文件）
1. writexlsx（官方例子改造：https://github.com/SheetJS/js-xlsx/tree/master/demos/vue）</router-link><br/>
1. 导出.csv（官方例子：https://njleonzhang.github.io/vue-data-tables/#/event?id=filtered-data）
1. 给表格表头和单元格里添加元素

### 兼容性问题：
1. 导出xlsx功能，在Safari 10.0及以下版本中，有报错：`Failed to load resource: Frame load interrupted`，原因是safari还不支持，升级到10.1及以上即可支持。详见：https://github.com/eligrey/FileSaver.js/issues/215

### .sync 修饰符的使用
* 文件：src/views/useDataTablesComp.vue 中，`:tableFixedTitles.sync` 代码的含义：
文件：src/components/DataTablesComp.vue 中watch了tableData，如果tableData里有prop值为'全部'或'all'，如果tableFixedTitles中包含该prop，就删掉该prop。

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
