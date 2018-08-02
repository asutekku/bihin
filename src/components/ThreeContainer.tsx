import * as React from "react";
import { ThreeEntryPoint } from "../ThreeEntryPoint";

export interface ThreeProps {
    id: string;
}

export class ThreeContainer extends React.Component<ThreeProps, {}> {
    private threeRootElement!: HTMLDivElement | null;

    componentDidMount() {
        ThreeEntryPoint.init(this.threeRootElement!);
    }

    render() {
        return <div id={this.props.id} ref={element => (this.threeRootElement = element)} className="threeContainer" />;
    }
}
