Ext.define('ProjetoGarage.store.cliente.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteHistorico_L'
    },
    model: 'ProjetoGarage.model.cliente.Historico'
})