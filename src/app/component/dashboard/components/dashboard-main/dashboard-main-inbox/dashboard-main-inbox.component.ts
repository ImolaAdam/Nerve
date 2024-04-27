import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../../../services/email.service';
import { NewEmail } from 'src/app/shared/models/new-email.model';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../../../dashboard-store/dashboard.actions';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { selectLetterPage } from '../../../dashboard-store/dashboard.selectors';

@Component({
  selector: 'app-dashboard-main-inbox',
  templateUrl: './dashboard-main-inbox.component.html',
  styleUrls: ['./dashboard-main-inbox.component.scss']
})
export class DashboardMainInboxComponent implements OnInit {
  closeResult = '';
  currentPage = 'Inbox';
  subscriptions: Subscription[] = [];
  authUserEmail: string = '';

  constructor(
    private modalService: NgbModal,
    private emailService: EmailService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe(( authUser => {
        if(authUser) {
          this.authUserEmail = authUser.email;
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectLetterPage).subscribe( (pageName) => {
        if(pageName) {
          this.currentPage = pageName;
        }
      })
    )
  }

  onChangePage(page: string) {
    this.store.dispatch(DashboardActions.setLetterPage({ pageName: page }))
  }

  // Opening modal for composing a new letter
  onComposeLetter(composeLetter: TemplateRef<any>) {
    this.modalService.open(composeLetter, { centered: true, scrollable: true, size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  // Submitting the newly composed letter and adding it to the list
  onSubmit(f: NgForm) {
    let newLetter: NewEmail = {
      sentTo: f.form.value.sentTo,
      isSeen: false,
      header: f.form.value.subject,
      content: f.form.value.content,
      sentAt: new Date(),
      sentBy: this.authUserEmail
    };
    this.emailService.sendNewEmail(newLetter);
    this.closeResult = 'Closed with: submitted';
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

}
