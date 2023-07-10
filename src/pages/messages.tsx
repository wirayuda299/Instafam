import { useEffect } from "react";
import dynamic from "next/dynamic";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useStateContext } from "@/stores/Global/StateContext";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";

const UsersChat = dynamic(
  () => import("@/components/Messages/Users/UsersChat"),
  {
    ssr: false,
  }
);
const UserHeader = dynamic(
  () => import("@/components/Messages/Users/Header/UserHeader"),
  {
    ssr: false,
  }
);
const Chats = dynamic(() => import("@/components/Messages/Chats/Chats"), {
  ssr: false,
});
const ChatHeader = dynamic(
  () => import("@/components/Messages/Chats/Header/Header"),
  {
    ssr: false,
  }
);

const EmptyMessages = dynamic(
  () => import("@/components/Messages/EmptyMessages/EmptyMessages"),
  {
    ssr: false,
  }
);

type Props = {
  sessions: Session | null;
  sender: DataMessage[];
  receiver: DataMessage[];
};

export default function Messages({ sessions, receiver, sender }: Props) {
  const {
    state: { selectedChat },
    Dispatch,
  } = useStateContext();
  const {
    drawerStates: { receiverDrawer },
    drawerDispatch,
  } = useDrawerContext();

  const closeReceiverDrawer = () => {
    drawerDispatch({
      type: "TOGGLE_RECEIVER_DRAWER",
      payload: {
        receiverDrawer: false,
      },
    });
  };
  const clearSelectedChat = () => {
    Dispatch({
      type: "SET_SELECTED_CHAT",
      payload: {
        selectedChat: null,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      closeReceiverDrawer();
      clearSelectedChat();
    });
    return () => {
      window.addEventListener("resize", () => {
        closeReceiverDrawer();
        clearSelectedChat();
      });
    };
  }, []);

  return (
    <>
      <div className="mx-auto flex h-screen items-center justify-between overflow-hidden">
        {receiver.length < 1 && !selectedChat ? (
          <div className={"flex h-screen w-full items-center justify-center"}>
            <EmptyMessages />
          </div>
        ) : (
          <>
            {!selectedChat && receiver.length < 1 ? (
              <button type="button" name="open" title="open">
                Open
              </button>
            ) : (
              <div className={" flex h-screen w-full "}>
                <aside
                  className={`ease fixed top-0 z-50 h-full w-full max-w-sm border-r border-gray-400 border-opacity-50 bg-white text-black transition-all duration-300 dark:bg-black dark:text-white lg:static lg:z-0  ${
                    receiverDrawer ? "left-0 lg:static " : "-left-full"
                  }`}
                >
                  <UserHeader />
                  <UsersChat receiver={receiver} sender={sender} />
                </aside>
                <div className={`relative h-screen  w-full`}>
                  <div className=" h-full w-full  overflow-y-auto">
                    <ChatHeader selectedChat={selectedChat} />
                    <Chats session={sessions} selectedChat={selectedChat} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const { getMessage } = await import("@/helper/getMessage");
  const message = await getMessage(session);

  return {
    props: {
      sessions: session,
      receiver: JSON.parse(JSON.stringify(message?.receiver)) as DataMessage[],
      sender: JSON.parse(JSON.stringify(message?.senderData)) as DataMessage[],
    },
  };
}
