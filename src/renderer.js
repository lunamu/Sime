const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const responseDiv = document.getElementById('response');

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = messageInput.value;
  messageInput.value = '';
  
  showLoading();
  
  try {
    console.log('发送消息:', message);
    const response = await window.electronAPI.sendMessage(message);
    console.log('收到响应:', response);
    if (response === undefined) {
      throw new Error('收到的响应是 undefined');
    }
    displayResponse(response);
  } catch (error) {
    console.error('错误:', error);
    displayError(error.message);
  }
});

function showLoading() {
  responseDiv.innerHTML = '<div class="loading">正在处理...<div class="spinner"></div></div>';
}

function displayResponse(text) {
  if (text === undefined || text === null) {
    responseDiv.innerHTML = '<div class="error-container"><h3>错误：</h3><div class="error-text">收到的响应是空的</div></div>';
  } else {
    responseDiv.innerHTML = `
      <div class="response-container">
        <h3>回复：</h3>
        <div class="response-text">${formatText(text)}</div>
      </div>
    `;
  }
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
  if (typeof text !== 'string') {
    return JSON.stringify(text);
  }
  return text.replace(/\n/g, '<br>');
}