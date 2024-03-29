"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
const getTime = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return formatter.format(now);
};
exports.getTime = getTime;
