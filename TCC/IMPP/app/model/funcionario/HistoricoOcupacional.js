Ext.define('ProjetoGarage.model.funcionario.HistoricoOcupacional', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FuncionarioHistoricoOcupacionalId',
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
        name: 'DataOcorrencia',
        type: 'DATE'
    }, {
        name: 'TipoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Salario',
        type: 'FLOAT'
    }, {
        name: 'FuncaoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Funcao',
        type: 'STRING'
    }, {
        name: 'FuncaoIdAntigo',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Observacao',
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