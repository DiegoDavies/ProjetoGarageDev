Ext.define('ProjetoGarage.model.fornecedor.Historico', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FornecedorHistoricoId',
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