import * as React from "react";
import {ThreeContainer} from "./ThreeContainer";
import {SideBar} from "./sidebar";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

library.add(faChevronRight);
library.add(faChevronDown);

declare var data: any;

export class App extends React.Component {

    render() {
        return (
            <div className={"app-container"}>
                <SideBar/>
                <ThreeContainer id={"terraceDesignerContainer"}/>
            </div>
        );
    }
}