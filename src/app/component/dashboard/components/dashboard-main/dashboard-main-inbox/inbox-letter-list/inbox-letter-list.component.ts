import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LetterDto } from 'src/app/shared/models/LetterDto';

@Component({
  selector: 'app-inbox-letter-list',
  templateUrl: './inbox-letter-list.component.html',
  styleUrls: ['./inbox-letter-list.component.scss']
})
export class InboxLetterListComponent implements OnInit {
  letterList: LetterDto[] = [
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
    { id: 'fd', isSeen: false, sentAt: new Date(), sentBy: 'Molly12', header: 'Hii baby guurl what is up', content: 'ihguhgudfhuighdfuighfduhg gfdbjghhfdg gfdjh' },
  ];

  length = 50;
  pageSize = 5;
  pageLength = 12; // the total number of items in the list
  displayedLetters: LetterDto[] = [];
  pageSizeOptions = [5, 10, 25];
  // ! non-null assertion operator informs Angular that it will be initialized at runtime
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.displayedLetters = this.letterList.slice(0, 5);
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