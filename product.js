let UserName = [["admin1", "admin2", "admin3"], ["12345", "45678", "78901"]];

let login = function () {
    let userName = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    if (userName.trim() === '') {
        alert("Nhập lại tên");
    } else if (password.trim() === '') {
        alert("Nhập lại mật khẩu")
    } else {
        for (let i = 0; i < UserName[0].length; i++) {
            if (userName === UserName[0][i] && password === UserName[1][i]) {
                alert("Đăng nhập thành công");
                return window.location = "new.html"
            }
        }

    }
};


let addMode = true;

function appendHeader() {
    document.getElementById("hidden-content").classList.remove("hidden-table");
}

function Product(index, productCode, fullName, picture, producer, productDes, status, price) {
    this.index = index;
    this.productCode = productCode;
    this.fullName = fullName;
    this.picture = picture;
    this.producer = producer;
    this.productDes = productDes;
    this.status = status;
    this.price = price;

    this.showInList = function () {
        let str = "";
        str += "<td>" + this.index + "</td>";
        str += "<td>" + this.productCode + "</td>";
        str += "<td>" + this.fullName + "</td>";
        str += "<td>" + "<img style='width: 80px; height: 60px' src=" + this.picture + ">" + "</td>";
        str += "<td>" + this.producer + "</td>";
        str += "<td>" + this.productDes + "</td>";
        str += "<td>" + this.price + "</td>";
        str += "<td>" + this.status + "</td>";

        str += "<td>" +
            "<button><img onclick=\"editProduct('" + this.productCode + "')\" src='images/edit-icon..jpg' width='20px' height='20px' alt='edit-icon'></button>" +
            "<button><img onclick=\"removeProduct('" + this.productCode + "')\" src='images/trash-icon..png' width='20px' height='20px' alt='trash-icon'></button></td>";

        str = "<tr >" + str + "</tr>";


        let tbody = document.getElementById("content").getElementsByTagName("tbody")[0];
        let newRow = tbody.insertRow();
        newRow.innerHTML = str;
        newRow.setAttribute("id", this.productCode);
    };

    this.update = function (index, productCode, fullName, picture, producer, productDes, status, price) {
        this.index = index;
        this.productCode = productCode;
        this.fullName = fullName;
        this.picture = picture;
        this.producer = producer;
        this.productDes = productDes;
        this.status = status;
        this.price = price;

    }
}

let productList = [];

function openDialog() {
    document.getElementById("dialog").style.display = "block";
}

function closeDialog() {
    document.getElementById("dialog").style.display = "none";
}

function addProduct() {
    //get value from form.
    let index = document.getElementById("number").value;
    let id = document.getElementById("id").value;
    let fullName = document.getElementById("fullName").value;
    let picture = document.getElementById("picture").value;
    let producer = document.getElementById("producer").value;
    let productDes = document.getElementById("describe").value;

    let statuses = document.getElementsByName("status");

    //get checked value from list option.
    let status = "";
    for (let i = 0; i < statuses.length; i++) {
        if (statuses[i].checked) {
            status = statuses[i].value;
        }
    }
    let price = document.getElementById("price").value;

    if (addMode) {
        let x = new Product(index, id, fullName, picture, producer, productDes, status, price);
        x.showInList();
        productList.push(x);
    } else {
        let x;
        for (let i in productList) {
            if (productList[i].productCode === id) {
                x = productList[i];
                break;
            }
        }
        x.update(index, fullName, picture, producer, productDes, status, price);
        appendHeader();
        refreshList();
    }
    closeDialog();

}

function removeProduct(productCode) { // xoa dua theo ma san pham//
    document.getElementById(productCode).style.display = "none";

    for (let i in productList) {
        if (productList[i].productCode === productCode) {
            productList.splice(i, 1);
        }
    }

}

function editProduct(productCode) {
    for (let i in productList)
        if (productList[i].productCode === productCode) {
            productList[i].stt = document.getElementById("number").value;
            productList[i].productCode = document.getElementById("id").value;
            productList[i].fullName = document.getElementById("fullName").value;
            productList[i].picture = document.getElementById("picture").value;
            productList[i].producer = document.getElementById("producer").value;
            productList[i].productDes = document.getElementById("describe").value;

            let currentStatus = document.getElementsByName("status");
            for (let j in currentStatus)
                if (currentStatus[j].value === productList[i].status)
                    currentStatus[j].checked = true;

            productList[i].price = document.getElementById("price").value;

            addMode = false;
            openDialog();
            break;

        }
}

function refreshList() {
    let tbody = document.getElementById("content").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for (let i in productList)
        productList[i].showInList();
}
