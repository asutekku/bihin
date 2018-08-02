import * as React from "react";
import { ListItem } from "./list/ListItem";
import { RangeSlider } from "./list/RangeSlider";
import { CheckBox } from "./list/CheckBox";
import { SceneManager } from "../SceneManager";
import { Patiost } from "../controllers/FileController";

export interface SideBarProps {}

export interface SideBarState {
    patio: {
        height: {
            value: number;
            min: number;
            max: number;
            step: number;
        };
        width: {
            value: number;
            min: number;
            max: number;
            step: number;
        };
        length: {
            value: number;
            min: number;
            max: number;
            step: number;
        };
    };
}

export class SideBar extends React.Component<SideBarProps, SideBarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            patio: {
                height: {
                    value: 0.2,
                    min: 0.05,
                    max: 1,
                    step: 0.05
                },
                width: {
                    value: 3,
                    min: 3,
                    max: 12,
                    step: 1
                },
                length: {
                    value: 3,
                    min: 3,
                    max: 12,
                    step: 1
                }
            }
        };
    }

    private updateWidth = (value: string) => (SceneManager.patio.width = parseFloat(value));
    private updateHeight = (value: string) => {
        this.state.patio.height.value = parseFloat(value);
        SceneManager.patio.height = this.state.patio.height.value;
    };
    private updateLength = (value: string) => (SceneManager.patio.length = parseFloat(value));
    private updateCanopyHeight = (value: string) => (SceneManager.patio.canopyHeight = parseFloat(value));
    private updateCanopyHeightRaise = (value: string) => (SceneManager.patio.canopyRaiseHeight = parseFloat(value));
    private printData = () => console.log(JSON.stringify(Patiost.state));

    render() {
        return (
            <div className={"sidebar"}>
                <ListItem text={"Patio"}>
                    <RangeSlider
                        title={"Leveys"}
                        step={this.state.patio.width.step}
                        min={this.state.patio.width.min}
                        max={this.state.patio.width.max}
                        default={this.state.patio.width.value}
                        id={"patioWidth"}
                        target={this.updateWidth}
                    />
                    <RangeSlider
                        title={"Pituus"}
                        step={this.state.patio.length.step}
                        min={this.state.patio.length.min}
                        max={this.state.patio.length.max}
                        default={this.state.patio.length.value}
                        id={"patioLength"}
                        target={this.updateLength}
                    />
                    <RangeSlider
                        title={"Korkeus"}
                        step={this.state.patio.height.step}
                        min={this.state.patio.height.min}
                        max={this.state.patio.height.max}
                        default={this.state.patio.height.value}
                        id={"patioHeight"}
                        target={this.updateHeight}
                    />
                </ListItem>
                <ListItem text={"Katos"}>
                    <CheckBox title={"Näytä"} checked={true} id={"showCanopy"} />
                    <RangeSlider
                        title={"Korkeus"}
                        step={0.1}
                        min={1.8}
                        max={3}
                        default={2.2}
                        id={"canopyHeight"}
                        target={this.updateCanopyHeight}
                    />
                    <RangeSlider
                        title={"Takaosan korkeus"}
                        step={0.1}
                        min={2.4}
                        max={4}
                        default={3}
                        id={"canopyHeightBack"}
                        target={this.updateCanopyHeightRaise}
                    />
                </ListItem>
                <ListItem text={"Ikkunat ja ovet"}>
                    z
                    <CheckBox title={"Näytä"} checked={false} id={"showWindows"} />
                </ListItem>
                <ListItem text={"Aidat"}>
                    <CheckBox title={"Näytä"} checked={false} id={"showFences"} />
                </ListItem>
                <button className={"button-basic"} onClick={this.printData}>
                    Tallenna tiedot
                </button>
            </div>
        );
    }
}
