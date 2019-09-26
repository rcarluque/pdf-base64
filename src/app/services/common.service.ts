import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getPdfBase64(base64Pdf: string, documentName: string) {
    if (this.getBrowser() === 'ie' || this.getBrowser() === 'edge') {
      const blob = new Blob([atob(base64Pdf)], { type: 'application/pdf' });
      window.navigator.msSaveOrOpenBlob(blob, documentName);
    } else {
      const windowContent =
      `<object width="100%" height="100%" data="data:application/pdf;base64,${base64Pdf} "type="application/pdf" class="internal">
        <embed src="data:application/pdf;base64,${base64Pdf} "type="application/pdf" />
       </object>`;

      const win = window.open('pdfExampleUrl', '_blank');

      win.document.write(`<html><title>${documentName}</title>
        <body style="margin-top: 0px; margin-left: 0px; margin-right: 0px; margin-bottom: 0px;">
        ${windowContent}
        </body></html>`);
    }
  }

  getBrowser(): string {
    const agent = window.navigator.userAgent.toLowerCase();

    switch (true) {
    case agent.indexOf('edge') > -1:
      return 'edge';
    case agent.indexOf('opr') > -1 && !!(<any>window).opr:
      return 'opera';
    case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
      return 'chrome';
    case agent.indexOf('trident') > -1:
      return 'ie';
    case agent.indexOf('firefox') > -1:
      return 'firefox';
    case agent.indexOf('safari') > -1:
      return 'safari';
    default:
      return 'other';
    }
  }

}
