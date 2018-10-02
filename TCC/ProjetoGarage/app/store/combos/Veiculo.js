Ext.define('ProjetoGarage.store.combos.Veiculo', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Veiculo_L'
    },
    model: 'ProjetoGarage.model.combos.Veiculo'
});
