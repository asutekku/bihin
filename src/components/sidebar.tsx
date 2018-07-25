import * as React from "react";
import {ListItem} from "./list/ListItem";
import {RangeSlider} from "./list/RangeSlider";
import {CheckBox} from "./list/CheckBox";

export interface SideBarProps {
    compiler: string;
    framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class SideBar extends React.Component<SideBarProps, {}> {
    render() {
        return <div className={"sidebar"}>
            <ListItem text={"Patio"}>
                <RangeSlider title={"Leveys"} step={1} min={3} max={12} default={3} id={"patioWidth"} />
                <RangeSlider title={"Pituus"} step={1} min={3} max={12} default={3} id={"patioLength"} />
                <RangeSlider title={"Korkeus"} step={0.01} min={0.02} max={1} default={0.2} id={"patioHeight"} />
            </ListItem>
            <ListItem text={"Katos"}>
                <CheckBox title={"Näytä"} checked={true} id={"showCanopy"}/>
                <RangeSlider title={"Korkeus"} step={0.1} min={1.8} max={3} default={2.2} id={"canopyHeight"} />
                <RangeSlider title={"Takaosan korkeus"} step={0.1} min={2.4} max={4} default={3} id={"canopyHeightBack"} />
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