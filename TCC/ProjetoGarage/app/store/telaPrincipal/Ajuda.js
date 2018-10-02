Ext.define('ProjetoGarage.store.telaPrincipal.Ajuda', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        insert: 'S_Ajuda_E'
    },
    model: 'ProjetoGarage.model.telaPrincipal.Ajuda'
});