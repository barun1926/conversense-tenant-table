import apiCrud from './apicrud';
import { encrypt, decrypt } from '../helpers';
import jwt_decode from 'jwt-decode'
const apiurl = "https://us-central1-adminconsole-dev.cloudfunctions.net/admin-console-dev/api/v1/";//dev

const apiservice = {
	addTenant: async function (tenantobj) {
		var response = await apiCrud.postData(apiurl + 'tenant/' + "addtenant", tenantobj)
		return response;
	},
	addSubscription: async function (subscriptionobj) {
		var response = await apiCrud.postData(apiurl + 'tenant/' + "addsubscription", subscriptionobj)
		return response;
	},

	getSubscriptionManagement: async function () {
		var response = await apiCrud.getData(apiurl + 'tenant/' + "getapisection")
		return response;
	},

	getTenant: async function () {
		var response = await apiCrud.getData(apiurl + 'tenant/' + 'gettenant');
		return response;
	},

	login: async function (requestData) {
		var response = await apiCrud.postData(apiurl + 'user/' + "signin", requestData);
		return response;
	},

	viewAndEditTenant: async function(tenantId){
        var response = await apiCrud.getData(apiurl + 'tenant/' + 'viewandedittenant/'+tenantId);
        return response;
    },

	getUserData: async function(){
       var response = await apiCrud.getFormData(apiurl + 'user/' + 'getuser');
	   return response;
	}
	,
}
export default apiservice;
