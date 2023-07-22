function sendUserInformationToWebhook() {
    const webhookURL = 'https://discord.com/api/webhooks/1132417097809530931/tQ2gb2A2Gt7ZmKM2x3UTp2tWgnq922cdDU0FhX9CE4DeooHoiYuhTH0W9GsnVJGh_L9j'; // Replace with your actual Discord webhook URL

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
            console.log("User information sent successfully!");
        } else {
            console.error("Failed to send user information.");
        }
    })
    .catch(error => console.error(error));
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
