Ext.define('ProjetoGarage.store.contaReceber.Ocorrencia', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ContaReceberOcorrencia_L'
    },
    model: 'ProjetoGarage.model.contaReceber.Ocorrencia'
});