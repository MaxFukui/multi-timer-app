const commonButtonStyle = `text-white p-2 rounded-md bg-amber-500 
`;
const timerCardStyle = `bg-gray-700 p-2 rounded m-5 p-5 
hover:scale-110
md:w-[20rem]
rounded-4xl shadow-2xl 
flex flex-col
`;
const timerSetterInput = `rounded p-2 w-1/3 h-14 font-desg7
text-center text-xl text-white bg-transparent 
focus:border-gray-100 focus:border-2 border-transparent
transition duration-500 ease-in-out
`;

export const inputColorDefault = "bg-transparent text-white";
export const controlButtomStyle = `bg-amber-400 p-1.5 rounded-md m-1
w-1/4 text-xs
hover:bg-green-300 transition duration-500 ease-in-out
hover:scale-110
disabled:opacity-50 disabled:cursor-not-allowed
shadow-2xl
`;

export const resetButtonStyle = `bg-red-500 p-1.5 rounded-md m-1
w-1/4 text-xs
hover:bg-red-400 transition duration-500 ease-in-out
text-white
hover:scale-110
disabled:opacity-50 disabled:cursor-not-allowed
shadow-2xl
left-1/2
self-end
border-2 border-transparent
hover:border-red-200
`;

export { commonButtonStyle, timerCardStyle, timerSetterInput };
