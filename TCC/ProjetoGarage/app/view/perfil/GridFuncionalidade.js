Ext.define('ProjetoGarage.view.perfil.GridFuncionalidade', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'perfil-gridFuncionalidade',
    requires: [
    ],
    esconderToolbar: true,
    height: '100%',
    width: '100%',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.perfil.Funcionalidade'),
            columns: [{
                text: 'Módulo',
                flex: 0.7,
                minWidth: 120,
                style: 'text-align: center;',
                dataIndex: 'Modulo'
            }, {
                text: 'Funcionalidade',
                flex: 1.3,
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