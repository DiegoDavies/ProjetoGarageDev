Ext.define('ProjetoGarage.view.contaPagar.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'contaPagar-panel',
    requires: [
        'ProjetoGarage.view.contaPagar.Form'
    ],
    width: '100%',
    height: '100%',
    layout: 'fit',
    varWidth: 0,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'contaPagar-form',
                panel: me,
                grid: me.extraData.grid
            }],
            bbar: ['->', {
                xtype: 'button',
                text: 'Salvar',
                itemId: 'btnSalvar',
                icon: '/resources/images/save.gif'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.form = me.down('contaPagar-form');
        //
        me.txtDocumento = me.down('#txtDocumento');
        me.tabPanel = me.down('contaPagar-tabPanel');
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
            me.txtDocumento.focus();
        } else {
            //me.tabPanel.hide();
            me.txtDocumento.focus();
        }
    },
    onAfterLayout: function () {
        var me = this,
            tab = me.dockedItems.items[0],
            clientWidth = me.txtDocumento.up().getEl().dom.clientWidth,
            scrollWidth = me.txtDocumento.up().getEl().dom.scrollWidth;

        if (scrollWidth > clientWidth && me.varWidth === 0) {
            me.varWidth = me.txtDocumento.up().getWidth + 30;
            me.txtDocumento.up().setWidth(clientWidth + 30);
        }

        if (me.extraData.formType === 'Alterar') {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'contaPagar') {
                    item.show();
                }
            }, me);
        } else {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'contaPagar') {
                    //item.hide();
                }
            }, me);
        }
    },
    onBtnSalvarClick: function () {
        var me = this;

        if (me.extraData.formType === 'Cadastrar') {
            var model = Ext.create('ProjetoGarage.model.contaPagar.Model');
            me.form.updateRecord(model);
            me.extraData.grid.store.add(model);
        } else {
            me.form.updateRecord(me.extraData.record);
        }
        me.extraData.grid.store.sync();
    }
});