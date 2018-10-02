Ext.define('ProjetoGarage.store.orcamento.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_OrcamentoHistorico_L'
    },
    model: 'ProjetoGarage.model.orcamento.Historico'
});