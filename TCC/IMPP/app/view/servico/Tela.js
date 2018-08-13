Ext.define('ProjetoGarage.view.servico.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.servico.Grid'
    ],
    xtype: 'servico-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'servico-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});