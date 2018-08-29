//

/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.application({
    name: 'ProjetoGarage',
    extend: 'ProjetoGarage.Application',

    autoCreateViewport: false,

    launch: function () {
        Ext.setGlyphFontFamily('FontAwesome');

        Ext.Ajax.on({
            requestcomplete: function (conn, response, options, eOpts) {
                //adicionar funcionalidade para verificar a sessão
                if (options.url !== '/GravaLog' && options.url !== '/Login') {
                    var init = options.url.indexOf('procedure=') + 10,
                        finish = options.url.indexOf('&params'),
                        procedure = options.url.substring(init, finish),
                        url = options.url.replace('/', '');
                    if (procedure || url) {
                        Ext.Ajax.request({
                            url: '/GravaLog',
                            params: {
                                urlUtilizada: url,
                                procedure: procedure,
                                method: options.method,
                                usuarioId: 1,
                                usuario: "Diego",
                                erro: ""
                            }
                        });
                    }
                }
            },
            requestexception: function (conn, response, options, eOpts) {
                if (options.url !== '/GravaLog') {
                    var init = options.url.indexOf('procedure=') + 10,
                        finish = options.url.indexOf('&params'),
                        finish1 = options.url.indexOf('&operation'),
                        procedure = options.url.substring(init, (finish1 < finish && finish1 > 0 ? finish1 : finish)),
                        url = options.url.replace('/', '');
                    if (procedure || url) {
                        Ext.Ajax.request({
                            url: '/GravaLog',
                            params: {
                                urlUtilizada: url,
                                procedure: procedure,
                                method: options.method,
                                usuarioId: 1,
                                usuario: "Diego",
                                erro: response.responseText
                            }
                        });
                    }
                    if (response.responseText) {
                        var text = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: 'Erro',
                            msg: text.message,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                }
            }
        });

        Ext.Ajax.request({
            url: '/VerificaSessao',
            params: {
                logout: false
            },
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result.Logado.toUpperCase() === "TRUE") {
                    Ext.create('ProjetoGarage.view.telaPrincipal.Viewport', {
                        textUser: result.Session
                    });
                }
                else {
                    Ext.create('ProjetoGarage.view.login.Login', {
                        renderTo: Ext.getBody()
                    });
                }
            },
            failure: function (retorno, request) {
                Ext.create('ProjetoGarage.view.login.Login', {
                    renderTo: Ext.getBody()
                });
            }
        });

    }
});
