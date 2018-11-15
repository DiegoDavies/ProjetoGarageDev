Ext.define('ProjetoGarage.view.cliente.WindowVeiculo', {
    extend: 'Ext.window.Window',
    xtype: 'cliente-windowVeiculo',
    requires: [
        'ProjetoGarage.view.cliente.FormVeiculo'
    ],
    layout: 'fit',
    modal: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'cliente-formVeiculo',
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

        me.form = me.down('cliente-formVeiculo');

        me.txtPlaca = me.down('#txtPlaca');
        me.cboMarca = me.down('#cboMarca');
        me.cboModelo = me.down('#cboModelo');
        me.txtCor = me.down('#txtCor');
        me.txtAno = me.down('#txtAno');
        me.txtObservacao = me.down('#txtObservacao');

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

        me.cboMarca.on({
            scope: me,
            select: me.onCboMarcaSelect,
            beforedeselect: me.onCboMarcaDeselect
        });
    },
    onShowWindow: function () {
        var me = this;

        me.txtPlaca.focus(false, true);
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.form.isValid()) {
            var model = Ext.create('ProjetoGarage.model.cliente.Veiculo');
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
    onCboMarcaSelect: function () {
        var me = this;

        me.cboModelo.setValue('');
        me.cboModelo.store.setParams({
            MarcaId: me.cboMarca.getValue()
        });
        me.cboModelo.store.load();
    },
    onCboMarcaDeselect: function () {
        var me = this;

        me.cboModelo.setValue('');
        me.cboModelo.store.setParams({
        });
        me.cboModelo.store.load();
    }
});