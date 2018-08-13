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
    items: [{
        region: 'north',
        //html: '<h1 class="x-panel-header">Garage Centro Automotivo</h1>',
        border: false,
        height: 34,
        margins: '0 0 5 0',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            style: 'background-color: #dc6900',
            items: ['->', {
                xtype: 'button',
                text: '<div style="color:white">Sair</div>',
                itemId: 'btnLogout',
                icon: '/resources/images/logout.png',
                style: 'background:transparent;border: 0 none;',
                margin: '0 8 8 0',
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
        }]
    }, {
        region: 'west',
        collapsible: true,
        frame: true,
        split: true,
        title: 'Menu',
        width: 220,
        border: false,
        items: [{
            xtype: 'telaPrincipal-menu',
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