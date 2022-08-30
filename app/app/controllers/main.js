var productList = new ProductServices();
var cart = {
    quantity: 0,
    total: 0,
    data: [],
};
var newProducts = [];


function getProductListPhone() {
    productList.getProductList().then(function (result) {
        newProducts = result.data
        showProductTable(newProducts)
    }).catch(function (error) {
        error = "Kết Nối Dữ Liệu Thất Bại";
        alert(error)
    })
}
getProductListPhone();

function showProductTable(arrayProduct) {
    var content = "";
    arrayProduct.map(function (product) {
        content += `    
                    <div class="card">           
                        <div class="top-bar">
                           
                            <h2 class="title-product"><a href="">${product.type}</a></h2>
                        </div>
                        <div class="img-container">
                            <img src="${product.img}">
                        </div>
                        <div class="details">
                            <div class="top-content">
                                <div class="name-product">
                                    <strong class="s-name">${product.name}</strong>
                                    <button class="btn-heart" id="heart">
                                        <i class=" fas fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="wrapper">
                                 <h5> <span>Màng Hình:</span> ${product.screen}</h5>
                                <h5><span>Camera Trước:</span> ${product.frontCamera}</h5>
                                <h5><span>Camera Sau:</span> ${product.backCamera}</h5>
                                <p class="desc-product">${product.desc}</p>
                            </div>
                            <div class="price">
                                    <h3 class="price-product">Giá: $${product.price}</h3>
                                    <div class="price-end">
                                        <button class="btn-add"  onclick="getProductPhone('${product.id}')">
                                          ADD <i class="fas fa-chevron-right"> </i>
                                        </button>
                                    </div>
                            </div>
                        </div>
                    </div>              
        `
    })
    document.getElementById("cart").innerHTML = content;
}

function showShop() {
    var content = ""
    content +=
    `<div class="content">
        <div class ="shop-cart">
            <div id="cart-list" >                   
                <select id="typeProduct" onchange="showTypePhone()">
                    <option selected>Chọn Hãng</option>
                    <option>Iphone</option>
                    <option>SamSung</option>
                </select>
                <div class="cart-content">
                    <button id="countProduct" onclick="myShow()"><i class="fas fa-shopping-cart"></i> </button>
                    <span class="cart-span" id="count">0</span>     
                </div>       
            </div>      
            <div class="side-nav" id="sideNav" > 
                <h2>Cart</h2>      
                <button onclick="myClose()" class="btn-close"><i class="fas fa-times"></i></button>
                <div id="cart-sp">
                    <table class="table">            
                        <tbody id="tbodyCart">
        
                        </tbody>
                    </table>
                </div>                 
                <div class="final" >
                    <strong id="total-cart">Total: $ <span class="total">0</span></strong>
                    <div class="action">
                        <button onclick="showPayCart()" id="paycart" class="btn buy">Purchase <i class="fas fa-credit-card"
                                style="color:#6665dd;"></i>
                        </button>
                        <button onclick="clearCart()" class="btn clear">Clear Cart <i class="fas fa-trash"
                                style="color:#bb342f;"></i>
                        </button>
                    </div>
                </div>
            </div>         
            <div class="main-cart" id="cart">
            </div> 
            <div class="cover"></div>
            <div class="orderNow" id="pay">
                <div class="invoice">
                    <div class="shipping-items">
                        <div class="item-names">
                            
                        </div>
                        <div class="items-price">
                            
                        </div>
                    </div>
                    <hr>
                    <div class=payment>
                        <em>payment</em>
                        <div>
                            <p>Tổng tiền phải thanh toán</p>
                            <span class="totalPay"></span>
                        </div>
                    </div>
                    <div class="order">
                        <button class="btn-order btn" id="btnPay" onclick="thanhToan();hienCover();" style="color:#fff">Thanh Toán</button>
                        <button class="btn-cancel btn" id="btnCancel" onclick="nonePayCart()" style="color:#fff">Cancel</button>
                    </div>
                </div>
            </div>   
        <div class="orderNow2" id="thanks">
            <div class="invoice2" style="height: 500px; width: 400px">
                <div>
                    <div class="order-details">
                        <em>Đơn hàng của bạn đã được khởi tạo</em>
                        <hr>
                        <p>Mã số đơn hàng của bạn là : <span id="random">${Math.floor(Math.random() * 1000)}</span></p>
                        <hr>
                        <p>Đơn hàng của bạn sẽ được giao sớm nhất</p>
                        <hr>
                        <p> số tiền bạn cần thanh toán 
                        <span class="totalPay2"> $  </span> 
                        bằng thẻ or tiền mặt</p>
                        <p>Cám ơn bạn đã đặt hàng</p>
                        <button onclick="tatThanhToan();tatCover();" class="btn-ok">okay</button>
                    </div>
                </div>
            </div>     
        </div>  
        </div>
            
    </div>`
    document.getElementById("app").innerHTML = content;
}
showShop();


function myShow() {
    document.getElementById("sideNav").style.right = "0";
}

function myClose() {
    nonePayCart()
    document.getElementById("sideNav").style.right = "-100%";
}

function showTypePhone() {
    var showItem = [];
    var valueSelect = document.getElementById("typeProduct").value;
    productList.getProductList().then(function (result) {
        if (valueSelect == "Iphone") {
            for (var i = 0; i < newProducts.length; i++) {
                if (newProducts[i].type == "Iphone") {
                    showItem.push(newProducts[i]);
                    showProductTable(showItem);
                }
            }
        }
        else if (valueSelect == "SamSung") {
            for (var i = 0; i < newProducts.length; i++) {
                if (newProducts[i].type == "SamSung") {
                    showItem.push(newProducts[i]);
                    showProductTable(showItem);
                }
            }
        }
        else {
            getProductListPhone()
        }
    }).catch(function (error) {
        error = "Show Sản Phẩm Thất Bại";
        alert(error)
    })
}

//push sp khi click add
function getProductPhone(id) {
    let item = newProducts.find(v => v.id === id)
    console.log(item.id);
    if (item) {
        let cartItemIndex = cart.data.findIndex(cartItem => cartItem.id === item.id);
        console.log(cartItemIndex)
        if (cartItemIndex == -1) {
            // tìm theo id
            // chưa có thì index sẽ rơi vào -1 đẩy vào mảng
            cart.data.push(item);
        } else {
            // đã có trong cart index != -1
            // lấy sl trong cart tăng lên 1
            cart.data[cartItemIndex].quantity++;
        }
        cart.quantity++;
        console.log("số lượng sp trong cart", cart.quantity);
        cart.total += Number(item.price);
    }
    setLocalStorage();
    getLocalStorage();

}

// render vào cart
function showCart(cart) {
    var content = "";
    cart.data.map(function (item) {
        content += `
        <tr>
            <td class="img-cart"><img src="${item.img}"></td>
            <td class="name-cart">${item.name} </td>
            <td>
                <button class="btn-quantity" >
                    <i class="fa-solid fa-chevron-left" onclick="nutGiam('${item.id}')"></i>
                </button> 
                    <span class="sl-phone"> ${item.quantity}</span>
                <button class="btn-quantity" >
                    <i class="fa-solid fa-chevron-right" onclick="nutTang('${item.id}')" ></i>
                </button>
            </td>
            <td>$ ${item.price * item.quantity} </td>
            <td>
                <button class="btn-delete" onclick="nutXoa('${item.id}')" ><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
        `
    });
    document.getElementById("tbodyCart").innerHTML = content;

}

//hai nut tang giam

function nutGiam(id) {
    //console.log(id)
    let qProduct = newProducts.find(v => v.id === id)
    console.log(qProduct.id);
    if (qProduct) {
        let cartItemIndex = cart.data.findIndex(cartItem => cartItem.id === qProduct.id);
        console.log(cartItemIndex);
        if (cartItemIndex != -1) {
            if (cart.data[cartItemIndex].quantity > 1) {
                console.log(cart.data[cartItemIndex])
                cart.data[cartItemIndex].quantity--
                cart.quantity--;
                cart.total -= Number(cart.data[cartItemIndex].price);
            } else {
                moneyMin = Number(cart.data[cartItemIndex].price);
                cart.total -= moneyMin;
                cart.data.splice(cartItemIndex, 1);
                cart.quantity--;
            }
        }
    }
    setLocalStorage();
    getLocalStorage();
}

function nutTang(id) {
    //console.log(id)
    let qProduct = newProducts.find(v => v.id === id)
    console.log(qProduct.id);
    if (qProduct) {
        let cartItemIndex = cart.data.findIndex(cartItem => cartItem.id === qProduct.id);
        console.log(cartItemIndex);
        if (cartItemIndex != -1) {
            cart.data[cartItemIndex].quantity++;
            cart.quantity++;
            cart.total += Number(cart.data[cartItemIndex].price);
        }
    }
    setLocalStorage();
    getLocalStorage();
}

function nutXoa(id) {
    //console.log(id)
    let qProduct = newProducts.find(v => v.id === id)
    console.log(qProduct.id);
    if (qProduct) {
        let cartItemIndex = cart.data.findIndex(cartItem => cartItem.id === qProduct.id);
        console.log(cartItemIndex);
        if (cartItemIndex != -1) {
            moneyMin = Number(cart.data[cartItemIndex].price);
            cart.total -= moneyMin;
            cart.data.splice([cartItemIndex].id, 1);
            cart.quantity--;
        }
    }
    setLocalStorage();
    getLocalStorage();
}


function showQuantityCart(quantity) {
    document.querySelector("#count").innerHTML = quantity;

}


// Trang Invoice
function nonePayCart() {
    document.getElementById("pay").classList.add("none");
}

function showPayCart() {
    const el = document.getElementById("pay")
    if (cart.data.length == 0) {

        el.className = "none";
    } else {

        el.className = el.className === "show" ? "none" : "show";
        document.getElementById("sideNav").style.right = "-100%";


        var content = "";
        cart.data.map(function (item) {
            content += `
        <span>${item.quantity} x ${item.name}</span>
        `
        });
        document.querySelector(".item-names").innerHTML = content;

        var content2 = "";
        cart.data.map(function (item2) {
            content2 += `
        <span>$ ${item2.price * item2.quantity}</span>
        +
        `
        });
        document.querySelector(".items-price").innerHTML = content2;
    }
}



function showQuantityCart(quantity) {
    document.querySelector("#count").innerHTML = quantity
}


// Cover
function hienCover(){
    document.querySelector(".cover").style.display = "block"
}

function tatCover(){
    document.querySelector(".cover").style.display = "none"
}

//Trang thanh toán 
function tatThanhToan() {
    document.getElementById("thanks").classList.add("none");


    clearCart()
}


function thanhToan() {
    const el2 = document.getElementById("thanks")
    el2.className = el2.className === "show" ? "none" : "show";
    document.getElementById("pay").classList.add("none");


}

function totalCart(total) {
    document.querySelector(".total").innerHTML = total.toLocaleString();
    document.querySelector(".totalPay").innerHTML = "$ " + total.toLocaleString();
    document.querySelector(".totalPay2").innerHTML = "$" + total.toLocaleString();
}




function clearCart() {
    cart = { quantity: 0, total: 0, data: [] }
    setLocalStorage();
    getLocalStorage();
}


function setLocalStorage() {
    localStorage.setItem("DSSP", JSON.stringify(cart));
}

function getLocalStorage() {
    if (localStorage.getItem("DSSP") != undefined) {
        cart = JSON.parse(localStorage.getItem("DSSP"));
    }
    totalCart(cart.total)
    showQuantityCart(cart.quantity)
    showCart(cart);
}
getLocalStorage()