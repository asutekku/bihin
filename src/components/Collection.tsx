import * as React from "react";
import axios from "axios";
import Card from "semantic-ui-react/dist/commonjs/views/Card/Card";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import {Image} from "semantic-ui-react";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";

export class Collection extends React.Component {
    state = {
        terassit: [],
        katokset: [],
        patiot: [],
        activeItem: 'terassit'
    };

    constructor(props: any) {
        super(props);
        this.state = {
            terassit: [],
            katokset: [],
            patiot: [],
            activeItem: 'terassit'
        }
    };

    handleItemClick = (e: any, {name}: any) => this.setState({activeItem: name});

    componentDidMount() {
        axios.get('http://localhost:3000/terraces')
            .then(res => {
                const terassit = res.data;
                this.setState({terassit});
            })
    }

    render() {
        const {activeItem} = this.state;

        return (
            <div className={"Collection"}>
                <Grid>
                    <Grid.Column width={3}>
                        <Header as='h3'>Tallennetut</Header>
                        <Menu pointing secondary vertical>
                            <Menu.Item name='terassit' active={activeItem === 'terassit'}
                                       onClick={this.handleItemClick}>
                                <Label color='teal'>{this.state.terassit.length}</Label>
                                Terassit
                            </Menu.Item>

                            <Menu.Item name='katokset' active={activeItem === 'katokset'}
                                       onClick={this.handleItemClick}>
                                <Label>0</Label>
                                Katokset
                            </Menu.Item>

                            <Menu.Item name='patiot' active={activeItem === 'patiot'}
                                       onClick={this.handleItemClick}>
                                <Label>0</Label>
                                Patiot
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
                        <Container fluid>
                            <Header as='h2'>{activeItem.toLocaleUpperCase()}</Header>
                            <Card.Group>
                                {this.state[activeItem].map((e: any) => {
                                    console.log(e);
                                    return <Card key={e.ID}>
                                        <Image
                                            src={e.Image}
                                            onclick={this.handleItemClick}/>
                                        <Card.Content>
                                            <Card.Header>Terassi</Card.Header>
                                            <Card.Meta>{e.ID}</Card.Meta>
                                            <Card.Description>Esimerkkiterassi</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <a>
                                                <Icon name='user'/>
                                                Timo Testaaja
                                            </a>
                                        </Card.Content>
                                    </Card>
                                })}
                            </Card.Group>
                        </Container>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
