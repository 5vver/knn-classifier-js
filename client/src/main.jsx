import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {ChakraProvider} from "@chakra-ui/react";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <DevSupport ComponentPreviews={ComponentPreviews}
                  useInitialHook={useInitial}
      >
        <App/>
      </DevSupport>
    </ChakraProvider>
  </React.StrictMode>,
);
