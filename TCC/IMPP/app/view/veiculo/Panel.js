Ext.define('ProjetoGarage.view.veiculo.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'veiculo-panel',
    requires: [
        'ProjetoGarage.view.veiculo.Form'
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
                xtype: 'veiculo-form',
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

        me.form = me.down('veiculo-form');
        //
        me.cboMarca = me.down('#cboMarca');
        me.cboModelo = me.down('#cboModelo');
        me.cboCliente = me.down('#cboCliente');
        me.tabPanel = me.down('veiculo-tabPanel');
        me.mascaraCad = me.down('#veiculoMasc');
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

        me.cboMarca.on({
            scope: me,
            select: me.onCboMarcaSelect,
            beforedeselect: me.onCboMarcaDeselect
        });
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.mascaraCad.hide();
            me.tabPanel.show();
            me.tabPanel.loadStores();
            me.cboCliente.store.load();
            me.cboMarca.store.load();
            me.cboModelo.store.setParams({
                MarcaId: me.cboMarca.getValue() ? me.cboMarca.getValue() : 0
            });
            me.cboModelo.store.load();
        } else {
            me.mascaraCad.show();
            me.tabPanel.hide();
        }

        me.onVisibilidadeBotao();
    },
    onAfterLayout: function () {
        var me = this,
            clientWidth = me.cboMarca.up().getEl().dom.clientWidth,
            scrollWidth = me.cboMarca.up().getEl().dom.scrollWidth;

        if (scrollWidth > clientWidth && me.varWidth === 0) {
            me.varWidth = me.cboMarca.up().getWidth + 30;
            me.cboMarca.up().setWidth(clientWidth + 30);
        }

        me.onVisibilidadeBotao();
    },
    onVisibilidadeBotao: function () {
        var me = this,
            tab = me.dockedItems.items[0];

        if (me.extraData.formType === 'Alterar') {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'veiculo') {
                    item.show();
                }
            }, me);
        } else {
            tab.items.each(function (item) {
                if (item.toggleGroup === 'veiculo') {
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
                            var model = Ext.create('ProjetoGarage.model.veiculo.Model');
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
    onCboMarcaSelect: function (combo, records, eOpts) {
        var me = this;

        me.cboModelo.setValue('');
        me.cboModelo.store.setParams({
            MarcaId: me.cboMarca.getValue()
        });
        me.cboModelo.store.load();
    },
    onCboMarcaDeselect: function (combo, record, index, eOpts) {
        var me = this;

        me.cboModelo.setValue('');
        me.cboModelo.store.setParams({
        });
        me.cboModelo.store.load();
    }
});