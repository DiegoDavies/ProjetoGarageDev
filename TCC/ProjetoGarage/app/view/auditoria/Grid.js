Ext.define('ProjetoGarage.view.auditoria.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'auditoria-grid',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.auditoria.Store'),
            columns: [{
                text: 'Usuário',
                width: 130,
                style: 'text-align: center;',
                dataIndex: 'UsuarioNome',
                sortable: false
            }, {
                xtype: 'datecolumn',
                text: 'Data Hora',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y H:i:s',
                dataIndex: 'DataHora',
                sortable: false
            }, {
                text: 'Descrição',
                sortable: false,
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
        me.btnNovo.hide();
        me.btnDelete.hide();
        me.store.load();
    }
});