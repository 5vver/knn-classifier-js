import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const useCustomAlert = () => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const [alertMsg, setAlertMsg] = useState({ msg: null, status: "success" });

  const alertWithMsg = (msg, state) => {
    setAlertMsg({ status: state ? "success" : "warning", msg });
    onOpen();
    return state;
  };

  return [isVisible, onClose, alertWithMsg, alertMsg];
};

export default useCustomAlert;
