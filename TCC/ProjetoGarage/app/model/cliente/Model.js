Ext.define('ProjetoGarage.model.cliente.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ClienteId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'SituacaoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'SituacaoNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'SexoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'SexoNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'Cep',
        type: 'STRING'
    }, {
        name: 'Endereco',
        type: 'STRING'
    }, {
        name: 'Numero',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Complemento',
        type: 'STRING'
    }, {
        name: 'Bairro',
        type: 'STRING'
    }, {
        name: 'EstadoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'EstadoNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'CidadeId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'CidadeNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'Cpf',
        type: 'STRING',
        convert: function (v) {
            if (v !== "" && v) {
                v = v.toString().replace(/\./g, '').replace('-', '').replace('/', '');
                if (v.length > 0) {
                    v = Ext.String.leftPad(v, 11, '0');
                    v = Ext.util.Format.substr(v, 0, 3) + '.' + Ext.util.Format.substr(v, 3, 3) + '.' + Ext.util.Format.substr(v, 6, 3) + '-' + Ext.util.Format.substr(v, 9, 2);
                }
            }
            return v;
        },
        serialize: function (v) {
            return v !== "" && v ? v.replace(/\./g, '').replace('-', '').replace('/', '') : v;
        }
    }, {
        name: 'Rg',
        type: 'STRING'
    }, {
        name: 'EstadoRg',
        type: 'STRING'
    }, {
        name: 'DataEmissaoRg',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
    }, {
        name: 'Email',
        type: 'STRING'
    }, {
        name: 'Telefone',
        type: 'STRING'
    }, {
        name: 'Celular',
        type: 'STRING'
    }, {
        name: 'TelefoneAdc',
        type: 'STRING'
    }, {
        name: 'CelularAdc',
        type: 'STRING'
    }, {
        name: 'DataNascimento',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
    }, {
        name: 'EstadoCivilId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'EstadoCivilNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'FuncaoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'FuncaoNome',
        type: 'STRING',
        persist: false
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