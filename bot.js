
let step = 0;
let data = {};
const approvedLicenses = ["M-43801", "M-46472"]; // Replace or extend with valid license numbers

function handleStep() {
    const inputElement = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    let input = inputElement.value.trim();
    inputElement.value = "";

    switch (step) {
        case 0:
            chatBox.innerText = "Please enter your Texas plumbing license number (e.g., M-12345):";
            break;
        case 1:
            if (!/^M-\d{5}$/.test(input) || !approvedLicenses.includes(input)) {
                chatBox.innerText += `\nYou entered: ${input}\nLicense could not be verified. Please call 469-900-5194 for help.`;
                return;
            }
            data.license = input;
            chatBox.innerText += "\nLicense verified: " + input;
            chatBox.innerText += "\nEnter the job address:";
            break;
        case 2:
            data.address = input;
            chatBox.innerText += "\nYou: " + input;
            chatBox.innerText += "\nWhat type of water heater is being installed?";
            break;
        case 3:
            data.heaterType = input;
            chatBox.innerText += "\nYou: " + input;
            showInstallOptions();
            return;
    }
    step++;
}

function showInstallOptions() {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerText += "\nWhere is the unit being installed?\n";
    const locations = ["Attic", "Garage", "Closet", "Exterior"];
    const inputArea = document.getElementById("userInput");
    inputArea.style.display = "none";

    locations.forEach(location => {
        const btn = document.createElement("button");
        btn.innerText = location;
        btn.onclick = () => handleLocationSelection(location);
        document.body.appendChild(btn);
    });
}

function handleLocationSelection(location) {
    data.location = location;
    const chatBox = document.getElementById("chatBox");
    let floodNote = (location.toLowerCase() === "attic") ? "\nNote: Flood stop device required for attic installations." : "";
    const scope = `Replace existing ${data.heaterType} AO Smith water heater in ${data.location}. Includes flood stop device per code. Work performed by licensed Master Plumber in compliance with Plano code.`;
    chatBox.innerText += "\nYou: " + location + floodNote + "\nScope of Work:\n" + scope;
    chatBox.innerText += "\n\nSubmit permit at: https://etrakit.planotx.org/etrakit3/";
    chatBox.innerText += "\n\nNeed help? Email johnniesue@a-1apsvc.com or call 469-900-5194.";
    step++;
}

function resetBot() {
    step = 0;
    data = {};
    document.getElementById("chatBox").innerText = "";
    document.getElementById("userInput").style.display = "inline-block";
    document.querySelectorAll("button:not([onclick='handleStep()']):not([onclick='resetBot()'])").forEach(btn => btn.remove());
    document.getElementById("userInput").value = "";
    handleStep();
}

window.onload = handleStep;
