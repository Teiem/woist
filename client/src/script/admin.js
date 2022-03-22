const serverURL = 'https://api.fs.londschien.com:3000';
const root = document.body;

let lastInfo;

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

    const { users, currentInfo } = await req.json();
    lastInfo = currentInfo;

    console.log(currentInfo);

    root.innerHTML = `
        <fieldset>
            <legend><h3>Wer ist da?</h3></legend>
            <div class="users">
            ${
                users.map(({ name, id, active }) => `
                    <span>
                        <input id="user${ id }"type="checkbox" ${ active ? "checked" : "" } onchange="setActiveUser(event, ${ id })">
                        <label for="user${ id }">${ name }</label>
                    </span>
                    <br>
                `).join("")
            }
            </div>
            <br>
            <textarea id="message" placeholder="Extra Infos" onblur="updateInfo();">${ currentInfo }</textarea>
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
        const newInfo = document.getElementById("message").value;

        if (newInfo === lastInfo) return;

        lastInfo = newInfo;
        fetch(serverURL + "/api", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                type: "setInfo",
                data: newInfo,
            })
        })
    };
};

init();