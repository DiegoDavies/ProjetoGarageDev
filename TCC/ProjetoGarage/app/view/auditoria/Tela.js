Ext.define('ProjetoGarage.view.auditoria.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.auditoria.Grid'
    ],
    xtype: 'auditoria-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'auditoria-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});