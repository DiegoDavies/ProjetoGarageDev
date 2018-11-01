Ext.define('ProjetoGarage.view.cliente.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.cliente.GridContaReceber',
        'ProjetoGarage.view.cliente.GridServico',
        'ProjetoGarage.view.cliente.GridVeiculo',
        'ProjetoGarage.view.cliente.GridHistorico',
        'ProjetoGarage.view.cliente.GridOrcamento'
    ],
    xtype: 'cliente-tabPanel',
    layout: 'card',
    height: '100%',
    width: '100%',
    border: 5,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'cliente-gridContaReceber',
                icon: '/resources/images/moneyin.png',
                title: 'Contas à Receber',
                itemId: 'pnlCliente0',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'cliente-gridOrcamento',
                icon: '/resources/images/budget.png',
                title: 'Orçamento',
                itemId: 'pnlCliente1',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'cliente-gridServico',
                icon: '/resources/images/execution.png',
                title: 'Serviços',
                itemId: 'pnlCliente2',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'cliente-gridVeiculo',
                icon: '/resources/images/car.png',
                title: 'Veículos',
                itemId: 'pnlCliente3',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'cliente-gridHistorico',
                icon: '/resources/images/history.png',
                title: 'Histórico',
                itemId: 'pnlCliente4',
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

        me.gridHistorico = me.down('cliente-gridHistorico');
        me.gridOrcamento = me.down('cliente-gridOrcamento');
        me.gridServico = me.down('cliente-gridServico');
        me.gridVeiculo = me.down('cliente-gridVeiculo');
        me.gridContaReceber = me.down('cliente-gridContaReceber');
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
                toggleGroup: 'cliente',
                icon: item.icon,
                text: item.title,
                contador: cont,
                itemNome: item.itemId,
                itemId: 'txtCliente' + cont,
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
            clienteId = me.panel.extraData.record.get('ClienteId'),
            stores = [
                me.gridHistorico.getStore(),
                me.gridOrcamento.getStore(),
                me.gridServico.getStore(),
                me.gridVeiculo.getStore(),
                me.gridContaReceber.getStore()
            ];

        Ext.each(stores, function (store) {
            store.setParams({
                ClienteId: clienteId
            });

            store.load();
        });
    }
});