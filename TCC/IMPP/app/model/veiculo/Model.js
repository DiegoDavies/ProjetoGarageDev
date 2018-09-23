Ext.define('ProjetoGarage.model.veiculo.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'VeiculoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Placa',
        type: 'STRING'
    }, {
        name: 'ClienteId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Cliente',
        type: 'STRING',
        persist: false
    }, {
        name: 'MarcaId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Marca',
        type: 'STRING',
        persist: false
    }, {
        name: 'ModeloId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Modelo',
        type: 'STRING',
        persist: false
    }, {
        name: 'Ano',
        type: 'INT'
    }, {
        name: 'Cor',
        type: 'STRING'
    }, {
        name: 'Observacao',
        type: 'STRING'
    }, {
        name: 'UsuarioIdInclusao',
        type: 'INT',
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