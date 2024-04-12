import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Letter } from "src/app/shared/models/letter.model";

@Injectable()
export class EmailService {
    availableEmailsChanged = new Subject<void>();
    availableEmails: Letter[] = [
        { content: 'hghgshvfkhjdsfv', header: 'huuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'zhtht', header: 'hujztduhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsjztjzthvfkhjdsfv', header: 'hjzuuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshvfkhjdsfv', header: 'hu64uhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgs64hvfkhjdsfv', header: 'husrhruhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshv654fkhjdsfv', header: 'huuhthu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgs6544645hvfkhjdsfv', header: 'hsertuuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsh654vfkhjdsfv', header: 'huertduhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsh654vfkhjdsfv', header: 'huhtuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgszz45hvfkhjdsfv', header: 'hu65uhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshvfkhjdsfv', header: 'huuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'zhtht', header: 'hujztduhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsjztjzthvfkhjdsfv', header: 'hjzuuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshvfkhjdsfv', header: 'hu64uhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgs64hvfkhjdsfv', header: 'husrhruhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgshv654fkhjdsfv', header: 'huuhthu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgs6544645hvfkhjdsfv', header: 'hsertuuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsh654vfkhjdsfv', header: 'huertduhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgsh654vfkhjdsfv', header: 'huhtuhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
        { content: 'hghgszz45hvfkhjdsfv', header: 'hu65uhu', id: 'ds', isSeen: true, sentAt: new Date(2020, 1, 2), sentBy: 'xy' },
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