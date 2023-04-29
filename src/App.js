import './App.css';
import PdfContent from "./components/PdfContent";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useCallback } from 'react';

const generatePdf = async (componentRef) => {
  const canvas = await html2canvas(componentRef.current, { scale: 2 });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  // 2480 x 3508
  const imgWidth = 210;
  const pageHeight = 297;

  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = 0;
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  position -= pageHeight;
  while (position > -(canvas.height / 6)) {
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    position -= pageHeight;
  }
  pdf.save('my-chart.pdf');
};

function App() {

  const contentRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);


  const handleGeneratePdf = useCallback(async () => {
    setLoading(true);
    try {
      // while no contentRef.current, wait 1 sec until charts rendered
      while (!contentRef.current) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      await generatePdf(contentRef)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  }, [])

  return (
    <div  >
      <div className="text-center m_title">
        <h1 > Charts </h1>
        {contentRef && (
          <button className="pdf-btn" onClick={handleGeneratePdf}>
            {loading ? 'Loading...' : 'Generate PDF'}
          </button>
        )}
      </div>

      <div >
        <PdfContent />
      </div>

      {/* html to pdf // width 1200 to rendered into desktop size */}
      {loading && (
        <div style={{ minWidth: '1200px' }}>
          <div ref={contentRef}>
            <PdfContent />
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
