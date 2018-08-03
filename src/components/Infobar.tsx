///<reference path="../Models/Terrace.ts"/>
import * as React from "react";
import {ListItem} from "./list/ListItem";
import {ListText} from "./list/ListText";

export class InfoBar extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {}
    };

    render() {
        return (
            <div className={"infobar"}>
                <ListItem text={"Tiedot"}>
                    <ListText title={'Asiakas'} value={"Aatu Asiakas"}/>
                    <ListText title={'Päivämäärä'} value={"01.01.2018"}/>
                    <ListText title={'Puhelinnumero'} value={"040 1231234"}/>
                    <ListText title={'Sähköposti'} value={"matti.meikalainen@esim.fi"}/>
                    <ListText title={'Laskutusosoite'} value={"Esimerkkitie 16 B"}/>
                    <ListText title={'Kohdeosoite'} value={"22022 Esimerkkilä"}/>
                    <ListText title={'Myyjä'} value={"Mikko Myyjä"}/>
                    <ListText title={'Myyjän puhelinnumero'} value={"050 1231234"}/>
                    <ListText title={'Yhteyshenkilö'} value={"Yrjö Yhteyshenkilö"}/>
                    <ListText title={'Yhteyshenkilön puhelinnumero'} value={"050 1231234"}/>
                </ListItem>
            </div>
        );
    }
}
