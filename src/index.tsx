import { FC, memo, useState, useRef, useEffect } from "react";
import ChatProps from "./type";
import { icons } from "./data/data";
import { messageType } from "./type";

import "./style.scss";
import React from "react";
export const Chat: FC<ChatProps> = memo(
  ({
    className,
    greetingMessage,
    messageList,
    positions,
    dir,
    logo,
    onChange,
    clear,
  }) => {
    const [list, setList] = useState<messageType[] | undefined>(
      messageList || undefined
    );
    // const [inputMessage, setInputMessage] = useState("");
    const inputMessage = useRef<HTMLInputElement>(null);
    const [showChat, setShowChat] = useState<boolean | "welcome" | "chat">(
      false
    );
    const [fullScreen, setFullScreen] = useState(false);
    const chatContainerRef = useRef<HTMLUListElement | null>(null);

    const handleSendMessage = (type: "text" | "image" | "pdf") => {
      if (inputMessage.current) {
        const value = inputMessage.current.value;
        if (value.trim() === "") return;
        const newMessage: messageType = {
          type,
          text: value,
          position: "user", // Assuming this message is from the user
          time: getTime(),
        };
        setList((prevList) =>
          prevList ? [...prevList, newMessage] : [newMessage]
        );
        inputMessage.current.value = "";
      }
    };
    useEffect(() => {
      onChange(list || []);
    }, [list]);
    const handleKeyPress = (e: { key: string }) => {
      if (inputMessage.current)
        if (e.key === "Enter" && inputMessage.current.value.length > 0) {
          handleSendMessage("text");
        }
    };

    // **********end ticket_message/create**************

    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, [list]);

    const handleFileInputChange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      if (!file) {
        return;
      }
      const maxSize = 50 * 1024;
      if (file.size > maxSize) {
        alert("maxim size is 50kb");
        return;
      }
      reader.onload = (e: any) => {
        // Save the image to local storage
        const base64Data = e.target.result as string;
        const newMessage: messageType = {
          type: "image",
          text: base64Data,
          position: "user", // Assuming this message is from the user
          time: getTime(),
        };
        console.log(newMessage);
        setList((prev) => [...(prev || []), newMessage]);
      };

      reader.readAsDataURL(file);
    };
    return (
      <main
        className="chat-bot"
        style={{
          top: positions?.top,
          right: positions?.right,
          bottom: positions?.bottom,
          left: positions?.left,
        }}
      >
        <span
          className=" cursor-pointer rounded-full bg-[#632AE8] p-3 text-[#eeeeee]"
          onClick={() => {
            setFullScreen(false);
            setShowChat(showChat == false ? "welcome" : false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d={icons.chat} />
          </svg>
        </span>
        {showChat && (
          <section
            className={`${className} ${dir} ${fullScreen} chatbot-container  absolute flex   flex-col
             overflow-hidden rounded bg-[#fcfcfc] outline-[#632AE8] `}
            onKeyDown={handleKeyPress}
          >
            {showChat == "welcome" && (
              <div className="welcome absolute flex h-full w-full flex-col items-center justify-center ">
                <span
                  className="close-chat absolute  flex w-full cursor-pointer p-1 text-white"
                  onClick={() => setShowChat(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width={20}
                  >
                    <path d={icons.close} />
                  </svg>
                </span>
                <div className="rounded-full bg-white bg-opacity-10 p-1 shadow-xl">
                  <div className="rounded-full bg-white bg-opacity-30 p-1">
                    <div className="rounded-full  bg-white p-3">
                      <img src={logo} width={40} height={40} />
                    </div>
                  </div>
                </div>
                <span className="mt-5 font-bold text-white">
                  How can i help you?
                </span>
                <button
                  className="mt-10 rounded bg-white px-5 py-1 text-[#632AE8]"
                  onClick={() => setShowChat("chat")}
                >
                  Start Chat!
                </button>
              </div>
            )}
            <header className="flex justify-between p-2 text-[#632AE8]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="cursor-pointer"
                width={20}
                onClick={() => {
                  setFullScreen(false);
                  setShowChat("welcome");
                }}
              >
                <path d={icons.arrow} />
              </svg>
              <span className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={20}
                  onClick={() => {
                    clear();
                    setList(undefined);
                  }}
                >
                  <path d={icons.add} />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="cursor-pointer"
                  width={20}
                  onClick={() => setFullScreen(!fullScreen)}
                >
                  <path
                    d={icons[fullScreen ? "fullScreenExit" : "fullScreen"]}
                  />
                </svg>
              </span>
            </header>
            <ul
              className="chat-messages  flex h-full flex-grow  flex-col"
              ref={chatContainerRef}
            >
              <li className="flex w-full  items-end">
                <i className="mx-2 rounded-full bg-[#eeeeee] p-2 text-[#632AE8]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width={20}
                  >
                    <path d={icons.bot} />
                  </svg>
                </i>
                <div
                  className={`w-60 rounded rounded-tl-none bg-[#eeeeee] p-3 text-[#632AE8]`}
                >
                  {greetingMessage}
                </div>
              </li>
              {list?.map((message, index) => (
                <li
                  key={index}
                  className={`flex w-full  items-end ${
                    message.position === "user" && "flex-row-reverse self-end "
                  }`}
                >
                  {message.position == "bot" && (
                    <i className="mx-2 rounded-full bg-[#eeeeee] p-2 text-[#632AE8]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width={20}
                      >
                        <path d={icons.bot} />
                      </svg>
                    </i>
                  )}
                  <div
                    className={`w-60 rounded p-3  ${
                      message.position === "user"
                        ? "rounded-tr-none bg-[#632AE8] text-[#eeeeee]"
                        : "  rounded-tl-none bg-[#eeeeee] text-[#632AE8]"
                    }`}
                  >
                    {message.type == "text" ? (
                      message?.text
                    ) : (
                      <img src={message.text} />
                    )}

                    <div
                      className={`mt-2 flex flex-row-reverse items-center  text-xs text-[#eeeeee]`}
                    >
                      {message.position == "user" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          viewBox="0 0 24 24"
                          className="ms-1"
                          fill="currentColor"
                        >
                          <path d={icons.doubleCheck} />
                        </svg>
                      )}
                      {message.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className=" m-1 mt-0 rounded bg-[#632AE8] p-1">
              <div className="flex items-center rounded-md bg-[#eeeeee] bg-opacity-15 px-2 text-[#eeeeee]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  fill="currentColor"
                >
                  <path d={icons.camera} />
                </svg>
                <input
                  type="text"
                  className=" h-full w-full flex-grow rounded-sm bg-transparent p-2"
                  ref={inputMessage}
                  placeholder="Message"
                />
                <div className="file-picker  cursor-pointer  overflow-hidden">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="input-file-picker absolute  "
                    onChange={handleFileInputChange}
                    size={5 * 1024}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={15}
                    fill="currentColor"
                    className=""
                  >
                    <path d={icons.link} />
                  </svg>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  className="ml-1 cursor-pointer"
                  fill="currentColor"
                  onClick={() => handleSendMessage("text")}
                >
                  <path d={icons.send} />
                </svg>
              </div>
            </aside>
          </section>
        )}
      </main>
    );
  }
);
Chat.displayName = "Chat";
Chat.defaultProps = {
  className: "",
  dir: "ltr",
};
