Ext.define('ProjetoGarage.store.banco.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Banco_L',
        insert: 'S_Banco_E',
        update: 'S_Banco_E',
        destroy: 'S_Banco_E'
    },
    model: 'ProjetoGarage.model.banco.Model'
});