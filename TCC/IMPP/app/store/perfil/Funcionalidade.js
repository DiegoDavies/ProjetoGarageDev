Ext.define('ProjetoGarage.store.perfil.Funcionalidade', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_PerfilFuncionalidade_L',
        insert: 'S_PerfilFuncionalidade_E',
        update: 'S_PerfilFuncionalidade_E',
        destroy: 'S_PerfilFuncionalidade_E'
    },
    model: 'ProjetoGarage.model.perfil.Funcionalidade'
});