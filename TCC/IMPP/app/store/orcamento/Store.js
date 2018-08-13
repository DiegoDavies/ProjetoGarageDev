Ext.define('ProjetoGarage.store.orcamento.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Orcamento_L',
        insert: 'S_Orcamento_E',
        update: 'S_Orcamento_E',
        destroy: 'S_Orcamento_E'
    },
    model: 'ProjetoGarage.model.orcamento.Model'
});