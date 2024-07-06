
let container = document.getElementById("collection")
let btn1 = document.getElementById("radio-1")
let btn2 = document.getElementById("radio-2")
let btn3 = document.getElementById("radio-3")
container.innerHTML = ""
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(res => res.json())
    .then(data => {
        load(data, 'Men')
        btn1.addEventListener('click', () => filterByCategory(data, 'Men'))
        btn2.addEventListener('click', () => filterByCategory(data, 'Women'))
        btn3.addEventListener('click', () => filterByCategory(data, 'Kids'))
    })
    .catch(error => console.error('Error fetching data:', error));



function load(data, category) {
    container.innerHTML = "";
    for (let categoryData of data.categories) {
        if (!category || categoryData.category_name === category) {
            let products = categoryData.category_products;
            products.forEach(product => {
                const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
                container.innerHTML += createCard(product, discount);
            });
        }
    }
}

function filterByCategory(data, category) {
    container.innerHTML = "";
    for (let categoryData of data.categories) {
        if (categoryData.category_name === category) {
            let products = categoryData.category_products;
            products.forEach(product => {
                const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
                container.innerHTML += createCard(product, discount);
            });
        }
    }
}

function createCard(product, discount) {
    return `
        <div class="card">
            <img src="${product.image}" alt="">
            <p>${product.title} &nbsp<span><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 32 32">
                <path fill="currentColor" d="M16 1C7.716 1 1 7.716 1 16c0 8.284 6.716 15 15 15c8.284 0 15-6.716 15-15c0-8.284-6.716-15-15-15" />
            </svg></span>&nbsp ${product.vendor}</p>
            <p>Rs ${product.price} &nbsp&nbsp<del>${product.compare_at_price}</del>&nbsp&nbsp<span>${discount}% off</span></p>
            <button type="button">Add to cart</button>
        </div>`;
}

var img = document.getElementById("image")
var img1 = document.getElementById("image1")
var img2 = document.getElementById("image2")

btn2.addEventListener('click',function(){
    img.style.display="none";
    img1.style.display="inline";
})

btn3.addEventListener('click',function(){
    img1.style.display="none";
    img2.style.display="inline";
})
