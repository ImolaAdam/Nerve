import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EmailService } from 'src/app/component/dashboard/services/email.service';
import { Letter } from 'src/app/shared/models/letter.model';

@Component({
  selector: 'app-inbox-letter-list',
  templateUrl: './inbox-letter-list.component.html',
  styleUrls: ['./inbox-letter-list.component.scss']
})
export class InboxLetterListComponent implements OnInit, OnDestroy {
  @Input() letterList: Letter[] = [];
  private emailSubscription: Subscription | undefined;

  closeResult = '';
  currentLetter!: Letter;
  length = 50;
  pageSize = 10;
  displayedLetters: Letter[] = [];
  pageSizeOptions = [10, 15, 25];

  // ! non-null assertion operator informs Angular that it will be initialized at runtime
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modalService: NgbModal,
    private emailService: EmailService,
  ) { }

  ngOnInit() {
    this.letterList = this.emailService.getAvailableEmails();

    // Showing the first 10 letters from the letter list (paginator's pageSize is 10)
    if (this.letterList) {
      this.displayedLetters = this.letterList.slice(0, this.pageSize);
    }

    // Subscribe to availableEmailsChanged subject to update the list
    this.emailSubscription = this.emailService.availableEmailsChanged.subscribe(() => {
      this.updateEmailList();
    });
  }

  updateEmailList() {
    this.letterList = this.emailService.getAvailableEmails();
    // Update any other logic related to the email list here
    this.displayedLetters = this.letterList.slice(0, this.pageSize);
  }

  onDeleteLetter(letterId: string) {
    this.emailService.deleteEmail(letterId);
    this.updateEmailList();
  }

  // Opening the letter in a modal
  onOpenLetter(selectedLetter: TemplateRef<any>, letter: Letter) {
    this.currentLetter = letter;

    // Set letter to seen
    this.displayedLetters.forEach(l => {
      if (l.id == letter.id) {
        l.isSeen = true;
      }
    })

    this.modalService.open(selectedLetter, { centered: true, scrollable: true, size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  // Closing the modal by an outside click
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Function to handle page change
  onPageChange(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;

    // Calculate the start index based on the current page and page size
    const startIndex = event.pageIndex * event.pageSize;

    // Calculate the end index
    const endIndex = startIndex + event.pageSize;

    // Update the list of letters to display
    this.displayedLetters = this.letterList.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.emailSubscription?.unsubscribe();
  }

}