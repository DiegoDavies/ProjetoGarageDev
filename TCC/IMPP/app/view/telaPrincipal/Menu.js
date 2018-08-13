var store = Ext.create('Ext.data.TreeStore', {
    root: {
        id: 'root',
        text: 'Root',
        expanded: true,
        children: [{
            text: 'Funcionários',
            expanded: true,
            cls: 'x-tree-noicon',
            children: [{
                text: '<i class="fa fa-address-card" style="font-size: 16px;"></i> Cadastro',
                titleM: 'Cadastro de Funcionários',
                name: 'Funcionarios',
                className: 'ProjetoGarage.view.funcionario.Tela',
                xtype: 'funcionario-tela',
                cls: 'x-tree-noicon x-tree-nodetext',
                leaf: true
            }, {
                text: 'Situação',
                titleM: 'Situação',
                name: 'Situacao',
                className: 'ProjetoGarage.view.situacao.Tela',
                xtype: 'situacao-tela',
                leaf: true
            }, {
                text: 'Função',
                titleM: 'Função',
                name: 'Funcao',
                className: 'ProjetoGarage.view.funcao.Tela',
                xtype: 'funcao-tela',
                leaf: true
            }, {
                text: 'Estado Civil',
                titleM: 'Estado Civil',
                name: 'EstadoCivil',
                className: 'ProjetoGarage.view.estadoCivil.Tela',
                xtype: 'estadoCivil-tela',
                leaf: true
            }, {
                text: 'Formação',
                titleM: 'Formação',
                name: 'Formacao',
                className: 'ProjetoGarage.view.formacao.Tela',
                xtype: 'formacao-tela',
                leaf: true
            }, {
                text: 'Etnia',
                titleM: 'Etnia',
                name: 'Etnia',
                className: 'ProjetoGarage.view.etnia.Tela',
                xtype: 'etnia-tela',
                leaf: true
            }, {
                text: 'Parentesco',
                titleM: 'Parentesco',
                name: 'Parentesco',
                className: 'ProjetoGarage.view.parentesco.Tela',
                xtype: 'parentesco-tela',
                leaf: true
            }]
        }, {
            text: 'Fornecedores',
            expanded: true,
            children: [{
                text: 'Cadastro',
                titleM: 'Cadastro de Fornecedores',
                name: 'Fornecedores',
                className: 'ProjetoGarage.view.fornecedor.Tela',
                xtype: 'fornecedor-tela',
                leaf: true
            }]
        }, {
            text: 'Clientes',
            expanded: true,
            children: [{
                text: 'Cadastro',
                titleM: 'Cadastro de Clientes',
                name: 'Clientes',
                className: 'ProjetoGarage.view.cliente.Tela',
                xtype: 'cliente-tela',
                leaf: true
            }]
        }, {
            text: 'Produtos',
            expanded: true,
            children: [{
                text: 'Cadastro',
                titleM: 'Cadastro de Produtos',
                name: 'Produtos',
                className: 'ProjetoGarage.view.produto.Tela',
                xtype: 'produto-tela',
                leaf: true
            }]
        }, {
            text: 'Veículos',
            expanded: true,
            children: [{
                text: 'Cadastro',
                titleM: 'Cadastro de Veículos',
                name: 'Veiculos',
                className: 'ProjetoGarage.view.veiculo.Tela',
                xtype: 'veiculo-tela',
                leaf: true
            }]
        }, {
            text: 'Serviços',
            expanded: true,
            children: [{
                text: 'Orçamento',
                titleM: 'Orçamento',
                name: 'Orcamento',
                className: 'ProjetoGarage.view.orcamento.Tela',
                xtype: 'orcamento-tela',
                leaf: true
            }, {
                text: 'Serviços',
                titleM: 'Serviços',
                name: 'Servicos',
                className: 'ProjetoGarage.view.servico.Tela',
                xtype: 'servico-tela',
                leaf: true
            }]
        }, {
            text: 'Contas',
            expanded: true,
            children: [{
                text: 'A Pagar',
                titleM: 'Contas a Pagar',
                name: 'ContasPagar',
                className: 'ProjetoGarage.view.contaPagar.Tela',
                xtype: 'contaPagar-tela',
                leaf: true
            }, {
                text: 'A Receber',
                titleM: 'Contas a Receber',
                name: 'ContasReceber',
                className: 'ProjetoGarage.view.contaReceber.Tela',
                xtype: 'contaReceber-tela',
                leaf: true
            }]
        }]
    }
});

Ext.define('ProjetoGarage.view.telaPrincipal.Menu', {
    extend: 'Ext.tree.Panel',
    xtype: 'telaPrincipal-menu',
    store: store,
    lines: false,
    useArrows: true,
    colspan: 2,
    rootVisible: false,
    initComponent: function () {
        var me = this;

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            itemclick: me.onItemClick
        });
    },
    onItemClick: function (tree, record, item, index, e, eOpts) {
        var me = this,
            texto = record.raw.titleM,
            tab = me.up().up().down('[region=center]');

        if (record.get('leaf')) {
            if (!tab.down('#' + record.raw.name)) {
                tab.add({
                    xtype: record.raw.xtype,
                    title: texto,
                    closable: true,
                    tabPrincipal: tab,
                    itemId: record.raw.name
                });
            }
            tab.setActiveTab(record.raw.name);
        }
    }
});