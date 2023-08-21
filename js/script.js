// sort version of document.getElementById();
function getElement(id) {
    return document.getElementById(id);
}

const couponApplyBtn = getElement("coupon-apply-btn");
const couponInput = getElement("coupon-field");
const totalPrice = parseFloat(getElement("total-price").innerText);

// event handler on coupon input field
couponInput.addEventListener("keyup", function(event) {
    const couponInputValue = event.target.value;
    
    if (couponInputValue === "SELL200" && totalPrice > 0) {
        couponApplyBtn.disabled = false;
        return;
    } else {
        couponApplyBtn.disabled = true;
        return;
    }
});

// event handler on coupon submit button
couponApplyBtn.addEventListener("click", function() {
    couponInput.value = "";
    couponApplyBtn.disabled = true;
    return;
});