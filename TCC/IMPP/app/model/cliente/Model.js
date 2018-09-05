﻿Ext.define('ProjetoGarage.model.cliente.Model', {
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
        type: 'STRING'
    }, {
        name: 'SexoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'SexoNome',
        type: 'STRING'
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
        type: 'STRING'
    }, {
        name: 'CidadeId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'CidadeNome',
        type: 'STRING'
    }, {
        name: 'Cpf',
        type: 'STRING',
        convert: function (v, rec) {
            if (v) {
                v = v.toString();
                if (v.length > 0) {
                    v = Ext.String.leftPad(v, 11, '0');
                    v = Ext.util.Format.substr(v, 0, 3) + '.' + Ext.util.Format.substr(v, 3, 3) + '.' + Ext.util.Format.substr(v, 6, 3) + '-' + Ext.util.Format.substr(v, 9, 2);
                }
            }
            return v;
        }
    }, {
        name: 'Rg',
        type: 'STRING'
    }, {
        name: 'EstadoRg',
        type: 'STRING'
    }, {
        name: 'DataEmissaoRg',
        type: 'DATE'
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
        type: 'DATE'
    }, {
        name: 'EstadoCivilId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'EstadoCivilNome',
        type: 'STRING'
    }, {
        name: 'FuncaoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'FuncaoNome',
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