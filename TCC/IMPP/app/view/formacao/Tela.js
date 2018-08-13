Ext.define('ProjetoGarage.view.formacao.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.formacao.Grid'
    ],
    xtype: 'formacao-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'formacao-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});