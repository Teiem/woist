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
            type: "getState",
        })
    })

    const { users, currentInfo } = await req.json()

    root.innerHTML = `
        <fieldset>
            <legend><h3>Wer ist da?</h3></legend>
            ${
                users.map(({ name, id, active }) => `
                    <div>
                        <label for="user${ id }">${ name }</label>
                        <input id="user${ id }"type="checkbox" ${ active ? "checked" : "" } onchange="setActiveUser(event, ${ id })">
                    </div>
                `).join("")
            }
            <br>
            <textarea id="message" placeholder="Extra Infos"></textarea>
            <br>
            <button onclick="updateInfo()">Info Aktualisieren</button>
        </fieldset>
    `;

    window.setActiveUser = ({ currentTarget: { checked }}, data) => {
        fetch(serverURL + "/api", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                type: checked ? "setActive" : "setInactive",
                data,
            })
        })
    };

    window.updateInfo = () => {
        console.log(document.getElementById("message").value);
        fetch(serverURL + "/api", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                type: "setInfo",
                data,
            })
        })
    };
};

init();