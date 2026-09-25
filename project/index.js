let names = [];
let prices = [];
let discount = 0;

function addToCart(name, price) {
  if (localStorage.getItem("loggedIn") != "yes") {
    new bootstrap.Toast(document.getElementById("loginToast")).show();
    return;
  }
  names.push(name);
  prices.push(price);

  document.getElementById("cartCount").innerText = names.length;
  document.getElementById("cartCount").classList.remove("d-none");

  showCart();
}

function goToCheckout() {
  if (localStorage.getItem("loggedIn") != "yes") {
    new bootstrap.Toast(document.getElementById("loginToast")).show();
    return;
  }
  location.href = "checkout.html";
}

function showCart() {
  let text = "";

  for (let i = 0; i < names.length; i++) {
    text =
      text +
      '<div class="cart-item"><span>' +
      names[i] +
      "</span><strong>" +
      prices[i] +
      " EGP</strong></div>";
  }

  document.getElementById("bagLines").innerHTML = text;
  calculateTotal();
}

function calculateTotal() {
  let total = 0;

  for (let i = 0; i < prices.length; i++) {
    total = total + prices[i];
  }

  let discountValue = total * discount;
  let finalTotal = total - discountValue;

  document.getElementById("sub").innerText = total.toFixed(2) + " EGP";
  document.getElementById("disc").innerText =
    "-" + discountValue.toFixed(2) + " EGP";
  document.getElementById("total").innerText = finalTotal.toFixed(2) + " EGP";

  if (discount > 0) {
    document.getElementById("discRow").classList.remove("d-none");
  } else {
    document.getElementById("discRow").classList.add("d-none");
  }
}

function applyDiscount() {
  let promo = document.getElementById("promo").value;

  if (promo == "GLOW15") {
    discount = 0.3;
    document.getElementById("promoMsg").innerText = "30% discount applied ✓";
  } else {
    discount = 0;
    document.getElementById("promoMsg").innerText = "Invalid promo code";
  }

  calculateTotal();
}

function signUp() {
  let password = document.getElementById("signPassword").value;
  let confirm = document.getElementById("signConfirm").value;

  if (password != confirm) {
    document.getElementById("passError").innerText = "Passwords do not match";
    return false;
  }

  localStorage.setItem("loggedIn", "yes");
  return true;
}

if (
  localStorage.getItem("loggedIn") == "yes" &&
  document.getElementById("userMenu")
) {
  document.getElementById("loginLink").style.display = "none";
  document.getElementById("userMenu").className = "dropdown";
}

function resetPassword() {
  let password = document.getElementById("signPassword").value;
  let confirm = document.getElementById("signConfirm").value;

  if (password != confirm) {
    document.getElementById("passError").innerText = "Passwords do not match";
    return false;
  }

  localStorage.setItem("loggedIn", "yes");
  return true;
}
function signOut() {
  localStorage.removeItem("loggedIn");
  location.reload();
}
function confirmOrder() {
  new bootstrap.Toast(document.getElementById("orderToast")).show();
  return false;
}
