Ext.define('ProjetoGarage.model.funcionario.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FuncionarioId',
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
        type: 'STRING'
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
        name: 'DataNascimento',
        type: 'DATE'
    }, {
        name: 'EstadoNascId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'EstadoNascNome',
        type: 'STRING'
    }, {
        name: 'CidadeNascId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'CidadeNascNome',
        type: 'STRING'
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
        name: 'NomeConjuge',
        type: 'STRING'
    }, {
        name: 'NomePai',
        type: 'STRING'
    }, {
        name: 'NomeMae',
        type: 'STRING'
    }, {
        name: 'NumeroPis',
        type: 'STRING'
    }, {
        name: 'DataEmissaoPis',
        type: 'DATE'
    }, {
        name: 'Reservista',
        type: 'STRING'
    }, {
        name: 'Categoria',
        type: 'STRING'
    }, {
        name: 'TituloEleitor',
        type: 'STRING'
    }, {
        name: 'ZonaEleitoral',
        type: 'STRING'
    }, {
        name: 'SecaoEleitoral',
        type: 'STRING'
    }, {
        name: 'DataEmissaoEleitoral',
        type: 'DATE'
    }, {
        name: 'FormacaoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'FormacaoNome',
        type: 'STRING'
    }, {
        name: 'EtniaId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'EtniaNome',
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