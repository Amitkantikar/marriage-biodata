async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "pt", "a4");

    const fullName = v("fullName");
    const dob = v("dob");
    const age = v("age");
    const height = v("height");
    const weight = v("weight");
    const nationality = v("nationality");
    const religion = v("religion");
    const caste = v("caste");
    const rashi = v("rashi");
    const languages = v("languages");
    const job = v("job");
    const education = v("education");
    const aboutMe = v("aboutme");

    const fatherName = v("fatherName");
    const fatherJob = v("fatherJob");
    const motherName = v("motherName");
    const motherJob = v("motherJob");
    const brothers = v("brothers");
    const sisters = v("sisters");
    const familyType = v("familyType");
    const socialClass = v("socialClass");
    const residence = v("residence");

    const partnerPref = v("partnerPref");

    const phone = v("phone");
    const email = v("email");
    const address = v("address");

    const photoFile = document.getElementById("photo").files[0];

    // VALIDATIONS
    if (phone.trim() !== "") {
        let numbers = phone.split(",").map(n => n.trim());
        for (let num of numbers) {
            if (!/^\d{10}$/.test(num)) {
                alert("Each phone number must be exactly 10 digits.\nInvalid: " + num);
                return;
            }
        }
    }

    if (email.trim() !== "" && !email.endsWith("@gmail.com")) {
        alert("Email must end with @gmail.com");
        return;
    }

    // HEADER BAR
    doc.setFillColor("#4CAF50");
    doc.rect(0, 0, 595, 70, "F");

    // NAME
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor("#fff");
    doc.text(fullName, 40, 45);

    let y = 100;

    // PHOTO
    if (photoFile) {
        const imgData = await toBase64(photoFile);
        doc.addImage(imgData, "JPEG", 40, 100, 130, 160);
    }

    // LEFT DETAILS BLOCK
    doc.setFontSize(12);
    doc.setTextColor("#333");

    const rightX = 200;
    function line(label, value) {
        if (value) {
            doc.setFont("Helvetica", "bold");
            doc.text(label + ": ", rightX, y);
            doc.setFont("Helvetica", "normal");
            doc.text(value, rightX + 90, y);
            y += 18;
        }
    }

    line("Age", age);
    line("Date of Birth", dob);
    line("Height", height);
    line("Weight", weight);
    line("Nationality", nationality);
    line("Religion", religion);
    line("Caste", caste);
    line("Rashi", rashi);
    line("Languages", languages);
    line("Education", education);
    line("Profession", job);

    // SECTION TEMPLATE
    function section(title, text) {
        y += 30;
        doc.setFillColor("#eef1f5");
        doc.rect(30, y, 535, 30, "F");
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor("#333");
        doc.text(title, 40, y + 20);
        y += 50;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor("#444");
        let split = doc.splitTextToSize(text, 520);
        doc.text(split, 40, y);
        y += split.length * 14;
    }

    section("About Me", aboutMe);

    let familyText = 
        `Father: ${fatherName} (${fatherJob})\n` +
        `Mother: ${motherName} (${motherJob})\n` +
        `Brothers: ${brothers}\nSisters: ${sisters}\n` +
        `Family Type: ${familyType}\nSocial Class: ${socialClass}\n` +
        `Residence: ${residence}`;

    section("Family Background", familyText);

    section("Partner Preferences", partnerPref);

    let contactText =
        `Phone: ${phone}\nEmail: ${email}\nAddress: ${address}`;

    section("Contact Details", contactText);

    // SAVE PDF
    doc.save(`${fullName}_Modern_Biodata.pdf`);
}

function v(id) {
    return document.getElementById(id).value.trim();
}

function toBase64(file) {
    return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
    });
}
