Ext.define('ProjetoGarage.ux.Store', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/Dados',
        reader: {
            type: 'json',
            rootProperty: 'result'
        }
    },
    procedure: {

    },
    params: {

    }
})