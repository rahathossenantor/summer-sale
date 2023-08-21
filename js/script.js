// sort version of document.getElementById();
function getElement(id) {
    return document.getElementById(id);
}

// get innerText value in number format
function getElementNumValue(id) {
    return parseFloat(getElement(id).innerText);
}

const couponInput = getElement("coupon-field");
const couponApplyBtn = getElement("coupon-apply-btn");

const cartProducts = getElement("cart-products");

let totalPrice = getElementNumValue("total-price");
const priceAfterDiscounts = getElementNumValue("discounts-price");
const grandTotalPrice = getElementNumValue("grand-total-price");

const purchaseBtn = getElement("purchase-btn");

// handling products
function handleCardClick(card) {
    const productPrice = parseFloat(card.childNodes[3].childNodes[5].childNodes[0].innerText);
    const productName = card.childNodes[3].childNodes[3].innerText;

    // creating product list
    let li = document.createElement("li");
    li.innerText = productName;
    cartProducts.appendChild(li);

    // updating product price
    totalPrice += productPrice;

    // setting product prices on UI
    getElement("total-price").innerText = totalPrice.toFixed(2);
    getElement("grand-total-price").innerText = totalPrice.toFixed(2);

    // making enable or disable coupon submit button
    if (totalPrice >= 200) {
        couponApplyBtn.disabled = false;
    } else {
        couponApplyBtn.disabled = true;
    }

    // making enable or disable purchase button
    if (totalPrice > 0) {
        purchaseBtn.disabled = false;
    } else {
        purchaseBtn.disabled = true;
    }
}

// event handler on coupon submit button
couponApplyBtn.addEventListener("click", function() {
    if (couponInput.value === "SELL200") {
        couponInput.value = "";
        couponApplyBtn.disabled = true;
        getElement("coupon-error").style.display = "none";

        // getting 20% discounts of the product's price
        // formula: x% of y = (x/100) * y
        const discounts = (20/100) * totalPrice;
        const payableAmount = totalPrice - discounts;

        // setting product prices after discounts on UI
        getElement("discounts-price").innerText = discounts.toFixed(2);
        getElement("grand-total-price").innerText = payableAmount.toFixed(2);
    } else {
        couponInput.value = "";
        couponInput.focus();
        getElement("coupon-error").style.display = "block";
    }
});