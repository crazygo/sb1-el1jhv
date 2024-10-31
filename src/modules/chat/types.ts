export type Message = {
  id: number;
  sender: "user" | "bot";
  content: string;
};