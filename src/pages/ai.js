import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const HolidayChaloAI = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const chatOutputRef = useRef(null);
  const userInputRef = useRef(null);

  // const fetchChatData = async (userInput) => {
  //   try {
  //     const apiUrl = 'https://backend.holidaysocho.com/chat/';
  //     const headers = new Headers();
  //     headers.append('Content-Type', 'application/json');

  //     const data = {
  //       userInput,
  //     };

  //     const requestOptions = {
  //       method: 'POST',
  //       headers: headers,
  //       body: JSON.stringify(data),
  //     };

  //     // Show "Generating Response" message
  //     updateChatOutput('Generating Response...', false);

  //     const response = await fetch(apiUrl, requestOptions);
  //     const responseData = await response.json();

  //     // Remove the "Generating Response" message and display the actual response
  //     chatOutputRef.current.removeChild(chatOutputRef.current.lastChild);
  //     updateChatOutput(responseData.response || 'No response available', false);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchChatData = async (userInput) => {
    try {
      const apiKey = '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'; // Replace with your actual OpenAI API key
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      });
  
      const data = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userInput },
        ],
        max_tokens: 2000,
        presence_penalty: 0.0,
        frequency_penalty: 0.0,
      };
  
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      };
  
      // Show "Generating Response" message
      updateChatOutput('Generating Response...', false);
  
      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();
  
      // Remove the "Generating Response" message and display the actual response
      chatOutputRef.current.removeChild(chatOutputRef.current.lastChild);
      updateChatOutput(responseData.choices[0].message.content || 'No response available', false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const updateChatOutput = (output, isFormResponse = false) => {
    const chatOutput = chatOutputRef.current;
    if (isFormResponse) {
      chatOutput.innerHTML += `<div class="formOutput"><strong>USER:</strong> ${output}</div>`;
    } else {
      chatOutput.innerHTML += `<p><strong>Ocean Friend AI:</strong> ${output}</p>`;
    }
    chatOutput.scrollTop = chatOutput.scrollHeight;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userInput = userInputRef.current.value;
    updateChatOutput(userInput, true);

    // Fetch data from the API
    await fetchChatData(userInput);

    userInputRef.current.value = '';
  };
  const toggleChat = () => {
    setChatOpen((prevState) => !prevState);
  };

  const closeChat = () => {
    setChatOpen(false);
  };


  return (
    <>

<Head>
        <title>Ocean Friend AI Chat Bot</title>
        <meta name="description" content="Ocean Friend AI Chat Bot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="header">
        <h1>Welcome to Ocean Friend AI Chat Bot :)</h1>
        <div>
          <a href="https://ocean-friends-site.netlify.app/" target="_blank">
            Go to Ocean-friends Web Page
          </a>
        </div>
      </div>

      <div className="content">
        <p>1. Click on the  "Open Chat" to talk to Ocean friend AI. You will find it in Bottom Right of this page</p>
        <p>2. Ask Questions that you have regarding Health.</p>
        <p>3. Explore more by talking to the Ocean friend AI.</p>
        <p>4. Receive personalized health advice</p>
        <p>5. Access a vast knowledge base: With Ocean friend AI, you can tap into a wealth of information on various health topics</p>
        <p>6. Get tips for a healthier lifestyle: </p>
        <p>7. Learn about common health conditions, their symptoms, and treatment options.</p>
        <p>You can click to the Chat Button, and a pop-up will open, allowing you to interact with Ocean Friend AI for answers to your health-related questions.</p>
      </div >

      <div className="content">
        <h4>How to use Ocean Friend AI ?</h4>
        <h4>You can start with Queries Like :- What are Symptoms of Cold ?</h4>
        <h4>How ton Recovery Quickly From Typhoid </h4>
      
     <h4>What should I eat to keep myself Fita nd Fine </h4>

        <h4>Note :- These are just Examples , you can also ask your Customized queries and you will get Answer from Ocean friend AI.</h4>
      </div>

      <div className="chat-toggle-container">
        <button className="toggle-chat-button" onClick={toggleChat}>
          Open Chat
        </button>
        {isChatOpen && (
          <div className="popup-chat">
            <div className="chat-header">
              <span>Ocean Friend AI</span>
              <button className="close-chat-button" onClick={closeChat}>
                Close
              </button>
            </div>
            <div id="chatContainer">
              <div id="chatOutput" ref={chatOutputRef}>
                <p>
                  <strong>Ocean Friend AI:</strong> Hello! I am Ocean Friend AI. How can I assist you?
                </p>
              </div>
              <form id="chatForm" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  id="userInput"
                  name="userInput"
                  autoComplete="off"
                  placeholder="Type your message..."
                  ref={userInputRef}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>
        {`
          body {
            font-family: Arial, sans-serif;
          }
          .header {
            text-align: center;
            padding: 20px;
          }
          h1 {
            margin: 0;
          }
          .content {
            text-align: center;
            margin: 20px;
          }
          .chat-toggle-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
          }
          .popup-chat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 400px;
            border-radius: 8px;
          }
          // ... (remaining styles)
        `}
      </style>

      <style jsx>
        {`
          .chat-header {
            background-color: #f0f0f0;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
          }
          .chat-header span {
            font-weight: bold;
          }
          .close-chat-button {
            background-color: #e0e0e0;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
          // ... (existing styles)
        `}
      </style>

      <style jsx>
        {`
          #chatContainer {
            max-width: 400px;
            margin: 0;
            padding: 20px;
          }
          #chatOutput {
            width: 100%;
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
          }
          form {
            margin-top: 10px;
            display: flex;
          }
          input[type='text'] {
            flex: 1;
            padding: 10px;
          }
          button[type='submit'] {
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
          }
          .formOutput {
            margin-top: 10px;
            font-weight: bold;
            color: #000000;
          }
          .toggle-chat-button {
            display: block;
            margin: 10px auto;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
          }
        `}
      </style>
      <style jsx>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2; /* Set a background color */
            color: #333; /* Set text color */
            margin: 0;
            padding: 0;
          }
          .header {
            text-align: center;
            padding: 20px;
            background-color: #0078d4; /* Set header background color */
            color: #fff; /* Set header text color */
          }
          h1 {
            margin: 0;
            font-size: 32px; /* Increase font size */
          }
          a {
            color: #0078d4; /* Style the link color */
            text-decoration: none;
            font-weight: bold; /* Make the link text bold */
          }
          a:hover {
            text-decoration: underline; /* Underline on hover */
          }
          .content {
            text-align: center;
            margin: 20px;
            background-color: #fff; /* Set content background color */
            padding: 20px;
            border-radius: 8px; /* Add rounded corners */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
          }
          .chat-toggle-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
          }
          .popup-chat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 400px;
            border-radius: 8px;
          }
          // ... (remaining styles)
        `}
      </style>

      <style jsx>
        {`
          .chat-header {
            background-color: #f0f0f0;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
          }
          .chat-header span {
            font-weight: bold;
            font-size: 20px; /* Increase header font size */
          }
          .close-chat-button {
            background-color: #e0e0e0;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
          // ... (existing styles)
        `}
      </style>

      <style jsx>
        {`
          // ... (existing styles)
          button.toggle-chat-button {
            background-color: #0078d4;
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
          }
          button.toggle-chat-button:hover {
            background-color: #005a9e; /* Darker background on hover */
          }
          button.close-chat-button {
            background-color: #e0e0e0;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
          button.close-chat-button:hover {
            background-color: #c7c7c7; /* Darker background on hover */
          }
          .chat-toggle-container {
            text-align: center;
          }
        `}
      </style>


    </>
  );
};

export default HolidayChaloAI;