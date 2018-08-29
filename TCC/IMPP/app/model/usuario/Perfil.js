Ext.define('ProjetoGarage.model.usuario.Perfil', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'PerfilId',
        type: 'INT'
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'Checado',
        type: 'BOOL'
    }]
});