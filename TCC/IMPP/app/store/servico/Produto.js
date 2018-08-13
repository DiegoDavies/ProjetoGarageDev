Ext.define('ProjetoGarage.store.servico.Produto', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ServicoProduto_L',
        insert: 'S_ServicoProduto_E',
        update: 'S_ServicoProduto_E',
        destroy: 'S_ServicoProduto_E'
    },
    model: 'ProjetoGarage.model.servico.Produto'
});