import * as React from "react";

export interface RadioProps {
    title: string;
    //checked: boolean;
    id: string;
    options: string[];
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class RadioSelection extends React.Component<RadioProps, { checked: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            checked: false
        };
    }

    render() {
        return <div className="input radio">
            {
                this.props.options.map((s: string) => {
                    return <>
                        <div className={"input-title-container checkbox-title-container"}>
                            <label
                                htmlFor={s + "_" + this.props.id}
                                className={"input-label radio-label"}>
                                {this.props.title}
                            </label>
                        </div>
                        <div className={"input-container radio-container"}>
                            <input type="radio"
                                   name={this.props.id}
                                   className={"radio-input"}
                                   id={s + "_" + this.props.id}
                                   value={s}/>
                        </div>
                    </>
                })
            }

        </div>
    }
}