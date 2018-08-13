Ext.define('ProjetoGarage.view.servico.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'servico-panel',
    requires: [
        'ProjetoGarage.view.servico.Form'
    ],
    width: '100%',
    height: '100%',
    layout: 'fit',
    varWidth: 0,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'servico-form',
                panel: me,
                grid: me.extraData.grid
            }],
            bbar: ['->', {
                xtype: 'button',
                text: 'Salvar',
                itemId: 'btnSalvar',
                icon: '/resources/images/save.gif'
            }, '-', {
                xtype: 'button',
                text: 'Iniciar Serviço',
                itemId: 'btnIniciar',
                icon: '/resources/images/start.png'
            }, {
                xtype: 'button',
                text: 'Finalizar Serviço',
                itemId: 'btnFinalizar',
                icon: '/resources/images/check16.png'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.form = me.down('servico-form');
        //
        me.txtNumero = me.down('#txtNumero');
        me.tabPanel = me.down('servico-tabPanel');
        me.gridCustos = me.down('servico-gridCustos');
        //
        me.btnSalvar = me.down('#btnSalvar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady,
            afterlayout: me.onAfterLayout
        });

        me.btnSalvar.on({
            scope: me,
            click: me.onBtnSalvarClick
        });
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            //me.tabPanel.show();
            me.txtNumero.focus();
        } else {
            //me.tabPanel.hide();
            me.txtNumero.focus();
        }
    },
    onAfterLayout: function () {
        var me = this,
            tab = me.dockedItems.items[0],
            clientWidth = me.txtNumero.up().getEl().dom.clientWidth,
            scrollWidth = me.txtNumero.up().getEl().dom.scrollWidth;

        if (scrollWidth > clientWidth && me.varWidth === 0) {
            me.varWidth = me.txtNumero.up().getWidth + 30;
            me.txtNumero.up().setWidth(clientWidth + 30);
        }

        if (me.extraData.formType === 'Alterar') {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'servico') {
                    item.show();
                }
            }, me);
        } else {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'servico') {
                    //item.hide();
                }
            }, me);
        }
    },
    onBtnSalvarClick: function () {
        var me = this;

        if (me.extraData.formType === 'Cadastrar') {
            var model = Ext.create('ProjetoGarage.model.servico.Model');
            me.form.updateRecord(model);
            me.extraData.grid.store.add(model);
        } else {
            me.form.updateRecord(me.extraData.record);
        }
        me.extraData.grid.store.sync();
    }
});