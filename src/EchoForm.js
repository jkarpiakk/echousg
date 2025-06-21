import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export default function EchoForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [ef, setEf] = useState('');

  const generateDoc = async () => {
    const children = [];

    children.push(new Paragraph({ children: [new TextRun({ text: 'BADANIE ECHOKARDIOGRAFICZNE', bold: true })] }));
    children.push(new Paragraph(`Data badania: ${date}`));
    if (firstName || lastName) children.push(new Paragraph(`Pacjent: ${firstName} ${lastName}`));
    if (ef) children.push(new Paragraph(`Frakcja wyrzutowa lewej komory EF: ${ef} %`));
    children.push(new Paragraph(''));
    children.push(new Paragraph('Lek. med. ___________________'));

    const doc = new Document({ sections: [{ children }] });
    const blob = await Packer.toBlob(doc);
    const fileName = `${lastName}_${firstName}_${date}.docx`;
    saveAs(blob, fileName);
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
      <h1>Formularz ECHO</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>Imię: </label>
        <input style={{ width: '100%' }} value={firstName} onChange={e => setFirstName(e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Nazwisko: </label>
        <input style={{ width: '100%' }} value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Data badania: </label>
        <input type="date" style={{ width: '100%' }} value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>EF (%): </label>
        <input style={{ width: '100%' }} value={ef} onChange={e => setEf(e.target.value)} />
      </div>
      <button onClick={generateDoc}>Generuj raport (DOCX)</button>
    </div>
  );
}
