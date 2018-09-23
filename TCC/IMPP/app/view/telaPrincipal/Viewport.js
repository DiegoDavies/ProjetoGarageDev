/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('ProjetoGarage.view.telaPrincipal.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'ProjetoGarage.view.telaPrincipal.Menu',
    ],
    layout: 'border',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                region: 'north',
                border: false,
                height: 34,
                margins: '0 0 5 0',
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    style: 'background-color: #dc6900',
                    items: ['->', {
                        xtype: 'button',
                        icon: '/resources/images/suport.png',
                        itemId: 'btnSuporte',
                        text: '<div style="color:white">Suporte</div>',
                        style: 'background:transparent;',
                        listeners: {
                            scope: this,
                            click: function () {
                                Ext.create('ProjetoGarage.view.telaPrincipal.WindowAjuda', {
                                    renderTo: Ext.getBody()
                                }).show();
                            }
                        }
                    }, {
                        xtype: 'button',
                        icon: '/resources/images/user.png',
                        itemId: 'btnUser',
                        text: '<div style="color:white">' + this.textUser + '</div>',
                        style: 'background:transparent;',
                        menu: {
                            xtype: 'menu',
                            plain: true,
                            items: {
                                xtype: 'buttongroup',
                                columns: 2,
                                items: [{
                                    xtype: 'button',
                                    text: 'Alterar Senha',
                                    itemId: 'btnAlterarSenha',
                                    icon: '/resources/images/edit_user.png',
                                    margin: '8 8 8 8',
                                    listeners: {
                                        scope: this,
                                        click: function () {
                                            Ext.create('ProjetoGarage.view.login.WindowAlterar', {
                                                renderTo: Ext.getBody()
                                            }).show();
                                        }
                                    }
                                }, {
                                    xtype: 'button',
                                    text: 'Sair',
                                    itemId: 'btnLogout',
                                    icon: '/resources/images/logout.png',
                                    margin: '8 8 8 0',
                                    listeners: {
                                        scope: this,
                                        click: function () {
                                            Ext.Ajax.request({
                                                url: '/VerificaSessao',
                                                params: {
                                                    logout: true
                                                },
                                                success: function (response) {
                                                    window.location.reload();
                                                },
                                                failure: function (retorno, request) {
                                                    window.location.reload();
                                                }
                                            });
                                            //debugger;
                                            //this.destroy();
                                        }
                                    }
                                }]
                            }
                        }
                    }]
                }]
            }, {
                region: 'west',
                collapsible: true,
                frame: true,
                split: true,
                title: 'Menu',
                width: 220,
                height: '100%',
                autoScroll: true,
                border: false,
                items: [{
                    xtype: 'telaPrincipal-menu',
                    style: 'position: relative;',
                    flex: 1,
                    viewport: this
                }],
                margin: '0 10 0 0'
            }, {
                region: 'center',
                xtype: 'tabpanel',
                activeTab: 0,
                itemId: 'tbpPrincipal',
                style: {
                    background: 'white'
                },
                items: [{
                    title: 'Dashboard',
                    closable: false
                }]
            }]
        });

        me.callParent(arguments);
    }
});