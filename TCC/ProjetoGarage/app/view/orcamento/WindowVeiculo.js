Ext.define('ProjetoGarage.view.orcamento.WindowVeiculo', {
    extend: 'Ext.window.Window',
    xtype: 'orcamento-windowVeiculo',
    requires: [
        'ProjetoGarage.view.orcamento.FormVeiculo'
    ],
    layout: 'fit',
    modal: true,
    initComponent: function () {
        var me = this;
        
        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'orcamento-formVeiculo',
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
    addReferences: function() {
        var me = this;

        me.form = me.down('orcamento-formVeiculo');

        me.cboVeiculo = me.down('#cboVeiculo');
        me.txtObservacao = me.down('#txtObservacao');
        me.txtProblema = me.down('#txtProblema');

        me.btnSalvar = me.down('#btnSalvar');
    },
    addEventHandler: function() {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady,
            show: me.onShowWindow
        });

        me.cboVeiculo.on({
            scope: me,
            select: me.onSelectCboVeiculo,
            beforedeselect: me.onBeforeDeselectCboVeiculo
        });

        me.btnSalvar.on({
            scope: me,
            click: me.onBtnSalvarClick
        });
    },
    onShowWindow: function () {
        var me = this;

        me.cboVeiculo.focus();
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.rdgDesconto.setValue({ Desconto: me.extraData.record.get('Desconto') ? '1' : '2' })
        }
    },
    onSelectCboVeiculo: function(combo, records, eOpts) {
        var me = this;


    },
    onBeforeDeselectCboVeiculo: function(combo, record, index, eOpts) {
        var me = this;


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