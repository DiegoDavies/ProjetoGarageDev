Ext.define('ProjetoGarage.view.perfil.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.perfil.Grid'
    ],
    xtype: 'perfil-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'perfil-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});