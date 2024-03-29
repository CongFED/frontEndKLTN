// import React, { useContext, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import { ChatContext } from "../../../context/ChatContext";
// interface Props {
//   message: any;
// }
// const Message = ({ message }: Props) => {
//   const currentUser = useSelector((state: RootState) => state.info.info);
//   const { data } = useContext(ChatContext);

//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//     console.log(ref.current?.scrollIntoView({ behavior: "smooth" }));
//   }, [message]);
//   return (
//     <div className="chat-body p-4 flex-1 overflow-y-scroll">
//       {/** Đoạn này là user chat*/}
//       <div className="flex flex-row justify-start">
//         <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
//           <img
//             className="shadow-md rounded-full w-full h-full object-cover"
//             src="https://randomuser.me/api/portraits/women/33.jpg"
//             alt=""
//           />
//         </div>
//         <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
//           <div className="flex items-center group">
//             <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
//               Hey! How are you?
//             </p>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//           {/** Đoạn này là hình ảnh chat user*/}
//           <div className="flex items-center flex-row group">
//             <a
//               className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
//               href="#"
//             >
//               <img
//                 className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
//                 src="https://unsplash.com/photos/8--kuxbxuKU/download?force=true&w=640"
//                 alt="hiking"
//               />
//             </a>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//           {/** Đoạn này là hình ảnh chat user*/}
//           <div className="flex items-center group">
//             <p className="px-6 py-3 rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
//               Shall we go for Hiking this weekend?
//             </p>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//           <div className="flex items-center group">
//             <p className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               Volutpat lacus laoreet non curabitur gravida.
//             </p>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       {/** Đoạn này là user chat*/}
//       <p className="p-4 text-center text-sm text-gray-500">FRI 3:04 PM</p>
//       {/** Đoạn này là chính mình chat*/}
//       <div className="flex flex-row justify-end">
//         <div className="messages text-sm text-white grid grid-flow-row gap-2">
//           <div className="flex items-center flex-row-reverse group">
//             <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
//               Hey! How are you?
//             </p>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//           <div className="flex items-center flex-row-reverse group">
//             <a
//               className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
//               href="#"
//             >
//               <img
//                 className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
//                 src="https://unsplash.com/photos/8--kuxbxuKU/download?force=true&w=640"
//                 alt="hiking"
//               />
//             </a>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//           <div className="flex items-center flex-row-reverse group">
//             <p className="px-6 py-3 rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
//               Shall we go for Hiking this weekend?
//             </p>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//           <div className="flex items-center flex-row-reverse group">
//             <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               Volutpat lacus laoreet non curabitur gravida.
//             </p>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       {/** Đoạn này là chính mình chat*/}

//       <p className="p-4 text-center text-sm text-gray-500">12:40 PM</p>
//       <div className="flex flex-row justify-end">
//         <div className="messages text-sm text-white grid grid-flow-row gap-2">
//           {/** Đoạn này là hình ảnh chat*/}
//           <div className="flex items-center flex-row-reverse group">
//             <a
//               className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
//               href="#"
//             >
//               <img
//                 className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
//                 src="https://unsplash.com/photos/8--kuxbxuKU/download?force=true&w=640"
//                 alt="hiking"
//               />
//             </a>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path
//                   d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
// M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
// C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
//                 />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
//                 <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
//               </svg>
//             </button>
//             <button type="button" className="option-message">
//               <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
//                 <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </svg>
//             </button>
//           </div>
//           {/** Đoạn này là hình ảnh chat*/}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;

import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ChatContext } from "../../../context/ChatContext";

interface Props {
  message: any;
}
const Message = ({ message }: Props) => {
  const currentUser = useSelector((state: RootState) => state.info.info);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    console.log(ref.current?.scrollIntoView({ behavior: "smooth" }));
  }, [message]);

  return (
    <div className="chat-body p-4 flex-1 overflow-y-scroll">
      {/** Đoạn này là user chat*/}
      <div
        className={`flex flex-row justify-start ${
          message.senderId === currentUser.data.firebaseData.uid &&
          "flex flex-row justify-end"
        }`}
      >
        <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
          <img
            className={`shadow-md rounded-full w-full h-full object-cover ${
              message.senderId === currentUser.data.firebaseData.uid && "hidden"
            }`}
            src={currentUser.data.firebaseData.photoUrl}
            alt=""
          />
        </div>
        <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
          <>
            {message.text == "" ? (
              <></>
            ) : (
              <>
                {message.senderId === currentUser.data.firebaseData.uid ? (
                  <div className="flex items-center group flex-row-reverse">
                    <p className="px-6 py-3 rounded-t-full rounded-l-full bg-[#456fe6] max-w-xs lg:max-w-md text-gray-200">
                      {message.text}
                    </p>
                    <button type="button" className="option-message">
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path
                          d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
   M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
   C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
                        />
                      </svg>
                    </button>
                    <button type="button" className="option-message">
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
                      </svg>
                    </button>
                    <button type="button" className="option-message">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full fill-current"
                      >
                        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-[100px] h-auto lg:max-w-md text-gray-200">
                      {message.text}
                    </p>
                    <button type="button" className="option-message">
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path
                          d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
                        />
                      </svg>
                    </button>
                    <button type="button" className="option-message">
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
                      </svg>
                    </button>
                    <button type="button" className="option-message">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full fill-current"
                      >
                        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </>
          <>
            {message.img == undefined ? (
              <></>
            ) : (
              <div
                className={`flex items-center flex-row group ${
                  message.senderId === currentUser.data.firebaseData.uid &&
                  "flex items-center group flex-row-reverse"
                }`}
              >
                <a
                  className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                  href="#"
                >
                  <img
                    className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                    src={message.img}
                    alt="hiking"
                  />
                </a>
                <button type="button" className="option-message">
                  <svg
                    viewBox="0 0 20 20"
                    className="w-full h-full fill-current"
                  >
                    <path
                      d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
                    />
                  </svg>
                </button>
                <button type="button" className="option-message">
                  <svg
                    viewBox="0 0 20 20"
                    className="w-full h-full fill-current"
                  >
                    <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
                  </svg>
                </button>
                <button type="button" className="option-message">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full fill-current"
                  >
                    <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                  </svg>
                </button>
              </div>
            )}
          </>
        </div>
      </div>

      {/* <p className="p-4 text-center text-sm text-gray-500">12:40 PM</p> */}
    </div>
  );
};

export default Message;
