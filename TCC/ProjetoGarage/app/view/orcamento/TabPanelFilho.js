Ext.define('ProjetoGarage.view.orcamento.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.orcamento.GridProduto',
        'ProjetoGarage.view.orcamento.GridVeiculo',
        'ProjetoGarage.view.orcamento.GridHistorico'
    ],
    xtype: 'orcamento-tabPanel',
    layout: 'card',
    height: '100%',
    width: '100%',
    border: 5,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'orcamento-gridProduto',
                icon: '/resources/images/repair-tools.png',
                title: 'Produtos',
                itemId: 'pnlorcamento0',
                width: '100%',
                height: '100%',
                tabPanel: me
            }, {
                xtype: 'orcamento-gridVeiculo',
                icon: '/resources/images/car.png',
                title: 'Veículos',
                itemId: 'pnlorcamento1',
                width: '100%',
                height: '100%',
                tabPanel: me
            }, {
                xtype: 'orcamento-gridHistorico',
                icon: '/resources/images/history.png',
                title: 'Histórico',
                itemId: 'pnlorcamento2',
                width: '100%',
                height: '100%',
                tabPanel: me
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.gridProduto = me.down('orcamento-gridProduto');
        me.gridVeiculo = me.down('orcamento-gridVeiculo');
        me.gridHistorico = me.down('orcamento-gridHistorico');
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
                toggleGroup: 'orcamento',
                icon: item.icon,
                text: item.title,
                contador: cont,
                itemNome: item.xtype,
                itemId: 'txtorcamento' + cont,
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

        me.getLayout().setActiveItem('pnlorcamento' + btn.contador);
        me.down('#' + btn.itemNome).getStore().load();
        btn.pressed = true;
    },
    loadStores: function () {
        var me = this,
            orcamentoId = me.panel.extraData.record.get('OrcamentoId'),
            stores = [
                me.panel.gridCustos.getStore(),
                me.gridHistorico.getStore(),
                me.gridProduto.getStore(),
                me.gridVeiculo.getStore()
            ];

        Ext.each(stores, function (store) {
            store.setParams({
                OrcamentoId: orcamentoId
            });

            store.load();
        });
    }
});