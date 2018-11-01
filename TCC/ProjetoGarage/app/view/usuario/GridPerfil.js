Ext.define('ProjetoGarage.view.usuario.GridPerfil', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'usuario-gridPerfil',
    requires: [
    ],
    esconderToolbar: true,
    height: '100%',
    width: '100%',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.usuario.Perfil'),
            columns: [{
                text: 'Perfil',
                flex: 1,
                minWidth: 150,
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