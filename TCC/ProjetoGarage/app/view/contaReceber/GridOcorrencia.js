Ext.define('ProjetoGarage.view.contaReceber.GridOcorrencia', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'contaReceber-gridOcorrencia',
    requires: [
        //'ProjetoGarage.view.contaReceber.WindowDependente'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.contaReceber.Ocorrencia'),
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

        me.toolbar.hide();
        me.btnNovo.hide();
        me.btnDelete.hide();
        me.btnRelatorio.hide();
    }
});