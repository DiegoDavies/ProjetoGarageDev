Ext.define('ProjetoGarage.view.perfil.GridFuncionalidade', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'perfil-gridFuncionalidade',
    requires: [
    ],
    esconderAtualizar: true,
    height: '100%',
    width: '100%',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.perfil.Funcionalidade'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'PerfilFuncionalidadeId',
                hidden: true,
                hideable: false
            }, {
                text: 'Funcionalidade',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Nome'
            }, {
                xtype: 'checkcolumn',
                text: 'Ativo',
                dataIndex: 'Checado',
                listeners: {
                    scope: me,
                    checkchange: me.onCheckChange
                }
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
        me.btnRelatorio.hide();
        me.txtQuery.hide();
        me.btnPesquisar.hide();
        me.store.load();
        me.btnNovo.hide();
        me.btnDelete.up().hide();
    },
    onCheckChange: function (column, rowIndex, checked, eOpts) {
        var me = this,
            record = me.getStore().getAt(rowIndex);

        me.getEl().mask('Salvando Dados...');
        record.set('Checado', checked);
        me.getStore().sync({
            success: function () {
                me.getStore().load();
                me.getEl().unmask();
            },
            failure: function () {
                me.getStore().rejectChanges();
                me.getEl().unmask();
            }
        });
    }
});