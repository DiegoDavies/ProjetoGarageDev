Ext.define('ProjetoGarage.store.funcionario.Pagamento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FuncionarioPagamento_L',
        insert: 'S_FuncionarioPagamento_E',
        update: 'S_FuncionarioPagamento_E',
        destroy: 'S_FuncionarioPagamento_E'
    },
    model: 'ProjetoGarage.model.funcionario.Pagamento'
})