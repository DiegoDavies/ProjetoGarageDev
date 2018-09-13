Ext.define('ProjetoGarage.view.modelo.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.modelo.Grid'
    ],
    xtype: 'modelo-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'modelo-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});