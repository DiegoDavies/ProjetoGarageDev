Ext.define('ProjetoGarage.store.produto.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Produto_L',
        insert: 'S_Produto_E',
        update: 'S_Produto_E',
        destroy: 'S_Produto_E'
    },
    model: 'ProjetoGarage.model.produto.Model'
})