Ext.define('ProjetoGarage.store.produto.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ProdutoHistorico_L'
    },
    model: 'ProjetoGarage.model.produto.Historico'
})