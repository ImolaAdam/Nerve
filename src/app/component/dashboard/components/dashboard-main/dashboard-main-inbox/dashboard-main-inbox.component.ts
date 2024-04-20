import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../../../services/email.service';
import { NewEmail } from 'src/app/shared/models/new-email.model';

@Component({
  selector: 'app-dashboard-main-inbox',
  templateUrl: './dashboard-main-inbox.component.html',
  styleUrls: ['./dashboard-main-inbox.component.scss']
})
export class DashboardMainInboxComponent implements OnInit {
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private emailService: EmailService
    ) { }

  ngOnInit() {}

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
      sentBy: 'imola.adam@gmail.com'
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
