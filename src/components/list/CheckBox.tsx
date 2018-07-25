import * as React from "react";

export interface CheckBoxProps {
    title: string;
    checked: boolean;
    id: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class CheckBox extends React.Component<CheckBoxProps, { checked: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
    }

    render() {
        return <div className="input checkbox">
            <div className={"input-title-container checkbox-title-container"}>
                <label
                    htmlFor={this.props.id}
                    className={"input-label range-slider-label"}>
                    {this.props.title}
                </label>
            </div>
            <div className={"input-container checkbox-container"}>
                <input type="checkbox"
                       className={"checkbox-input"}
                       id={this.props.id}
                       defaultChecked={this.state.checked}/>
            </div>
        </div>
    }
}