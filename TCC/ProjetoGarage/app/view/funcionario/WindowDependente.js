Ext.define('ProjetoGarage.view.funcionario.WindowDependente', {
    extend: 'Ext.window.Window',
    xtype: 'funcionario-windowDependente',
    requires: [
        'ProjetoGarage.view.funcionario.FormDependente'
    ],
    layout: 'fit',
    modal: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'funcionario-formDependente',
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

        me.form = me.down('funcionario-formDependente');

        me.txtNome = me.down('#txtNome');
        me.txtCpf = me.down('#txtCpf');
        me.dtDataNasc = me.down('#dtDataNasc');
        me.cboGrauParentesco = me.down('#cboGrauParentesco');

        me.btnSalvar = me.down('#btnSalvar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady,
            show: me.onShowWindow
        });

        me.btnSalvar.on({
            scope: me,
            click: me.onBtnSalvarClick
        });
    },
    onShowWindow: function () {
        var me = this;

        me.txtNome.focus();
    },
    onBoxReady: function () {
        var me = this;

        if (me.extraData.formType === 'Alterar') {
            me.form.loadRecord(me.extraData.record);
            me.cboGrauParentesco.getStore().load();
        }
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.extraData.formType === 'Cadastrar') {
            var model = Ext.create('ProjetoGarage.model.funcionario.Dependente');
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