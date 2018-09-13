Ext.define('ProjetoGarage.view.perfil.Window', {
    extend: 'Ext.window.Window',
    xtype: 'perfil-window',
    requires: [
        'ProjetoGarage.view.perfil.Form'
    ],
    layout: 'fit',
    varWidth: 0,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'perfil-form',
                itemId: 'frmDados',
                width: '100%',
                height: '100%',
                window: me
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

        me.form = me.down('#frmDados');
        me.txtNome = me.down('#txtNome');
        me.gridFuncionalidade = me.down('perfil-gridFuncionalidade');
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
    },
    onShowWindow: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.gridFuncionalidade.show();
            me.gridFuncionalidade.store.setParams({
                PerfilId: me.extraData.record.get('PerfilId')
            });
            me.gridFuncionalidade.store.load();
        } else {
            me.gridFuncionalidade.hide();
        }
        me.center();
        me.txtNome.focus();
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.form.isValid()) {
            if (me.extraData.formType === 'Cadastrar') {
                var model = Ext.create('ProjetoGarage.model.perfil.Model');
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
                        me.onShowWindow();
                    },
                    failure: function () {
                        store.rejectChanges();
                        me.getEl().unmask();
                    }
                });
            }
        } else {
            Ext.Msg.show({
                title: 'Atenção',
                msg: 'Preencha corretamente as informações para prosseguir!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    }
});