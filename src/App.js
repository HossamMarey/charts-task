import './App.css';
import PdfContent from "./components/PdfContent";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

const generatePdf = async (componentRef) => {
  const canvas = await html2canvas(componentRef.current, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let position = 0;
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  position -= pageHeight;
  while (position > -(canvas.height * 2)) {
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    position -= pageHeight;
  }
  pdf.save('my-chart.pdf');
};






function App() {

  const contentRef = React.useRef(null);

  return (
    <div  >
      <div className="text-center m_title">
        <h1 > Charts </h1>
        {contentRef && (
          <button className="pdf-btn" onClick={() => generatePdf(contentRef)}> GENERATE PDF </button>
        )}
      </div>

      <div ref={contentRef}>
        <PdfContent />
      </div>

    </div>
  );
}

export default App;
