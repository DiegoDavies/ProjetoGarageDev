Ext.define('ProjetoGarage.store.combos.EstadoCivil', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_EstadoCivil_L'
    },
    model: 'ProjetoGarage.model.combos.EstadoCivil'
});