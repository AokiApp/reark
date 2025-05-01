import React from "react";
import { HelloReark } from "@aokiapp/reark";
import { SubAComponent } from "@aokiapp/reark-submodule-a";
import { SubBComponent } from "@aokiapp/reark-submodule-b";

export const App: React.FC = () => (
  <div>
    <h1>Example React App</h1>
    <HelloReark />
    <SubAComponent />
    <SubBComponent />
  </div>
);