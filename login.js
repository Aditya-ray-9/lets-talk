// Fetch and validate user credentials
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Fetch user data from the file
    fetch('users.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load user data.");
            }
            return response.text();
        })
        .then(data => {
            const users = data.split('\n'); // Split file into lines
            let userFound = false;
            for (const user of users) {
                const match = user.match(/\[(.*?)\]\[(.*?)\]/);
                if (match) {
                    const [_, fileUsername, filePassword] = match;
                    if (fileUsername === username) {
                        userFound = true;
                        if (filePassword === password) {
                            alert("Login successful!");
                            // Redirect to another page (e.g., server list page)
                            window.location.href = "serverlist.html";
                        } else {
                            errorMsg.textContent = "Incorrect password. Please try again.";
                        }
                        break;
                    }
                }
            }
            if (!userFound) {
                errorMsg.textContent = "Username does not exist.";
            }
        })
        .catch(err => {
            errorMsg.textContent = "Error loading user data. Please try again later.";
            console.error(err);
        });
});
