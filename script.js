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

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Marriage Biodata", 70, 15);

    doc.setFontSize(14);
    doc.setFont("Helvetica", "normal");

    let y = 30;

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
    y += 30;

    addLine("Phone", phone);
    addLine("Email", email);

    doc.save(`${fullName}_Biodata.pdf`);
}
