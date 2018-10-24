Ext.define('ProjetoGarage.store.combos.Funcionario', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Funcionario_L'
    },
    model: 'ProjetoGarage.model.combos.Funcionario'
});