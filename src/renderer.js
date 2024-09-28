const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const responseDiv = document.getElementById('response');

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = messageInput.value;
  messageInput.value = '';
  
  showLoading();
  
  try {
    const response = await window.electronAPI.sendMessage(message);
    displayResponse(response);
  } catch (error) {
    displayError(error.message);
  }
});

function showLoading() {
  responseDiv.innerHTML = '<div class="loading">正在处理...<div class="spinner"></div></div>';
}

function displayResponse(text) {
  responseDiv.innerHTML = `
    <div class="response-container">
      <h3>回复：</h3>
      <div class="response-text">${formatText(text)}</div>
    </div>
  `;
}

function displayError(errorMessage) {
  responseDiv.innerHTML = `
    <div class="error-container">
      <h3>错误：</h3>
      <div class="error-text">${errorMessage}</div>
    </div>
  `;
}

function formatText(text) {
  // 将换行符转换为 HTML
}