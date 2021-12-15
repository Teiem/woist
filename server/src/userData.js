const Studiengänge = Object.freeze({
    "BMI": 0,
    "BMT": 1,
    "BTB": 2,
    "MMI": 3,
    "DAYSI": 4,
})

export const users = [
    {
        name: "Tim",
        stg: Studiengänge.BMI,
        showName: true,
    },
    {
        name: "Sebas",
        stg: Studiengänge.BMI,
        showName: true,
    },
    {
        name: "Yeray",
        stg: Studiengänge.BMT,
        showName: true,
    },
    {
        name: "Horst",
        stg: Studiengänge.DAYSI,
        showName: false,
    },
    {
        name: "Peter",
        stg: Studiengänge.MMI,
        showName: true,
    }
]