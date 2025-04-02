import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { VideoPlayerService } from '../video-player.service';
import { extractVideoId } from '../video-utils';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

declare var YT: any;
declare var Vimeo: any;
@Component({
  selector: 'app-minimize-video',
  imports: [NgIf],
  templateUrl: './minimize-video.component.html',
  styleUrl: './minimize-video.component.css'
})
export class MinimizeVideoComponent implements AfterViewInit, OnDestroy {
  videoUrl: any = '';
  videoId: string = '';
  videoType: 'youtube' | 'vimeo' | null = null;
  currentTime: number = 0;
  player: any;
  private subscriptionTime!: Subscription; // Lưu subscription
  private subscriptionURL!: Subscription; // Lưu subscription

  constructor(private videoService: VideoPlayerService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    this.subscriptionTime = this.videoService.videoUrl$.subscribe(url => {
      console.log("minimize video", url);

      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      const { id, type } = extractVideoId(url);
      if (id && type) {
        this.videoId = id;
        this.videoType = type;
        console.log("minimize video", this.videoId, this.videoType);
        this.cdr.detectChanges();

        this.loadMiniPlayer();
      }
    });


    this.subscriptionURL = this.videoService.currentTime$.subscribe(time => {
      console.log("minimize video currentTime", time);

      this.currentTime = time;
    });
  }

  ngOnDestroy(): void {
    if (this.player) this.player.destroy();
    if (this.subscriptionTime) this.subscriptionTime.unsubscribe();
    if (this.subscriptionURL) this.subscriptionURL.unsubscribe();
  }

  loadMiniPlayer() {
    if (this.videoType === 'youtube') {
      this.initYouTubeMiniPlayer();
    } else if (this.videoType === 'vimeo') {
      this.initVimeoMiniPlayer();
    }
  }

  initYouTubeMiniPlayer() {
    this.player = new YT.Player('mini-video', {
      videoId: this.videoId,
      events: {

        'onReady': (event: any) => {
          if (event.target && typeof event.target.seekTo === 'function') {
            event.target.seekTo(this.currentTime);
            event.target.playVideo();
          } else {
            console.error('YouTube Player is not properly initialized.');
          }
        },
        'onStateChange': (event: any) => {
          if (event.data === YT.PlayerState.PLAYING) {
            const intervalId = setInterval(() => {
              if (event.target && typeof event.target.getCurrentTime === 'function') {
                console.log("getCurrentTime", event.target.getCurrentTime());

                this.videoService.setVideoTime(event.target.getCurrentTime());
              } else {
                console.error('Unable to retrieve current time from YouTube Player.');
                clearInterval(intervalId);
              }
            }, 1000);
          }
        }
      },
    });
  }

  initVimeoMiniPlayer() {
    const me = this;
    this.player = new Vimeo.Player('mini-video', {
      id: this.videoId,
      loop: false
    });

    this.player.ready().then(() => {
      let intervalId: any = null;

      this.player.play().then(() => {
        console.log('Video đang phát từ thời gian chỉ định');
        this.player.setCurrentTime(this.currentTime).then(() => { });
        intervalId = setInterval(() => {
          this.player.getCurrentTime().then(function (seconds: number) {
            // `seconds` indicates the current playback position of the video
            console.log("getCurrentTime", seconds);
            me.videoService.setVideoTime(seconds);
          });
        }, 1000);
      }).catch((error: any) => {
        console.error('Lỗi khi phát video: ', error);
        if (intervalId) {
          clearInterval(intervalId);
        }
      });
    });

  }

  restorePopup() {
    this.videoService.changeState$.next(true);
  }
}
