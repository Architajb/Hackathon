document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  // Dummy credentials
  if (username === "admin" && password === "admin123") {
    if (role === "seller") {
      window.location.href = "seller_home.html";
    } else if (role === "vendor") {
      window.location.href = "vendor_home.html";
    }
  } else {
    alert("Invalid credentials. Try admin / admin123");
  }
});
