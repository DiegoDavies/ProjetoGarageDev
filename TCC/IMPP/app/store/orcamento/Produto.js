Ext.define('ProjetoGarage.store.orcamento.Produto', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_OrcamentoProduto_L',
        insert: 'S_OrcamentoProduto_E',
        update: 'S_OrcamentoProduto_E',
        destroy: 'S_OrcamentoProduto_E'
    },
    model: 'ProjetoGarage.model.orcamento.Produto'
});