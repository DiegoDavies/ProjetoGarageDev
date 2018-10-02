Ext.define('ProjetoGarage.view.login.Login', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.telaPrincipal.Viewport'
    ],
    xtype: 'loginContainer',
    title: 'Por favor entre com seus dados',
    width: screen.availWidth * 0.98,
    height: screen.availHeight * 0.87,
    cls: 'ContainerLogin',
    layout: 'column',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            style: {
                backgroundImage: 'url(/resources/images/fundologin.jpg)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                position: 'absolute'
            },
            overflowY: 'hidden',
            overflowX: 'hidden',
            autoScroll: false,
            scroll: false,
            items: [{
                xtype: 'container',
                columnWidth: 0.35,
                html: '&nbsp;',
                itemId: 'ctn1'
            }, {
                xtype: 'container',
                columnWidth: 0.30,
                height: '100%',
                items: [{
                    xtype: 'form',
                    margin: '80 5 20 5',
                    flex: 1,
                    style: 'border-radius: 4px;',
                    items: [{
                        xtype: 'container',
                        layout: 'column',
                        items: [{
                            xtype: 'container',
                            columnWidth: 0.35,
                            html: '&nbsp;'
                        }, {
                            xtype: 'image',
                            src: '/resources/images/UserLogin.png',
                            columnWidth: 0.3,
                            margin: '10 0 0 0',
                            height: 100,
                            width: 100
                        }, {
                            xtype: 'container',
                            columnWidth: 0.35,
                            html: '&nbsp;'
                        }]
                    }, {
                        xtype: 'textfield',
                        itemId: 'txtLogin',
                        width: '95%',
                        labelAlign: 'top',
                        margin: '10 5 10 10',
                        height: 50,
                        cls: 'TxtLogin',
                        emptyText: 'Login',
                        fieldStyle: 'border-radius: 4px;',
                        enableKeyEvents: true
                    }, {
                        xtype: 'textfield',
                        itemId: 'txtSenha',
                        width: '95%',
                        labelAlign: 'top',
                        margin: '10 5 10 10',
                        inputType: 'password',
                        height: 50,
                        cls: 'TxtLogin',
                        emptyText: 'Senha',
                        fieldStyle: 'border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;',
                        enableKeyEvents: true
                    }, {
                        xtype: 'label',
                        itemId: 'txtEsqueci',
                        html: '<p align="right" style="margin-right:10px;"><a>Esqueci minha senha</a></p>',
                        height: 40,
                        align: 'right',
                        margin: '0 20 0 15',
                        width: '80%',
                        style: 'color: blue;text-decoration: underline;cursor: pointer;',
                        listeners: {
                            render: function (c) {
                                c.getEl().on('click', function () {
                                    Ext.create('ProjetoGarage.view.login.WindowSolicitar', {
                                        renderTo: Ext.getBody()
                                    }).show();
                                }, c);
                            }
                        }
                    }, {
                        xtype: 'button',
                        text: 'Entrar',
                        height: 60,
                        margin: '10 0 0 0',
                        width: '100%',
                        itemId: 'btnLogar',
                        cls: 'ButtonLogin'
                    }]
                }]
            }, {
                xtype: 'container',
                columnWidth: 0.35,
                html: '&nbsp;',
                itemId: 'ctn2'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.txtLogin = me.down('#txtLogin');
        me.txtSenha = me.down('#txtSenha');
        me.btnLogar = me.down('#btnLogar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady
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
    onBoxReady: function () {
        var me = this;

        me.txtLogin.focus();
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
                    me.destroy();
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
                    Ext.create('ProjetoGarage.view.telaPrincipal.Viewport', {
                        textUser: result.Nome
                    });
                } else {
                    Ext.Msg.show({
                        title: 'Problema',
                        msg: 'Usu\u00E1rio e/ou Senha n\u00E3o encontrados. Tente novamente!',
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