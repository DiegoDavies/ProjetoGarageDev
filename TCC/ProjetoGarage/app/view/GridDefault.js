Ext.define('ProjetoGarage.view.GridDefault', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridDefault',
    viewConfig: {
        multiSelect: true,
        stripeRows: true
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
                icon: '/resources/images/report.png',
                menu: {
                    xtype: 'menu',
                    plain: true,
                    items: {
                        xtype: 'buttongroup',
                        columns: 1,
                        items: [{
                            xtype: 'button',
                            text: 'Relatório em PDF',
                            itemId: 'btnRelatorioPdf',
                            icon: '/resources/images/pdfFile.png'
                        }, {
                            xtype: 'button',
                            text: 'Relatório em Excel',
                            itemId: 'btnRelatorioXls',
                            icon: '/resources/images/xlsFile.png',
                            listeners: {
                                scope: me,
                                click: function (btn) {
                                    var me = this,
                                        grid = arguments[0].up('grid');

                                    Ext.Msg.alert({
                                        title: 'Confirmação de Geração de Relatório',
                                        msg: 'Deseja realmente prosseguir com a operação?',
                                        buttons: Ext.Msg.YESNO,
                                        icon: Ext.Msg.QUESTION,
                                        fn: function (button) {
                                            if (button === 'yes') {
                                                me.baixarXls(grid);
                                            }
                                        }
                                    });
                                }
                            }
                        }]
                    }
                }
            }, {
                xtype: 'textfield',
                itemId: 'queryField',
                flex: 1,
                emptyText: 'Entre com a busca aqui',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        var btnPesquisar = this.up().up().down('#btnPesquisarGrid');
                        if (e.keyCode === 13) {
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
    },
    baixarXls: function (grid) {
        var me = this,
            colunas = [];

        if (grid.nomeExcel) {
            Ext.each(grid.columnsExcel,
                function (column) {
                    colunas.push({
                        dataIndex: column.dataIndex,
                        nome: column.nomeExcel,
                        format: column.formatoExcel ? column.formatoExcel : "Geral",
                        formatString: column.formatoExcelString ? column.formatoExcelString : "",
                        header: column.nomeExcel
                    });
                });

            var excelConfig = {
                NomeArquivo: grid.nomeExcel,
                Colunas: colunas,
                Guid: Math.random().toString(36).substr(2)
            }
            me.excelExportRequirement(excelConfig);
        }
    },
    excelExportRequirement: function (excelConfig) {
        var me = this,
            mascara = new Ext.LoadMask(me, { msg: "Gerando Planilha..." });

        mascara.show();

        Ext.Ajax.request({
            url: '/GenerateXls',
            method: 'POST',
            params: {
                procedure: me.store.procedures.select,
                params: JSON.stringify(me.store.params),
                remoteFilters: JSON.stringify(me.store.remoteFilters),
                appliedFilters: JSON.stringify(me.store.appliedFilters),
                security: me.store.security,
                excelConfig: JSON.stringify(excelConfig)
            },
            success: function (response, eOpts) {
                var tokenObj = Ext.decode(response.responseText);
                window.open('/GenerateXls?GetToken=' + tokenObj.NomeArquivo + '&Guid=' + tokenObj.Guid);
                mascara.hide();
                mascara.destroy();
            },
            failure: function (response, eOpts) {
                Ext.Msg.show({
                    title: 'Erro',
                    msg: 'Ocorreu um erro ao gerar o Arquivo!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                mascara.hide();
                mascara.destroy();
            }
        });
    }
});