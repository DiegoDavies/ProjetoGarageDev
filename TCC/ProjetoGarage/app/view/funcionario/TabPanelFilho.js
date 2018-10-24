Ext.define('ProjetoGarage.view.funcionario.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.funcionario.GridDependente',
        'ProjetoGarage.view.funcionario.GridHistoricoOcupacional',
        'ProjetoGarage.view.funcionario.GridPagamento',
        'ProjetoGarage.view.funcionario.GridHistorico'
    ],
    xtype: 'funcionario-tabPanel',
    layout: 'card',
    height: '100%',
    width: '100%',
    border: 5,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'funcionario-gridDependente',
                icon: '/resources/images/dependent.png',
                title: 'Dependentes',
                itemId: 'pnlFuncionario0',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'funcionario-gridHistoricoOcupacional',
                icon: '/resources/images/contract.png',
                title: 'Histórico Ocupacional',
                itemId: 'pnlFuncionario1',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'funcionario-gridPagamento',
                icon: '/resources/images/wallet.png',
                title: 'Pagamentos',
                itemId: 'pnlFuncionario2',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'funcionario-gridHistorico',
                icon: '/resources/images/history.png',
                title: 'Histórico',
                itemId: 'pnlFuncionario3',
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

        me.gridHistorico = me.down('funcionario-gridHistorico');
        me.gridPagamento = me.down('funcionario-gridPagamento');
        me.gridDependente = me.down('funcionario-gridDependente');
        me.gridHistoricoOcupacional = me.down('funcionario-gridHistoricoOcupacional');
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
                toggleGroup: 'funcionario',
                icon: item.icon,
                text: item.title,
                contador: cont,
                itemNome: item.itemId,
                itemId: 'txtFuncionario' + cont,
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

        //me.getLayout().setActiveItem('pnlFuncionario' + btn.contador);
        me.getLayout().setActiveItem(btn.itemNome);
        btn.pressed = true;
    },
    loadStores: function () {
        var me = this,
            funcionarioId = me.panel.extraData.record.get('FuncionarioId'),
            stores = [
                me.gridHistorico.getStore(),
                me.gridPagamento.getStore(),
                me.gridDependente.getStore(),
                me.gridHistoricoOcupacional.getStore()
            ];

        Ext.each(stores, function (store) {
            store.setParams({
                FuncionarioId: funcionarioId
            });

            store.load();
        });
    }
});