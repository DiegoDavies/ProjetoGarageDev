Ext.define('ProjetoGarage.view.orcamento.WindowCustos', {
    extend: 'Ext.window.Window',
    xtype: 'orcamento-windowCustos',
    requires: [
        'ProjetoGarage.view.orcamento.FormCustos'
    ],
    layout: 'fit',
    modal: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'orcamento-formCustos',
                window: me
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

        me.form = me.down('orcamento-formCustos');

        me.txtDescricao = me.down('#txtDescricao');
        me.rdgDesconto = me.down('#rdgDesconto');

        me.btnSalvar = me.down('#btnSalvar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady,
            show: me.onShowWindow
        });

        me.btnSalvar.on({
            scope: me,
            click: me.onBtnSalvarClick
        });
    },
    onShowWindow: function () {
        var me = this;

        me.txtDescricao.focus();
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.rdgDesconto.setValue({ Desconto: me.extraData.record.get('Desconto') ? '1' : '2' })
        }
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.extraData.formType === 'Cadastrar') {
            var model = Ext.create('ProjetoGarage.model.orcamento.Custos');
            me.form.updateRecord(model);
            store.add(model);
        } else {
            me.form.updateRecord(me.extraData.record);
        }

        if (store.getModifiedRecords().length > 0 || store.getRemovedRecords().length > 0 || store.getNewRecords().length > 0) {
            me.getEl().mask('Salvando...');
            store.sync({
                success: function () {
                    store.load();
                    me.getEl().unmask();
                    me.close();
                },
                failure: function () {
                    store.rejectChanges();
                    me.getEl().unmask();
                }
            });
        }
    }
});