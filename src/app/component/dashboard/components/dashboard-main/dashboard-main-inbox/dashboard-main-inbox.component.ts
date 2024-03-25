import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Letter } from 'src/app/shared/models/letter.model';

@Component({
  selector: 'app-dashboard-main-inbox',
  templateUrl: './dashboard-main-inbox.component.html',
  styleUrls: ['./dashboard-main-inbox.component.scss']
})
export class DashboardMainInboxComponent implements OnInit {
  closeResult = '';

  letterList: Letter[] = [
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Molly1', header: 'Hii baby guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Smolly2', header: 'Hii baby guugfdrl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Molly3', header: 'Hii baby guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Smolly4', header: 'Hii bafdby guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Molly5', header: 'Hii babfdgy guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Smolly6', header: 'Hii babyfd guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Molly7', header: 'Hii baby guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Smolly8', header: 'Hii bgfaby guurgfdl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Molly9', header: 'Hii baby guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Smolly10', header: 'Hii baby ggugfdurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Molly11', header: 'Hii baby guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Molly12', header: 'Ive been thugifddhughfhgf bfbfbfdbfbfbfbfbfbfdbyffbdfgvrydgfvd', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
  ];
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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
    let newLetter: Letter = {
      id: '13',
      isSeen: false,
      header: f.form.value.subject,
      content: f.form.value.content,
      sentAt: new Date(),
      sentBy: 'imola.adam@gmail.com'
    };
    this.letterList.push(newLetter);
    console.log("Form was submitted!", newLetter);
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
