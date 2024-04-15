import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Letter } from "src/app/shared/models/letter.model";

@Injectable()
export class EmailService {
    availableEmailsChanged = new Subject<void>();
    
    availableEmails: Letter[] = [
        { content: 'hghgshvfkhjdsfv', sentTo: 'molly', header: 'huuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'zhtht', sentTo: 'molly', header: 'hujztduhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsjztjzthvfkhjdsfv', sentTo: 'molly', header: 'hjzuuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshvfkhjdsfv', sentTo: 'molly', header: 'hu64uhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgs64hvfkhjdsfv', sentTo: 'molly', header: 'husrhruhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshv654fkhjdsfv', sentTo: 'molly', header: 'huuhthu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgs6544645hvfkhjdsfv', sentTo: 'molly', header: 'hsertuuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsh654vfkhjdsfv', sentTo: 'molly', header: 'huertduhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsh654vfkhjdsfv', sentTo: 'molly', header: 'huhtuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgszz45hvfkhjdsfv', sentTo: 'molly', header: 'hu65uhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshvfkhjdsfv', sentTo: 'molly', header: 'huuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'zhtht', sentTo: 'molly', header: 'hujztduhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsjztjzthvfkhjdsfv', sentTo: 'molly', header: 'hjzuuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshvfkhjdsfv', sentTo: 'molly', header: 'hu64uhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgs64hvfkhjdsfv', sentTo: 'molly', header: 'husrhruhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshv654fkhjdsfv', sentTo: 'molly', header: 'huuhthu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgs6544645hvfkhjdsfv', sentTo: 'molly', header: 'hsertuuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsh654vfkhjdsfv', sentTo: 'molly', header: 'huertduhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsh654vfkhjdsfv', sentTo: 'molly', header: 'huhtuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgszz45hvfkhjdsfv', sentTo: 'molly', header: 'hu65uhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
    ];

    getAvailableEmails() {
        // returning a copy, not reference type
        // Sort the letterList by date
        return this.availableEmails.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
    }

    sendNewEmail(newEmail: Letter) {
        this.availableEmails.push(newEmail);
        this.availableEmailsChanged.next();

    }

    deleteEmail(letterId: string) {
        const filteredList = this.availableEmails.filter(l => l.id != letterId);
        this.availableEmails = filteredList;
        this.availableEmailsChanged.next();
    }

}