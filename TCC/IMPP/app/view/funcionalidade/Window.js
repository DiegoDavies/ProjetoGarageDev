﻿Ext.define('ProjetoGarage.view.funcionalidade.Window', {
    extend: 'Ext.window.Window',
    xtype: 'funcionalidade-window',
    requires: [
        'ProjetoGarage.view.funcionalidade.Form'
    ],
    layout: 'fit',
    varWidth: 0,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'funcionalidade-form',
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
        me.cboModulo = me.down('#cboModulo');
        me.txtMenu = me.down('#txtMenu');
        me.txtTitulo = me.down('#txtTitulo');
        me.txtClassName = me.down('#txtClassName');
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
            me.cboModulo.store.load();
        }
        me.cboModulo.focus();
    },
    onBeforeClose: function () {
        var me = this;


    },
    onBtnSalvarClick: function () {
        var me = this;

        me.getEl().mask('Salvando...');
        if (me.extraData.formType === 'Cadastrar') {
            var model = Ext.create('ProjetoGarage.model.funcionalidade.Model');
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
                me.extraData.grid.store.rejectChanges();
                me.getEl().unmask();
            }
        });
    }
});