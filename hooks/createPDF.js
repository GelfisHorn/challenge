import { ppDiv, ppText, ppImage, ppRow, ppColumn, PdfDocument } from 'painless-pdf'

export default function createPDF(data) {

    const { image, name, surname, position, department, email, phoneNumber1, phoneNumber2, msTeams, msTeamsLinks } = data;

    // Convert image to base64
    const base64File = Buffer.from(image).toString('base64')
    const options = {
        base64: base64File,
        fileType: "PNG",
        originalWidth: 184,
        originalHeight: 72,
        width: 46,
        height: 18,
    }
    // Image
    const pdfImage = ppImage(options)
    // Name and surname
    const pdfName = ppText(name, { bold: true, textColor: '#4c565c', fontSize: 9 });
    const pdfSurname = ppText(surname, { bold: true, textColor: '#4c565c', fontSize: 9 });
    // Position
    const pdfPosition = ppText(position, { bold: true, textColor: '#ec815d', fontSize: 7 });
    const pdfDepartment = ppText(department, { bold: true, textColor: '#ec815d', fontSize: 7 });
    // Email
    const pdfEmail = ppText(email, { fontSize: 7, textColor: '#4c565c', underline: true });
    const pdfPhone1 = ppText(`tel ${phoneNumber1}`, { fontSize: 8, textColor: '#4c565c' })
    const pdfPhone2 = ppText(phoneNumber2 ? `mobil ${phoneNumber2}` : '', { fontSize: 8, textColor: '#4c565c' })
    // PDF Leftside content
    const leftSide = ppColumn([
        pdfImage, 
        ppDiv(ppRow([pdfName, pdfSurname]), { padding: { top: 3 }}), 
        pdfPosition, 
        pdfDepartment,
        ppDiv(pdfEmail, { padding: { top: 3 }}),
        ppDiv(pdfPhone1, { padding: { top: 2 }}),
        pdfPhone2,
        ppDiv(ppText(msTeams ? `MS-Teams` : '', { fontSize: 8, textColor: '#4c565c' }), { padding: { top: 3 }}),
        ppDiv(ppText(msTeams ? `https://teams.microsoft.com/l/chat/0/0?users=${msTeamsLinks}` : '', { fontSize: 7, textColor: '#4c565c', underline: true }), {padding: { right: 6 }})
    ], { width: 50, crossAxisAlignment: "end" });
    // PDF Rightside content
    const companyName = ppText("ip&more GmbH", { fontSize: 9, textColor: '#4c565c', bold: true });
    const companyDir = ppText("Oskar-Messter-Str. 13, 85737 Ismaning", { fontSize: 7, textColor: '#4c565c' });
    const companyPhone = ppText("tel +49 89 350392 0", { fontSize: 7, textColor: '#4c565c' });
    const companyEmail = ppText("info@ipandmore.de", { fontSize: 7, textColor: '#4c565c', underline: true });
    const companyWebsite = ppText("https://www.ipandmore.de", { fontSize: 7, textColor: '#4c565c', underline: true });
    const companyDir2 = ppText("Hauptstr. 9, 85293 Reichertshausen", { fontSize: 7, textColor: '#4c565c' });
    const companyPhone2 = ppText("tel +49 89 350393 0", { fontSize: 7, textColor: '#4c565c' });
    const companyOffice = ppText("Ismaning, Amtsgericht: München HRB 130858", { fontSize: 7, textColor: '#4c565c' });
    const companyDirector = ppText("Geschäftsführer: Christian Dietrich & Christian Kleinheinz", { fontSize: 7, textColor: '#4c565c' });
    const rightSide = ppColumn([
        ppDiv(companyName, { padding: { bottom: 2 }}),
        companyDir,
        companyPhone,
        companyEmail,
        companyWebsite,
        ppDiv(ppColumn([
            ppText("Verwaltung:", { fontSize: 7, textColor: '#4c565c' }),
            companyDir2,
            companyPhone2
        ]), { padding: { top: 2, bottom: 2 }}),
        companyOffice,
        companyDirector,
        ppText("Impressum und unsere Datenschutzgrundsätze", { fontSize: 7, textColor: '#4c565c' })
    ])
    // Build PDF
    const doc = new PdfDocument(
        ppRow([
            ppDiv(leftSide, { border: { top: { width: 0 }, left: { width: 0 }, bottom: { width: 0 }, right: { width: .4, color: '#b2b2b2' } }, padding: { right: 4, left: 4 }}),
            ppDiv(rightSide, { padding: { left: 4, top: 4 }})
        ])
    );
    const jsPdfDoc = doc.build();
    // Convert pdf to ArrayBuffer
    const pdfBuffer = jsPdfDoc.output("arraybuffer");

    return pdfBuffer;
}