Ext.define('ProjetoGarage.view.servico.WindowProduto', {
    extend: 'Ext.window.Window',
    xtype: 'servico-windowProduto',
    requires: [
        'ProjetoGarage.view.servico.FormProduto'
    ],
    layout: 'fit',
    modal: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'servico-formProduto',
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

        me.form = me.down('servico-formProduto');
        //
        me.cboProduto = me.down('#cboProduto');
        me.cboUnidadeMedida = me.down('#cboUnidadeMedida');
        me.txtQuantidade = me.down('#txtQuantidade');
        me.txtValorUnitario = me.down('#txtValorUnitario');
        me.txtValorTotal = me.down('#txtValorTotal');
        me.txtObservacao = me.down('#txtObservacao');
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

        me.txtQuantidade.on({
            scope: me,
            change: me.onCalculaTotal
        });

        me.txtValorUnitario.on({
            scope: me,
            change: me.onCalculaTotal
        });

        me.btnSalvar.on({
            scope: me,
            click: me.onBtnSalvarClick
        });
    },
    onShowWindow: function () {
        var me = this;

        me.cboProduto.focus(false, true);
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.cboProduto.store.load();
            me.cboUnidadeMedida.store.load();
        }
    },
    onCalculaTotal: function () {
        var me = this,
            qtde = me.txtQuantidade.getValue(),
            valor = me.txtValorUnitario.getValue(),
            total = Ext.Number.correctFloat(qtde * valor);

        me.txtValorTotal.setValue(Ext.util.Format.number(total, '000.00'));
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.extraData.formType === 'Cadastrar') {
            var model = Ext.create('ProjetoGarage.model.servico.Produto');
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