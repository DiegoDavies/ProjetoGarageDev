Ext.define('ProjetoGarage.store.funcionario.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Funcionario_L',
        insert: 'S_Funcionario_E',
        update: 'S_Funcionario_E',
        destroy: 'S_Funcionario_E'
    },
    model: 'ProjetoGarage.model.funcionario.Model'
})