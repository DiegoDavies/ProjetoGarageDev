Ext.define('ProjetoGarage.model.funcionario.Historico', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'FuncionarioHistoricoId',
        type: 'INT'
    }, {
        name: 'FuncionarioId',
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