Ext.define('ProjetoGarage.view.usuario.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'usuario-grid',
    requires: [
        'ProjetoGarage.view.usuario.Window'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.usuario.Store'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'UsuarioId',
                hidden: true,
                hideable: false
            }, {
                text: 'Nome',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Nome'
            }, {
                text: 'Login',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Login'
            }, {
                text: 'Email',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Email'
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
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        Ext.create('ProjetoGarage.view.usuario.Window', {
            title: 'Usuário: ' + record.get('Nome'),
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

        Ext.create('ProjetoGarage.view.usuario.Window', {
            title: 'Cadastro de Usuário',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});