import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-main-templates',
  templateUrl: './dashboard-main-templates.component.html',
  styleUrls: ['./dashboard-main-templates.component.scss']
})
export class DashboardMainTemplatesComponent implements OnInit {
  dailyPlanners = [
    {
      src: "assets/planners/daily/beige-daily.pdf",
      caption: 'It\'s a thing',
    },
    {
      src: "assets/planners/daily/green-daily.pdf",
      caption: 'It\'s a thing',
    },
    {
      src: "assets/planners/daily/white-daily.pdf",
      caption: 'It\'s a thing',
    }
  ];

  weeklyPlanners = [
    {
      src: "assets/planners/weekly/pink-weekly.pdf",
      caption: 'It\'s a thing',
    },
    {
      src: "assets/planners/weekly/plant-weekly.pdf",
      caption: 'It\'s a thing',
    },
    {
      src: "assets/planners/weekly/white-weekly.pdf",
      caption: 'It\'s a thing',
    }
  ];

  monthlyPlanners = [
    {
      src: "assets/planners/monthly/brown-monthly.pdf",
      caption: 'It\'s a thing',
    },
    {
      src: "assets/planners/monthly/flower-monthly.pdf",
      caption: 'It\'s a thing',
    },
    {
      src: "assets/planners/monthly/white-monthly.pdf",
      caption: 'It\'s a thing',
    }
  ];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  // This uses the DomSanitizer to mark the PDF URLs as safe for use in the iframe source.
  // The sanitizeUrl method is added to apply the sanitizer to the URLs
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  downloadPDF(pdfUrl: string) {
    // Implement the logic to trigger the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() as string; // Explicitly cast to string
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
