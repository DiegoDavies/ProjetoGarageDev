Ext.define('ProjetoGarage.view.funcionalidade.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'funcionalidade-grid',
    requires: [
        'ProjetoGarage.view.funcionalidade.Window'
    ],
    esconderDelete: true,
    esconderRelatorio: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.funcionalidade.Store'),
            columns: [{
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
            }, {
                text: 'Tratamento',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Tratamento'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.btnNovo = me.down('#btnNovoGrid');
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

        me.store.load();
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