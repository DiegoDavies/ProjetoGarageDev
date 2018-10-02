Ext.define('ProjetoGarage.store.funcionario.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FuncionarioHistorico_L'
    },
    model: 'ProjetoGarage.model.funcionario.Historico'
})