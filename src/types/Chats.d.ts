export type Chats = {
  createdAt: number;
  message: string;
  sender: {
    id: string;
    image: string;
    name: string;
  };
};
