Ext.define('ProjetoGarage.store.servico.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ServicoHistorico_L'
    },
    model: 'ProjetoGarage.model.servico.Historico'
});