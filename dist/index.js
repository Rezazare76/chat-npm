"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const react_1 = require("react");
const data_1 = require("./data/data");
require("./style.css");
const react_2 = __importDefault(require("react"));
const util_1 = require("./util/util");
exports.Chat = (0, react_1.memo)(({ className, greetingMessage, messageList, positions, dir, logo, onChange, clear, }) => {
    const [list, setList] = (0, react_1.useState)(messageList || undefined);
    // const [inputMessage, setInputMessage] = useState("");
    const inputMessage = (0, react_1.useRef)(null);
    const [showChat, setShowChat] = (0, react_1.useState)(false);
    const [fullScreen, setFullScreen] = (0, react_1.useState)(false);
    const chatContainerRef = (0, react_1.useRef)(null);
    const handleSendMessage = (type) => {
        if (inputMessage.current) {
            const value = inputMessage.current.value;
            if (value.trim() === "")
                return;
            const newMessage = {
                type,
                text: value,
                position: "user", // Assuming this message is from the user
                time: (0, util_1.getTime)(),
            };
            setList((prevList) => prevList ? [...prevList, newMessage] : [newMessage]);
            inputMessage.current.value = "";
        }
    };
    (0, react_1.useEffect)(() => {
        onChange(list || []);
    }, [list]);
    const handleKeyPress = (e) => {
        if (inputMessage.current)
            if (e.key === "Enter" && inputMessage.current.value.length > 0) {
                handleSendMessage("text");
            }
    };
    // **********end ticket_message/create**************
    (0, react_1.useEffect)(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [list]);
    const handleFileInputChange = (event) => {
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
        reader.onload = (e) => {
            // Save the image to local storage
            const base64Data = e.target.result;
            const newMessage = {
                type: "image",
                text: base64Data,
                position: "user", // Assuming this message is from the user
                time: (0, util_1.getTime)(),
            };
            console.log(newMessage);
            setList((prev) => [...(prev || []), newMessage]);
        };
        reader.readAsDataURL(file);
    };
    return (react_2.default.createElement("main", { className: "chat-bot", style: {
            top: positions === null || positions === void 0 ? void 0 : positions.top,
            right: positions === null || positions === void 0 ? void 0 : positions.right,
            bottom: positions === null || positions === void 0 ? void 0 : positions.bottom,
            left: positions === null || positions === void 0 ? void 0 : positions.left,
        } },
        react_2.default.createElement("span", { className: "open-chat cursor-pointer rounded-full bg-primary p-3 text-secondary", onClick: () => {
                setFullScreen(false);
                setShowChat(showChat == false ? "welcome" : false);
            } },
            react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 20, viewBox: "0 0 24 24", fill: "currentColor" },
                react_2.default.createElement("path", { d: data_1.icons.chat }))),
        showChat && (react_2.default.createElement("section", { className: `${className} ${dir} ${fullScreen} chatbot-container  absolute flex   flex-col
             overflow-hidden rounded  `, onKeyDown: handleKeyPress },
            showChat == "welcome" && (react_2.default.createElement("div", { className: "welcome absolute flex h-full w-full flex-col items-center justify-center " },
                react_2.default.createElement("span", { className: "close-chat absolute  flex  cursor-pointer p-1 text-white", onClick: () => setShowChat(false) },
                    react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: 20 },
                        react_2.default.createElement("path", { d: data_1.icons.close }))),
                react_2.default.createElement("div", { className: "rounded-full bg-white bg-opacity-10 p-1 shadow-xl" },
                    react_2.default.createElement("div", { className: "rounded-full bg-white bg-opacity-10 p-1" },
                        react_2.default.createElement("div", { className: "rounded-full  bg-white p-3" },
                            react_2.default.createElement("img", { src: logo, width: 40, height: 40 })))),
                react_2.default.createElement("span", { className: "mt-5 font-bold text-white" }, "How can i help you?"),
                react_2.default.createElement("button", { className: "mt-10 rounded bg-white px-5 py-1 text-primary", onClick: () => setShowChat("chat") }, "Start Chat!"))),
            react_2.default.createElement("header", { className: "flex justify-between p-2 text-primary" },
                react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "cursor-pointer", width: 20, onClick: () => {
                        setFullScreen(false);
                        setShowChat("welcome");
                    } },
                    react_2.default.createElement("path", { d: data_1.icons.arrow })),
                react_2.default.createElement("span", { className: "flex items-center gap-5" },
                    react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: 20, onClick: () => {
                            clear();
                            setList(undefined);
                        } },
                        react_2.default.createElement("path", { d: data_1.icons.add })),
                    react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "cursor-pointer", width: 20, onClick: () => setFullScreen(!fullScreen) },
                        react_2.default.createElement("path", { d: data_1.icons[fullScreen ? "fullScreenExit" : "fullScreen"] })))),
            react_2.default.createElement("ul", { className: "chat-messages  flex h-full flex-grow  flex-col", ref: chatContainerRef },
                react_2.default.createElement("li", { className: "flex w-full  items-end" },
                    react_2.default.createElement("i", { className: "mx-2 rounded-full bg-secondary p-2 text-primary", style: { width: "20px", height: "20px" } },
                        react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: 20 },
                            react_2.default.createElement("path", { d: data_1.icons.bot }))),
                    react_2.default.createElement("div", { className: `w-60 rounded rounded-tl-none bg-secondary p-3 text-primary` }, greetingMessage)), list === null || list === void 0 ? void 0 :
                list.map((message, index) => (react_2.default.createElement("li", { key: index, className: `flex w-full  items-end ${message.position === "user" && "flex-row-reverse self-end "}` },
                    message.position == "bot" && (react_2.default.createElement("i", { className: "mx-2 rounded-full bg-secondary p-2 text-primary", style: { width: "20px", height: "20px" } },
                        react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: 20 },
                            react_2.default.createElement("path", { d: data_1.icons.bot })))),
                    react_2.default.createElement("div", { className: `w-60 rounded p-3  ${message.position === "user"
                            ? "rounded-tr-none bg-primary text-secondary"
                            : "  rounded-tl-none bg-secondary text-primary"}` },
                        message.type == "text" ? (message === null || message === void 0 ? void 0 : message.text) : (react_2.default.createElement("img", { src: message.text })),
                        react_2.default.createElement("div", { className: `mt-2 flex flex-row-reverse items-center  text-xs text-secondary` },
                            message.position == "user" && (react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 16, viewBox: "0 0 24 24", className: "ms-1", fill: "currentColor" },
                                react_2.default.createElement("path", { d: data_1.icons.doubleCheck }))),
                            message.time)))))),
            react_2.default.createElement("aside", { className: " m-1 mt-0 rounded bg-primary p-1" },
                react_2.default.createElement("div", { className: "flex items-center rounded-md bg-secondary bg-opacity-15 px-2 text-secondary" },
                    react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 20, fill: "currentColor" },
                        react_2.default.createElement("path", { d: data_1.icons.camera })),
                    react_2.default.createElement("input", { type: "text", className: " h-full w-full flex-grow rounded-sm bg-transparent p-2", ref: inputMessage, placeholder: "Message" }),
                    react_2.default.createElement("div", { className: "file-picker flex cursor-pointer  overflow-hidden" },
                        react_2.default.createElement("input", { type: "file", accept: "image/png, image/jpeg", className: "input-file-picker absolute  ", onChange: handleFileInputChange, size: 5 * 1024 }),
                        react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 15, fill: "currentColor", className: "" },
                            react_2.default.createElement("path", { d: data_1.icons.link }))),
                    react_2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 20, className: "ml-1 cursor-pointer", fill: "currentColor", onClick: () => handleSendMessage("text") },
                        react_2.default.createElement("path", { d: data_1.icons.send }))))))));
});
exports.Chat.displayName = "Chat";
exports.Chat.defaultProps = {
    className: "",
    dir: "ltr",
};
