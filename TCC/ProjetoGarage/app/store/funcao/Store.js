Ext.define('ProjetoGarage.store.funcao.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Funcao_L',
        insert: 'S_Funcao_E',
        update: 'S_Funcao_E',
        destroy: 'S_Funcao_E'
    },
    model: 'ProjetoGarage.model.funcao.Model'
});