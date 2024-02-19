import { useContext, useEffect, useState } from "react";
import ChatContext from "../Context/chat-context";

const SingleChat = ({ fetchAgain , setFetchAgain}) =>
 {
    const { selectedChat, setSelectedChat, user, notification, setNotification } = useContext(ChatContext);
  return (
    <div>SingleChat</div>
  )
}

export default SingleChat