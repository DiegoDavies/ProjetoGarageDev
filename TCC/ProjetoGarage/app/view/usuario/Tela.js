Ext.define('ProjetoGarage.view.usuario.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.usuario.Grid'
    ],
    xtype: 'usuario-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'usuario-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});