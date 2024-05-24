import React, { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { FaImages } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ChatContext } from "../../context/ChatContext";
import Picker from "@emoji-mart/react";
const FooterRightChat = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const currentUser = useSelector((state: RootState) => state.info.info);
  const { data } = useContext(ChatContext);
  const [toggleEmj, setToggleEmj] = useState(true);
  const addEmoji = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: number[] = [];
    sym.forEach((el: string) => {
      const code = parseInt(el, 16); // Parse the hexadecimal string to a number
      codesArray.push(code);
    });
    const emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };
  const handleVoiceClick = () => {
    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
      setText(transcript);
    });

    recognition.start();
  };
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.data.firebaseData.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      console.log(
        currentUser.data.firebaseData.uid,
        uuid(),
        text,
        data.user.uid
      );
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.data.firebaseData.uid,
          date: Timestamp.now(),
        }),
      });
    }
    console.log(data.chatId);
    await updateDoc(doc(db, "userChats", currentUser.data.firebaseData.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    console.log(data.user);

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImg(file);
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };
  return (
    <div className="chat-footer flex-none">
      <div className="flex flex-row items-center p-4">
        <form className="flex justify-center items-center  focus:outline-none   text-blue-600 hover:text-blue-700 w-8 h-6 ">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file" className="cursor-pointer  w-full h-full">
            <FaImages size={26} />
          </label>
        </form>

        {/* <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M0,6.00585866 C0,4.89805351 0.893899798,4 2.0048815,4 L5,4 L7,2 L13,2 L15,4 L17.9951185,4 C19.102384,4 20,4.89706013 20,6.00585866 L20,15.9941413 C20,17.1019465 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1029399 0,15.9941413 L0,6.00585866 Z M10,16 C12.7614237,16 15,13.7614237 15,11 C15,8.23857625 12.7614237,6 10,6 C7.23857625,6 5,8.23857625 5,11 C5,13.7614237 7.23857625,16 10,16 Z M10,14 C11.6568542,14 13,12.6568542 13,11 C13,9.34314575 11.6568542,8 10,8 C8.34314575,8 7,9.34314575 7,11 C7,12.6568542 8.34314575,14 10,14 Z" />
          </svg>
        </button> */}
        <button
          type="button"
          onClick={handleVoiceClick}
          className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M9,18 L9,16.9379599 C5.05368842,16.4447356 2,13.0713165 2,9 L4,9 L4,9.00181488 C4,12.3172241 6.6862915,15 10,15 C13.3069658,15 16,12.314521 16,9.00181488 L16,9 L18,9 C18,13.0790094 14.9395595,16.4450043 11,16.9378859 L11,18 L14,18 L14,20 L6,20 L6,18 L9,18 L9,18 Z M6,4.00650452 C6,1.79377317 7.79535615,0 10,0 C12.209139,0 14,1.79394555 14,4.00650452 L14,8.99349548 C14,11.2062268 12.2046438,13 10,13 C7.790861,13 6,11.2060545 6,8.99349548 L6,4.00650452 L6,4.00650452 Z" />
          </svg>
        </button>
        <div className="relative flex-grow">
          <label>
            <input
              className="input-message rounded-full py-2 pl-3 pr-10 w-full border border-[#dbdbdb]  focus:outline-none text-black  transition duration-300 ease-in"
              type="text"
              value={text}
              placeholder="Aa"
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              type="button"
              onClick={() => setToggleEmj(!toggleEmj)}
              className="absolute top-0 right-0 mt-[6px] mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
            >
              <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
              </svg>
            </button>
          </label>
        </div>
        {/* <button
          type="button"
          onClick={handleSend}
          className="flex focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6 justify-center items-center"
        >
          <IoSendSharp />
        </button> */}
      </div>
      <div
        className="w-full h-[100px] absolute bottom-[600px] right-16"
        style={{ display: toggleEmj ? "none" : "block" }}
      >
        <div className="emoji">
          <Picker onEmojiSelect={addEmoji} />
        </div>
      </div>
    </div>
  );
};

export default FooterRightChat;
