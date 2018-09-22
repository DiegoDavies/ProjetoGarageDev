Ext.define('ProjetoGarage.ux.WindowHelp', {
    extend: 'Ext.window.Window',
    xtype: 'ux.windowhelp',
    width: 650,
    height: screen.availHeight * 0.7,
    layout: 'fit',
    modal: true,
    bodyStyle: "background: lightgray;",
    closable: true,
    draggable: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            bodyPadding: 10,
            titleHtml: '',
            textHtml: '',
            textPlurHtml: '',
            exibir: true,
            exibeNew: true,
            exibeDelete: true,
            exibeAlter: true,
            exibePesquisa: true,
            exibeRel: true,
            items: [{
                xtype: 'container',
                itemId: 'cntMensagem',
                width: '100%',
                height: '100%',
                fieldStyle: 'border-radius: 4px;',
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.cntMensagem = me.down('#cntMensagem');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow
        });
    },
    onShowWindow: function () {
        var me = this,
            card = me.extraData.button.card;

        if (card.xtype.endsWith("tela")) {
            me.defineTexts(card);
            if (me.exibir) {
                var updt = "<div style='text-align:center;'>";
                updt = updt + "<strong>" + me.titleHtml + "</strong>";
                updt = updt + "</div>";
                updt = updt + "<div style='text-align:justify;text-justify:inter-word;'>";
                updt = updt + "<br>";
                updt = updt + "<span>Tela responsável pela listagem de todos(as) os(as) " + me.textPlurHtml + " cadastrados(as) no sistema.</span>";
                updt = updt + "<br>";
                updt = updt + (me.exibeNew ? "<li>Para realizar a <b>Inclusão</b> de um novo(a) " + me.textHtml + ", o usuário deverá clicar no <b>Botão Novo</b> que se encontra na parte inferior da tela.</li>" : "");
                updt = updt + "<br>";
                updt = updt + (me.exibeAlter ? "<li>Para realizar a <b>Alteração</b> de um(a) " + me.textHtml + " já cadastrado no sistema, basta clicar <b>duas vezes no registro desejado</b>, que abrirá a tela com o respectivo cadastro.</li>" : "");
                updt = updt + "<br>";
                updt = updt + (me.exibeDelete ? "<li>Para realizar a <b>Exclusão</b> de um(a) " + me.textHtml + " já cadastrado no sistema, basta <b>clicar uma vez no registro desejado</b>, e clicar no <b>Botão Excluir</b> que se encontra na parte inferior da tela.</li>" : "");
                updt = updt + "<br>";
                updt = updt + (me.exibeRel ? "<li>Para realizar a geração de um <b>Relatório</b> de " + me.textHtml + ", basta clicar no <b>Botão Gerar Relatório</b> na parte inferior da tela, preencher o filtro e confirmar a geração do mesmo.</li>" : "");
                updt = updt + "<br>";
                updt = updt + (me.exibePesquisa ? "<li>Você pode realizar uma <b>busca</b> de " + me.textPlurHtml + ", utilizando o <b>campo de texto</b> que se encontra na parte inferior da tela, digitando o conteúdo desejado e <b>pressionando Enter</b> no teclado ou clicando no <b>Botão de Pesquisar</b>.</li>" : "");
                updt = updt + "</div>";
                me.cntMensagem.update(updt);
            }
        }
    },
    defineTexts: function (card) {
        var me = this,
            xtype = card.initialConfig.xtype;

        if (xtype === 'cliente-tela') {
            me.titleHtml = 'Cadastro de Clientes';
            me.textPlurHtml = 'clientes';
            me.textHtml = 'cliente';
        } else if (xtype === 'funcionario-tela') {
            me.titleHtml = 'Cadastro de Funcionários';
            me.textPlurHtml = 'funcionários';
            me.textHtml = 'funcionário';
        } else if (xtype === 'situacao-tela') {
            me.titleHtml = 'Cadastro de Situação de Funcionário';
            me.textPlurHtml = 'situações';
            me.textHtml = 'situação';
            me.exibeRel = false;
        } else if (xtype === 'funcao-tela') {
            me.titleHtml = 'Cadastro de Funções de Funcionário';
            me.textPlurHtml = 'funções';
            me.textHtml = 'função';
            me.exibeRel = false;
        } else if (xtype === 'estadoCivil-tela') {
            me.titleHtml = 'Cadastro de Estado Civil de Funcionário';
            me.textPlurHtml = 'estado civil';
            me.textHtml = 'estado civil';
            me.exibeRel = false;
        } else if (xtype === 'formacao-tela') {
            me.titleHtml = 'Cadastro de Formações de Funcionário';
            me.textPlurHtml = 'formações';
            me.textHtml = 'formação';
            me.exibeRel = false;
        } else if (xtype === 'etnia-tela') {
            me.titleHtml = 'Cadastro de Etnia de Funcionário';
            me.textPlurHtml = 'etnias';
            me.textHtml = 'etnia';
            me.exibeRel = false;
        } else if (xtype === 'parentesco-tela') {
            me.titleHtml = 'Cadastro de Parentesco de Funcionário';
            me.textPlurHtml = 'parentescos';
            me.textHtml = 'parentesco';
            me.exibeRel = false;
        } else if (xtype === 'banco-tela') {
            me.titleHtml = 'Cadastro de Bancos';
            me.textPlurHtml = 'bancos';
            me.textHtml = 'banco';
            me.exibeRel = false;
        } else if (xtype === 'fornecedor-tela') {
            me.titleHtml = 'Cadastro de Fornecedores';
            me.textPlurHtml = 'fornecedores';
            me.textHtml = 'fornecedor';
        } else if (xtype === 'statusFornecedor-tela') {
            me.titleHtml = 'Cadastro de Status de Fornecedor';
            me.textPlurHtml = 'status';
            me.textHtml = 'status';
            me.exibeRel = false;
        } else if (xtype === 'cliente-tela') {
            me.titleHtml = 'Cadastro de Clientes';
            me.textPlurHtml = 'clientes';
            me.textHtml = 'cliente';
        } else if (xtype === 'produto-tela') {
            me.titleHtml = 'Cadastro de Produtos';
            me.textPlurHtml = 'produtos';
            me.textHtml = 'produto';
        } else if (xtype === 'veiculo-tela') {
            me.titleHtml = 'Cadastro de Veículos';
            me.textPlurHtml = 'veículos';
            me.textHtml = 'veículo';
        } else if (xtype === 'orcamento-tela') {
            me.titleHtml = 'Cadastro de Orçamentos';
            me.textPlurHtml = 'orçamentos';
            me.textHtml = 'orçamento';
        } else if (xtype === 'servico-tela') {
            me.titleHtml = 'Cadastro de Serviços';
            me.textPlurHtml = 'serviços';
            me.textHtml = 'servico';
        } else if (xtype === 'contaPagar-tela') {
            me.titleHtml = 'Cadastro de Contas à Pagar';
            me.textPlurHtml = 'contas à pagar';
            me.textHtml = 'conta à pagar';
        } else if (xtype === 'contaReceber-tela') {
            me.titleHtml = 'Cadastro de Contas à Receber';
            me.textPlurHtml = 'contas à receber';
            me.textHtml = 'conta à receber';
        } else if (xtype === 'marca-tela') {
            me.titleHtml = 'Cadastro de Marcas de Veículos';
            me.textPlurHtml = 'marcas';
            me.textHtml = 'marca';
            me.exibeRel = false;
        } else if (xtype === 'modelo-tela') {
            me.titleHtml = 'Cadastro de Modelos de Veículos';
            me.textPlurHtml = 'modelos';
            me.textHtml = 'modelo';
            me.exibeRel = false;
        } else {
            me.exibir = false;
        }
    }
});