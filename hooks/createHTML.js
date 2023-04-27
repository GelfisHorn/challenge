export default function createHTML(data) {

    const { name, surname, position, department, email, phoneNumber1, phoneNumber2, msTeams, msTeamsLinks } = data;

    const htmlSignature = `
        <div style='display: flex; align-items: start; font-family: "Tahoma",sans-serif;'>
            <div style='display: flex; flex-direction: column; align-items: end; width: 200px; padding-right: 20px; border-right: 1px solid #b2b2b2;'>
                <img src="data/image001.png" alt="ipandmore image" style="padding-bottom: 10px;">
                <span style="font-size: 12px; font-weight: 900; color: #4c565c;">${name} ${surname}</span>
                <span style="font-size: 9px; font-weight: 900; color: #ec815d;">${position}</span>
                <span style="font-size: 9px; font-weight: 900; color: #ec815d;">${department}</span>
                <a href="mailto:${email}" style="font-size: 10px; color: #4c565c; padding-top: 15px;">${email}</a>
                <span style="font-size: 10px; color: #4c565c; padding-top: 5px; display: block;">tel ${phoneNumber1}</span>
                <span style='font-size: 10px; color: #4c565c; display: ${phoneNumber2 ? 'block' : 'none'};'>mobil ${phoneNumber2}</span>
                <span style="font-size: 10px; color: #4c565c; display: ${msTeams ? 'block' : 'none'}; padding-top: 10px;">MS-Teams</span>
                <a href="https://teams.microsoft.com/l/chat/0/0?users=${msTeamsLinks}" style="font-size: 10px; color: #4c565c; display: ${msTeams ? 'block' : 'none'}; text-align: right;">https://teams.microsoft.com/l/chat/0/0?users=${msTeamsLinks}
                </a>
            </div>
            <div style='display: flex; flex-direction: column; align-items: start; padding-left: 20px; padding-top: 15px;'>
                <span style="font-size: 12px; font-weight: 900; color: #4c565c;">ip&more GmbH</span>
                <span style="font-size: 9px; color: #4c565c; padding-top: 5px; display: block; padding-top: 10px;">Oskar-Messter-Str. 13, 85737 Ismaning</span>
                <span style="font-size: 9px; color: #4c565c; display: block;">tel +49 89 350392 0</span>
                <a href="mailto:info@ipandmore.de" style="font-size: 9px; color: #4c565c;">info@ipandmore.de</a>
                <a href="https://www.ipandmore.de" style="font-size: 9px; color: #4c565c;">https://www.ipandmore.de</a>
                <span style="font-size: 9px; color: #4c565c; display: block; padding-top: 9px;">Verwaltung:</span>
                <span style="font-size: 9px; color: #4c565c; display: block;">Hauptstr. 9, 85293 Reichertshausen</span>
                <span style="font-size: 9px; color: #4c565c; display: block;">tel +49 89 350393 0</span>
                <span style="font-size: 9px; color: #4c565c; display: block; padding-top: 9px;">Firmensitz: Ismaning, Amtsgericht: München HRB 130858</span>
                <span style="font-size: 9px; color: #4c565c; display: block;">Geschäftsführer: Christian Dietrich & Christian Kleinheinz</span>
                <span style="font-size: 9px; color: #4c565c; display: block;"><a href="https://www.ipandmore.de/impressum">Impressum</a> und <a href="https://www.ipandmore.de/datenschutz/">unsere Datenschutzgrundsätze</a></span>
            </div>
        </div>
    `;

    return htmlSignature;
}