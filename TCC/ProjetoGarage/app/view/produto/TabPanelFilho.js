Ext.define('ProjetoGarage.view.produto.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.produto.GridHistorico',
        'ProjetoGarage.view.produto.GridFornecedor'
    ],
    xtype: 'produto-tabPanel',
    layout: 'card',
    height: '100%',
    width: '100%',
    border: 5,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'produto-gridFornecedor',
                icon: '/resources/images/supply.png',
                title: 'Nome pelo Fornecedor',
                itemId: 'pnlproduto0',
                width: '100%',
                height: '100%',
                panel: me.panel
            }, {
                xtype: 'produto-gridHistorico',
                icon: '/resources/images/history.png',
                title: 'Histórico',
                itemId: 'pnlproduto1',
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

        me.gridHistorico = me.down('produto-gridHistorico');
        me.gridFornecedor = me.down('produto-gridFornecedor');
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
                toggleGroup: 'Produto',
                icon: item.icon,
                text: item.title,
                contador: cont,
                itemNome: item.itemId,
                itemId: 'txtProduto' + cont,
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
            produtoId = me.panel.extraData.record.get('ProdutoId'),
            stores = [
                me.gridHistorico.getStore(),
                me.gridFornecedor.getStore()
            ];

        Ext.each(stores, function (store) {
            store.setParams({
                ProdutoId: produtoId
            });

            store.load();
        });
    }
});