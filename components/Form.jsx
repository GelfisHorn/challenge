import { useState } from "react"
// Nextjs
import Image from "next/image"
// React toastify (notifications)
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// Create PDF Files
import { ppDiv, ppText, ppImage, ppRow, ppColumn, PdfDocument } from 'painless-pdf'
// Create ZIP files
import JSZip from "jszip";

export default function Form() {

    // From state
    const [ name, setName ] = useState('');
    const [ surname, setSurName ] = useState('');
    const [ position, setPosition ] = useState('');
    const [ department, setDepartment ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phoneNumber1, setPhoneNumber1 ] = useState('');
    const [ phoneNumber2, setPhoneNumber2 ] = useState('');
    const [ msTeams, setMsTeams ] = useState(false);
    const [ msTeamsLinks, setMsTeamsLinks ] = useState('');

    // Display notification
    const displayToast = (text) => {
        toast(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        }); 
    };

    function handleSubmit(e) {
        e.preventDefault();

        // name, surname, position, department, email, phoneNumber and MSTeams validation
        if(name == '') {
            // Show "notification" when "name" is empty
            displayToast("name is required");
            return;
        }

        if(surname == '') {
            displayToast("Surname is required");
            return;
        }

        if(position == '') {
            displayToast("Position is required");
            return;
        }

        if(department == '') {
            displayToast("Department is required");
            return;
        }

        if(email == '') {
            displayToast("E-mail is required");
            return;
        }

        if(phoneNumber1 == '') {
            displayToast("Phone number is required");
            return;
        }

        if(msTeams && msTeamsLinks == '') {
            displayToast("MS-Teams link is required");
            return;
        }

        buildPDF();
    }

    async function buildPDF() {
        // Get "pdf-image.png" from /public/ folder.
        fetch('/pdf-image.png')
            .then(response => response.arrayBuffer())
            .then(data => {
                // Convert image to base64
                const base64File = Buffer.from(data).toString('base64')
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
                // Email
                const pdfEmail = ppText(email, { fontSize: 7, textColor: '#4c565c', underline: true });
                const pdfPhone1 = ppText(`tel ${phoneNumber1}`, { fontSize: 8, textColor: '#4c565c' })
                const pdfPhone2 = ppText(phoneNumber2 ? `mobil ${phoneNumber2}` : '', { fontSize: 8, textColor: '#4c565c' })
                // PDF Leftside content
                const leftSide = ppColumn([
                    pdfImage, 
                    ppDiv(ppRow([pdfName, pdfSurname]), { padding: { top: 3 }}), 
                    pdfPosition, 
                    ppDiv(pdfEmail, { padding: { top: 3 }}),
                    ppDiv(pdfPhone1, { padding: { top: 2 }}),
                    pdfPhone2,
                    ppText(msTeams ? `MS Teams ${msTeamsLinks}` : '', { fontSize: 8, textColor: '#4c565c' })
                ], { width: 45, crossAxisAlignment: "end" });
                // PDF Rightside content
                const companyName = ppText("ip&more GmbH", { fontSize: 9, textColor: '#4c565c', bold: true });
                const companyDir = ppText("Oskar-Messter-Str. 13, 85737 Ismaning", { fontSize: 7, textColor: '#4c565c' });
                const companyPhone = ppText("tel +49 89 350392 0", { fontSize: 7, textColor: '#4c565c' });
                const companyEmail = ppText("info@ipandmore.de", { fontSize: 7, textColor: '#4c565c', underline: true });
                const companyWebsite = ppText("https://www.ipandmore.de", { fontSize: 7, textColor: '#4c565c', underline: true });
                const companyDir2 = ppText("Hauptstr. 9, 85293 Reichertshausen", { fontSize: 7, textColor: '#4c565c' });
                const companyPhone2 = ppText("tel +49 89 350393 0", { fontSize: 7, textColor: '#4c565c' });
                const companyOffice = ppText("Ismaning, Amtsgericht: München HRB 130858", { fontSize: 7, textColor: '#4c565c' });
                const companyDirector = ppText("Christian Dietrich & Christian Kleinheinz", { fontSize: 7, textColor: '#4c565c' });
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
                    companyDirector
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
                // Create ZIP file
                const zip = new JSZip();
                // Add PDF file to ZIP File
                zip.file(`${name}_${surname}_signature.pdf`, pdfBuffer);
                zip.generateAsync({ type: "blob" })
                    .then(function(content) {
                        // create a download link for the zip file
                        var link = document.createElement('a');
                        link.href = URL.createObjectURL(content);
                        link.download = `${name}_${surname}_signature`;
                        link.click();
                    });
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="flex items-center justify-center w-full lg:w-1/2 lg:h-screen lg:min-h-[65rem] bg-white">
                <div className="px-5 sm:px-20 w-full flex flex-col items-center justify-center gap-5">
                    <div className="lazy-load-1">
                        <Image src={"/logo.webp"} width={297} height={100} alt="Brand logo" />
                    </div>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 lazy-load-2">
                        <Input 
                            id={"name"} 
                            label={"Name"} 
                            type={"text"} 
                            placeholder={"Type your name"} 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                        <Input  
                            id={"surname"} 
                            label={"Surname"} 
                            type={"text"} 
                            placeholder={"Type your surname"}
                            value={surname} 
                            onChange={e => setSurName(e.target.value)}  
                        />
                        <Input  
                            id={"position"} 
                            label={"Position"} 
                            type={"text"} 
                            placeholder={"Type your position"}
                            value={position} 
                            onChange={e => setPosition(e.target.value)}  
                        />
                        <Input  
                            id={"department"} 
                            label={"Department"} 
                            type={"text"} 
                            placeholder={"Type your department"}
                            value={department} 
                            onChange={e => setDepartment(e.target.value)}  
                        />
                        <Input  
                            id={"email"} 
                            label={"E-Mail"} 
                            type={"text"} 
                            placeholder={"Type your e-mail"} 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <Input  
                            id={"phone-number-1"} 
                            label={"Official Phone number"} 
                            type={"tel"} 
                            placeholder={"Type your number"} 
                            value={phoneNumber1} 
                            onChange={e => setPhoneNumber1(e.target.value)} 
                        />
                        <Input 
                            id={"phone-number-2"} 
                            label={"Phone number (optional)"} 
                            type={"tel"} 
                            placeholder={"Type your number"} 
                            value={phoneNumber2} 
                            onChange={e => setPhoneNumber2(e.target.value)} 
                        />
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Do you have MS-Teams links?</label>
                            <div className="flex items-center gap-2">
                                <label><input type="radio" name="ms-teams" value={msTeams} onClick={() => setMsTeams(true)} /> Yes</label><br />
                                <label><input type="radio" name="ms-teams" value={msTeams} onClick={() => setMsTeams(false)} /> No</label><br />
                            </div>
                        </div>
                        { msTeams && (
                            <Input 
                                classes={"input-transition"} 
                                id={"ms-teams-link"} 
                                label={"MS-Teams link"} 
                                type={"text"} 
                                placeholder={"Type your MS-Teams link"} 
                                value={msTeamsLinks} 
                                onChange={e => setMsTeamsLinks(e.target.value)} 
                            />
                        )}
                        <input className="py-2 px-4 bg-[#f2a42d] text-white rounded-lg text-lg cursor-pointer lazy-load-3" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            {/* react-toastify (notifications) container */}
            <ToastContainer />
        </>
    )
}

function Input({ id, label, placeholder, type, value, onChange, classes }) {

    return (
        <div className={`flex flex-col gap-1 w-full ${classes}`}>
            <label
                className="block"
                htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="border-2 border-[#f2a42d] rounded-lg px-3 py-2 placeholder:font-light placeholder:text-zinc-400 outline-none"
            />
        </div>
    )
}