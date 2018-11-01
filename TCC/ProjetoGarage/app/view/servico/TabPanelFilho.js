Ext.define('ProjetoGarage.view.servico.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.servico.GridProduto',
        'ProjetoGarage.view.servico.GridVeiculo',
        'ProjetoGarage.view.servico.GridHistorico'
    ],
    xtype: 'servico-tabPanel',
    layout: 'card',
    height: '100%',
    width: '100%',
    border: 5,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'servico-gridProduto',
                icon: '/resources/images/repair-tools.png',
                title: 'Produtos',
                itemId: 'pnlservico0',
                width: '100%',
                height: '100%',
                tabPanel: me
            }, {
                xtype: 'servico-gridVeiculo',
                icon: '/resources/images/car.png',
                title: 'Veículos',
                itemId: 'pnlservico1',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'servico-gridHistorico',
                icon: '/resources/images/history.png',
                title: 'Histórico',
                itemId: 'pnlservico2',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady
        });
    },
    onBoxReady: function () {
        var me = this,
            tab = me.panel.dockedItems.items[0],
            cont = 0;

        me.items.each(function (item) {
            tab.insert(cont, {
                xtype: 'button',
                pressed: cont === 0 ? true : false,
                toggleGroup: 'servico',
                icon: item.icon,
                text: item.title,
                contador: cont,
                itemNome: item.xtype,
                itemId: 'txtServico' + cont,
                listeners: {
                    scope: this,
                    click: me.onBtnBarClick
                }
            });
            cont = cont + 1;
        }, me);
        tab.insert(cont, '-');
    },
    onBtnBarClick: function (btn) {
        var me = this;

        me.getLayout().setActiveItem('pnlservico' + btn.contador);
        me.down('#' + btn.itemNome).getStore().load();
        btn.pressed = true;
    }
});