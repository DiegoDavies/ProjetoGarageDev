Ext.define('ProjetoGarage.model.fornecedor.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FornecedorId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'RazaoSocial',
        type: 'STRING'
    }, {
        name: 'Fantasia',
        type: 'STRING'
    }, {
        name: 'StatusId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'StatusNome',
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
        name: 'Cnpj',
        type: 'STRING',
        convert: function (v, rec) {
            if (v) {
                v = v.toString().replace(/\./g, '').replace('-', '').replace('/', '');
                if (v.length > 0) {
                    v = Ext.String.leftPad(v, 14, '0');
                    v = Ext.util.Format.substr(v, 0, 2) + '.' + Ext.util.Format.substr(v, 2, 3) + '.' + Ext.util.Format.substr(v, 5, 3) + '/' + Ext.util.Format.substr(v, 8, 4) + '-' + Ext.util.Format.substr(v, 12, 2);
                }
            }
            return v;
        },
        serialize: function (v) {
            return v.replace(/\./g, '').replace('-', '').replace('/', '');
        }
    }, {
        name: 'Cpf',
        type: 'STRING',
        convert: function (v, rec) {
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
        name: 'InscricaoEstadual',
        type: 'STRING'
    }, {
        name: 'Rg',
        type: 'STRING'
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
        name: 'Website',
        type: 'STRING'
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