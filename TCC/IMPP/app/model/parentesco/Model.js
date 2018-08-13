Ext.define('ProjetoGarage.model.parentesco.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ParentescoId',
        type: 'INT'
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'UsuarioIdInclusao',
        type: 'INT'
    }, {
        name: 'UsuarioNomeInclusao',
        type: 'STRING'
    }, {
        name: 'DataHoraInclusao',
        type: 'DATE'
    }, {
        name: 'UsuarioIdAlteracao',
        type: 'INT'
    }, {
        name: 'UsuarioNomeAlteracao',
        type: 'STRING'
    }, {
        name: 'DataHoraAlteracao',
        type: 'DATE'
    }]
});