import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../services/photos.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent  implements OnInit {
  photos:string[] = [];

  constructor(
    private photoService : PhotosService
  ) { 
    this.photos = this.photoService.photos;
  }

  ngOnInit(): void {}

  async takePhoto(){
    await this.photoService.addNewPhoto();
  }
}
