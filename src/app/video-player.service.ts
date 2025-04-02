import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  private videoUrlSource = new BehaviorSubject<string>('');
  private currentTimeSource = new BehaviorSubject<number>(0);
  public changeState$ = new Subject<any>();
  videoUrl$ = this.videoUrlSource.asObservable();
  currentTime$ = this.currentTimeSource.asObservable();
  constructor() {
  }
  setVideoUrl(url: string) {
    this.videoUrlSource.next(url);
  }

  setVideoTime(time: number) {
    this.currentTimeSource.next(time);
  }
}
