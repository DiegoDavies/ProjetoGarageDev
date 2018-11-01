Ext.define('ProjetoGarage.model.funcionalidade.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FuncionalidadeId',
        type: 'INT'
    }, {
        name: 'Menu',
        type: 'STRING'
    }, {
        name: 'Titulo',
        type: 'STRING'
    }, {
        name: 'ClassName',
        type: 'STRING'
    }, {
        name: 'Tratamento',
        type: 'STRING'
    }, {
        name: 'ModuloId',
        type: 'INT'
    }, {
        name: 'Modulo',
        type: 'STRING'
    }]
});