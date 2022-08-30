
var spService = new SanPhamService();
var validation = new  Validation();

function getProductList() {
    spService.getProductList().then(function (result) {
        console.log(result.data);

        showTable(result.data)
    }).catch(function (error) {
        console.log(error);
    });
}
getProductList();

function showTable(mangSP) {
    var content = ""
    var stt = 0
    mangSP.map(function (sp) {
        content += `
        <tr>
        <td>${stt++}</td>
        <td>${sp.name}</td>
        <td>${sp.price}</td>
        <td>${sp.screen}</td>
        <td>${sp.backCamera}</td>
        <td>${sp.frontCamera}</td>
        <td>${sp.img}</td>
        <td>${sp.desc}</td>
        <td>${sp.type}</td>
        <td>
        <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="getProductDele('${sp.id}')">xem</button>
        <button class="btn btn-info" onclick="deleteProductS('${sp.id}')">xoá</button>
        </td>
        </tr>
        `
    })
    document.getElementById("tblDanhSachSP").innerHTML = content;

}
function handleFOrm() {
    document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class="btn btn-info" onclick="addProduct()">Add</button>
            
    `;
    
    var formELE = document.querySelectorAll("#myModal .form-control");
    console.log(formELE);
    
    for (var i = 0; i < formELE.length; i++) {
        formELE[i].value = "";

    }
}
document.querySelector("#btnThemSP").onclick = handleFOrm;

async function addProduct() {
    var name = document.querySelector("#TenSP").value;
    var price = document.querySelector("#GiaSP").value;
    var screen = document.querySelector("#manhinhsp").value;
    var backCamera = document.querySelector("#camSauSP").value;
    var frontCamera = document.querySelector("#camtruocSP").value;
    var img = document.querySelector("#HinhSP").value;
    var desc = document.querySelector("#motaSP").value;
    var type = document.querySelector("#ThuongHieuSP").value;
    var sp = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);
    console.log(sp)

    var isValid = true;
    
    isValid &= validation.checkEmpty(name, "tbname", "tên sản phẩm không được để trống");
    isValid &= validation.checkEmpty(price, "tbgia", "giá sản phẩm không được để trống") && validation.checkscore(price, "tbgia", "nhập lại giá sản phẩm bằng số");
    isValid &= validation.checkEmpty(screen, "tbmanhinh", "thông số màng hình không được để trống");
    isValid &= validation.checkEmpty(backCamera, "tbcamsau", "thông số camera sau không được để trống");
    isValid &= validation.checkEmpty(frontCamera, "tbcamtruoc", "thông số camera trước không được để trống");
    isValid &= validation.checkEmpty(img, "tbhinhanh", "vui lòng thêm hình ảnh");
    isValid &= validation.checkEmpty(desc, "tbmota", "thêm mô tả sản phẩm");
    isValid &= validation.checkEmpty(type, "tbthuonghieu", "nhập thương hiệu sản phẩm");
    
    if(isValid){
        try {
    
            var response = await fetch('https://630a58a0324991003284a47f.mockapi.io/bainhom',
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sp),
            });
            console.log(response)
            var data = await response.json();
            console.log(data)
            document.querySelector("#myModal .close").click();
                    getProductList();
          } catch (error) {
            
            console.log(error)
            
          }
    }
  
  
  

}




function deleteProductS(id) {
    spService.deleteProduct(id)
        .then(function (result) {
            console.log(result)
            getProductList();
        })
        .catch(function (error) {
            console.log(error)
        })
}


function getProductDele(id) {
    console.log(id)
    spService.getProductDele(id)
        .then(function (result) {
            console.log(result);
            console.log(result.data);

            document.querySelector("#TenSP").value = result.data.name;
            document.querySelector("#GiaSP").value = result.data.price;
            document.querySelector("#manhinhsp").value = result.data.screen;
            document.querySelector("#camSauSP").value = result.data.backCamera;
            document.querySelector("#camtruocSP").value = result.data.frontCamera;
            document.querySelector("#HinhSP").value = result.data.img;
            document.querySelector("#motaSP").value = result.data.desc;
            document.querySelector("#ThuongHieuSP").value = result.data.type;
            // thêm button update khi click xem => cb chochữc năg cập nhât
            document.querySelector("#myModal .modal-footer").innerHTML =
                `
      <button class="btn btn-primary" onclick="updateProduct(${result.data.id})">Update</button>
      `;
        })
        .catch(function (error) {
            console.log(error);
        })
}

function updateProduct(id) {
   var name = document.querySelector("#TenSP").value;
    var price = document.querySelector("#GiaSP").value;
    var screen = document.querySelector("#manhinhsp").value;
    var backCamera = document.querySelector("#camSauSP").value;
    var frontCamera = document.querySelector("#camtruocSP").value;
    var img = document.querySelector("#HinhSP").value;
    var desc = document.querySelector("#motaSP").value;
    var type = document.querySelector("#ThuongHieuSP").value;
    var spUpdate = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);

    console.log(spUpdate)

    spService.updateProduct(id, spUpdate)
        .then(function (result) {
            console.log(result)
            document.querySelector("#myModal .close").click();

            getProductList();
        })
        .catch(function (error) {
            console.log(error)
        })

}
