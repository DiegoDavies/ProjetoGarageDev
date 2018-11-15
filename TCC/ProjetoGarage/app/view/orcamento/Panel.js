Ext.define('ProjetoGarage.view.orcamento.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'orcamento-panel',
    requires: [
        'ProjetoGarage.view.orcamento.Form'
    ],
    width: '100%',
    height: '100%',
    layout: 'fit',
    varWidth: 0,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'orcamento-form',
                panel: me,
                statusId: me.extraData.formType === 'Alterar' ? me.extraData.record.get('StatusId') : 1,
                grid: me.extraData.grid
            }],
            bbar: ['->', {
                xtype: 'button',
                text: 'Salvar',
                itemId: 'btnSalvar',
                icon: '/resources/images/save.gif'
            }, '-', {
                xtype: 'button',
                text: 'Reprovar Orçamento',
                itemId: 'btnReprovar',
                icon: '/resources/images/delete16.gif'
            }, {
                xtype: 'button',
                text: 'Aprovar Orçamento',
                itemId: 'btnAprovar',
                icon: '/resources/images/check16.png'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.form = me.down('orcamento-form');
        //
        me.txtNumero = me.down('#txtNumero');
        me.cboCliente = me.down('#cboCliente');
        me.dtDataVencimento = me.down('#dtDataVencimento');
        me.cboDuracao = me.down('#cboDuracao');
        me.txtDuracao = me.down('#txtDuracao');
        me.txtValorTotal = me.down('#txtValorTotal');
        me.txtObservacao = me.down('#txtObservacao');
        me.tabPanel = me.down('orcamento-tabPanel');
        me.mascaraCad = me.down('#orcamentoMasc');
        me.gridCustos = me.down('orcamento-gridCustos');
        //
        me.btnSalvar = me.down('#btnSalvar');
        me.btnReprovar = me.down('#btnReprovar');
        me.btnAprovar = me.down('#btnAprovar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady,
            afterlayout: me.onAfterLayout
        });

        me.btnReprovar.on({
            scope: me,
            click: me.onBtnReprovarClick
        });

        me.btnAprovar.on({
            scope: me,
            click: me.onBtnAprovarClick
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

        me.txtValorTotal.on({
            scope: me,
            change: me.onAtualizaValor
        });
    },
    onBoxReady: function () {
        var me = this,
            isCliente = me.extraData.isCliente ? true : false;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.tabPanel.show();
            me.tabPanel.loadStores();
            me.mascaraCad.hide();
            me.txtNumero.focus(false, true);
            me.gridCustos.show();
            me.cboCliente.store.load();
            me.cboDuracao.store.load({
                scope: me,
                callback: function () {
                    var me = this;

                    me.txtDuracao.setFieldLabel('Duração (em ' + me.cboDuracao.getDisplayValue() + ')');
                    me.cboDuracao.forceSelection = true;
                }
            });
            me.gridCustos.statusId = me.extraData.record.get('StatusId');
            me.tabPanel.statusId = me.extraData.record.get('StatusId');
            if (me.extraData.record.get('StatusId') === 1) {
                me.btnReprovar.show();
                me.btnAprovar.show();
                me.fieldsDisabled(false);
            } else {
                me.gridCustos.btnDelete.up().hide();
                me.tabPanel.gridVeiculo.btnNovo.up().hide();
                me.tabPanel.gridProduto.btnNovo.up().hide();
                me.btnReprovar.hide();
                me.btnAprovar.hide();
                me.btnSalvar.hide();
                me.fieldsDisabled(true);
            }
        } else {
            me.tabPanel.hide();
            me.mascaraCad.show();
            me.txtNumero.focus(false, true);
            me.gridCustos.hide();
            me.btnReprovar.hide();
            me.btnAprovar.hide();
            me.cboDuracao.store.load({
                scope: me,
                callback: function () {
                    var me = this;

                    me.cboDuracao.select(me.cboDuracao.store.getAt(0).get('DuracaoId'), true);
                    me.txtDuracao.setFieldLabel('Duração (em ' + me.cboDuracao.store.getAt(0).get('Nome') + ')');
                }
            });
        }

        if (isCliente) {
            me.cboCliente.setVisible(false);
        }

        me.onVisibilidadeBotao();
    },
    fieldsDisabled: function (disabled) {
        var me = this;

        me.txtNumero.setDisabled(disabled);
        me.cboCliente.setDisabled(disabled);
        me.dtDataVencimento.setDisabled(disabled);
        me.cboDuracao.setDisabled(disabled);
        me.txtDuracao.setDisabled(disabled);
        me.txtObservacao.setDisabled(disabled);
    },
    onAfterLayout: function () {
        var me = this,
            clientWidth = me.txtNumero.up().getEl().dom.clientWidth,
            scrollWidth = me.txtNumero.up().getEl().dom.scrollWidth;

        if (scrollWidth > clientWidth && me.varWidth === 0) {
            me.varWidth = me.txtNumero.up().getWidth + 30;
            me.txtNumero.up().setWidth(clientWidth + 30);
        }

        me.onVisibilidadeBotao();
    },
    onVisibilidadeBotao: function () {
        var me = this,
            tab = me.dockedItems.items[0];

        if (me.extraData.formType === 'Alterar') {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'orcamento') {
                    item.show();
                }
            }, me);
        } else {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'orcamento') {
                    item.hide();
                }
            }, me);
        }
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store,
            statusId = me.extraData.record ? me.extraData.record.get('StatusId') : 1;

        if (me.form.isValid() && statusId === 1) {
            Ext.Msg.show({
                title: 'Validação',
                msg: 'Deseja realmente prosseguir com a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {

                        if (me.extraData.formType === 'Cadastrar') {
                            var model = Ext.create('ProjetoGarage.model.orcamento.Model');
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
    onCboDuracaoSelect: function (combo, records, eOpts) {
        var me = this;

        me.txtDuracao.setFieldLabel('Duração (em ' + me.cboDuracao.getDisplayValue() + ')');
    },
    onCboDuracaoDeselect: function (combo, record, index, eOpts) {
        var me = this;

        me.txtDuracao.setFieldLabel('Duração');
    },
    onBtnAprovarClick: function () {
        var me = this;

        Ext.Msg.show({
            title: 'Validação',
            msg: 'Deseja realmente aprovar o Orçamento?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.extraData.record.set('Aprovar', true);
                    me.getEl().mask('Salvando...');
                    me.extraData.grid.store.sync({
                        success: function (batch) {
                            var rec = batch.operations[0].records[0];
                            Ext.Msg.show({
                                title: 'Sucesso',
                                msg: 'Orçamento aprovado com sucesso!',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
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
                            me.extraData.grid.store.rejectChanges();
                            me.getEl().unmask();
                        }
                    });
                }
            }
        });
    },
    onBtnReprovarClick: function () {
        var me = this;

        Ext.Msg.show({
            title: 'Validação',
            msg: 'Deseja realmente reprovar o Orçamento?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.extraData.record.set('Reprovar', true);
                    me.getEl().mask('Salvando...');
                    me.extraData.grid.store.sync({
                        success: function (batch) {
                            var rec = batch.operations[0].records[0];
                            Ext.Msg.show({
                                title: 'Sucesso',
                                msg: 'Orçamento reprovado com sucesso!',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
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
                            me.extraData.grid.store.rejectChanges();
                            me.getEl().unmask();
                        }
                    });
                }
            }
        });
    },
    onAtualizaValor: function () {
        var me = this;

        me.extraData.record.set('AtualizaValor', true);
        me.extraData.grid.getStore().sync({
            callback: function () {
                me.extraData.record.set('AtualizaValor', false);
            }
        });
    }
});