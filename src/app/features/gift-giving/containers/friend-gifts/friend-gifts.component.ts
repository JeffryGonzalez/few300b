import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { GiftGivingState } from '../../reducers';
import { Store } from '@ngrx/store';
import { setSelectedFriend } from '../../actions/friend.actions';

@Component({
  selector: 'app-friend-gifts',
  templateUrl: './friend-gifts.component.html',
  styleUrls: ['./friend-gifts.component.css']
})
export class FriendGiftsComponent implements OnInit, OnDestroy {
  id: string;
  subscription: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<GiftGivingState>) { }
  ngOnInit() {

    this.subscription = this.activatedRoute.paramMap.pipe(
      map(params => {
        this.id = params.get('id');
        this.store.dispatch(setSelectedFriend({ id: this.id }));
      }),
      tap(() => console.log('Is this thing on?'))
    ).subscribe();
  }

  backToList() {
    this.router.navigate(['/gifts', 'friends']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
