Ext.define('ProjetoGarage.store.orcamento.Ocorrencia', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 9999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_OrcamentoOcorrencia_L'
    },
    model: 'ProjetoGarage.model.orcamento.Ocorrencia'
});