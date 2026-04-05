const apiUrl = 'https://7107.api.greenapi.com';

async function request(method, body = null) {
    const id = document.getElementById('idInstance').value;
    const token = document.getElementById('apiTokenInstance').value;
    const responseField = document.getElementById('responseField');
    
    const url = `${apiUrl}/waInstance${id}/${method}/${token}`;
    
    try {
        const response = await fetch(url, {
            method: body ? 'POST' : 'GET',
            body: body ? JSON.stringify(body) : null
        });
        const data = await response.json();
        responseField.value = JSON.stringify(data, null, 4);
    } catch (error) {
        responseField.value = "Ошибка: " + error.message;
    }
}

function getSettings() { request('getSettings'); }
function getStateInstance() { request('getStateInstance'); }

function sendMessage() {
    const chatId = `${document.getElementById('phoneNumber').value}@c.us`;
    const message = document.getElementById('messageText').value;
    request('sendMessage', { chatId, message });
}

function sendFileByUrl() {
    const chatId = `${document.getElementById('filePhoneNumber').value}@c.us`;
    const urlFile = document.getElementById('fileUrl').value;
    const fileName = urlFile.split('/').pop();
    request('sendFileByUrl', { chatId, urlFile, fileName });
}
