import { Component, ViewChild,Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [
    SlickCarouselModule, CommonModule
  ],
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'] // Fix: Change styleUrl to styleUrls
})
export class ImageSliderComponent {
  @ViewChild('slickModal') slickModal;
  @Input() slides: any[] = [];
  @Input() thumbnailSlides: any[] = [];

  // slides = [
  //   { img: 'https://krayden.com/DefaultImageUnavailable/Dow_Unavailable.jpg' },
  //   { img: 'https://krayden.com/DefaultImageUnavailable/Dow_Unavailable.jpg' },
  //   { img: 'https://krayden.com/DefaultImageUnavailable/Dow_Unavailable.jpg' },
  //   { img: 'https://krayden.com/DefaultImageUnavailable/Dow_Unavailable.jpg' },
  // ];

  // thumbnailSlides = [
  //   { img: 'https://krayden.com/DefaultImageUnavailable/Dow_Unavailable.jpg' },
  //   { img: 'https://krayden.com/DefaultImageUnavailable/Dow_Unavailable.jpg' },
  //   { img: 'https://krayden.com/DefaultImageUnavailable/Dow_Unavailable.jpg' },
  //   { img: 'https://krayden.com/DefaultImageUnavailable/Dow_Unavailable.jpg' },
  // ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    // asNavFor: '.thumbnail-carousel',
    draggable: true,
    prevArrow: false,
    nextArrow: false
  };

  thumbnailConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.main-carousel',
    centerMode: true,
    focusOnSelect: true,
    prevArrow: false,
    nextArrow: false
  };


  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  next() {
    this.slickModal.slickNext();
  }
  
  prev() {
    this.slickModal.slickPrev();
  }
}