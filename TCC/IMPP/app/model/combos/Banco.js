Ext.define('ProjetoGarage.model.combos.Banco', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'BancoId',
        type: 'INT'
    }, {
        name: 'Codigo',
        type: 'INT'
    }, {
        name: 'Banco',
        type: 'STRING'
    }, {
        name: 'Nome',
        type: 'STRING',
        convert: function (v, rec) {
            return Ext.String.leftPad(rec.get('Codigo'), 3, '0') + ' - ' + rec.get('Banco');
        }
    }]
});