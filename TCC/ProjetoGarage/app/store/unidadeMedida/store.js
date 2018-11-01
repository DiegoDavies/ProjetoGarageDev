Ext.define('ProjetoGarage.store.unidadeMedida.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_UnidadeMedida_L',
        insert: 'S_UnidadeMedida_E',
        update: 'S_UnidadeMedida_E',
        destroy: 'S_UnidadeMedida_E'
    },
    model: 'ProjetoGarage.model.unidadeMedida.Model'
});