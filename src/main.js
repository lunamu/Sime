const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 初始化Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyCapf64qEh6ltrxEsVnQ--w3G4yTBcwAjQ');

// 处理来自渲染进程的消息
ipcMain.handle('send-message', async (event, message) => {
  console.log('主进程收到消息:', message);
  return `这是对 "${message}" 的测试响应`;
});

// 简单的TTS函�� (需要进一步实现)
async function textToSpeechSime(text) {
  // 这里需要实现TTS逻辑
  console.log("TTS: ", text);
}

// Your message handling function
async function yourMessageHandlingFunction(message) {
  // Implement your message handling logic here
  // For example:
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(message);
  const response = await result.response;
  const text = response.text();
  
  // 使用TTS将响应转换为语音
  await textToSpeechSime(text);
  
  return text;
}