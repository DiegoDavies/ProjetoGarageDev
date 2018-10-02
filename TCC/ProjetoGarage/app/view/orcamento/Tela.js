Ext.define('ProjetoGarage.view.orcamento.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.orcamento.Grid'
    ],
    xtype: 'orcamento-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'orcamento-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});