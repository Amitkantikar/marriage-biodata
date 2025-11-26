function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let fullName = document.getElementById("fullName").value;
    let dob = document.getElementById("dob").value;
    let age = document.getElementById("age").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let religion = document.getElementById("religion").value;
    let caste = document.getElementById("caste").value;
    let motherTongue = document.getElementById("motherTongue").value;
    let job = document.getElementById("job").value;
    let education = document.getElementById("education").value;
    let familyDetails = document.getElementById("familyDetails").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let photoFile = document.getElementById("photo").files[0];

    // -------------------------------
    // VALIDATION
    // -------------------------------

    // Phone number validation (multiple allowed)
    if (phone.trim() !== "") {
        let numbers = phone.split(",").map(n => n.trim());

        for (let num of numbers) {
            if (!/^\d{10}$/.test(num)) {
                alert("Each phone number must be exactly 10 digits.\nInvalid number: " + num);
                return;
            }
        }
    }

    // Gmail validation
    if (email.trim() !== "" && !email.endsWith("@gmail.com")) {
        alert("Email must end with @gmail.com");
        return;
    }

    // -------------------------------
    // PDF CONTENT
    // -------------------------------
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Marriage Biodata", 70, 15);

    let y = 30;
    doc.setFontSize(14);

    function addLine(label, value) {
        if (value.trim() !== "") {
            doc.text(`${label}: ${value}`, 10, y);
            y += 8;
        }
    }

    // Add photo if provided
    if (photoFile) {
        let reader = new FileReader();
        reader.onload = function(e) {
            doc.addImage(e.target.result, "JPEG", 150, 20, 40, 45); // right side photo

            // After photo loaded, add text
            generateText();
        };
        reader.readAsDataURL(photoFile);
    } else {
        generateText();
    }

    function generateText() {
        y = 80;

        addLine("Full Name", fullName);
        addLine("Date of Birth", dob);
        addLine("Age", age);
        addLine("Height", height);
        addLine("Weight", weight);
