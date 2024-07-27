document.addEventListener('DOMContentLoaded', () => {
    const manueContainer = document.getElementById('manue_container');
    
    async function getManue() {
       let response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
       let data = await response.json();
       console.log(data);
       return data;
    }
    
    let manueList= getManue();
    
    manueList
    .then((data) => {
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
    })
    
    });