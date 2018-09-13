Ext.define('ProjetoGarage.store.veiculo.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_VeiculoHistorico_L',
        insert: 'S_VeiculoHistorico_E',
        update: 'S_VeiculoHistorico_E',
        destroy: 'S_VeiculoHistorico_E'
    },
    model: 'ProjetoGarage.model.veiculo.Historico'
})