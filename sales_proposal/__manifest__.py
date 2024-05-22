# -*- coding: utf-8 -*-
{
    'name': "sales_praposal",

    'summary': """
            Sales proposal module
        """,

    'description': """
        Sales proposal module send proposal to customer and create sale order.
    """,

    'author': "Dhrushil Buntani",
    'category': 'Sales',
    'version': '16.0.1',

    'depends': ['base', 'mail', 'sale', 'sale_management'],

    'data': [
        'security/ir.model.access.csv',
        'views/sales_proposal_line_view.xml',
        'views/sales_proposal_view.xml',
        'views/templates.xml',
        'views/menus.xml',
        'data/proposal_sequence.xml'
    ],
    'assets': {
        'web.assets_frontend': [
            'sales_proposal/static/src/js/sales_proposal_portal.js',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': True,
}
