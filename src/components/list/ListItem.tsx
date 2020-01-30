import * as React from "react";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface ListItemProps {
    text: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ListItem extends React.Component<ListItemProps,
    { active: false, text: string, collapsed: boolean, classList: string[] }> {

    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: true,
            active: false,
            text: this.props.text,
            classList: ['list-item-container'],
        }
    }

    toggleAnimClass = () => {
        const currentState = this.state.collapsed;
        if (currentState) {
            this.state.classList.push('hide');
        } else {
            const i = this.state.classList.indexOf('hide');
            this.state.classList.splice(1, i);
        }
        this.setState({collapsed: !currentState});
    };

    changeColor = () => {
        const newColor = this.state.text == 'white' ? 'black' : 'white';
        this.setState({text: newColor});
    };

    render() {
        return <div className={"list-item-collapsible noselect"}>
            <div className={"list-item-header"}
                 onClick={this.toggleAnimClass}>
                <div className={"list-item-header-showMore"}>
                    <span className={this.state.collapsed ? 'hide' : ''}>
                    </span>
                    <span className={this.state.collapsed ? '' : 'hide'}>
                    </span>
                </div>
                <div>
                    <span className={"list-item-header-title"}>
                        {this.state.text}
                    </span>
                </div>
            </div>
            <div className={this.state.classList.join(' ')}>
                {this.props.children}
            </div>
        </div>
    }
}