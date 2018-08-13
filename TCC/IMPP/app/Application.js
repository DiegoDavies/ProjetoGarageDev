Ext.define('ProjetoGarage.Application', {
    name: 'ProjetoGarage',

    extend: 'Ext.app.Application',

    requires: [
    	'Ext.toolbar.Paging',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*',
        'Ext.grid.plugin.RowEditing',
        'ProjetoGarage.ux.InputTextMask',
        'ProjetoGarage.ux.Store',
        //'Data',
        'ProjetoGarage.ux.DataStoreHandler',
        'ProjetoGarage.ux.DataSQLStore',
        'ProjetoGarage.ux.TccCombo'
    ],

    views: [
        'ProjetoGarage.view.login.Login',
        'ProjetoGarage.view.telaPrincipal.Viewport',
        'ProjetoGarage.view.GridDefault',

        'ProjetoGarage.view.funcionario.Tela',
        'ProjetoGarage.view.situacao.Tela',
        'ProjetoGarage.view.funcao.Tela',
        'ProjetoGarage.view.estadoCivil.Tela',
        'ProjetoGarage.view.formacao.Tela',
        'ProjetoGarage.view.etnia.Tela',
        'ProjetoGarage.view.parentesco.Tela',
        'ProjetoGarage.view.orcamento.Tela',
        'ProjetoGarage.view.servico.Tela',
        'ProjetoGarage.view.contaPagar.Tela',
        'ProjetoGarage.view.contaReceber.Tela',
        'ProjetoGarage.view.fornecedor.Tela'
    ],

    stores: [
        'combos.Estado',
        'combos.Cidade',
        'combos.Cliente',
        'combos.Sexo',
        'combos.Situacao',
        'combos.EstadoCivil',
        'combos.Etnia',
        'combos.Formacao',
        'combos.Funcao',
        'combos.Parentesco',

        'funcionario.Store',
        'funcionario.Historico',
        'funcionario.HistoricoOcupacional',
        'funcionario.Dependente',
        'funcionario.Pagamento',

        'situacao.Store',

        'funcao.Store',

        'estadoCivil.Store',

        'formacao.Store',

        'etnia.Store',

        'parentesco.Store',

        'orcamento.Store',
        'orcamento.Custos',
        'orcamento.Produto',
        'orcamento.Veiculo',
        'orcamento.Ocorrencia',

        'servico.Store',
        'servico.Custos',
        'servico.Produto',
        'servico.Veiculo',
        'servico.Ocorrencia',

        'contaPagar.Store',
        'contaPagar.Ocorrencia',
        'contaPagar.Pagamento',

        'contaReceber.Store',
        'contaReceber.Ocorrencia',
        'contaReceber.Recebimento'
    ]
});


