Ext.define('ProjetoGarage.model.excelConfig.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'DataIndex',
        type: 'STRING'
    }, {
        name: 'ExcelNome',
        type: 'STRING'
    }, {
        name: 'ExcelFormatString',
        type: 'STRING'
    }, {
        name: 'ExcelFormat',
        type: 'STRING'
    }]
});