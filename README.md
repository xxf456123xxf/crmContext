加载crmContext;
var crm ={};  
var newCrmContext = new crmContext(window.Xrm);
crm.attr = newCrmContext.attr.bind(newCrmContext);
crm.entity = newCrmContext.entity; 
var attr = crm.attr;
var ent = crm.entity;