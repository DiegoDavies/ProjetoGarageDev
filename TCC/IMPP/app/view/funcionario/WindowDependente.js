Ext.define('ProjetoGarage.view.funcionario.WindowDependente', {
    extend: 'Ext.window.Window',
    xtype: 'funcionario-windowDependente',
    requires: [
        'ProjetoGarage.view.funcionario.FormDependente'
    ],
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'funcionario-formDependente'
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
        var me = this;

        if (me.extraData.formType === 'Cadastrar') {
            var model = Ext.create('ProjetoGarage.model.funcionario.Dependente');
            me.form.updateRecord(model);
            me.extraData.grid.store.add(model);
        } else {
            me.form.updateRecord(me.extraData.record);
        }

        me.extraData.grid.store.sync({
            success: function () {
                me.extraData.grid.store.load();
                me.close();
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
});