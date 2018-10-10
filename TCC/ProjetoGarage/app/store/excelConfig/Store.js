Ext.define('ProjetoGarage.store.excelConfig.Store', {
    extend: 'Ext.data.Store',
    data: [],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: ''
        }
    },
    model: 'ProjetoGarage.model.excelConfig.Model'
});