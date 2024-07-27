document.addEventListener('DOMContentLoaded', () => {
    const manueContainer = document.getElementById('manue_container');

    async function getManue() {
        let response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        let data = await response.json();
        console.log(data);
        return data;
    }

    let manueList = getManue();

    manueList
        .then((data) => {
            return new Promise((resolve, reject) => {
                data.map((manue) => {
                    let card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
        <img class="card_img"src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
        <div class="card-contains d-flex justify-content-between">
            <div class="Item_detalis">
                <p class="item-name">${manue.name}</p>
                <span class="item_spna dolar">$</span><span class=" item_spna item-price">${manue.price}</span><span class="item_spna">/-</span>
            </div>
            <div class="add" >
                <i class="add-Icon fa-thin fa-plus"></i>
            </div>
        </div>
        `
                    manueContainer.appendChild(card);
                })

                resolve(data);
            })
        })
        .then((data) => {
            return TakeOrder(data)
        })
        .then((order) => {
            return   orderPrep(order);
        })
        .then((arr) => {
            return  payOrder(arr);
        })
        .then((arr) => {
            return  thankyouFnc(arr);
        })
        .catch((err) => {
            return alert(err);
        })
    

    function TakeOrder(data) {
        return new Promise((resolve, reject) => {
            let order = [];
            setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    let orderFromManue = data[parseInt(Math.random() * data.length + 1)];
                    order.push(orderFromManue);
                }

                let totalPrice = 0;
                for (let obj of order) {
                    totalPrice += obj.price;
                }
                const total = document.getElementById('total');
                total.innerText = totalPrice;
                resolve(order);
            }, 2500)
        })
    }

    function orderPrep(order) {
        return new Promise((resolve) => {
            let orderStatus = true;
            let paid = false;
            let arr = [orderStatus, paid];
            setTimeout(() => {
                if (order.length > 0) {
                    console.log(arr);
                    resolve([orderStatus, paid]);
                }
                else {
                    reject('Order Something Else!');
                };

            }, 1500);
        });
    }

    function payOrder(arr) {
        console.log(arr);
        return new Promise((resolve) => {
            setTimeout(() => {
                arr[1] = true;
                resolve(arr);
            }, 1000);
        });
    }

    function thankyouFnc(arr) {
        return new Promise((resolve, reject) => {
            if (arr[0] && arr[1]) {
                alert('Thank You For Your Order! Enjoy Your Food!');
                resolve(arr);
            } else {
                let str = "";
                if (!arr[0]) {
                    str += "Order Is Not Ready Yet, Please Wait! ";
                }
                if (!arr[1]) {
                    str += "Please Pay Your Order First!";
                }
                reject(str.trim());
            }
            window.location.href = "index.html";
        });
    }
    
});