const Studiengänge = Object.freeze([
    "BMI",
    "BMT",
    "BTB",
    "MMI",
    "DAYSI",
])

const serverURL = 'https://api.fs.londschien.com:3000';
const root = document.body;

const init = async () => {
    console.log("connecting to api...");
    let req;

    try {
        req = await fetch(serverURL + "/api", {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                type: "getActive",
            })
        });
    } catch (err) {
        returnroot.innerHTML = "<h1>Unser Server hat scheinbar aktuell Probleme</h1>";
    }

    const { users, currentInfo } = await req.json()
    const groupedUsers = {}

    for (const user of users) {
        if (!groupedUsers[user.stg]) groupedUsers[user.stg] = []
        if (user.name) groupedUsers[user.stg].push(user.name)
    }

    root.innerHTML = users.length
        ? `<h2>Wir haben offen :)</h2>`
        : `<h2>Wir haben geschlossen :(</h2>`

    if (users.length) {
        const formatter = new Intl.ListFormat('de', { style: 'long', type: 'conjunction' })
        root.innerHTML += `
            <p>
                <span>Aktuell ${users.length === 1 ? "ist ein Studierender des Studienganges" : "sind Studierende der Studiengänge"}</span>
                <span>
                ${
                    formatter.format(
                        Object.entries(groupedUsers)
                        .map(([ stg, names ]) => Studiengänge[stg] + (names.length ? ` (${ formatter.format(names) })` : "")))
                }
                </span>
                <span>da.</span>
            </p>
        `;
    }

    root.innerHTML += `<div id="infoContainer"></div>`;
    document.getElementById("infoContainer").textContent = currentInfo;
}

init();