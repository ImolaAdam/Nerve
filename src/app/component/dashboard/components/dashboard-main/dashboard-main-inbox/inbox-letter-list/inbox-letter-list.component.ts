import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LetterDto } from 'src/app/shared/models/LetterDto';

@Component({
  selector: 'app-inbox-letter-list',
  templateUrl: './inbox-letter-list.component.html',
  styleUrls: ['./inbox-letter-list.component.scss']
})
export class InboxLetterListComponent implements OnInit {
  @Input() letterList: LetterDto[] = [];
  closeResult = '';
  currentLetter!: LetterDto;
  length = 50;
  pageSize = 10;
  displayedLetters: LetterDto[] = [];
  pageSizeOptions = [10, 15, 25];

  // ! non-null assertion operator informs Angular that it will be initialized at runtime
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // Showing the first 10 letters from the letter list (paginator's pageSize is 10)
    if (this.letterList) {
      this.displayedLetters = this.letterList.slice(0, this.pageSize);
    }
  }

  // Opening the letter in a modal
  onOpenLetter(selectedLetter: TemplateRef<any>, letter: LetterDto) {
    this.currentLetter = letter;
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

}