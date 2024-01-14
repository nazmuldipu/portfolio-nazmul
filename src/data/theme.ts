export type ButtonType = {
  primary: string;
  secondary: string;
  basic: string;
  delete: string;
};

export type ButtonSize = {
  sm: string;
  lg: string;
};

export const ButtonTypes: ButtonType = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded",
  secondary: "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded",
  basic: "bg-white hover:bg-gray-700 text-gray-700 font-bold rounded",
  delete: "bg-red-300 hover:bg-red-500 text-white font-bold rounded",
};

export const ButtonSizes: ButtonSize = {
  sm: "py-2 px-4 text-xs",
  lg: "py-3 px-6 text-lg",
};
