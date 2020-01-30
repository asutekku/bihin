///<reference path="../Models/Terrace.ts"/>
import * as React from "react";
import {ListItem} from "./list/ListItem";
import {RangeSlider} from "./list/RangeSlider";
import {CheckBox} from "./list/CheckBox";
import {SceneManager} from "../SceneManager";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import {WindowState} from "../state/WindowState";
import {WindowType} from "../Models/Window";
import {RadioSelection} from "./list/RadioSelection";
import {WindowModel} from "../sceneComponents/Window";

interface ModelState {
    window: WindowState;
    author: {
        name: string;
    }
}

export class SideBar extends React.Component<{}, ModelState> {
    constructor(props: any) {
        super(props);
        this.state = {author: {name: ""}, window: new WindowState(WindowType.A)};
    }

    private updateWidth = (value: string) => {
        const window: WindowState = this.state.window;
        window.width = parseFloat(value);
        this.setState({window: window});
        SceneManager.window.width = parseFloat(value);
    };
    private updateHeight = (value: string) => {
        const window: WindowState = this.state.window;
        window.height = parseFloat(value);
        this.setState({window: window});
        SceneManager.window.height = parseFloat(value);
    };
    private updateDepth = (value: string) => {
        const window: WindowState = this.state.window;
        window.depth = parseFloat(value);
        this.setState({window: window});
        SceneManager.window.depth = parseFloat(value);
    };

    /*private updateCanopyHeight = (value: string) => {
        const lasiterassi = {...this.state.lasiterassi};
        lasiterassi.korkeus = parseFloat(value);
        this.setState({lasiterassi});
        SceneManager.window.canopyHeight = parseFloat(value);
    };
    private updateCanopyHeightRaise = (value: string) => {
        const lasiterassi = {...this.state.lasiterassi};
        lasiterassi.takaKorkeus = parseFloat(value);
        this.setState({lasiterassi});
        SceneManager.window.height = parseFloat(value);
    };
    private postItem = () => {
        this.setState({image: SceneManager.getImageData()});
        axios.post('http://localhost:3000/terraces', JSON.stringify(this.state)).then((e) => {
            console.log("POST successful")
        });
    };*/

    render() {
        return (
            <div className={"sidebar"}>
                <ListItem text={"Mitat"}>
                    <RangeSlider
                        title={"Leveys"}
                        step={0.1}
                        min={0.2}
                        max={3}
                        default={this.state.window.width}
                        id={"patioWidth"}
                        target={this.updateWidth}
                    />
                    <RangeSlider
                        title={"Syvyys"}
                        step={0.01}
                        min={.13}
                        max={0.21}
                        default={this.state.window.depth}
                        id={"patioLength"}
                        target={this.updateDepth}
                    />
                    <RangeSlider
                        title={"Korkeus"}
                        step={0.1}
                        min={0.2}
                        max={2}
                        default={this.state.window.height}
                        id={"patioHeight"}
                        target={this.updateHeight}
                    />
                </ListItem>
                {/*<ListItem text={"Katos"}>
                    <CheckBox title={"Näytä"} checked={true} id={"showCanopy"}/>
                    <RangeSlider
                        title={"Korkeus"}
                        step={0.1}
                        min={1.8}
                        max={3}
                        default={this.state.lasiterassi.korkeus}
                        id={"canopyHeight"}
                        target={this.updateCanopyHeight}
                    />
                    <RangeSlider
                        title={"Takaosan korkeus"}
                        step={0.1}
                        min={2.4}
                        max={4}
                        default={this.state.lasiterassi.takaKorkeus}
                        id={"canopyHeightBack"}
                        target={this.updateCanopyHeightRaise}
                    />
                </ListItem>*/}
                <ListItem text={"Ikkunatyyppi"}>
                    <RadioSelection title={'Ikkunan tyyppi'} id={'windowStyle'} options={Object.keys(WindowModel)}/>
                    {/*<CheckBox title={"Näytä"} checked={false} id={"showWindows"}/>*/}
                </ListItem>
                <ListItem text={"Aidat"}>
                    <CheckBox title={"Näytä"} checked={false} id={"showFences"}/>
                </ListItem>
                {/*<Button content={"Tallenna"} primary onClick={this.postItem}/>*/}
                <Button content={"Tyhjennä"} secondary/>
            </div>
        );
    }
}
