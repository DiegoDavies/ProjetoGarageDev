Ext.define('ProjetoGarage.store.contaReceber.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ContaReceber_L',
        insert: 'S_ContaReceber_E',
        update: 'S_ContaReceber_E',
        destroy: 'S_ContaReceber_E'
    },
    model: 'ProjetoGarage.model.contaReceber.Model'
});