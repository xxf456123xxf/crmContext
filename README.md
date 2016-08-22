加载crmContext;</br>
var crm ={};  </br>
var newCrmContext = new crmContext(window.Xrm);</br>
crm.attr = newCrmContext.attr.bind(newCrmContext);</br>
crm.entity = newCrmContext.entity; </br>
var attr = crm.attr;</br>
var ent = crm.entity;</br>
