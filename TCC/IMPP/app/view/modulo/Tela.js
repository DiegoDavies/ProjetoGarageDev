Ext.define('ProjetoGarage.view.modulo.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.modulo.Grid'
    ],
    xtype: 'modulo-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'modulo-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});