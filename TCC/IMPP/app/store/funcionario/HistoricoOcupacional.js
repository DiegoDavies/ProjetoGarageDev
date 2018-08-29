Ext.define('ProjetoGarage.store.funcionario.HistoricoOcupacional', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 9999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FuncionarioHistOcupacional_L',
        insert: 'S_FuncionarioHistOcupacional_E',
        update: 'S_FuncionarioHistOcupacional_E',
        destroy: 'S_FuncionarioHistOcupacional_E'
    },
    model: 'ProjetoGarage.model.funcionario.HistoricoOcupacional'
})