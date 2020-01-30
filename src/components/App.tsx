import * as React from "react";
import {ThreeContainer} from "./ThreeContainer";
import {SideBar} from "./sidebar";
import {InfoBar} from "./Infobar";
//import {Collection} from "./Collection";

//library.add(faChevronRight);
//library.add(faChevronDown);

declare var data: any;

export class App extends React.Component {
    state = {
        activeItem: 'designer', visible: false
    };
    handleItemClick = (e: any) => this.setState({activeItem: e.name, visible: !this.state.visible});


    render() {

        const {activeItem} = this.state;
        return (
            <div className={"app-container"}>
                <SideBar/><ThreeContainer id={"terraceDesignerContainer"}/><InfoBar/>
            </div>
        );
    }
}
