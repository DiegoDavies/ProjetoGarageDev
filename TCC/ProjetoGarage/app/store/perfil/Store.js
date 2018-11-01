Ext.define('ProjetoGarage.store.perfil.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Perfil_L',
        insert: 'S_Perfil_E',
        update: 'S_Perfil_E',
        destroy: 'S_Perfil_E'
    },
    model: 'ProjetoGarage.model.perfil.Model'
});