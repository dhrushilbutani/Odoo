odoo.define('sales_proposal.portal_proposal', function (require) {
    'use strict';
    var publicWidget = require('web.public.widget');
    var core = require('web.core');
    var _t = core._t;

    publicWidget.registry.PortalProposal = publicWidget.Widget.extend({
        selector: '.o_sales_portal_proposal_sidebar',

        events: {
            'change .approved_qty': '_onChangeApprovedQuantity',
            'change #approved_price': '_onChangeApprovedPrice',
            'click #plusBtn' : '_onclickPlusButton',
            'click #minusBtn' : '_onclickMinusButton'
        },
        start() {
            this._super(...arguments);
            this.orderDetail = this.$el.find('table#sales_proposal_table').data();

        },
        async _callUpdateLineRoute(order_id, params) {
            var self = this;
            await this._rpc({
                route: "/sales/proposals/" + order_id + "/update_line_dict",
                params: params,
            });
        },

        _refreshOrderUI(data){
            const $proposalTemplate = $(data['proposal_template']);
            if ($proposalTemplate.length) {
                this.$('#proposal_content').html($proposalTemplate);
            }
            $('#sale_proposal_total').load(window.location.href + ' #sale_proposal_total');
            $('#sale_proposal_total').load(window.location.href + ' #sale_proposal_total');
        },

        _onChangeApprovedQuantity(ev) {
            ev.preventDefault();
            var approved_qty = parseInt($("#propsal_quantity_" + $(ev.currentTarget).data('lineId')).val())
            const result =  this._callUpdateLineRoute(this.orderDetail.orderId, {
                'line_id': $(ev.currentTarget).data('lineId'),
                'input_quantity': approved_qty >= 0 ? approved_qty : alert('Quantity cannot be a negative value'),
                'access_token': this.orderDetail.token
            });
            this._refreshOrderUI(result);
        },

        _onChangeApprovedPrice(ev) {
            ev.preventDefault();
            var value = parseInt($("#propsal_quantity_" + $(ev.currentTarget).data('lineId')).val())
            var quantity_price = parseFloat(ev.currentTarget.value);
            const result =  this._callUpdateLineRoute(this.orderDetail.orderId, {
                'line_id': $(ev.currentTarget).data('lineId'),
                'input_price': quantity_price >= 0 ? quantity_price : alert('Price cannot be a negative value'),
                'access_token': this.orderDetail.token
            });
            this._refreshOrderUI(result);
        },

        _onclickPlusButton(ev){
            var line_id = "#propsal_quantity_" + $(ev.currentTarget).data('lineId');
            var inc = parseInt($(line_id).val()) + 1;
            $(line_id).val(inc);
            this._onChangeApprovedQuantity(ev);
        },

        _onclickMinusButton(ev){
            var line_id = "#propsal_quantity_" + $(ev.currentTarget).data('lineId');
            var dec = parseInt($(line_id).val()) - 1
            $(line_id).val(dec)
            this._onChangeApprovedQuantity(ev);
        },


    })
});