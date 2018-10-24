Ext.define('ProjetoGarage.Application', {
    name: 'ProjetoGarage',

    extend: 'Ext.app.Application',

    requires: [
    	'Ext.toolbar.Paging',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',
        'Ext.container.ButtonGroup',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*',
        'Ext.ux.TabScrollerMenu',
        'Ext.grid.plugin.RowEditing',
        'ProjetoGarage.ux.InputTextMask',
        'ProjetoGarage.ux.Store',
        //'Data',
        'ProjetoGarage.ux.DataStoreHandler',
        'ProjetoGarage.ux.DataSQLStore',
        'ProjetoGarage.ux.TccCombo',
        'ProjetoGarage.ux.MascaraTabPanel',
        'ProjetoGarage.ux.WindowHelp'
    ],

    views: [
        'ProjetoGarage.view.login.Login',
        'ProjetoGarage.view.login.WindowLogin',
        'ProjetoGarage.view.telaPrincipal.Viewport',
        'ProjetoGarage.view.GridDefault',
        'ProjetoGarage.view.telaPrincipal.WindowAjuda',

        'ProjetoGarage.view.funcionario.Tela',
        'ProjetoGarage.view.situacao.Tela',
        'ProjetoGarage.view.funcao.Tela',
        'ProjetoGarage.view.estadoCivil.Tela',
        'ProjetoGarage.view.duracao.Tela',
        'ProjetoGarage.view.banco.Tela',
        'ProjetoGarage.view.statusFornecedor.Tela',
        'ProjetoGarage.view.formacao.Tela',
        'ProjetoGarage.view.etnia.Tela',
        'ProjetoGarage.view.parentesco.Tela',
        'ProjetoGarage.view.orcamento.Tela',
        'ProjetoGarage.view.servico.Tela',
        'ProjetoGarage.view.contaPagar.Tela',
        'ProjetoGarage.view.contaReceber.Tela',
        'ProjetoGarage.view.fornecedor.Tela',
        'ProjetoGarage.view.cliente.Tela',
        'ProjetoGarage.view.funcionalidade.Tela',
        'ProjetoGarage.view.modulo.Tela',
        'ProjetoGarage.view.usuario.Tela',
        'ProjetoGarage.view.perfil.Tela',
        'ProjetoGarage.view.login.WindowAlterar',
        'ProjetoGarage.view.login.WindowSolicitar',
        'ProjetoGarage.view.login.WindowResetar',
        'ProjetoGarage.view.marca.Tela',
        'ProjetoGarage.view.modelo.Tela',
        'ProjetoGarage.view.veiculo.Tela',
        'ProjetoGarage.view.auditoria.Tela',
        'ProjetoGarage.view.tipoPagamento.Tela'
    ],

    stores: [
        'combos.Estado',
        'combos.Cidade',
        'combos.Cliente',
        'combos.Sexo',
        'combos.Situacao',
        'combos.EstadoCivil',
        'combos.Duracao',
        'combos.Etnia',
        'combos.Formacao',
        'combos.Funcao',
        'combos.Parentesco',
        'combos.StatusFornecedor',
        'combos.Banco',
        'combos.Modulo',
        'combos.Marca',
        'combos.Modelo',
        'combos.Veiculo',
        'combos.TipoPagamento',
        'combos.Fornecedor',
        'combos.Funcionario',

        'funcionario.Store',
        'funcionario.Historico',
        'funcionario.HistoricoOcupacional',
        'funcionario.Dependente',
        'funcionario.Pagamento',

        'fornecedor.Store',
        'fornecedor.Historico',
        'fornecedor.Pagamento',
        'fornecedor.ContaPagar',

        'funcionalidade.Store',

        'situacao.Store',

        'funcao.Store',

        'estadoCivil.Store',

        'duracao.Store',

        'formacao.Store',

        'etnia.Store',

        'tipoPagamento.Store',

        'banco.Store',

        'modulo.Store',

        'statusFornecedor.Store',

        'parentesco.Store',

        'orcamento.Store',
        'orcamento.Custos',
        'orcamento.Produto',
        'orcamento.Veiculo',
        'orcamento.Historico',

        'servico.Store',
        'servico.Custos',
        'servico.Produto',
        'servico.Veiculo',
        'servico.Historico',

        'contaPagar.Store',
        'contaPagar.Ocorrencia',
        'contaPagar.Pagamento',

        'contaReceber.Store',
        'contaReceber.Ocorrencia',
        'contaReceber.Recebimento',

        'telaPrincipal.Menu',

        'usuario.Store',
        'usuario.Perfil',

        'perfil.Store',
        'perfil.Funcionalidade',

        'login.AlterarSenha',
        'login.SolicitarSenha',
        'login.ConfirmarSenha',

        'cliente.Store',
        'cliente.ContaReceber',
        'cliente.Historico',
        'cliente.Servico',
        'cliente.Veiculo',
        'cliente.Orcamento',

        'marca.Store',
        'modelo.Store',

        'telaPrincipal.Ajuda',

        'veiculo.Store',
        'veiculo.Historico',

        'excelConfig.Store',

        'auditoria.Store'
    ]
});


