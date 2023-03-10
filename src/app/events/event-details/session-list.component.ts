import { Component, Input, OnChanges } from '@angular/core'
import { AuthService } from 'src/app/user/auth.service';
import { ISession } from '../shared/index'
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
  @Input() sessions!: ISession[]
  @Input() filterBy!: string;
  @Input() sortBy!: string;
  visibleSessions: ISession[] = [];
  constructor(public auth: AuthService, private voterService: VoterService) {}

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter: string) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      })
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(session, this.auth.currentUser.userName);
    }
    if (this.sortBy === 'votes')
      this.visibleSessions.sort(sortByVotesDesc);
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

}

function sortByNameAsc(session1: ISession, session2: ISession) {
  if (session1.name > session2.name) return 1
  else if (session1.name === session2.name) return 0
  else return -1
}

function sortByVotesDesc(session1: ISession, session2: ISession) {
  return session2.voters.length - session1.voters.length;
}