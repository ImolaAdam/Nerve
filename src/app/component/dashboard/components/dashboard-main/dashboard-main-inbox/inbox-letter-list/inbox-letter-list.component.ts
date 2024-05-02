import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { selectInboxLetterList, selectLetterPage, selectSentLetterList } from 'src/app/component/dashboard/dashboard-store/dashboard.selectors';
import { EmailService } from 'src/app/component/dashboard/services/email.service';
import { Letter } from 'src/app/shared/models/letter.model';

@Component({
  selector: 'app-inbox-letter-list',
  templateUrl: './inbox-letter-list.component.html',
  styleUrls: ['./inbox-letter-list.component.scss']
})
export class InboxLetterListComponent implements OnInit, OnDestroy {
  letterList!: Letter[];
  private emailSubscription: Subscription | undefined;
  private authUserSubscription: Subscription | undefined;

  private subscriptions: Subscription[] = [];

  pageName = 'Inbox';
  userEmail: string = '';
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
    private store: Store
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectInboxLetterList).subscribe((letterList) => {
        if (letterList) {
          this.letterList = [...letterList]; // Create a copy of letterList
          this.letterList = this.letterList.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
          this.displayedLetters = this.letterList.slice(0, this.pageSize);
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectSentLetterList).subscribe((letterList) => {
        if (letterList) {
          this.letterList = [...letterList]; // Create a copy of letterList
          this.letterList = this.letterList.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
          this.displayedLetters = this.letterList.slice(0, this.pageSize);
        }
      })
    );

    this.authUserSubscription = this.store.select(selectAuthUser)
      .subscribe((user) => {
        if (user) {
          this.userEmail = user.email;
          this.emailService.getAvailableEmails(this.userEmail, this.pageName);
        }
      });

    this.subscriptions.push(
      this.store.select(selectLetterPage).subscribe((pageName) => {
        this.pageName = pageName;
        this.emailService.getAvailableEmails(this.userEmail, this.pageName);
      })
    );
  }


  onDeleteLetter(letterId: string) {
    this.emailService.deleteEmail(letterId);
  }

  // Opening the letter in a modal
  onOpenLetter(selectedLetter: TemplateRef<Letter>, letter: Letter) {
    this.currentLetter = letter;

    if ((!letter.isSeen) && (this.pageName != 'Sent')) {
      this.emailService.setEmailToSeen(letter.id);
    }

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
    this.authUserSubscription?.unsubscribe();

    if (this.subscriptions) {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      })
    }
  }

}