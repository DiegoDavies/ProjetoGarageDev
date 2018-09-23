Ext.define('ProjetoGarage.store.cliente.Veiculo', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteVeiculo_L',
        insert: 'S_ClienteVeiculo_E',
        update: 'S_ClienteVeiculo_E',
        destroy: 'S_ClienteVeiculo_E'
    },
    model: 'ProjetoGarage.model.cliente.Veiculo'
})