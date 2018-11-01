Ext.define('ProjetoGarage.model.produto.Historico', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ProdutoHistoricoId',
        type: 'INT'
    }, {
        name: 'ProdutoId',
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