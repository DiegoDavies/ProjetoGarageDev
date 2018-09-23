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
        me.txtDuracao = me.down('#txtDuracao');
        me.tabPanel = me.down('orcamento-tabPanel');
        me.mascaraCad = me.down('#orcamentoMasc');
        me.gridCustos = me.down('orcamento-gridCustos');
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
            me.tabPanel.show();
            me.tabPanel.loadStores();
            me.mascaraCad.hide();
            me.txtNumero.focus();
            me.gridCustos.show();
            me.cboCliente.store.load();
        } else {
            me.tabPanel.hide();
            me.mascaraCad.show();
            me.txtNumero.focus();
            me.gridCustos.hide();
        }

        dados = [{
            Descricao: 'Mão de Obra',
            Valor: 0,
            Desconto: false,
            Delete: true
        }, {
            Descricao: 'Produtos',
            Valor: 0,
            Desconto: false,
            Delete: true
        }, {
            Descricao: 'Serviço Terceiros',
            Valor: 0,
            Desconto: false,
            Delete: true
        }, {
            Descricao: 'Outros',
            Valor: 0,
            Desconto: false,
            Delete: true
        }, {
            Descricao: 'Descontos',
            Valor: 0,
            Desconto: true,
            Delete: true
        }];
        me.gridCustos.getStore().loadData(dados);
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
    }
});