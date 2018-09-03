Ext.define('ProjetoGarage.view.login.WindowLogin', {
    extend: 'Ext.window.Window',
    xtype: 'loginWindow',
    title: 'Por favor entre com seus dados',
    width: 300,
    cls: 'ContainerLogin',
    layout: 'fit',
    modal: true,
    closable: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'form',
                    bodyPadding: 10,
                    flex: 1,
                    style: 'border-radius: 4px;',
                    items: [{
                        xtype: 'textfield',
                        itemId: 'txtLoginN',
                        width: '100%',
                        labelAlign: 'top',
                        margin: '0 0 10 0',
                        cls: 'TxtLogin',
                        emptyText: 'Login',
                        fieldStyle: 'border-radius: 4px;',
                        enableKeyEvents: true
                    }, {
                        xtype: 'textfield',
                        itemId: 'txtSenhaN',
                        width: '100%',
                        labelAlign: 'top',
                        margin: '0 0 0 0',
                        inputType: 'password',
                        cls: 'TxtLogin',
                        emptyText: 'Senha',
                        fieldStyle: 'border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;',
                        enableKeyEvents: true
                    }],
                    bbar: ['->', {
                        xtype: 'button',
                        text: 'Entrar',
                        margin: '0 10 0 0',
                        itemId: 'btnLogarN',
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

        me.txtLogin = me.down('#txtLoginN');
        me.txtSenha = me.down('#txtSenhaN');
        me.btnLogar = me.down('#btnLogarN');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow
        });

        me.txtLogin.on({
            scope: me,
            keypress: me.onKeyPress
        });

        me.txtSenha.on({
            scope: me,
            keypress: me.onKeyPress
        })

        me.btnLogar.on({
            click: me.onBtnLogarClick,
            scope: me
        });
    },
    onShowWindow: function () {
        var me = this;

        if (me.extraData.usuario !== '') {
            me.txtLogin.setValue(me.extraData.usuario);
            me.txtLogin.focus();
        } else {
            me.txtSenha.focus();
        }
    },
    onKeyPress: function (dado, e, eOpts) {
        var me = this;

        if (e.keyCode === 13) {
            me.btnLogar.fireEvent('click');
        }
    },
    onBtnLogarClick: function () {
        var me = this;

        Ext.Ajax.request({
            url: '/Login',
            params: {
                login: me.txtLogin.getValue(),
                senha: me.txtSenha.getValue()
            },
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result.Resultado) {
                    Ext.Ajax.request({
                        url: '/GravaLog',
                        params: {
                            urlUtilizada: 'Login',
                            procedure: '/Login',
                            method: "",
                            usuarioId: result.UsuarioId,
                            usuario: result.Nome,
                            erro: ""
                        }
                    });
                    me.extraData.menu.ok = true;
                    me.close();
                } else {
                    Ext.Msg.show({
                        title: 'Problema',
                        msg: 'Usuário e/ou Senha não encontrados. Tente novamente!',
                        buttons: Ext.Msg.OK,
                        icons: Ext.Msg.WARNING,
                        fn: function () {
                            Ext.Ajax.request({
                                url: '/GravaLog',
                                params: {
                                    urlUtilizada: 'Login',
                                    procedure: '/Login',
                                    method: "",
                                    usuarioId: -1,
                                    usuario: me.txtLogin.getValue(),
                                    erro: "Usuário e/ou Senha não encontrados. Tente novamente!"
                                }
                            });
                        }
                    });
                }
            },
            failure: function (retorno, request) {
                Ext.Msg.show({
                    title: 'Problema',
                    msg: 'Ocorreu um problema. Por favor contate o suporte!',
                    buttons: Ext.Msg.OK,
                    icons: Ext.Msg.WARNING,
                    fn: function () {
                        Ext.Ajax.request({
                            url: '/GravaLog',
                            params: {
                                urlUtilizada: 'Login',
                                procedure: '/Login',
                                method: "",
                                usuarioId: -1,
                                usuario: me.txtLogin.getValue(),
                                erro: "Ocorreu um problema. Por favor contate o suporte!"
                            }
                        });
                    }
                });
            }
        });
    }
});