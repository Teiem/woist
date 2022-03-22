const Studiengänge = Object.freeze({
    "BMI": 0,
    "BMT": 1,
    "BTB": 2,
    "MMI": 3,
    "DAYSI": 4,
    "UNKNOWN": 5,
})

export const users = [

    {
        name: "UNKNOWN_NAME",
        stg: Studiengänge.UNKNOWN,
        showName: false,
        nfc: null,
    },

    {
        name: "Tim",
        stg: Studiengänge.BMI,
        showName: true,
        nfc: "8cb00795",
    },

    {
        name: "Sebas",
        stg: Studiengänge.BMI,
        showName: true,
        nfc: null,
    },

    {
        name: "Yeray",
        stg: Studiengänge.BMT,
        showName: true,
        nfc: null,
    },

    {
        name: "Horst",
        stg: Studiengänge.DAYSI,
        showName: false,
        nfc: null,
    },

    {
        name: "Peter",
        stg: Studiengänge.MMI,
        showName: true,
        nfc: null,
    }

]