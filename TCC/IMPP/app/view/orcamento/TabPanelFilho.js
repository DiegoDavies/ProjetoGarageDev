Ext.define('ProjetoGarage.view.orcamento.TabPanelFilho', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ProjetoGarage.view.orcamento.GridProduto',
        'ProjetoGarage.view.orcamento.GridVeiculo',
        'ProjetoGarage.view.orcamento.GridOcorrencia'
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
                title: 'Produtos',
                itemId: 'pnlorcamento0',
                width: '100%',
                height: '100%',
                tabPanel: me
            }, {
                xtype: 'orcamento-gridVeiculo',
                title: 'Veículos',
                itemId: 'pnlorcamento1',
                width: '100%',
                height: '100%'
            }, {
                xtype: 'orcamento-gridOcorrencia',
                title: 'Ocorrências',
                itemId: 'pnlorcamento2',
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
                toggleGroup: 'orcamento',
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
        btn.pressed = true;
    }
});