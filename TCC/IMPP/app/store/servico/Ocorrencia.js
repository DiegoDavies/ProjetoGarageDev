Ext.define('ProjetoGarage.store.servico.Ocorrencia', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ServicoOcorrencia_L'
    },
    model: 'ProjetoGarage.model.servico.Ocorrencia'
});