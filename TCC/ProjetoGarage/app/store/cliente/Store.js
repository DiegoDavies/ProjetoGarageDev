Ext.define('ProjetoGarage.store.cliente.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Cliente_L',
        insert: 'S_Cliente_E',
        update: 'S_Cliente_E',
        destroy: 'S_Cliente_E'
    },
    model: 'ProjetoGarage.model.cliente.Model'
})