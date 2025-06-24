export const IS_DEBUG = false;

export const API_URL = IS_DEBUG ? "http://127.0.0.1:8080/api/v1" : "https://purify.pro/api/v1";

export const BACKEND_URL = IS_DEBUG ? "http://127.0.0.1:9000/" : "https://purify.pro:9000";

export const IMAGES_URL = IS_DEBUG ?  "https://127.0.0.1:9000/img/" : "https://purify.pro/img/";

export const LANDING_URL = "https://purify.pro/#rating";

export const BLACK_LIST_WORDS = [
	"function",
	"window",
	"document",
	"innerHTML",
	"self",
	"<div",
	"<a",
	"<img",
	"display:",
	"font-size:",
	"position:",
];

export const AGGRESSIVE_THRESHOLD = 0.2;
