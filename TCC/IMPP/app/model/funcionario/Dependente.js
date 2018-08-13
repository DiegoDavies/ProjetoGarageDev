Ext.define('ProjetoGarage.model.funcionario.Dependente', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FuncionarioDependenteId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'FuncionarioId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'CPF',
        type: 'STRING'
    }, {
        name: 'DataNascimento',
        type: 'DATE'
    }, {
        name: 'ParentescoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Parentesco',
        type: 'STRING'
    }, {
        name: 'UsuarioIdInclusao',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'UsuarioNomeInclusao',
        type: 'STRING'
    }, {
        name: 'DataHoraInclusao',
        type: 'DATE'
    }, {
        name: 'UsuarioIdAlteracao',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'UsuarioNomeAlteracao',
        type: 'STRING'
    }, {
        name: 'DataHoraAlteracao',
        type: 'DATE'
    }]
});