document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Select the elements you want to animate
    const titleElement = document.getElementById('name');
    const descElement = document.querySelector('.hero p');

    // 2. Define the typing speed (milliseconds)
    const typeSpeed = 50; 
    
    // 3. The Typing Function
    function typeText(element, text, delay = 0) {
        // Clear existing text so it can be typed out
        element.textContent = "";
        
        // Wait for the 'delay' before starting (optional)
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer); // Stop when done
                }
            }, typeSpeed);
        }, delay);
    }

    // 4. Capture the original text before we clear it
    if (titleElement && descElement) {
        const titleText = titleElement.textContent.trim();
        const descText = descElement.textContent.trim();

        // 5. Run the animation
        // Start Name immediately (delay 0)
        typeText(titleElement, titleText, 0);
        
        // Start Description after 1.5 seconds (1500ms) so it waits for the name
        typeText(descElement, descText, 1500);
    }
});