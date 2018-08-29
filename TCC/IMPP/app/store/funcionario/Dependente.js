Ext.define('ProjetoGarage.store.funcionario.Dependente', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 9999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FuncionarioDependente_L',
        insert: 'S_FuncionarioDependente_E',
        update: 'S_FuncionarioDependente_E',
        destroy: 'S_FuncionarioDependente_E'
    },
    model: 'ProjetoGarage.model.funcionario.Dependente'
})