"use strict";
const getTime = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return formatter.format(now);
};
