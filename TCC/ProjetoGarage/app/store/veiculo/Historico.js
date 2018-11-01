Ext.define('ProjetoGarage.store.veiculo.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_VeiculoHistorico_L'
    },
    model: 'ProjetoGarage.model.veiculo.Historico'
})