const Studiengänge = Object.freeze([
    "BMI",
    "BMT",
    "BTB",
    "MMI",
    "DAYSI",
    "UNKNOWN"
])

const serverURL = 'https://api.fs.londschien.com:3000';
const root = document.body;

const init = async () => {
    console.log("connecting to api...");
    const req = await fetch(serverURL + "/api", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            type: "getActive",
        })
    })

    const { users, currentInfo } = await req.json()
    const groupedUsers = {}

    for (const user of users) {
        if (!groupedUsers[user.stg]) groupedUsers[user.stg] = []
        if (user.name) groupedUsers[user.stg].push(user.name)
    }

    root.innerHTML += users.length
        ? `<h2>Wir haben offen</h2>`
        : `<h2>Wir haben geschlossen</h2>`

    if (users.length) {
        const formatter = new Intl.ListFormat('de', { style: 'long', type: 'conjunction' })
        root.innerHTML += ``

        root.innerHTML += `
            <p>
                <span>aktuell ${users.length === 1 ? "ist ein Studierender des Studienganges" : "sind Studierende der Studiengänge:"}</span>
                <span>
                ${
                    formatter.format(
                        Object.entries(groupedUsers)
                        .map(([ stg, names ]) => `
                            <span>
                                <span>${ Studiengänge[stg] }</span>
                                ${ names.length ? `<span>(${ formatter.format(names) })</span>` : ""}
                            </span>
                        `))
                }
                </span>
                <span>da</span>
            </p>
        `;

        root.innerHTML += ""
    }
};

init();