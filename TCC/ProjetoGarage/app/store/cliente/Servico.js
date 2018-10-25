Ext.define('ProjetoGarage.store.cliente.Servico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteServico_L'
    },
    model: 'ProjetoGarage.model.cliente.Servico'
})