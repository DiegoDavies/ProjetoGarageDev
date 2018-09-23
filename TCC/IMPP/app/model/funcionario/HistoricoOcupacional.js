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
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
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
        },
        persist: false
    }, {
        name: 'UsuarioNomeInclusao',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataHoraInclusao',
        type: 'DATE',
        persist: false
    }, {
        name: 'UsuarioIdAlteracao',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        },
        persist: false
    }, {
        name: 'UsuarioNomeAlteracao',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataHoraAlteracao',
        type: 'DATE',
        persist: false
    }]
});