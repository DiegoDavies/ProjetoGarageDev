﻿Ext.define('ProjetoGarage.view.cliente.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'cliente-grid',
    requires: [
        'ProjetoGarage.view.cliente.Panel'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            nomeExcel: 'Clientes',
            store: Ext.create('ProjetoGarage.store.cliente.Store'),
            columns: [{
                text: 'Nome',
                flex: 1,
                minWidth: 250,
                style: 'text-align: center;',
                dataIndex: 'Nome'
            }, {
                text: 'Situação',
                width: 120,
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
                nomeExcel: 'Data Emissão RG'
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
                dataIndex: 'TelefoneAdc',
                nomeExcel: 'Telefone Adicional'
            }, {
                dataIndex: 'CelularAdc',
                nomeExcel: 'Celular Adicional'
            }, {
                dataIndex: 'DataNascimento',
                nomeExcel: 'Data Nascimento',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'EstadoCivilNome',
                nomeExcel: 'Estado Civil'
            }, {
                dataIndex: 'FuncaoNome',
                nomeExcel: 'Função Nome'
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
    },
    onBoxReady: function () {
        var me = this;

        me.store.load();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        window.viewport.tabPanelPrincipal.add({
            xtype: 'cliente-panel',
            title: 'Cliente: ' + record.get('Nome'),
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'Cliente' + record.get('ClienteId'),
            tratamento: 'AECLIE',
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
        window.viewport.tabPanelPrincipal.setActiveTab('Cliente' + record.get('ClienteId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        window.viewport.tabPanelPrincipal.add({
            xtype: 'cliente-panel',
            title: 'Cadastro de Cliente',
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'CadastroCliente',
            tratamento: 'CECLIE',
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
        window.viewport.tabPanelPrincipal.setActiveTab('CadastroCliente');
        return false;
    }
});