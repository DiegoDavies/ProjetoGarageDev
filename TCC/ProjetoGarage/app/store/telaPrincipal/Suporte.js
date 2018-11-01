Ext.define('ProjetoGarage.store.telaPrincipal.Suporte', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        insert: 'S_Ajuda_E'
    },
    model: 'ProjetoGarage.model.telaPrincipal.Suporte'
});