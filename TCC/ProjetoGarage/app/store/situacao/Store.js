Ext.define('ProjetoGarage.store.situacao.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Situacao_L',
        insert: 'S_Situacao_E',
        update: 'S_Situacao_E',
        destroy: 'S_Situacao_E'
    },
    model: 'ProjetoGarage.model.situacao.Model'
});