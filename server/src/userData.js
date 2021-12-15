const Studiengang = Object.freeze({
    "BMI": 0,
    "BMT": 1,
    "BTB": 2,
    "MMI": 3,
    "DAYSI": 4,
})

export const users = [
    {
        name: "Tim",
        stg: Studiengang.BMI,
        showName: true,
    },
    {
        name: "Sebas",
        stg: Studiengang.BMI,
        showName: true,
    },
    {
        name: "Yeray",
        stg: Studiengang.BMT,
        showName: true,
    },
    {
        name: "Horst",
        stg: Studiengang.DAYSI,
        showName: false,
    },
    {
        name: "Peter",
        stg: Studiengang.MMI,
        showName: true,
    }
]