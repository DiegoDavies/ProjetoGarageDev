Ext.define('ProjetoGarage.view.modelo.Window', {
    extend: 'Ext.window.Window',
    xtype: 'modelo-window',
    requires: [
        'ProjetoGarage.view.modelo.Form'
    ],
    layout: 'fit',
    varWidth: 0,
    modal: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'modelo-form',
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
        me.cboMarca = me.down('#cboMarca');
        //
        me.btnSalvar = me.down('#btnSalvar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow,
            beforeclose: me.onBeforeClose
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
        }
        me.cboMarca.store.load();
        me.cboMarca.focus();
    },
    onBeforeClose: function () {
        var me = this;


    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.form.isValid()) {
            if (me.extraData.formType === 'Cadastrar') {
                var model = Ext.create('ProjetoGarage.model.modelo.Model');
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