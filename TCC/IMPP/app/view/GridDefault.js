Ext.define('ProjetoGarage.view.GridDefault', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridDefault',
    viewConfig: {
        multiSelect: true,
        stripeRows: true,
    },
    autoScroll: true,
    scroll: true,
    width: '100%',
    height: '100%',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    },
    esconderAtualizar: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            bbar: [{
                xtype: 'pagingtoolbar',
                itemId: 'pagingToolbarGrid',
                dock: 'bottom',
                displayInfo: true,
                store: this.store,
                emptyMsg: 'Nenhum registro'
            }, {
                xtype: 'button',
                text: 'Atualizar',
                itemId: 'btnAtualizarGrid',
                hidden: me.esconderAtualizar,
                icon: '/resources/images/refresh.png',
                listeners: {
                    click: function () {
                        var grid = this.up().up();
                        grid.store.load();
                    }
                }
            }, '->', {
                xtype: 'button',
                text: 'Novo',
                itemId: 'btnNovoGrid',
                icon: '/resources/images/add.png'
            }, {
                xtype: 'button',
                text: 'Excluir',
                itemId: 'btnDeleteGrid',
                icon: '/resources/images/delete.png',
                listeners: {
                    click: function () {
                        var grid = this.up().up(),
                            selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                            Ext.Msg.show({
                                title: 'Validação',
                                msg: 'Deseja realmente prosseguir com a operação?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        grid.store.remove(selection);
                                        grid.store.sync({
                                            success: function () {
                                                grid.store.load();
                                            },
                                            failure: function () {
                                                Ext.Msg.show({
                                                    title: 'Problema',
                                                    msg: 'Ocorreu um erro ao realizar a operação!',
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.ERROR
                                                });
                                                grid.store.rejectChanges();
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            Ext.Msg.show({
                                title: 'Atenção',
                                msg: 'Selecione um item para prosseguir com a operação',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                        }
                    }
                }
            }, {
                xtype: 'button',
                text: 'Gerar Relatório',
                itemId: 'btnRelatorioGrid',
                icon: '/resources/images/report.png'
            }, {
                xtype: 'textfield',
                itemId: 'queryField',
                flex: 1,
                emptyText: 'Entre com a busca aqui',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        var btnPesquisar = this.up().up().down('#btnPesquisarGrid');
                        if (e.keyCode == 13) {
                            btnPesquisar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'button',
                text: 'Pesquisar',
                itemId: 'btnPesquisarGrid',
                icon: '/resources/images/search.png',
                listeners: {
                    click: function () {
                        var grid = this.up().up(),
                            store = grid.store,
                            textfield = grid.down('#queryField');
                        store.bsSearchText = textfield.getValue();
                        store.currentPage = 1;
                        store.load();
                    }
                }
            }]
        });

        me.callParent(arguments);
    }
});