Ext.define('ProjetoGarage.view.tipoPagamento.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.tipoPagamento.Grid'
    ],
    xtype: 'tipoPagamento-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'tipoPagamento-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});