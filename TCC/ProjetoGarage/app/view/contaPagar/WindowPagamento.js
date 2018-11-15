Ext.define('ProjetoGarage.view.contaPagar.WindowPagamento', {
    extend: 'Ext.window.Window',
    xtype: 'contaPagar-windowPagamento',
    requires: [
        'ProjetoGarage.view.contaPagar.FormPagamento'
    ],
    layout: 'fit',
    modal: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'contaPagar-formPagamento',
                window: me
            }],
            bbar: ['->', {
                xtype: 'button',
                text: 'Salvar',
                itemId: 'btnSalvar',
                icon: '/resources/images/save.gif'
            }],
            tools: [{
                type: 'help',
                tooltip: 'Ajuda',
                callback: function (panel, tool, event) {
                    Ext.create('ProjetoGarage.view.telaPrincipal.WindowAjuda', {
                        window: panel
                    }).show();
                }
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.form = me.down('contaPagar-formPagamento');
        //
        me.txtDocumento = me.down('#txtDocumento');
        me.cboTipoPagamento = me.down('#cboTipoPagamento');
        me.dtData = me.down('#dtData');
        me.txtValor = me.down('#txtValor');
        //
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

        me.txtDocumento.focus();
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.cboTipoPagamento.store.load();
        }
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.form.isValid()) {
            if (me.extraData.formType === 'Cadastrar') {
                var model = Ext.create('ProjetoGarage.model.contaPagar.Pagamento');
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
        } else {
            Ext.Msg.show({
                title: 'Problema',
                msg: 'Preencha os dados corretamente para prosseguir!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    }
});