document.addEventListener("DOMContentLoaded", function() {
    const icon = document.getElementById("icon");
    const saveButton = document.getElementById("save");
    const saveText = document.getElementById("savetext");

    // Check localStorage for the saved state on page load
    const isSaved = localStorage.getItem("isSaved") === "true";

    // Set the initial state based on localStorage
    if (isSaved) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        saveText.textContent = "Saved";
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        saveText.textContent = "Save";
    }

    // Add click event listener to toggle the icon
    saveButton.addEventListener("click", function() {
        // Toggle the icon classes
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        // Toggle the save text
        if (icon.classList.contains("fa-solid")) {
            saveText.textContent = "Saved";
        } else {
            saveText.textContent = "Save";
        }

        // Update localStorage with the new state
        const currentState = icon.classList.contains("fa-solid");
        localStorage.setItem("isSaved", currentState.toString());
    });


    const shareButton = document.getElementById("share");
    const modal = document.getElementById("shareModal");
    const closeModal = document.getElementById("closeModal");

    // Open the modal when share button is clicked
    shareButton.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    
    document.getElementById("copy-link").addEventListener("click", function() {
        const linkToCopy = "https://example.com";

        // Copy the link
        navigator.clipboard.writeText(linkToCopy).then(function() {
            const copyTextDiv = document.getElementById("copy-text");
            copyTextDiv.textContent = "Link copied!";

            // Reset the text after a short delay
            setTimeout(function() {
                copyTextDiv.textContent = "Copy link";
            }, 2000);
        }).catch(function(error) {
            console.error("Failed to copy link:", error);
        });
    });



    const travelerCount = document.getElementById("traveler-count");
    const counterSection = document.getElementById("counter-section");
    const travelers = document.getElementById("travelers");
    const booknow = document.getElementById("booknow");
    const done = document.getElementById("done");
    const total = document.getElementById("total");
    const pets = document.getElementById("pets");


    // Retrieve saved counts from localStorage or set default values
    let adultCount = parseInt(localStorage.getItem("adultCount"));
    let childCount = parseInt(localStorage.getItem("childCount"));

    // Set the default value of 2 only if no value was previously saved (i.e., `null` or NaN)
    if (isNaN(adultCount)) {
        adultCount = 2;
    }
    if (isNaN(childCount)) {
        childCount = 0;
    }

    // Update displayed traveler count
    function updateTravelerCount() {
        const totalTravelers = adultCount + childCount;
        travelerCount.textContent = `${totalTravelers} traveler${totalTravelers !== 1 ? "s" : ""}`;

        // Save counts to localStorage
        localStorage.setItem("adultCount", adultCount);
        localStorage.setItem("childCount", childCount);
    }

    // Show the counter section when the "Travelers" section is clicked
    travelers.addEventListener("click", function() {
        counterSection.style.display = counterSection.style.display === "none" ? "block" : "none";
        travelerCount.style.display = travelerCount.style.display === "none" ? "block" : "none";
        total.style.display = total.style.display === "none" ? "block" : "none";
        booknow.style.display = booknow.style.display === "none" ? "block" : "none";
        done.style.display = done.style.display === "block" ? "none" : "block";
        pets.style.display = pets.style.display === "block" ? "none" : "block";

        const heading = document.getElementById("travelers-heading");
        heading.style.fontWeight = (heading.style.fontWeight === "normal" || heading.style.fontWeight === "") ? "bold" : "normal";
        heading.style.color = heading.style.color === "" ? "dimgray" : "";
        heading.style.fontSize = heading.style.fontSize === "" ? "18px" : "";
    });

    // Initialize displayed counts from localStorage
    document.getElementById("adult-count").textContent = adultCount;
    document.getElementById("child-count").textContent = childCount;

    // Function to update the decrement button states
    function updateButtonStates() {
        const adultDecrementButton = document.getElementById("adult-decrement");
        const childDecrementButton = document.getElementById("child-decrement");

        // Disable and style adult decrement button if count is 0
        if (adultCount === 0) {
            adultDecrementButton.style.color = "gray";
            adultDecrementButton.disabled = true;
        } else {
            adultDecrementButton.style.color = "black";
            adultDecrementButton.disabled = false;
        }

        // Disable and style child decrement button if count is 0
        if (childCount === 0) {
            childDecrementButton.style.color = "lightgray";
            childDecrementButton.disabled = true;
        } else {
            childDecrementButton.style.color = "black";
            childDecrementButton.disabled = false;
        }
    }

    // Handle adult increment and decrement
    document.getElementById("adult-increment").addEventListener("click", function(event) {
        event.stopPropagation();
        adultCount++;
        document.getElementById("adult-count").textContent = adultCount;
        updateTravelerCount();
        updateButtonStates();
    });

    document.getElementById("adult-decrement").addEventListener("click", function(event) {
        event.stopPropagation();
        if (adultCount > 0) {
            adultCount--;
            document.getElementById("adult-count").textContent = adultCount;
            updateTravelerCount();
            updateButtonStates();
        }
    });

    // Handle child increment and decrement
    document.getElementById("child-increment").addEventListener("click", function(event) {
        event.stopPropagation();
        childCount++;
        document.getElementById("child-count").textContent = childCount;
        updateTravelerCount();
        updateButtonStates();
    });

    document.getElementById("child-decrement").addEventListener("click", function(event) {
        event.stopPropagation();
        if (childCount > 0) {
            childCount--;
            document.getElementById("child-count").textContent = childCount;
            updateTravelerCount();
            updateButtonStates();
        }
    });

    updateTravelerCount();
    updateButtonStates(); 



});