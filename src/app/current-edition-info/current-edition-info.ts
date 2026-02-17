import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SanityService} from '../../sanity.service';
import {ICurrentEditionInfo} from '../current-edition-info.d';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'current-edition-info',
  templateUrl: './current-edition-info.html',
  styleUrl: './current-edition-info.css',
  standalone: true,
  imports: [
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentEditionInfo implements OnInit {
  public data: ICurrentEditionInfo = {} as ICurrentEditionInfo;

  constructor(
    private readonly sanity: SanityService,
    private readonly changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sanity.getCurrentEdition().then(edition => {
      this.data = edition;
      this.changeRef.detectChanges();
    });
  }
}
