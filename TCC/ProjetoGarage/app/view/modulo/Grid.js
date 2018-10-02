Ext.define('ProjetoGarage.view.modulo.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'modulo-grid',
    requires: [
        'ProjetoGarage.view.modulo.Window'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.modulo.Store'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'ModuloId',
                hidden: true,
                hideable: false
            }, {
                text: 'Módulo',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Nome'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.toolbar = me.down('#pagingToolbarGrid')
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
            itemdblclick: me.onItemDblClick,
            boxready: me.onBoxReady
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onBoxReady: function () {
        var me = this;

        me.btnRelatorio.hide();
        me.store.load();
        me.btnDelete.hide();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        Ext.create('ProjetoGarage.view.modulo.Window', {
            title: 'Módulo: ' + record.get('Menu'),
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record
            }
        }).show();
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        Ext.create('ProjetoGarage.view.modulo.Window', {
            title: 'Cadastro de Módulo',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});