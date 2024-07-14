function preventSubmit(event) {
    event.preventDefault()
    window.location.href = "./pages/recepcionista/home.html"
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', preventSubmit);
});