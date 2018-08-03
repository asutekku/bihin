export interface TerraceState {
    name: string,
    author: string,
    description: string,
    patio: {
        niskajako: string
        rakenne: string,
        sokkelinJaSeinanMittaero: string,
        rakenneTyyppi: string,
        materiaali: string,
        korko: number,
        korkoMaasta: string,
        lisaOtsaLaudat: boolean | undefined,
        korkein: string,
        jakolaudanKohta: number,
        laudoituksenSuunta: string,
        maanpoisto: boolean | undefined,
        maanPoisvienti: boolean | undefined,
        kuutiomaara: number,
        perustus: string,
        rakennusKangas: boolean | undefined,
        soraa: boolean | undefined,
        leveys: number,
        syvyys: number,
        korkeus: number,
    },
    lasiterassi: {
        takaKorkeus: number;
        korkeus: number;
        leveys: number,
        syvyys: number,
        etutolppienLukumaara: number,
        runko: {
            vari: string,
            materiaali: string,
            listat: {
                vari: string
            },
            pellit: {
                vari: string
            },
            ranni: {
                on: boolean | undefined,
                vari: string
            },
            syoksy: {
                var: string
            }
        },
        sivut: {
            vasen: {
                ovet: {
                    lukumaara: number,
                    puitteet: boolean | undefined,
                    lasinVari: string,
                    lasinVahvuus: number,
                    vaakapuite: boolean | undefined,
                    korkeus: number
                },
                kiinteaLasiLkm: number,
                lukkoTyyppi: string,
                kaide: {
                    malli: string,
                    korkeus: number
                },
                muuta: string
            },
            etu: {
                ovet: {
                    lukumaara: number,
                    puitteet: boolean | undefined,
                    lasinVari: string,
                    lasinVahvuus: number,
                    vaakapuite: boolean | undefined,
                    korkeus: number
                },
                kiinteaLasiLkm: number,
                lukkoTyyppi: string,
                kaide: {
                    malli: string,
                    korkeus: number
                },
                muuta: string
            },
            oikea: {
                ovet: {
                    lukumaara: number,
                    puitteet: boolean | undefined,
                    lasinVari: string,
                    lasinVahvuus: number,
                    vaakapuite: boolean | undefined,
                    korkeus: number
                },
                kiinteaLasiLkm: number,
                lukkoTyyppi: string,
                kaide: {
                    malli: string,
                    korkeus: number
                },
                muuta: string
            },
            taka: {
                ovet: {
                    lukumaara: number,
                    puitteet: boolean | undefined,
                    lasinVari: string,
                    lasinVahvuus: number,
                    vaakapuite: boolean | undefined,
                    korkeus: number
                },
                kiinteaLasiLkm: number,
                lukkoTyyppi: string,
                kaide: {
                    malli: string,
                    korkeus: number
                },
                muuta: string
            }
        },
        katto: {
            niska: {
                leveys: number,
                korkeus: number
            },
            materiaali: string,
            raystas: {
                ylitysVasen: number,
                ylitysOikea: number
            }
        },
        takaliitosPaalla: boolean | undefined,
        eutliitosPaalla: boolean | undefined
    }
}
