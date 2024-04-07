// socket.js
import { io } from "socket.io-client";
import { baseURL } from "../Redux/App/app.actions";

export const socket = io(baseURL);
