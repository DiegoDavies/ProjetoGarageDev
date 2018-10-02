Ext.define('ProjetoGarage.store.duracao.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Duracao_L',
        insert: 'S_Duracao_E',
        update: 'S_Duracao_E',
        destroy: 'S_Duracao_E'
    },
    model: 'ProjetoGarage.model.duracao.Model'
});