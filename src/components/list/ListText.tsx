import * as React from "react";
import {SceneManager} from "../../SceneManager";

export interface ListTextProps {
    title: string;
    value: string;
    callBack?: any;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ListText extends React.Component<ListTextProps, { value: string, target: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: this.props.value,
            target: this.props.callBack,
        };
    }

    handleChange = (event: any) => {
        this.setState({
            value: event.target.value,
            target: parseInt(event.target.value)
        });
        this.props.callBack(event.target.value)
    };

    render() {
        return <div className="list-text-container">
            <div className='list-text-content'>
                <div className='list-text-title'>{this.props.title}:</div>
                <div className='list-text-value'>{this.state.value}</div>
            </div>
        </div>
    }
}

