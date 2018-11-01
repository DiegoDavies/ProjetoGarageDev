Ext.define('ProjetoGarage.view.unidadeMedida.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.unidadeMedida.Grid'
    ],
    xtype: 'unidadeMedida-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'unidadeMedida-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});