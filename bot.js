
let step = 0;
let data = {};

function handleStep() {
    const input = document.getElementById("userInput").value.trim();
    const chatBox = document.getElementById("chatBox");
    document.getElementById("userInput").value = "";

    if (!input && step !== 0) return;

    switch (step) {
        case 0:
            chatBox.innerText = "Are you a licensed plumbing contractor in Plano? (yes or no)";
            break;
        case 1:
            if (input.toLowerCase() !== "yes") {
                chatBox.innerText += "\nOnly licensed contractors may apply. Call 469-900-5194 for help.";
                return;
            }
            chatBox.innerText += "\nYou: " + input;
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
            chatBox.innerText += "\nWhere is the unit being installed?";
            break;
        case 4:
            data.location = input;
            chatBox.innerText += "\nYou: " + input;
            let floodNote = (input.toLowerCase() === "attic") ? "\nNote: Flood stop device required for attic installations." : "";
            const scope = `Replace existing ${data.heaterType} AO Smith water heater in ${data.location}. Includes flood stop device per code. Work performed by licensed Master Plumber in compliance with Plano code.`;
            chatBox.innerText += floodNote + "\nScope of Work:\n" + scope;
            chatBox.innerText += "\n\nSubmit permit at: https://etrakit.planotx.org/etrakit3/";
            chatBox.innerText += "\n\nNeed help? Email johnniesue@a-1apsvc.com or call 469-900-5194.";
            return;
    }
    step++;
}

function resetBot() {
    step = 0;
    data = {};
    document.getElementById("chatBox").innerText = "";
    document.getElementById("userInput").value = "";
    handleStep();
}

window.onload = handleStep;
