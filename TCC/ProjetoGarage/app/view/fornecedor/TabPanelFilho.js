Ext.define('ProjetoGarage.view.fornecedor.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.fornecedor.GridPagamento',
        'ProjetoGarage.view.fornecedor.GridHistorico',
        'ProjetoGarage.view.fornecedor.GridContaPagar'
    ],
    xtype: 'fornecedor-tabPanel',
    layout: 'card',
    height: '100%',
    width: '100%',
    border: 5,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'fornecedor-gridContaPagar',
                icon: '/resources/images/moneyout.png',
                title: 'Contas à Pagar',
                itemId: 'pnlFornecedor0',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'fornecedor-gridPagamento',
                icon: '/resources/images/wallet.png',
                title: 'Bancos',
                itemId: 'pnlFornecedor1',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'fornecedor-gridHistorico',
                icon: '/resources/images/history.png',
                title: 'Histórico',
                itemId: 'pnlFornecedor2',
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

        me.gridHistorico = me.down('fornecedor-gridHistorico');
        me.gridPagamento = me.down('fornecedor-gridPagamento');
        me.gridContaPagar = me.down('fornecedor-gridContaPagar');
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
                toggleGroup: 'fornecedor',
                icon: item.icon,
                text: item.title,
                contador: cont,
                itemNome: item.itemId,
                itemId: 'txtFornecedor' + cont,
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

        me.getLayout().setActiveItem(btn.itemNome);
        me.down('#' + btn.itemNome).getStore().load();
        btn.pressed = true;
    },
    loadStores: function () {
        var me = this,
            fornecedorId = me.panel.extraData.record.get('FornecedorId'),
            stores = [
                me.gridHistorico.getStore(),
                me.gridPagamento.getStore(),
                me.gridContaPagar.getStore()
            ];

        Ext.each(stores, function (store) {
            store.setParams({
                FornecedorId: fornecedorId
            });

            store.load();
        });
    }
});