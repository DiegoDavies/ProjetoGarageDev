Ext.define('ProjetoGarage.view.contaPagar.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.contaPagar.GridPagamento',
        'ProjetoGarage.view.contaPagar.GridOcorrencia'
    ],
    xtype: 'contaPagar-tabPanel',
    layout: 'card',
    height: '100%',
    width: '100%',
    border: 5,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'contaPagar-gridPagamento',
                icon: '/resources/images/moneyout.png',
                title: 'Pagamentos',
                itemId: 'pnlContaPagar0',
                width: '100%',
                height: '100%',
                tabPanel: me
            }, {
                xtype: 'contaPagar-gridOcorrencia',
                icon: '/resources/images/history.png',
                title: 'Ocorrências',
                itemId: 'pnlContaPagar1',
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

        me.gridPagamento = me.down('contaPagar-gridPagamento');
        me.gridOcorrencia = me.down('contaPagar-gridOcorrencia');
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
                toggleGroup: 'contaPagar',
                icon: item.icon,
                text: item.title,
                contador: cont,
                itemNome: item.itemId,
                itemId: 'txtContaPagar' + cont,
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
        btn.pressed = true;
    },
    loadStores: function() {
        var me = this,
            contaPagarId = me.panel.extraData.record.get('ContaPagarId'),
            stores = [
                me.gridPagamento.getStore(),
                me.gridOcorrencia.getStore()
            ];

        Ext.each(stores, function (store) {
            store.setParams({
                ContaPagarId: contaPagarId
            });

            store.load();
        });
    }
});