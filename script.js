window.jsPDF = window.jspdf.jsPDF;

async function generatePDF() {
    const name = document.getElementById("fullName").value;
    const age = document.getElementById("age").value;
    const dob = document.getElementById("dob").value;
    const height = document.getElementById("height").value;
    const religion = document.getElementById("religion").value;
    const about = document.getElementById("aboutme").value;

    const father = document.getElementById("fatherName").value;
    const mother = document.getElementById("motherName").value;
    const siblings = document.getElementById("siblings").value;

    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    const photoFile = document.getElementById("photo").files[0];

    const doc = new jsPDF("p", "pt", "a4");

    // Background
    doc.setFillColor(255, 247, 234);
    doc.rect(0, 0, 595, 842, "F");

    // Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Marriage Biodata", 200, 50);

    // If photo uploaded
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            doc.addImage(e.target.result, "JPEG", 400, 70, 150, 180);
            finishPDF();
        };
        reader.readAsDataURL(photoFile);
    } else {
        finishPDF();
    }

    function finishPDF() {
        doc.setFontSize(14);
        doc.setFont("Helvetica", "bold");
        doc.text("Personal Details", 40, 90);

        doc.setFont("Helvetica", "normal");

        doc.text(`Name: ${name}`, 40, 120);
        doc.text(`Age: ${age}`, 40, 140);
        doc.text(`Date of Birth: ${dob}`, 40, 160);
        doc.text(`Height: ${height}`, 40, 180);
        doc.text(`Religion: ${religion}`, 40, 200);

        doc.text("About Me:", 40, 230);
        doc.text(doc.splitTextToSize(about, 500), 40, 250);

        // FAMILY
        doc.setFont("Helvetica", "bold");
        doc.text("Family Details", 40, 340);

        doc.setFont("Helvetica", "normal");
        doc.text(`Father's Name: ${father}`, 40, 370);
        doc.text(`Mother's Name: ${mother}`, 40, 390);
        doc.text(`Siblings: ${siblings}`, 40, 410);

        // CONTACT
        doc.setFont("Helvetica", "bold");
        doc.text("Contact Details", 40, 460);

        doc.setFont("Helvetica", "normal");
        doc.text(`Phone: ${phone}`, 40, 490);
        doc.text(`Email: ${email}`, 40, 510);
        doc.text(doc.splitTextToSize(`Address: ${address}`, 500), 40, 530);

        doc.save(`${name}-Biodata.pdf`);
    }
}
