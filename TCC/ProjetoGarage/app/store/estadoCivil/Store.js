Ext.define('ProjetoGarage.store.estadoCivil.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_EstadoCivil_L',
        insert: 'S_EstadoCivil_E',
        update: 'S_EstadoCivil_E',
        destroy: 'S_EstadoCivil_E'
    },
    model: 'ProjetoGarage.model.estadoCivil.Model'
});