Ext.define('ProjetoGarage.model.telaPrincipal.Menu', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ModuloId',
        type: 'INT'
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'children',
        type: 'STRING'
    }]
});