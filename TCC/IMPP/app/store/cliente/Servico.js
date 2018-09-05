Ext.define('ProjetoGarage.store.cliente.Servico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteServico_L',
        insert: 'S_ClienteServico_E',
        update: 'S_ClienteServico_E',
        destroy: 'S_ClienteServico_E'
    },
    model: 'ProjetoGarage.model.cliente.Servico'
})