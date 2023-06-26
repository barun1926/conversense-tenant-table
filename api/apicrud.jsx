const apiCrud = {
    postData:async function(url = '', data={}) {
        const response = await fetch(url, {
           method: 'POST', // *GET, POST, PUT, DELETE, etc. 
           headers: {
               'Content-Type': 'application/json', 
               'Access-Control-Allow-Origin': '*', 
               'lang' : 'en' 
           },
             body: JSON.stringify(data) // body data type must match "Content-Type" header
       });
       return response.json();  
   }, 

    postFormData:async function(url = '', data={}) {
         const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc. 
            headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*',
                "authorization": localStorage.getItem('accessToken'),
                'lang' : 'en' 
            },
              body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json();  
    },

     getData:async function(url = '',token) {
        const response = await fetch(url,{
            method: 'GET', // *GET, POST, PUT, DELETE, etc. 
            headers: {
                'Content-Type': 'application/json', 
                'lang' : 'en' 
            },

           body: JSON.stringify()

        });
        return response.json();
    },

    getFormData:async function(url = '',token) {

        const response = await fetch(url,{

            method: 'GET', // *GET, POST, PUT, DELETE, etc.

            headers: {

                'Content-Type': 'application/json',

                'authorization':"jwt" + " " + localStorage.getItem('accessToken'),

                'lang' : 'en'

                // 'Content-Type': 'application/x-www-form-urlencoded',

            },




           body: JSON.stringify()




        });

        return response.json();

    },

}

export default apiCrud;