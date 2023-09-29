const generate_btn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');


//Handling Copy Button
function copyButton() {

    let textArea = document.createElement('textarea')
    let generated_password = document.getElementById('generated_password');

    textArea.value = generated_password.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    copyBtn.style.color = 'green';
    copyBtn.innerHTML = `<i class="fa-solid fa-check fa-beat-fade"></i>`

    document.body.removeChild(textArea);

}

// Re- Generate Password

async function reGeneratePassword() {

    generate_btn.innerHTML = `<i class="fa-solid fa-rotate fa-spin"></i>`
    copyBtn.innerHTML = `<i class="fa-solid fa-copy fa-beat"></i>`
    copyBtn.style.color = 'black';
    let password = await get_random_password()

    let generated_password = document.getElementById('generated_password');
    generated_password.innerHTML = password

    generate_btn.innerHTML = `<i class="fa-solid fa-rotate"></i>`

}

// Calling API

async function get_random_password() {

    let api_url = '/random_password'
    let response = await fetch(api_url)
    let data = await response.json()
    return data
}


copyBtn.addEventListener('click', copyButton);

generate_btn.addEventListener('click', reGeneratePassword);


let data = get_random_password()
data.then((password) => {
    let generated_password = document.getElementById('generated_password');
    generated_password.innerHTML = password
})


