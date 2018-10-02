Ext.define('ProjetoGarage.view.marca.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.marca.Grid'
    ],
    xtype: 'marca-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'marca-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});