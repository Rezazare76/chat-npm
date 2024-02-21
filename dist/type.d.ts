/// <reference types="react" />
export type messageType = {
    text: string;
    position: "user" | "bot";
    type: "text" | "image" | "pdf";
    time: string;
};
export default interface ChatProps {
    className?: string;
    dir?: "rtl" | "ltr";
    logo: string;
    clear: () => void;
    greetingMessage: string;
    messageList?: messageType[];
    children?: React.ReactNode;
    onChange: (value: messageType[]) => void;
    positions?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
}
