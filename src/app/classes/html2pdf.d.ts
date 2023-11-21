declare module 'html2pdf.js' {
    function html2pdf(): {
      from: (element: HTMLElement) => {
        set: (options: object) => {
          outputPdf: () => Promise<Uint8Array>;
        };
      };
    };
  
    export = html2pdf;
  }
  