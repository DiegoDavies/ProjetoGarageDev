Ext.define('ProjetoGarage.ux.TccCombo', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'tcc-combo',
    typeAhead: true,
    enableKeyEvents: true,
    minChars: 2,
    listConfig: {
        loadingText: 'Procurando...',
        emptyText: 'Não há registros encontrados.',
        maxHeight: 200
    },
    initComponent: function () {

        Ext.apply(this, {
            listeners: {
                expand: function (field, eOpts) {
                    this.store.load();
                }
            }
        });

        this.callParent(arguments);
    }
});