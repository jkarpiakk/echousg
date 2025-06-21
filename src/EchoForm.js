
import React, { useState } from "react";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

function EchoForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState("");
    const [ef, setEf] = useState("");

    const generateDoc = async () => {
        const children = [];
        if (firstName || lastName || date)
            children.push(new Paragraph(`Pacjent: ${firstName} ${lastName}, Data: ${date}`));
        if (ef) children.push(new Paragraph(`Frakcja wyrzutowa EF: ${ef}%`));
        const doc = new Document({ sections: [{ children }] });
        const blob = await Packer.toBlob(doc);
        const filename = `${lastName}_${firstName}_${date}.docx`;
        saveAs(blob, filename);
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Formularz Echo</h2>
            <div>
                <label>Imię: </label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label>Nazwisko: </label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label>Data badania: </label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
                <label>EF (%): </label>
                <input value={ef} onChange={(e) => setEf(e.target.value)} />
            </div>
            <button onClick={generateDoc}>Generuj raport</button>
        </div>
    );
}

export default EchoForm;
