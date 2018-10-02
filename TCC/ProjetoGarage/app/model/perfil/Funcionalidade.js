Ext.define('ProjetoGarage.model.perfil.Funcionalidade', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FuncionalidadeId',
        type: 'INT'
    }, {
        name: 'Modulo',
        type: 'STRING'
    }, {
        name: 'Nome',
        type: 'STRING',
        convert: function (v, rec) {
            return rec.get('Menu') + ' / ' + rec.get('Titulo')
        }
    }, {
        name: 'Menu',
        type: 'STRING'
    }, {
        name: 'Titulo',
        type: 'STRING'
    }, {
        name: 'Checado',
        type: 'BOOL'
    }]
});