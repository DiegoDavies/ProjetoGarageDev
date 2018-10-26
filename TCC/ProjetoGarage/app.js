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

        String.prototype.hashCode = function () {
            var hash = 0, i, chr;
            if (this.length === 0) return hash;
            for (i = 0; i < this.length; i++) {
                chr = this.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash;
        };

        Ext.Ajax.on({
            beforerequest: function (conn, options, eOpts) {
                if (options.url !== '/GravaLog' &&
                    options.url !== '/Login' &&
                    options.url !== '/VerificaSessao') {

                }
            },
            requestcomplete: function (conn, response, options, eOpts) {
                if (options.url !== '/GravaLog' &&
                    options.url !== '/Login' &&
                    options.url !== '/Email' &&
                    options.url !== '/GenerateXls' &&
                    options.url !== '/ReportPDF') {
                    var procedure = options.proxy ? options.proxy.procedure : "",
                        method = options.proxy ? options.proxy.methodUtil : "",
                        url = options.url.replace('/', '');
                    if (procedure || url) {
                        Ext.Ajax.request({
                            url: '/GravaLog',
                            params: {
                                urlUtilizada: url,
                                procedure: procedure,
                                method: method,
                                erro: ""
                            }
                        });
                    }
                } else if (options.url !== '/GravaLog' &&
                    options.url !== '/Login') {
                    Ext.Ajax.request({
                        url: '/GravaLog',
                        params: {
                            urlUtilizada: options.url.replace('/', ''),
                            procedure: options.url,
                            method: "",
                            erro: ""
                        }
                    });
                }
            },
            requestexception: function (conn, response, options, eOpts) {
                if (options.url !== '/GravaLog' &&
                    options.url !== '/Login' &&
                    options.url !== '/Email' &&
                    options.url !== '/GenerateXls' &&
                    options.url !== '/ReportPDF') {
                    var procedure = options.proxy ? options.proxy.procedure : "",
                        method = options.proxy ? options.proxy.methodUtil : "",
                        url = options.url.replace('/', '');
                    if (procedure || url) {
                        Ext.Ajax.request({
                            url: '/GravaLog',
                            params: {
                                urlUtilizada: url,
                                procedure: procedure,
                                method: method,
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
                } else if (options.url !== '/GravaLog' &&
                    options.url !== '/Login') {
                    Ext.Ajax.request({
                        url: '/GravaLog',
                        params: {
                            urlUtilizada: options.url.replace('/', ''),
                            procedure: options.url,
                            method: "",
                            erro: "ERRO"
                        }
                    });
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
