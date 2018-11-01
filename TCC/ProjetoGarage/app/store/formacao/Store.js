Ext.define('ProjetoGarage.store.formacao.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Formacao_L',
        insert: 'S_Formacao_E',
        update: 'S_Formacao_E',
        destroy: 'S_Formacao_E'
    },
    model: 'ProjetoGarage.model.formacao.Model'
});