YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "crmAttr",
        "crmContext",
        "crmEntity",
        "crmEntityOption",
        "crmGridList",
        "crmProcess"
    ],
    "modules": [
        "Entity",
        "crmContext",
        "crmGridList",
        "crmProcess"
    ],
    "allModules": [
        {
            "displayName": "crmContext",
            "name": "crmContext",
            "description": "crmContext操作",
            "classes": [
                {
                    "name": "crmContext"
                }
            ]
        },
        {
            "displayName": "crmGridList",
            "name": "crmGridList",
            "description": "子网格操作",
            "classes": [
                {
                    "name": "crmGridList"
                }
            ]
        },
        {
            "displayName": "crmProcess",
            "name": "crmProcess",
            "description": "业务流程操作",
            "classes": [
                {
                    "name": "crmProcess"
                }
            ]
        },
        {
            "displayName": "Entity",
            "name": "Entity",
            "description": "表单操作",
            "classes": [
                {
                    "name": "crmAttr"
                },
                {
                    "name": "crmEntity"
                },
                {
                    "name": "crmEntityOption"
                }
            ]
        }
    ]
} };
});