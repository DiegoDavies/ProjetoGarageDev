Ext.define('ProjetoGarage.view.fornecedor.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'fornecedor-panel',
    requires: [
        'ProjetoGarage.view.fornecedor.Form'
    ],
    width: '100%',
    height: '100%',
    layout: 'fit',
    varWidth: 0,
    cep: null,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'fornecedor-form',
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

        me.form = me.down('fornecedor-form');
        //
        me.txtRazaoSocial = me.down('#txtRazaoSocial');
        me.txtFantasia = me.down('#txtFantasia');
        me.cboStatus = me.down('#cboStatus');
        me.txtCep = me.down('#txtCep');
        me.txtEndereco = me.down('#txtEndereco');
        me.txtNumero = me.down('#txtNumero');
        me.txtComplemento = me.down('#txtComplemento');
        me.txtBairro = me.down('#txtBairro');
        me.cboEstado = me.down('#cboEstado');
        me.cboCidade = me.down('#cboCidade');
        me.txtCnj = me.down('#txtCnpj');
        me.txtCpf = me.down('#txtCpf');
        me.txtInscricaoEstadual = me.down('#txtInscricaoEstadual');
        me.txtRg = me.down('#txtRg');
        me.txtEmail = me.down('#txtEmail');
        me.txtTelefone = me.down('#txtTelefone');
        me.txtCelular = me.down('#txtCelular');
        me.txtSite = me.down('#txtSite');
        me.txtObservacao = me.down('#txtObservacao');
        me.tabPanel = me.down('fornecedor-tabPanel');
        me.mascaraCad = me.down('#fornecedorMasc');
        me.gridHistorico = me.tabPanel.down('fornecedor-gridHistorico');
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

        me.txtCep.on({
            scope: me,
            blur: me.onTxtCepBlur
        });

        me.cboEstado.on({
            scope: me,
            select: me.onCboEstadoSelect,
            beforedeselect: me.onCboEstadoDeselect
        });
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.mascaraCad.hide();
            me.tabPanel.show();
            me.tabPanel.loadStores();
            me.txtRazaoSocial.focus();
            me.cboStatus.store.load();
            me.cboEstado.store.load();
            me.cboCidade.store.setParams({
                EstadoId: me.cboEstado.getValue() ? me.cboEstado.getValue() : 0
            });
            me.cboCidade.store.load();
        } else {
            me.mascaraCad.show();
            me.tabPanel.hide();
            me.txtRazaoSocial.focus();
        }

        me.onVisibilidadeBotao();
    },
    onAfterLayout: function () {
        var me = this,
            clientWidth = me.txtCep.up().getEl().dom.clientWidth,
            scrollWidth = me.txtCep.up().getEl().dom.scrollWidth;

        if (scrollWidth > clientWidth && me.varWidth === 0) {
            me.varWidth = me.txtCep.up().getWidth + 30;
            me.txtCep.up().setWidth(clientWidth + 30);
        }

        me.onVisibilidadeBotao();
    },
    onVisibilidadeBotao: function () {
        var me = this,
            tab = me.dockedItems.items[0];

        if (me.extraData.formType === 'Alterar') {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'fornecedor') {
                    item.show();
                }
            }, me);
        } else {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'fornecedor') {
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
                            var model = Ext.create('ProjetoGarage.model.fornecedor.Model');
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
    onTxtCepBlur: function () {
        var me = this,
            string = '//viacep.com.br/ws/' + me.txtCep.getValue() + '/json/';
        me.cboEstado.getStore().load();

        if ((!me.txtEndereco.getValue() || me.txtCep.getValue() !== me.cep) && me.txtCep.getValue() !== '' && me.txtCep.getValue() !== '_____-___')
            Ext.Msg.show({
                title: 'Projeto Garage',
                msg: 'Deseja preencher os dados de endereço automaticamente?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.mask('Carregando dados CEP');
                        Ext.data.JsonP.request({
                            url: string,
                            crossDomain: true,
                            type: 'GET',
                            dataType: 'json',
                            callbackKey: 'callback',
                            scope: me,
                            callback: function (response, value, request) {
                                if (response) {
                                    me.cep = value.cep;
                                    me.txtCep.setValue(value.cep);
                                    me.txtBairro.setValue(value.bairro);
                                    me.txtComplemento.setValue(value.complemento);
                                    me.txtEndereco.setValue(value.logradouro);
                                    var cidade = value.localidade,
                                        estado = value.uf,
                                        rec = me.cboEstado.findRecordByDisplay(estado);
                                    if (rec) {
                                        me.cboEstado.setValue(rec.get('EstadoId'));
                                        me.cboCidade.getStore().setParams({
                                            EstadoId: me.cboEstado.getValue()
                                        });
                                        me.cboCidade.getStore().load({
                                            callback: function () {
                                                var recCid = me.cboCidade.findRecordByDisplay(cidade);
                                                if (recCid) {
                                                    me.cboCidade.setValue(recCid.get('CidadeId'));
                                                }
                                            }
                                        });
                                    }

                                }
                            }
                        });
                        me.unmask();
                    }
                }
            });
    },
    onCboEstadoSelect: function (combo, records, eOpts) {
        var me = this;

        me.cboCidade.setValue('');
        me.cboCidade.store.setParams({
            EstadoId: me.cboEstado.getValue()
        });
        me.cboCidade.store.load();
    },
    onCboEstadoDeselect: function (combo, record, index, eOpts) {
        var me = this;

        me.cboCidade.setValue('');
        me.cboCidade.store.setParams({
        });
        me.cboCidade.store.load();
    }
});