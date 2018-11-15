Ext.define('ProjetoGarage.store.funcionario.ContaPagar', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FuncionarioContaPagar_L',
        insert: 'S_FuncionarioContaPagar_E',
        update: 'S_FuncionarioContaPagar_E',
        destroy: 'S_FuncionarioContaPagar_E'
    },
    model: 'ProjetoGarage.model.funcionario.ContaPagar'
})