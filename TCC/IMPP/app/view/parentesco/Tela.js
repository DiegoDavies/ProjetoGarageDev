Ext.define('ProjetoGarage.view.parentesco.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.parentesco.Grid'
    ],
    xtype: 'parentesco-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'parentesco-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});