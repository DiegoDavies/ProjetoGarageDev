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
                title: 'Recebimentos',
                itemId: 'pnlContaReceber0',
                width: '100%',
                height: '100%',
                tabPanel: me
            }, {
                xtype: 'contaReceber-gridOcorrencia',
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
                text: item.title,
                contador: cont,
                itemNome: item.xtype,
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

        me.getLayout().setActiveItem('pnlContaReceber' + btn.contador);
        btn.pressed = true;
    }
});