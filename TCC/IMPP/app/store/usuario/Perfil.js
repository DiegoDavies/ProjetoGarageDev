Ext.define('ProjetoGarage.store.usuario.Perfil', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_UsuarioPerfil_L',
        insert: 'S_UsuarioPerfil_E',
        update: 'S_UsuarioPerfil_E',
        destroy: 'S_UsuarioPerfil_E'
    },
    model: 'ProjetoGarage.model.usuario.Perfil'
});