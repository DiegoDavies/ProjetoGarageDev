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
        me.mascaraCad = me.down('#contaPagarMasc');
        me.cboFuncionario = me.down('#cboFuncionario');
        me.cboFornecedor = me.down('#cboFornecedor');
        me.rdbBeneficiarios = me.down('#rdbBeneficiarios');
        me.txtValorPago = me.down('#txtValorPago');
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

        me.rdbBeneficiarios.on({
            scope: me,
            change: me.onBeneficiarioChange
        });
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.mascaraCad.hide();
            me.tabPanel.show();
            me.tabPanel.loadStores();
            me.cboFornecedor.store.load();
            me.cboFuncionario.store.load();
            me.txtDocumento.focus();
            me.rdbBeneficiarios.setValue({
                Benef: me.extraData.record.get('FuncionarioId') > 0 ? 'Funcionario' : 'Fornecedor'
            });
        } else {
            me.mascaraCad.show();
            me.tabPanel.hide();
            me.txtDocumento.focus();
            me.cboFornecedor.hide();
            me.cboFornecedor.setValue('');
            me.cboFuncionario.show();
        }

        me.onVisibilidadeBotao();
    },
    onAfterLayout: function () {
        var me = this,
            clientWidth = me.txtDocumento.up().getEl().dom.clientWidth,
            scrollWidth = me.txtDocumento.up().getEl().dom.scrollWidth;

        if (scrollWidth > clientWidth && me.varWidth === 0) {
            me.varWidth = me.txtDocumento.up().getWidth + 30;
            me.txtDocumento.up().setWidth(clientWidth + 30);
        }

        me.onVisibilidadeBotao();
    },
    onVisibilidadeBotao: function () {
        var me = this,
            tab = me.dockedItems.items[0];

        if (me.extraData.formType === 'Alterar') {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'contaPagar') {
                    item.show();
                }
            }, me);
        } else {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'contaPagar') {
                    item.hide();
                }
            }, me);
        }
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.form.isValid()) {
            Ext.Msg.show({
                title: 'Validação',
                msg: 'Deseja realmente prosseguir com a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        if (me.extraData.formType === 'Cadastrar') {
                            var model = Ext.create('ProjetoGarage.model.contaPagar.Model');
                            me.form.updateRecord(model);
                            store.add(model);
                        } else {
                            me.form.updateRecord(me.extraData.record);
                        }
                        if (store.getModifiedRecords().length > 0 || store.getRemovedRecords().length > 0 || store.getNewRecords().length > 0) {
                            me.getEl().mask('Salvando...');
                            store.sync({
                                success: function (batch) {
                                    var rec = batch.operations[0].records[0];
                                    me.extraData.formType = 'Alterar';
                                    me.extraData.record = rec;
                                    me.getEl().unmask();
                                    me.onBoxReady();
                                    me.onAfterLayout();
                                },
                                failure: function () {
                                    Ext.Msg.show({
                                        title: 'Problema',
                                        msg: 'Ocorreu um erro ao realizar a operação!',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR
                                    });
                                    store.rejectChanges();
                                    me.getEl().unmask();
                                }
                            });
                        }
                    }
                }
            });
        } else {
            Ext.Msg.show({
                title: 'Problema',
                msg: 'Preencha os dados corretamente para prosseguir!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },
    onBeneficiarioChange: function (radio, newValue) {
        var me = this;

        if (newValue.Benef === 'Funcionario') {
            me.cboFornecedor.hide();
            me.cboFornecedor.setValue('');
            me.cboFuncionario.show();
        } else if (newValue.Benef === 'Fornecedor') {
            me.cboFuncionario.hide();
            me.cboFuncionario.setValue('');
            me.cboFornecedor.show();
        }
    }
});