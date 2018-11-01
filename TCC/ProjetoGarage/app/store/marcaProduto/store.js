Ext.define('ProjetoGarage.store.marcaProduto.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_MarcaProduto_L',
        insert: 'S_MarcaProduto_E',
        update: 'S_MarcaProduto_E',
        destroy: 'S_MarcaProduto_E'
    },
    model: 'ProjetoGarage.model.marcaProduto.Model'
});