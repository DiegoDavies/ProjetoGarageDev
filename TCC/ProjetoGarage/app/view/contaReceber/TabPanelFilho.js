Ext.define('ProjetoGarage.view.contaReceber.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.contaReceber.GridRecebimento',
        'ProjetoGarage.view.contaReceber.GridOcorrencia'
    ],
    xtype: 'contaReceber-tabPanel',
    layout: 'card',
    height: '100%',
    width: '100%',
    border: 5,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'contaReceber-gridRecebimento',
                icon: '/resources/images/moneyin.png',
                title: 'Recebimentos',
                itemId: 'pnlContaReceber0',
                width: '100%',
                height: '100%',
                tabPanel: me
            }, {
                xtype: 'contaReceber-gridOcorrencia',
                icon: '/resources/images/history.png',
                title: 'Ocorrências',
                itemId: 'pnlContaReceber1',
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

        me.gridRecebimento = me.down('contaReceber-gridRecebimento');
        me.gridOcorrencia = me.down('contaReceber-gridOcorrencia');
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
                toggleGroup: 'contaReceber',
                icon: item.icon,
                text: item.title,
                contador: cont,
                itemNome: item.itemId,
                itemId: 'txtContaReceber' + cont,
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
    loadStores: function () {
        var me = this,
            contaReceberId = me.panel.extraData.record.get('ContaReceberId'),
            stores = [
                me.gridRecebimento.getStore(),
                me.gridOcorrencia.getStore()
            ];

        Ext.each(stores, function (store) {
            store.setParams({
                ContaReceberId: contaReceberId
            });

            store.load();
        });
    }
});