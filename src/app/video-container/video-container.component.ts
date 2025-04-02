import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { VideoPlayerService } from '../video-player.service';
import { PopupVideoComponent } from '../popup-video/popup-video.component';
import { MinimizeVideoComponent } from '../minimize-video/minimize-video.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-video-container',
  imports: [PopupVideoComponent, MinimizeVideoComponent, FormsModule, NgIf],
  templateUrl: './video-container.component.html',
  styleUrl: './video-container.component.css'
})
export class VideoContainerComponent implements AfterViewInit {
  videoUrl: string = '';
  isShowPopup: boolean = true;
  constructor(private videoService: VideoPlayerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.videoService.changeState$.subscribe(isShow => {
      this.isShowPopup = isShow;
      this.cdr.detectChanges();

    })
  };
  loadVideo() {
    this.videoService.setVideoUrl(this.videoUrl);
  }
}
