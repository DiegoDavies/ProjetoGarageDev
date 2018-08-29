Ext.define('ProjetoGarage.view.funcionario.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'funcionario-panel',
    requires: [
        'ProjetoGarage.view.funcionario.Form'
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
                xtype: 'funcionario-form',
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

        me.form = me.down('funcionario-form');
        //
        me.txtCodigo = me.down('#txtCodigo');
        me.txtCep = me.down('#txtCep');
        me.txtEndereco = me.down('#txtEndereco');
        me.txtNumero = me.down('#txtNumero');
        me.txtComplemento = me.down('#txtComplemento');
        me.txtBairro = me.down('#txtBairro');
        me.cboSituacao = me.down('#cboSituacao');
        me.cboSexo = me.down('#cboSexo');
        me.cboEstado = me.down('#cboEstado');
        me.cboCidade = me.down('#cboCidade');
        me.cboEstadoNasc = me.down('#cboEstadoNasc');
        me.cboCidadeNasc = me.down('#cboCidadeNasc');
        me.cboEstadoCivil = me.down('#cboEstadoCivil');
        me.cboFormacao = me.down('#cboFormacao');
        me.cboEtnia = me.down('#cboEtnia');
        me.tabPanel = me.down('funcionario-tabPanel');
        me.gridHistorico = me.tabPanel.down('funcionario-gridHistorico');
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

        me.cboEstadoNasc.on({
            scope: me,
            select: me.onCboEstadoNascSelect,
            beforedeselect: me.onCboEstadoNascDeselect
        });
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.tabPanel.show();
            me.tabPanel.loadStores();
            me.txtCodigo.up().show();
            me.txtCodigo.focus();
            me.cboSituacao.store.load();
            me.cboSexo.store.load();
            me.cboEstado.store.load();
            me.cboCidade.store.setParams({
                EstadoId: me.cboEstado.getValue() ? me.cboEstado.getValue() : 0
            });
            me.cboCidade.store.load();
            me.cboEstadoNasc.store.load();
            me.cboCidadeNasc.store.setParams({
                EstadoId: me.cboEstadoNasc.getValue() ? me.cboEstadoNasc.getValue() : 0
            });
            me.cboCidadeNasc.store.load();
            me.cboEstadoCivil.store.load();
            me.cboFormacao.store.load();
            me.cboEtnia.store.load();
        } else {
            me.tabPanel.hide();
            me.txtCodigo.up().hide();
            me.txtCodigo.focus();
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
                if (item.toggleGroup === 'funcionario') {
                    item.show();
                }
            }, me);
        } else {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'funcionario') {
                    item.hide();
                }
            }, me);
        }
    },
    onBtnSalvarClick: function () {
        var me = this;

        if (me.form.isValid()) {
            Ext.Msg.show({
                title: 'Validação',
                msg: 'Deseja realmente prosseguir com a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        if (me.extraData.formType === 'Cadastrar') {
                            var model = Ext.create('ProjetoGarage.model.funcionario.Model');
                            me.form.updateRecord(model);
                            me.extraData.grid.store.add(model);
                        } else {
                            me.form.updateRecord(me.extraData.record);
                        }
                        me.extraData.grid.store.sync({
                            success: function (batch) {
                                var rec = batch.operations[0].records[0];
                                me.extraData.formType = 'Alterar';
                                me.extraData.record = rec;
                                me.getEl().unmask();
                                me.onBoxReady();
                            },
                            failure: function () {
                                Ext.Msg.show({
                                    title: 'Problema',
                                    msg: 'Ocorreu um erro ao realizar a operação!',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.ERROR
                                });
                                me.extraData.grid.store.rejectChanges();
                            }
                        });
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

        if (!me.txtEndereco.getValue() || me.txtCep.getValue() !== me.cep)
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
    },
    onCboEstadoNascSelect: function (combo, records, eOpts) {
        var me = this;

        me.cboCidadeNasc.setValue('');
        me.cboCidadeNasc.store.setParams({
            EstadoId: me.cboEstadoNasc.getValue()
        });
        me.cboCidadeNasc.store.load();
    },
    onCboEstadoNascDeselect: function (combo, record, index, eOpts) {
        var me = this;

        me.cboCidadeNasc.setValue('');
        me.cboCidadeNasc.store.setParams({
        });
        me.cboCidadeNasc.store.load();
    }
});