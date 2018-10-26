Ext.define('ProjetoGarage.view.login.WindowResetar', {
    extend: 'Ext.window.Window',
    xtype: 'resetarWindow',
    title: 'Resetar senha...',
    width: 300,
    cls: 'ContainerLogin',
    layout: 'fit',
    modal: true,
    closable: true,
    draggable: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            storeResetar: Ext.create('ProjetoGarage.store.login.ConfirmarSenha'),
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'form',
                    itemId: 'frmDados',
                    bodyPadding: 10,
                    flex: 1,
                    style: 'border-radius: 4px;',
                    items: [{
                        xtype: 'textfield',
                        itemId: 'txtChave',
                        width: '100%',
                        emptyText: 'Código de alteração *',
                        name: 'CodigoAlteracao',
                        cls: 'TxtLogin',
                        fieldStyle: 'border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;',
                        margin: '0 0 10 0',
                        enableKeyEvents: true,
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        itemId: 'txtSenhaNova',
                        width: '100%',
                        labelAlign: 'top',
                        margin: '0 0 10 0',
                        inputType: 'password',
                        cls: 'TxtLogin',
                        fieldStyle: 'border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;',
                        emptyText: 'Senha Nova *',
                        name: 'SenhaNova',
                        enableKeyEvents: true,
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        itemId: 'txtSenhaNovaR',
                        width: '100%',
                        labelAlign: 'top',
                        margin: '0 0 0 0',
                        inputType: 'password',
                        cls: 'TxtLogin',
                        emptyText: 'Repetir Senha *',
                        name: 'SenhaRepetida',
                        fieldStyle: 'border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;',
                        enableKeyEvents: true,
                        allowBlank: false,
                        validator: function (value) {
                            var nova = this.up('form').down('#txtSenhaNova').getValue();
                            if (nova !== value) {
                                return 'Repetir corretamente a senha.';
                            }
                            return true;
                        }
                    }],
                    bbar: ['->', {
                        xtype: 'button',
                        text: 'Confirmar',
                        margin: '0 10 0 0',
                        itemId: 'btnConfirmar'
                    }]
                }]
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.txtChave = me.down('#txtChave');
        me.txtSenhaNova = me.down('#txtSenhaNova');
        me.txtSenhaNovaR = me.down('#txtSenhaNovaR');
        me.btnConfirmar = me.down('#btnConfirmar');
        me.form = me.down('#frmDados');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow
        });

        me.txtChave.on({
            scope: me,
            keypress: me.onKeyPress
        });

        me.txtSenhaNova.on({
            scope: me,
            keypress: me.onKeyPress
        });

        me.txtSenhaNovaR.on({
            scope: me,
            keypress: me.onKeyPress
        });

        me.btnConfirmar.on({
            click: me.onBtnConfirmarClick,
            scope: me
        });
    },
    onShowWindow: function () {
        var me = this;

        me.txtChave.focus();
    },
    onKeyPress: function (dado, e, eOpts) {
        var me = this;

        if (e.keyCode === 13) {
            me.btnConfirmar.fireEvent('click');
        }
    },
    onBtnConfirmarClick: function () {
        var me = this;

        if (me.form.isValid()) {
            Ext.Msg.show({
                title: 'Validação',
                msg: 'Deseja realmente prosseguir com a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.getEl().mask('Enviando dados...');
                        var model = Ext.create('ProjetoGarage.model.login.ConfirmarSenha');
                        me.form.updateRecord(model);
                        me.storeResetar.add(model);

                        me.storeResetar.sync({
                            success: function () {
                                Ext.Msg.show({
                                    title: 'Sucesso',
                                    msg: 'Nova senha configurada com sucesso!',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                me.parentWindow.close();
                                me.close();
                                me.getEl().unmask();
                            },
                            failure: function () {
                                me.storeResetar.rejectChanges();
                                me.getEl().unmask();
                            }
                        });
                    }
                }
            });
        }
    }
});