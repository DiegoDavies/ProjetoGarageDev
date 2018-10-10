Ext.define('ProjetoGarage.view.funcionario.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'funcionario-grid',
    requires: [
        'ProjetoGarage.view.funcionario.Panel'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.funcionario.Store'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'FuncionarioId',
                hidden: true,
                hideable: false
            }, {
                text: 'Nome',
                flex: 1,
                minWidth: 250,
                style: 'text-align: center;',
                dataIndex: 'Nome',
                excelConfig: {
                    nomeExcel: 'Nome'
                }
            }, {
                text: 'Situação',
                width: 100,
                style: 'text-align: center;',
                dataIndex: 'SituacaoNome',
                excelConfig: {
                    nomeExcel: 'Situação'
                }
            }, {
                text: 'CPF',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'Cpf',
                excelConfig: {
                    nomeExcel: 'CPF'
                }
            }, {
                text: 'Email',
                width: 180,
                style: 'text-align: center;',
                dataIndex: 'Email',
                excelConfig: {
                    nomeExcel: 'Email'
                }
            }, {
                text: 'Telefone',
                width: 130,
                style: 'text-align: center;',
                dataIndex: 'Telefone',
                excelConfig: {
                    nomeExcel: 'Telefone'
                }
            }, {
                text: 'Inclusão',
                style: 'text-align: center;',
                columns: [{
                    text: 'Usuário',
                    sortable: true,
                    style: 'text-align: center;',
                    dataIndex: 'UsuarioNomeInclusao',
                    excelConfig: {
                        nomeExcel: 'Usuário Inclusão'
                    }
                }, {
                    xtype: 'datecolumn',
                    sortable: true,
                    text: 'Data Hora',
                    width: 150,
                    align: 'center',
                    style: 'text-align: center;',
                    format: 'd/m/Y H:i:s',
                    dataIndex: 'DataHoraInclusao',
                    excelConfig: {
                        nomeExcel: 'Data Hora Inclusão',
                        formatoExcel: 'Data'
                    }
                }]
            }, {
                text: 'Alteração',
                style: 'text-align: center;',
                columns: [{
                    text: 'Usuário',
                    sortable: true,
                    style: 'text-align: center;',
                    dataIndex: 'UsuarioNomeAlteracao',
                    excelConfig: {
                        nomeExcel: 'Usuário Alteração'
                    }
                }, {
                    xtype: 'datecolumn',
                    sortable: true,
                    text: 'Data Hora',
                    width: 150,
                    align: 'center',
                    style: 'text-align: center;',
                    format: 'd/m/Y H:i:s',
                    dataIndex: 'DataHoraAlteracao',
                    excelConfig: {
                        nomeExcel: 'Data Hora Alteração',
                        formatoExcel: 'Data'
                    }
                }]
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.toolbar = me.down('#pagingToolbarGrid');
        me.btnNovo = me.down('#btnNovoGrid');
        me.btnDelete = me.down('#btnDeleteGrid');
        me.btnRelatorioPdf = me.down('#btnRelatorioPdf');
        me.btnRelatorioXls = me.down('#btnRelatorioXls');
        me.txtQuery = me.down('#queryField');
        me.btnPesquisar = me.down('#btnPesquisarGrid');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            itemdblclick: me.onItemDblClick,
            boxready: me.onBoxReady
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });

        me.btnRelatorioPdf.on({
            scope: me,
            click: me.onBtnRelatorioPdfClick
        });

        me.btnRelatorioXls.on({
            scope: me,
            click: me.onBtnRelatorioXlsClick
        });
    },
    onBoxReady: function () {
        var me = this;

        me.store.load();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        me.tela.tabPrincipal.add({
            xtype: 'funcionario-panel',
            title: 'Funcionário: ' + record.get('Nome'),
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'Funcionario' + record.get('FuncionarioId'),
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record
            },
            listeners: {
                scope: me,
                beforeclose: function () {
                    this.getStore().load();
                }
            }
        });
        me.tela.tabPrincipal.setActiveTab('Funcionario' + record.get('FuncionarioId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        me.tela.tabPrincipal.add({
            xtype: 'funcionario-panel',
            title: 'Cadastro de Funcionário',
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'CadastroFuncionario',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            },
            listeners: {
                scope: me,
                beforeclose: function () {
                    this.getStore().load();
                }
            }
        });
        me.tela.tabPrincipal.setActiveTab('CadastroFuncionario');
        return false;
    },
    onBtnRelatorioXlsClick: function () {
        var me = this;

        Ext.Msg.alert({
            title: 'Confirmação de Geração de Relatório',
            msg: 'Deseja realmente prosseguir com a operação?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (button) {
                if (button === 'yes') {
                    me.baixarXls();
                }
            }
        });
    },
    onBtnRelatorioPdfClick: function () {
        var me = this;

        Ext.Msg.alert({
            title: 'Confirmação de Geração de Relatório',
            msg: 'Deseja realmente prosseguir com a operação?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (button) {
                if (button === 'yes') {
                    me.baixarReport();
                }
            }
        });
    },
    baixarXls: function () {
        var me = this,
            storeConfig = Ext.create('ProjetoGarage.store.excelConfig.Store'),
            colunas = [];

        Ext.each(me.columns, function (column) {
            if (column.excelConfig) {
                var model = Ext.create('ProjetoGarage.model.excelConfig.Model', {
                    DataIndex: column.excelConfig.exportDataIndex ? column.excelConfig.exportDataIndex : column.dataIndex,
                    Nome: column.text,
                    ExcelFormat: column.excelConfig.formatoExcel ? column.excelConfig.formatoExcel : "Geral",
                    ExcelFormatString: column.excelConfig.formatoExcelString ? column.excelConfig.formatoExcelString : "",
                    ExcelNome: column.excelConfig.nomeExcel ? column.excelConfig.nomeExcel : column.text
                });
                storeConfig.add(model);
            }
        });

        Ext.each(storeConfig.data.items, function (item) {
            colunas.push({
                dataIndex: item.get('DataIndex'),
                nome: item.get('Nome'),
                header: item.get('ExcelNome'),
                format: item.get('ExcelFormat'),
                formatString: item.get('ExcelFormatString')
            });
        });

        var excelConfig = {
            NomeArquivo: 'Funcionário',
            Colunas: colunas,
            Guid: Math.random().toString(36).substr(2)
        }
        me.excelExportRequirement(excelConfig);
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
    },
    baixarReport: function () {
        var me = this,
            url = '/ReportPDF/?m=' + me.rptBuildReportOSParams();

        document.location.href = url;
    },
    rptBuildReportOSParams: function () {
        var me = this,
            text = 'Funcionário';

        var report = {
            Name: 'RelatorioFuncionario.rpt',
            ExportName: text,
            Params: [{
                Param: '@FuncionarioId',
                Value: 1
            }]
        };
        return encodeURIComponent(JSON.stringify(report));
    }
});