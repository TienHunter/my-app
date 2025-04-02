import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupVideoComponent } from './popup-video/popup-video.component';
import { MinimizeVideoComponent } from './minimize-video/minimize-video.component';
import { VideoContainerComponent } from './video-container/video-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VideoContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
