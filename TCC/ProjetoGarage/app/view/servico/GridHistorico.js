Ext.define('ProjetoGarage.view.servico.GridHistorico', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'servico-gridHistorico',
    esconderAtualizar: false,
    esconderPaging: true,
    esconderRelatorio: true,
    esconderDelete: true,
    esconderNovo: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.servico.Historico'),
            columns: [{
                xtype: 'datecolumn',
                text: 'Data Hora',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataHora'
            }, {
                text: 'Usuario',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'UsuarioNome'
            }, {
                text: 'Observação',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Observacao'
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