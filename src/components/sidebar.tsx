///<reference path="../Models/Terrace.ts"/>
import * as React from "react";
import {ListItem} from "./list/ListItem";
import {RangeSlider} from "./list/RangeSlider";
import {CheckBox} from "./list/CheckBox";
import {SceneManager} from "../SceneManager";
import {TerraceState} from "../Models/Terrace";
import axios from 'axios'


export class SideBar extends React.Component<{}, TerraceState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            author: '',
            description: '',
            patio: {
                niskajako: '',
                rakenne: '',
                sokkelinJaSeinanMittaero: '',
                rakenneTyyppi: '',
                materiaali: '',
                korko: 0,
                korkoMaasta: '',
                lisaOtsaLaudat: undefined,
                korkein: '',
                jakolaudanKohta: 0,
                laudoituksenSuunta: '',
                maanpoisto: undefined,
                maanPoisvienti: undefined,
                kuutiomaara: 0,
                perustus: '',
                rakennusKangas: undefined,
                soraa: undefined,
                leveys: 3,
                syvyys: 3,
                korkeus: 0.2,
            },
            lasiterassi: {
                leveys: 3,
                syvyys: 3,
                korkeus: 2.2,
                takaKorkeus: 3,
                etutolppienLukumaara: 0,
                runko: {
                    vari: '',
                    materiaali: '',
                    listat: {
                        vari: ''
                    },
                    pellit: {
                        vari: ''
                    },
                    ranni: {
                        on: undefined,
                        vari: ''
                    },
                    syoksy: {
                        var: ''
                    }
                },
                sivut: {
                    vasen: {
                        ovet: {
                            lukumaara: 0,
                            puitteet: undefined,
                            lasinVari: '',
                            lasinVahvuus: 0,
                            vaakapuite: undefined,
                            korkeus: 0
                        },
                        kiinteaLasiLkm: 0,
                        lukkoTyyppi: '',
                        kaide: {
                            malli: '',
                            korkeus: 0
                        },
                        muuta: ''
                    },
                    etu: {
                        ovet: {
                            lukumaara: 0,
                            puitteet: undefined,
                            lasinVari: '',
                            lasinVahvuus: 0,
                            vaakapuite: undefined,
                            korkeus: 0
                        },
                        kiinteaLasiLkm: 0,
                        lukkoTyyppi: '',
                        kaide: {
                            malli: '',
                            korkeus: 0
                        },
                        muuta: ''
                    },
                    oikea: {
                        ovet: {
                            lukumaara: 0,
                            puitteet: undefined,
                            lasinVari: '',
                            lasinVahvuus: 0,
                            vaakapuite: undefined,
                            korkeus: 0
                        },
                        kiinteaLasiLkm: 0,
                        lukkoTyyppi: '',
                        kaide: {
                            malli: '',
                            korkeus: 0
                        },
                        muuta: ''
                    },
                    taka: {
                        ovet: {
                            lukumaara: 0,
                            puitteet: undefined,
                            lasinVari: '',
                            lasinVahvuus: 0,
                            vaakapuite: undefined,
                            korkeus: 0
                        },
                        kiinteaLasiLkm: 0,
                        lukkoTyyppi: '',
                        kaide: {
                            malli: '',
                            korkeus: 0
                        },
                        muuta: ''
                    }
                },
                katto: {
                    niska: {
                        leveys: 0,
                        korkeus: 0
                    },
                    materiaali: '',
                    raystas: {
                        ylitysVasen: 0,
                        ylitysOikea: 0
                    }
                },
                takaliitosPaalla: undefined,
                eutliitosPaalla: undefined
            }
        };
    }

    private updateWidth = (value: string) => {
        const patio = {...this.state.patio};
        patio.leveys = parseFloat(value);
        this.setState({patio});
        SceneManager.patio.width = parseFloat(value);
    };
    private updateHeight = (value: string) => {
        const patio = {...this.state.patio};
        patio.korkeus = parseFloat(value);
        this.setState({patio});
        SceneManager.patio.height = parseFloat(value);
    };
    private updateLength = (value: string) => {
        const patio = {...this.state.patio};
        patio.leveys = parseFloat(value);
        this.setState({patio});
        SceneManager.patio.length = parseFloat(value);
    };
    private updateCanopyHeight = (value: string) => {
        const lasiterassi = {...this.state.lasiterassi};
        lasiterassi.korkeus = parseFloat(value);
        this.setState({lasiterassi});
        SceneManager.patio.canopyHeight = parseFloat(value);
    };
    private updateCanopyHeightRaise = (value: string) => {
        const lasiterassi = {...this.state.lasiterassi};
        lasiterassi.takaKorkeus = parseFloat(value);
        this.setState({lasiterassi});
        SceneManager.patio.canopyRaiseHeight = parseFloat(value);
    };
    private printData = () => {
        axios.post('http://localhost:3000/terraces', JSON.stringify(this.state)).then((e) => {
            console.log("POST successful")
        });
    };

    render() {
        return (
            <div className={"sidebar"}>
                <ListItem text={"Patio"}>
                    <RangeSlider
                        title={"Leveys"}
                        step={1}
                        min={3}
                        max={9}
                        default={this.state.patio.leveys}
                        id={"patioWidth"}
                        target={this.updateWidth}
                    />
                    <RangeSlider
                        title={"Syvyys"}
                        step={1}
                        min={3}
                        max={9}
                        default={this.state.patio.syvyys}
                        id={"patioLength"}
                        target={this.updateLength}
                    />
                    <RangeSlider
                        title={"Korkeus"}
                        step={0.1}
                        min={0.1}
                        max={1}
                        default={this.state.patio.korkeus}
                        id={"patioHeight"}
                        target={this.updateHeight}
                    />
                </ListItem>
                <ListItem text={"Katos"}>
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
                </ListItem>
                <ListItem text={"Ikkunat ja ovet"}>
                    <CheckBox title={"Näytä"} checked={false} id={"showWindows"}/>
                </ListItem>
                <ListItem text={"Aidat"}>
                    <CheckBox title={"Näytä"} checked={false} id={"showFences"}/>
                </ListItem>
                <button className={"button-basic"} onClick={this.printData}>
                    Tallenna tiedot
                </button>
            </div>
        );
    }
}
