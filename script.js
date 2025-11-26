async function generatePDF() {
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
    // PDF Title
    // -------------------------------
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Marriage Biodata", 70, 15);

    // -------------------------------
    // Add Photo (async handling)
    // -------------------------------
    if (photoFile) {
        const imgData = await fileToBase64(photoFile);
        doc.addImage(imgData, "JPEG", 150, 20, 40, 45); 
    }

    // -------------------------------
    // Add Text
    // -------------------------------
    let y = 70;
    doc.setFontSize(14);

    function addLine(label, value) {
        if (value.trim() !== "") {
            doc.text(`${label}: ${value}`, 10, y);
            y += 8;
        }
    }

    addLine("Full Name", fullName);
    addLine("Date of Birth", dob);
    addLine("Age", age);
    addLine("Height", height);
    addLine("Weight", weight);
    addLine("Religion", religion);
    addLine("Caste", caste);
    addLine("Mother Tongue", motherTongue);
    addLine("Profession", job);
    addLine("Education", education);

    doc.setFont("Helvetica", "bold");
    doc.text("Family Details:", 10, y + 5);
    doc.setFont("Helvetica", "normal");
    doc.text(familyDetails, 10, y + 15);
    y += 35;

    addLine("Contact Number(s)", phone);
    addLine("Email", email);

    //-------------------------------
    // Save PDF
    //-------------------------------
    doc.save(`${fullName}_Biodata.pdf`);
}


// -------------------------------
// Convert image file → Base64
// -------------------------------
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
