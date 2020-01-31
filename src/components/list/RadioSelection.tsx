import * as React from "react";

export interface RadioProps {
    title: string;
    //checked: boolean;
    id: string;
    options: string[];
    callBack: any;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class RadioSelection extends React.Component<RadioProps, { selected: string }> {

    constructor(props: any) {
        super(props);
        this.state = {
            selected: ""
        };
    }

    handleChange = (event: any) => {
        this.setState({
            selected: event.target.value,
        });
        this.props.callBack(event.target.value)
    };

    render() {
        return <div className="input radio">
            {
                this.props.options.map((s: string, i: number) => {
                    return <div key={s + "_" + this.props.id}>
                        <div className={"input-title-container checkbox-title-container"}>
                            <label
                                htmlFor={s + "_" + this.props.id}
                                className={"input-label radio-label"}>
                                {s}
                            </label>
                        </div>
                        <div className={"input-container radio-container"}>
                            <input type="radio"
                                   name={this.props.id}
                                   className={"radio-input"}
                                   id={s + "_" + this.props.id}
                                   value={s}
                                   defaultChecked={i == 0}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                })
            }

        </div>
    }
}