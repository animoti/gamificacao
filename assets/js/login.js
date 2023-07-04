const IP = 'http://localhost:3000';
const passwordEye = document.querySelector('.password-icon');

passwordEye.addEventListener('click', function() {
    const passwordInput = document.querySelector('#password');
    if (passwordEye.classList.contains('fa-eye-slash')) {
        passwordEye.classList.replace('fa-eye-slash','fa-eye')
        passwordInput.type = "text";   
    }else{
        passwordEye.classList.replace('fa-eye','fa-eye-slash')  
        passwordInput.type = "password";  
    }    
})

$('.form-container').on('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${IP}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        window.location.href = 'home.html'; 
      } else {
        console.error('Erro ao fazer login', data.message);
      }
    } catch (err) {
      console.error('Erro ao fazer login', err);
    }
});