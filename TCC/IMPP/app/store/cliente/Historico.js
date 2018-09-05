Ext.define('ProjetoGarage.store.cliente.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteHistorico_L',
        insert: 'S_ClienteHistorico_E',
        update: 'S_ClienteHistorico_E',
        destroy: 'S_ClienteHistorico_E'
    },
    model: 'ProjetoGarage.model.cliente.Historico'
})