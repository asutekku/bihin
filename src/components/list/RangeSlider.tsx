import * as React from "react";

export interface RangeSliderProps {
    title: string;
    min: number;
    max: number;
    default: number;
    step: number;
    id: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class RangeSlider extends React.Component<RangeSliderProps, { value: number }> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: this.props.default
        };
    }

    handleChange = (event: any) => {
        this.setState({
            value: event.target.value
        });
    };

    render() {
        return <div className={"input range-slider"}>
            <div className={"input-title-container range-slider-title-container"}>
                <label
                    htmlFor={this.props.id}
                    className={"input-label range-slider-label"}>
                    {`${this.props.title}: `}
                </label>
                <span className={"input-value range-slider-value"}>
                    {`${this.state.value}m`}
                </span>
            </div>
            <div className="input-container range-slider-container">
                <input
                    type="range"
                    className="range-slider-input"
                    min={this.props.min}
                    max={this.props.max}
                    defaultValue={this.props.default.toString()}
                    id={this.props.id}
                    step={this.props.step}
                    onChange={this.handleChange}/>
            </div>
        </div>
    }
}

