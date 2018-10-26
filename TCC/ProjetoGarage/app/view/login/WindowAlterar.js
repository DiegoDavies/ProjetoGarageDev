Ext.define('ProjetoGarage.view.login.WindowAlterar', {
    extend: 'Ext.window.Window',
    xtype: 'alterarWindow',
    title: 'Por favor entre com seus dados',
    width: 300,
    cls: 'ContainerLogin',
    layout: 'fit',
    modal: true,
    closable: true,
    draggable: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            storeAlterar: Ext.create('ProjetoGarage.store.login.AlterarSenha'),
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
                        itemId: 'txtSenhaAtual',
                        width: '100%',
                        labelAlign: 'top',
                        margin: '0 0 10 0',
                        inputType: 'password',
                        cls: 'TxtLogin',
                        emptyText: 'Senha Atual *',
                        name: 'SenhaAtual',
                        fieldStyle: 'border-radius: 4px;',
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
                        emptyText: 'Senha Nova *',
                        name: 'SenhaNova',
                        fieldStyle: 'border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;',
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
                        text: 'Alterar',
                        margin: '0 10 0 0',
                        itemId: 'btnAlterar',
                        cls: 'ButtonLogin'
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

        me.txtSenhaAtual = me.down('#txtSenhaAtual');
        me.txtSenhaNova = me.down('#txtSenhaNova');
        me.txtSenhaNovaR = me.down('#txtSenhaNovaR');
        me.form = me.down('#frmDados');
        me.btnAlterar = me.down('#btnAlterar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow
        });

        me.txtSenhaAtual.on({
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

        me.btnAlterar.on({
            click: me.onBtnAlterarClick,
            scope: me
        });
    },
    onShowWindow: function () {
        var me = this;

        me.txtSenhaAtual.focus();
    },
    onKeyPress: function (dado, e, eOpts) {
        var me = this;

        if (e.keyCode === 13) {
            me.btnAlterar.fireEvent('click');
        }
    },
    onBtnAlterarClick: function () {
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
                        var model = Ext.create('ProjetoGarage.model.login.AlterarSenha');
                        me.form.updateRecord(model);
                        me.storeAlterar.add(model);

                        me.storeAlterar.sync({
                            success: function () {
                                Ext.Msg.show({
                                    title: 'Sucesso',
                                    msg: 'Senha alterada com sucesso!',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                me.getEl().unmask();
                                me.close();
                            },
                            failure: function () {
                                me.storeAlterar.rejectChanges();
                                me.getEl().unmask();
                            }
                        });
                    }
                }
            });
        }
    }
});