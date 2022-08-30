    function SanPhamService(){
        this.getProductList = function () {

            var Promise = axios({
                method: 'get',
                url: 'https://630a58a0324991003284a47f.mockapi.io/bainhom',
                responseType: 'stream'
            })
            return Promise
    
        }
        this.addProduct = function (sp) {
            console.log("add service", sp);
            
            return axios({
                method: 'post',
                url: 'https://630a58a0324991003284a47f.mockapi.io/bainhom',
                data: sp 
            });
        }
    
        this.deleteProduct = function (id) {
            console.log("ID XOÁ", id)
           
            return axios({
                method: 'DELETE',
                url: `https://630a58a0324991003284a47f.mockapi.io/bainhom/${id}`,
    
            })
    
        }
    
    
    
    
        this.getProductDele = function(id){
            return axios({
                method: 'GET',
                url: `https://630a58a0324991003284a47f.mockapi.io/bainhom/${id}`,
            });
        
        }
    
        this.updateProduct = function (id, sp) {
            return axios({
                method: 'put',
                url: `https://630a58a0324991003284a47f.mockapi.io/bainhom/${id}`,
                data: sp
            });
        }
    }