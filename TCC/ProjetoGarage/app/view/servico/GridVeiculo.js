Ext.define('ProjetoGarage.view.servico.GridVeiculo', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'servico-gridVeiculo',
    requires: [
        //'ProjetoGarage.view.servico.WindowDependente'
    ],
    esconderRelatorio: true,
    esconderPaging: true,
    esconderNew: true,
    esconderDelete: true,
    esconderAtualizar: false,
    esconderPesquisa: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.servico.Veiculo'),
            columns: [{
                text: 'Placa',
                width: 110,
                style: 'text-align: center;',
                dataIndex: 'Placa'
            }, {
                text: 'Modelo',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Modelo'
            }, {
                text: 'Ano',
                width: 110,
                style: 'text-align: center;',
                dataIndex: 'Ano'
            }, {
                text: 'Descrição do Problema',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Descricao'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

    },
    addEventHandler: function () {
        var me = this;

    }
});