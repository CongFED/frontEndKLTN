import React, { useContext, useEffect, useState } from "react";
import Message from "./Message/Message";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import MessageChatHome from "./Message/MessageChatHome";
const BodyRightChatHome = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    console.log(data.chatId);
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  return (
    <div className=" p-4 flex-1 overflow-y-auto  max-h-[21rem] w-full">
      {messages.map((m, index) => (
        <MessageChatHome message={m} key={index} />
      ))}
    </div>
  );
};

export default BodyRightChatHome;
