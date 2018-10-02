Ext.define('ProjetoGarage.store.contaPagar.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ContaPagar_L',
        insert: 'S_ContaPagar_E',
        update: 'S_ContaPagar_E',
        destroy: 'S_ContaPagar_E'
    },
    model: 'ProjetoGarage.model.contaPagar.Model'
});