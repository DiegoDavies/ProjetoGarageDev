Ext.define('ProjetoGarage.model.fornecedor.ContaPagar', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FornecedorContaPagarId',
        type: 'INT'
    }, {
        name: 'FornecedorId',
        type: 'INT'
    }, {
        name: 'Ocorrencia',
        type: 'STRING'
    }, {
        name: 'UsuarioId',
        type: 'INT'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }, {
        name: 'DataOcorrencia',
        type: 'DATE'
    }]
});