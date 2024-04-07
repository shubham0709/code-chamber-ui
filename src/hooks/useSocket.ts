// src/useSocket.js
import { useEffect, useCallback } from "react";
import { socket } from "../socket/socket";

export const useSocket = () => {
  const addSocketListeners = useCallback(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Add more event listeners here

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      // Remove event listeners here
    };
  }, []);

  useEffect(() => {
    addSocketListeners();

    return () => {
      // Clean up event listeners
      addSocketListeners();
    };
  }, [addSocketListeners]);
};
