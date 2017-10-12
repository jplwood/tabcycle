import * as React from "react";
import * as ReactDOM from "react-dom";
import './popup.scss'; 

import { Hello } from './components/Hello';

ReactDOM.render(
    <Hello compiler="TypeScriptpoop" framework="React" />,
    document.getElementById("root")
);