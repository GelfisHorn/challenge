export default function createTXT(data) {

    const { name, surname, position, department, email, phoneNumber1, phoneNumber2, msTeams, msTeamsLinks } = data;

    const txtSignature = `${name} ${surname}\n${position}\n${department}\n\n${email}\ntel ${phoneNumber1}${phoneNumber2 ? '\nmobil ' + phoneNumber2 : ''}${msTeams ? '\n\nMS-Teams\n' + "https://teams.microsoft.com/l/chat/0/0?users=" + msTeamsLinks : ''}\n\nip&more GmbH\n\nOskar-Messter-Str. 13, 85737 Ismaning\ntel +49 89 350392 0\ninfo@ipandmore.de\nhttps://www.ipandmore.de\n\nVerwaltung:\nHauptstr. 9, 85293 Reichertshausen\ntel +49 89 350393 0\n\nFirmensitz: Ismaning, Amtsgericht: München HRB 130858\nGeschäftsführer: Christian Dietrich & Christian Kleinheinz\nImpressum und unsere Datenschutzgrundsätze`;

    return txtSignature;
}