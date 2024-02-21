# Live Demo

🔗 [gh pages](https://rezazare76.github.io/chat-bot/)

# videorepute-chat-interview

A simple and efficient npm package for integrating a chatbot into your application, designed specifically for VideoRepute interview preparation.

## Prerequisites

Before installing this package, please ensure that you have React version 18.2 or higher installed in your project.

## Installation

You can install this package via npm:

```bash
npm install videorepute-chat-interview
```

## Usage
```tsx
import { Chat } from "videorepute-chat-interview";
import logo from "./assets/images/logo.svg";

function App() {
  // Define functions to save and clear messages in local storage
  const saveMessage = (messages: messageType[]) => {
    localStorage.setItem("dataMessage", JSON.stringify(messages));
  };

  const clearMessage = () => {
    localStorage.removeItem("dataMessage");
  };

  return (
    <Chat
      greetingMessage="Hello! Welcome to the interview chatbot."
      logo={logo}
      clear={clearMessage}
      onChange={saveMessage}
      dir="rtl"
    />
  );
}

export default App;

```

## Props

* greetingMessage: The initial message displayed by the chatbot.
* image displayed in the chatbot.
* clear: Function to clear messages from local storage.
* onChange: Function called when messages are updated.
* dir: Text direction (rtl or ltr).
