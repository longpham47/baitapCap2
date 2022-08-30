function ProductServices() {
    this.getProductList = function () {
        return axios({
            method: 'get',
            url: 'https://630a58a0324991003284a47f.mockapi.io/bainhom',
        });
    }
    this.addProduct = function(product){
        console.log(product)
        return axios({
            method: 'post',
            url: 'https://630a58a0324991003284a47f.mockapi.io/bainhom',
            data: product,
        });
    }
    this.getProductPhone = function (id){
        return axios({
            method: 'get',
            url: `https://630a58a0324991003284a47f.mockapi.io/bainhom/${id}`,
        });
    }
    this.updateProductPhone = function(id, product){
        return axios({
            method: 'put',
            url: `https://630a58a0324991003284a47f.mockapi.io/bainhom/${id}`,
            data: product,
        });
    }

}