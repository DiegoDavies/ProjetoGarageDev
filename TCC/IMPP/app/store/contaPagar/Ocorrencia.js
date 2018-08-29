Ext.define('ProjetoGarage.store.contaPagar.Ocorrencia', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 9999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ContaPagarOcorrencia_L'
    },
    model: 'ProjetoGarage.model.contaPagar.Ocorrencia'
});