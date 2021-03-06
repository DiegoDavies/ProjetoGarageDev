﻿Ext.define('ProjetoGarage.view.usuario.Window', {
    extend: 'Ext.window.Window',
    xtype: 'usuario-window',
    requires: [
        'ProjetoGarage.view.usuario.Form'
    ],
    layout: 'fit',
    varWidth: 0,
    modal: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,
            items: [{
                xtype: 'usuario-form',
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
        me.txtLogin = me.down('#txtLogin');
        me.txtEmail = me.down('#txtEmail');
        me.gridPerfil = me.down('usuario-gridPerfil');
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
            me.gridPerfil.show();
            me.gridPerfil.store.setParams({
                UsuarioId: me.extraData.record.get('UsuarioId')
            });
            me.gridPerfil.store.load();
        } else {
            me.gridPerfil.hide();
        }
        me.center();
        me.txtNome.focus();
    },
    onBtnSalvarClick: function () {
        var me = this,
            store = me.extraData.grid.store;

        if (me.form.isValid()) {
            if (me.extraData.formType === 'Cadastrar') {
                var model = Ext.create('ProjetoGarage.model.usuario.Model');
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

                        Ext.Ajax.request({
                            url: '/Email',
                            method: 'GET',
                            params: {
                                EmailDestino: rec.get('Email'),
                                TipoEmail: 2,
                                UsuarioNome: rec.get('Nome'),
                                Login: rec.get('Login'),
                                Password: rec.get('Senha')
                            },
                            success: function (response) {
                                me.extraData.formType = 'Alterar';
                                me.extraData.record = rec;
                                me.getEl().unmask();
                                me.onShowWindow();
                            },
                            failure: function (retorno, request) {
                                Ext.Msg.show({
                                    title: 'Erro',
                                    msg: 'Ocorreu um erro ao enviar o e-mail, Em breve um atendente te enviara os procedimentos por e-mail!',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                            }
                        });
                    },
                    failure: function () {
                        store.rejectChanges();
                        me.getEl().unmask();
                    }
                });
            }
        }
    }
});