window.jsPDF = window.jspdf.jsPDF;

async function generatePDF() {
    const name = v("fullName");
    const age = v("age");
    const dob = v("dob");
    const height = v("height");
    const religion = v("religion");
    const about = v("aboutme");

    const father = v("fatherName");
    const mother = v("motherName");
    const siblings = v("siblings");

    const phone = v("phone");
    const email = v("email");
    const address = v("address");

    const photoFile = document.getElementById("photo").files[0];

    const doc = new jsPDF("p", "pt", "a4");

    // Background aesthetic
    doc.setFillColor("#fdf6ee");
    doc.rect(0, 0, 595, 842, "F");

    // Header
    doc.setFillColor("#ff7b00");
    doc.rect(0, 0, 595, 80, "F");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor("#fff");
    doc.text("Marriage Biodata", 200, 50);

    // PHOTO BLOCK
    let photoY = 110;
    if (photoFile) {
        const image = await fileToBase64(photoFile);
        doc.setFillColor("#ffffff");
        doc.rect(400, photoY - 10, 150, 200, "F");
        doc.addImage(image, "JPEG", 408, photoY, 135, 180);
    }

    // LEFT COLUMN X POSITIONS
    const leftX = 40;
    let y = 110;

    // SECTION TITLE FUNCTION
    function section(title) {
        doc.setFillColor("#fff1dd");
        doc.rect(leftX - 10, y - 15, 530, 35, "F");

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor("#ff7b00");
        doc.text(title, leftX, y + 5);

        y += 40;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(13);
        doc.setTextColor("#444");
    }

    // BULLET FUNCTION
    function bullet(text) {
        doc.circle(leftX + 2, y - 4, 2, "F");
        doc.text(text, leftX + 10, y);
        y += 20;
    }

    // PERSONAL DETAILS
    section("Personal Details");

    bullet(`Name: ${name}`);
    bullet(`Age: ${age}`);
    bullet(`Date of Birth: ${dob}`);
    bullet(`Height: ${height}`);
    bullet(`Religion: ${religion}`);

    // ABOUT ME
    section("About Me");

    const aboutLines = doc.splitTextToSize(about, 480);
    aboutLines.forEach(line => {
        bullet(line);
    });

    // FAMILY DETAILS
    section("Family Background");

    bullet(`Father: ${father}`);
    bullet(`Mother: ${mother}`);
    bullet(`Siblings: ${siblings}`);

    // CONTACT DETAILS
    section("Contact Details");

    bullet(`Phone: ${phone}`);
    bullet(`Email: ${email}`);
    bullet(`Address: ${address}`);

    // SAVE FILE
    doc.save(`${name}-Biodata.pdf`);
}

function v(id) {
    return document.getElementById(id).value.trim();
}

function fileToBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}
