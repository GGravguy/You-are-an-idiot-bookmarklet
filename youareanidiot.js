javascript:(function() {
    var numPopups = 5; // Initial number of pop-ups
    var popupWidth = 350; // Width of each window
    var popupHeight = 250; // Increased height for more vertical scaling
    var bounceSpeed = 2; // Speed of the bounce (slightly faster)
    var soundURL = "https://www.myinstants.com/media/sounds/you-are-an-idiot.mp3"; // Sound URL

    // Function to create pop-ups
    function createPopups(count) {
        for (var i = 0; i < count; i++) {
            var popup = document.createElement('div');
            popup.style.position = 'absolute';
            popup.style.width = popupWidth + 'px';
            popup.style.height = popupHeight + 'px';
            // Start at the top-left corner
            popup.style.top = '0px';
            popup.style.left = '0px';
            popup.style.backgroundColor = 'white';
            popup.style.border = '1px solid #ccc'; // Lighter border for Windows look
            popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Lighter shadow for a Windows-style window
            popup.style.borderRadius = '4px'; // Standard Windows-style window border radius
            popup.style.zIndex = '9999';

            // Title Bar (Windows-style)
            var titleBar = document.createElement('div');
            titleBar.style.backgroundColor = '#0078d4'; // Windows blue color
            titleBar.style.color = 'white';
            titleBar.style.fontSize = '14px';
            titleBar.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'; // Windows font
            titleBar.style.fontWeight = 'bold';
            titleBar.style.padding = '6px 10px';
            titleBar.style.textAlign = 'left';
            titleBar.style.display = 'flex';
            titleBar.style.alignItems = 'center';
            titleBar.style.justifyContent = 'space-between';
            titleBar.style.borderTopLeftRadius = '4px';
            titleBar.style.borderTopRightRadius = '4px';

            titleBar.innerHTML = 'You are an idiot!';

            // Close Button (Windows-style "X")
            var closeButton = document.createElement('button');
            closeButton.style.backgroundColor = '#e81123'; // Red close button color
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '50%';
            closeButton.style.width = '18px';
            closeButton.style.height = '18px';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '14px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.cursor = 'pointer';
            closeButton.title = 'Close';
            closeButton.innerHTML = 'X';
            closeButton.onclick = function() {
                popup.style.display = 'none'; // Hide window when clicked
                createPopups(6); // Create 6 new pop-ups when one is closed
            };

            // Append close button to the title bar
            titleBar.appendChild(closeButton);

            popup.appendChild(titleBar);

            // Add the GIF inside the window
            var gif = document.createElement('img');
            gif.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/You_Are_An_Idiot_screen.gif/1200px-You_Are_An_Idiot_screen.gif';
            gif.style.width = '100%';
            gif.style.height = '100%';
            gif.style.borderTop = '1px solid #ccc'; // Border between title and GIF
            popup.appendChild(gif);

            document.body.appendChild(popup);

            // Add and play the sound in a loop
            var audio = new Audio(soundURL);
            audio.loop = true; // Loop the sound
            audio.play();

            // Start bouncing the popup smoothly
            (function movePopup(popup) {
                var directionX = (Math.random() < 0.5 ? -1 : 1);
                var directionY = (Math.random() < 0.5 ? -1 : 1);
                var velocityX = Math.random() * bounceSpeed + 1; // Faster movement
                var velocityY = Math.random() * bounceSpeed + 1; // Faster movement
                var left = parseFloat(popup.style.left);
                var top = parseFloat(popup.style.top);

                function bounce() {
                    if (left + popupWidth > window.innerWidth || left < 0) {
                        directionX *= -1; // Reverse direction when hitting the edge
                    }
                    if (top + popupHeight > window.innerHeight || top < 0) {
                        directionY *= -1; // Reverse direction when hitting the edge
                    }

                    // Update position with smooth transition
                    left += velocityX * directionX;
                    top += velocityY * directionY;

                    // Apply new position
                    popup.style.left = left + 'px';
                    popup.style.top = top + 'px';

                    // Request next frame for smooth animation
                    requestAnimationFrame(bounce);
                }

                bounce(); // Start bouncing animation
            })(popup);
        }
    }

    // Create initial pop-ups
    createPopups(numPopups);
})();
