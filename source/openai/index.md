---
title: Chat with GPT
date: 2024-08-01 12:00:00
layout: openai
---

<div class="chat-container">
  <div id="chatlog" class="chat-log"></div>
  <div class="chat-input-container">
    <input type="text" id="prompt-textarea" name="text" placeholder="Type your message here..." class="input">
    <button id="send-button" class="chat-send-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"></svg>
        <path fill="currentColor" fill-rule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clip-rule="evenodd"></path>
      </svg>
    </button>
  </div>
</div>

<style>
  .chat-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f4f4f4;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .chat-log {
    height: 300px;
    overflow-y: scroll;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
  .chat-input-container {
    display: flex;
    align-items: center;
  }
  .input[type="text"] {
    display: block;
    color: rgb(34, 34, 34);
    background: linear-gradient(142.99deg, rgba(217, 217, 217, 0.63) 15.53%, rgba(243, 243, 243, 0.63) 88.19%);
    box-shadow: 0px 12px 24px -1px rgba(0, 0, 0, 0.18);
    border-color: rgba(7, 4, 14, 0);
    border-radius: 50px;
    block-size: 20px;
    margin: 7px auto;
    padding: 18px 15px;
    outline: none;
    text-align: center;
    width: 200px;
    transition: 0.5s;
  }
  .input[type="text"]:hover {
    width: 240px;
  }
  .input[type="text"]:focus {
    width: 280px;
  }
  .chat-send-button {
    width: 40px;
    height: 40px;
    background-color: #007bff;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 10px;
  }
  .chat-send-button:hover {
    background-color: #0056b3;
  }
  .chat-send-button svg {
    width: 20px;
    height: 20px;
  }
</style>

<script>
async function sendMessage() {
  const userInput = document.getElementById('prompt-textarea').value;
  const response = await fetch('https://api.chatanywhere.tech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-M7rxPZ29Mmt4JQ3yKHGa0HJwkIQkO90CapMjRMYoEa9IX36Z'
    },
    body: JSON.stringify({
      prompt: userInput,
      max_tokens: 150
    })
  });
  const data = await response.json();
  const chatlog = document.getElementById('chatlog');
  chatlog.innerHTML += `<div><b>You:</b> ${userInput}</div>`;
  chatlog.innerHTML += `<div><b>Bot:</b> ${data.choices[0].text}</div>`;
  document.getElementById('prompt-textarea').value = '';
  chatlog.scrollTop = chatlog.scrollHeight;
}

document.getElementById('send-button').addEventListener('click', sendMessage);
</script>
