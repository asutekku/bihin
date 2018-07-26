import * as React from "react";
import {ListItem} from "./list/ListItem";
import {RangeSlider} from "./list/RangeSlider";
import {CheckBox} from "./list/CheckBox";
import {SceneManager} from "../SceneManager";

export interface SideBarProps {
}

export class SideBar extends React.Component<SideBarProps, {}> {

    updateWidth = (value: string) => SceneManager.patio.width = parseFloat(value);
    updateHeight = (value: string) => SceneManager.patio.height = parseFloat(value);
    updateLength = (value: string) => SceneManager.patio.length = parseFloat(value);
    updateCanopyHeight = (value: string) => SceneManager.patio.canopyHeight = parseFloat(value);
    updateCanopyHeightRaise = (value: string) => SceneManager.patio.canopyRaiseHeight = parseFloat(value);

    render() {
        return <div className={"sidebar"}>
            <ListItem text={"Patio"}>
                <RangeSlider title={"Leveys"} step={1} min={3} max={12} default={3} id={"patioWidth"}
                             target={this.updateWidth}/>
                <RangeSlider title={"Pituus"} step={1} min={3} max={12} default={3} id={"patioLength"}
                             target={this.updateLength}/>
                <RangeSlider title={"Korkeus"} step={0.05} min={0.05} max={1} default={0.2} id={"patioHeight"}
                             target={this.updateHeight}/>
            </ListItem>
            <ListItem text={"Katos"}>
                <CheckBox
                    title={"Näytä"}
                    checked={true}
                    id={"showCanopy"}/>
                <RangeSlider title={"Korkeus"} step={0.1} min={1.8} max={3} default={2.2} id={"canopyHeight"}
                             target={this.updateCanopyHeight}/>
                <RangeSlider title={"Takaosan korkeus"} step={0.1} min={2.4} max={4} default={3} id={"canopyHeightBack"}
                             target={this.updateCanopyHeightRaise}/>
            </ListItem>
            <ListItem text={"Ikkunat ja ovet"}>
                <CheckBox title={"Näytä"} checked={false} id={"showWindows"}/>
            </ListItem>
            <ListItem text={"Aidat"}>
                <CheckBox title={"Näytä"} checked={false} id={"showFences"}/>
            </ListItem>
        </div>
    }
}