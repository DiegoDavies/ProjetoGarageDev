Ext.define('ProjetoGarage.view.login.Login', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.telaPrincipal.Viewport'
    ],
    xtype: 'loginContainer',
    title: 'Por favor entre com seus dados',
    width: screen.availWidth,
    height: screen.availHeight,
    cls: 'ContainerLogin',
    layout: 'column',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            style: {
                backgroundImage: 'url(/resources/images/fundologin.jpg)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                position: 'fixed'
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
                    margin: '80 5 20',
                    width: 400,
                    style: 'border-radius: 4px;left: 15%;',
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
        });

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
                senha: me.txtSenha.getValue().hashCode()
            },
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result.Resultado) {
                    if (result.PrimeiroAcesso) {
                        Ext.create('Ext.window.Window', {
                            height: 400,
                            width: 515,
                            layout: 'fit',
                            acepted: false,
                            html: '<embed src="/resources/Termo de Uso.pdf" width="500" height="375" type="application/pdf">',
                            bbar: ['->', {
                                xtype: 'button',
                                text: 'Aceitar',
                                icon: '/resources/images/check16.png',
                                handler: function () {
                                    var win = this.up().up();
                                    win.acepted = true;
                                    win.close();
                                }
                            }],
                            listeners: {
                                close: function () {
                                    if (this.acepted) {
                                        me.onSuccess(result);
                                    } else {
                                        me.onError('Termo de uso do sistema n\u00E3o foi aceito');
                                    }
                                }
                            }
                        }).show();
                    } else {
                        me.onSuccess(result);
                    }
                } else {
                    me.onError('Usu\u00E1rio e/ou Senha n\u00E3o encontrados. Tente novamente!');
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
                                erro: "Ocorreu um problema. Por favor contate o suporte!"
                            }
                        });
                    }
                });
            }
        });
    },
    onSuccess: function (result) {
        var me = this;
        me.destroy();
        Ext.Ajax.request({
            url: '/Login',
            params: {
                login: ''
            }
        });
        Ext.Ajax.request({
            url: '/GravaLog',
            params: {
                urlUtilizada: 'Login',
                procedure: '/Login',
                method: "GRAVAR PRIMEIRO ACESSO",
                erro: ""
            }
        });
        Ext.create('ProjetoGarage.view.telaPrincipal.Viewport', {
            textUser: result.Nome
        });
    },
    onError: function(mensagem) {
        Ext.Msg.show({
            title: 'Problema',
            msg: mensagem,
            buttons: Ext.Msg.OK,
            icons: Ext.Msg.WARNING,
            fn: function () {
                Ext.Ajax.request({
                    url: '/GravaLog',
                    params: {
                        urlUtilizada: 'Login',
                        procedure: '/Login',
                        method: "",
                        erro: mensagem
                    }
                });
            }
        });
    }
});