Ext.define('ProjetoGarage.view.cliente.WindowServico', {
    extend: 'Ext.window.Window',
    xtype: 'cliente-windowServico',
    requires: [
        'ProjetoGarage.view.cliente.FormServico'
    ],
    layout: 'fit',
    modal: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'cliente-formServico',
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

        me.form = me.down('cliente-formServico');
        //
        me.txtNumero = me.down('#txtNumero');
        me.dtDataAprovacao = me.down('#dtDataAprovacao');
        me.cboDuracao = me.down('#cboDuracao');
        me.txtDuracao = me.down('#txtDuracao');
        me.txtObservacao = me.down('#txtObservacao');
        //
        me.btnSalvar = me.down('#btnSalvar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow
        });

        me.btnSalvar.on({
            scope: me,
            click: me.onBtnSalvarClick
        });

        me.cboDuracao.on({
            scope: me,
            select: me.onCboDuracaoSelect,
            beforedeselect: me.onCboDuracaoDeselect
        });
    },
    onShowWindow: function () {
        var me = this;

        me.txtNumero.focus(false, true);
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.form.isValid()) {
            var model = Ext.create('ProjetoGarage.model.cliente.Servico');
            me.form.updateRecord(model);
            store.add(model);

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
    },
    onCboDuracaoSelect: function (combo, records, eOpts) {
        var me = this;

        me.txtDuracao.setFieldLabel('Duração (em ' + me.cboDuracao.getDisplayValue() + ')');
    },
    onCboDuracaoDeselect: function (combo, record, index, eOpts) {
        var me = this;

        me.txtDuracao.setFieldLabel('Duração');
    }
});