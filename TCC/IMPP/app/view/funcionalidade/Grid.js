Ext.define('ProjetoGarage.view.funcionalidade.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'funcionalidade-grid',
    requires: [
        'ProjetoGarage.view.funcionalidade.Window'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.funcionalidade.Store'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'FuncionalidadeId',
                hidden: true,
                hideable: false
            }, {
                text: 'Módulo',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Modulo'
            }, {
                text: 'Menu',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Menu'
            }, {
                text: 'Titulo',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Titulo'
            }, {
                text: 'ClassName',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'ClassName'
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

        Ext.create('ProjetoGarage.view.funcionalidade.Window', {
            title: 'Funcionalidade: ' + record.get('Menu'),
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

        Ext.create('ProjetoGarage.view.funcionalidade.Window', {
            title: 'Cadastro de Funcionalidade',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});