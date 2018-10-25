Ext.define('ProjetoGarage.store.funcionario.ContaPagar', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FuncionarioContaPagar_L'
    },
    model: 'ProjetoGarage.model.funcionario.ContaPagar'
})