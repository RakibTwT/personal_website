function toggleSellerForm() {
  const form = document.getElementById('sellerForm');
  form.classList.toggle('hidden');
  document.getElementById('errorMsg').textContent = '';
  resetIcons();
}

function validateInput(input, type) {
  const value = input.value.trim();
  const icon = document.getElementById(`icon-${type}`);
  let isValid = false;

  if (type === "name" || type === "business") {
    isValid = value.length >= 2;
  }

  if (type === "email") {
    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  icon.className = isValid ? "icon valid" : "icon invalid";
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const business = document.getElementById("business").value.trim();
  const error = document.getElementById("errorMsg");

  if (!name || !email || !business) {
    error.textContent = "All fields are required.";
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = "Please enter a valid email address.";
    return false;
  }

  alert("Seller registration submitted successfully!");
  return true;
}

function resetIcons() {
  ["name", "email", "business"].forEach(id => {
    document.getElementById(`icon-${id}`).className = "icon";
  });
}
