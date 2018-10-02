Ext.define('ProjetoGarage.view.servico.GridVeiculo', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'servico-gridVeiculo',
    requires: [
        //'ProjetoGarage.view.servico.WindowDependente'
    ],
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

        me.toolbar = me.down('#pagingToolbarGrid');
        me.btnNovo = me.down('#btnNovoGrid');
        me.btnDelete = me.down('#btnDeleteGrid');
        me.btnRelatorio = me.down('#btnRelatorioGrid');
        me.txtQuery = me.down('#queryField');
        me.btnPesquisar = me.down('#btnPesquisarGrid');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady
        });
    },
    onBoxReady: function () {
        var me = this;

        me.btnRelatorio.hide();
        me.toolbar.hide();
        me.btnNovo.hide();
        me.btnDelete.hide();
    }
});