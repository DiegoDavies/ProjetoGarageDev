Ext.define('ProjetoGarage.view.funcionario.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'funcionario-grid',
    requires: [
        'ProjetoGarage.view.funcionario.Panel'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            nomeExcel: 'Funcionários',
            store: Ext.create('ProjetoGarage.store.funcionario.Store'),
            columns: [{
                text: 'Nome',
                flex: 1,
                minWidth: 250,
                style: 'text-align: center;',
                dataIndex: 'Nome'
            }, {
                text: 'Situação',
                width: 100,
                style: 'text-align: center;',
                dataIndex: 'SituacaoNome'
            }, {
                text: 'CPF',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'Cpf'
            }, {
                text: 'Email',
                width: 180,
                style: 'text-align: center;',
                dataIndex: 'Email'
            }, {
                text: 'Telefone',
                width: 130,
                style: 'text-align: center;',
                dataIndex: 'Telefone'
            }, {
                text: 'Inclusão',
                style: 'text-align: center;',
                columns: [{
                    text: 'Usuário',
                    sortable: true,
                    style: 'text-align: center;',
                    dataIndex: 'UsuarioNomeInclusao'
                }, {
                    xtype: 'datecolumn',
                    sortable: true,
                    text: 'Data Hora',
                    width: 150,
                    align: 'center',
                    style: 'text-align: center;',
                    format: 'd/m/Y H:i:s',
                    dataIndex: 'DataHoraInclusao'
                }]
            }, {
                text: 'Alteração',
                style: 'text-align: center;',
                columns: [{
                    text: 'Usuário',
                    sortable: true,
                    style: 'text-align: center;',
                    dataIndex: 'UsuarioNomeAlteracao'
                }, {
                    xtype: 'datecolumn',
                    sortable: true,
                    text: 'Data Hora',
                    width: 150,
                    align: 'center',
                    style: 'text-align: center;',
                    format: 'd/m/Y H:i:s',
                    dataIndex: 'DataHoraAlteracao'
                }]
            }],
            columnsExcel: [{
                dataIndex: 'Nome',
                nomeExcel: 'Nome'
            }, {
                dataIndex: 'SituacaoNome',
                nomeExcel: 'Situação'
            }, {
                dataIndex: 'SexoNome',
                nomeExcel: 'Sexo'
            }, {
                dataIndex: 'Cep',
                nomeExcel: 'CEP'
            }, {
                dataIndex: 'Endereco',
                nomeExcel: 'Endereço'
            }, {
                dataIndex: 'Numero',
                nomeExcel: 'Número'
            }, {
                dataIndex: 'Complemento',
                nomeExcel: 'Complemento'
            }, {
                dataIndex: 'Bairro',
                nomeExcel: 'Bairro'
            }, {
                dataIndex: 'EstadoNome',
                nomeExcel: 'Estado'
            }, {
                dataIndex: 'CidadeNome',
                nomeExcel: 'Cidade'
            }, {
                dataIndex: 'Cpf',
                nomeExcel: 'CPF'
            }, {
                dataIndex: 'Rg',
                nomeExcel: 'RG'
            }, {
                dataIndex: 'EstadoRg',
                nomeExcel: 'Estado RG'
            }, {
                dataIndex: 'DataEmissaoRg',
                nomeExcel: 'Data Emissão RG',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'Email',
                nomeExcel: 'Email'
            }, {
                dataIndex: 'Telefone',
                nomeExcel: 'Telefone'
            }, {
                dataIndex: 'Celular',
                nomeExcel: 'Celular'
            }, {
                dataIndex: 'DataNascimento',
                nomeExcel: 'Data Nascimento',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'EstadoNascNome',
                nomeExcel: 'Estado Nascimento'
            }, {
                dataIndex: 'CidadeNascNome',
                nomeExcel: 'Cidade Nascimento'
            }, {
                dataIndex: 'EstadoCivilNome',
                nomeExcel: 'Estado Civil'
            }, {
                dataIndex: 'NomeConjuge',
                nomeExcel: 'Nome Cônjuge'
            }, {
                dataIndex: 'NomePai',
                nomeExcel: 'Nome Pai'
            }, {
                dataIndex: 'NomeMae',
                nomeExcel: 'Nome Mãe'
            }, {
                dataIndex: 'NumeroPis',
                nomeExcel: 'Número Pis'
            }, {
                dataIndex: 'DataEmissaoPis',
                nomeExcel: 'Data Emissão Pis',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'Reservista',
                nomeExcel: 'Reservista'
            }, {
                dataIndex: 'Categoria',
                nomeExcel: 'Categoria'
            }, {
                dataIndex: 'TituloEleitor',
                nomeExcel: 'Titulo Eleitor'
            }, {
                dataIndex: 'ZonaEleitoral',
                nomeExcel: 'Zona Eleitoral'
            }, {
                dataIndex: 'SecaoEleitoral',
                nomeExcel: 'Secao Eleitoral'
            }, {
                dataIndex: 'DataEmissaoEleitoral',
                nomeExcel: 'Data Emissão Eleitoral',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'FormacaoNome',
                nomeExcel: 'Formação'
            }, {
                dataIndex: 'EtniaNome',
                nomeExcel: 'Etnia'
            }, {
                dataIndex: 'UsuarioNomeInclusao',
                nomeExcel: 'Usuário Inclusão'
            }, {
                dataIndex: 'DataHoraInclusao',
                nomeExcel: 'Data Hora Inclusão',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'UsuarioNomeAlteracao',
                nomeExcel: 'Usuário Alteração'
            }, {
                dataIndex: 'DataHoraAlteracao',
                nomeExcel: 'Data Hora Alteração',
                formatoExcel: 'Data'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.btnNovo = me.down('#btnNovoGrid');
        me.btnRelatorioPdf = me.down('#btnRelatorioPdf');
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
    },
    onBoxReady: function () {
        var me = this;

        me.store.load();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        window.viewport.tabPanelPrincipal.add({
            xtype: 'funcionario-panel',
            title: 'Funcionário: ' + record.get('Nome'),
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'Funcionario' + record.get('FuncionarioId'),
            tratamento: 'AEFUNC',
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
        window.viewport.tabPanelPrincipal.setActiveTab('Funcionario' + record.get('FuncionarioId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        window.viewport.tabPanelPrincipal.add({
            xtype: 'funcionario-panel',
            title: 'Cadastro de Funcionário',
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'CadastroFuncionario',
            tratamento: 'CEFUNC',
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
        window.viewport.tabPanelPrincipal.setActiveTab('CadastroFuncionario');
        return false;
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
                Value: 0
            }]
        };
        return encodeURIComponent(JSON.stringify(report));
    }
});