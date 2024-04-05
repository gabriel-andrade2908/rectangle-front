import { Component, OnInit } from '@angular/core';
import { RectangleService } from '../../services/rectangle.service';
import { Dimensions } from 'src/app/interfaces/rectangle';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {
  width: number = 0;
  height: number = 0;
  x: number = 0;
  y: number = 0;
  perimeter: number = 0;

  isResizing: boolean = false;
  initialX: number = 0;
  initialY: number = 0;

  constructor(private rectangleService: RectangleService) { }

  ngOnInit(): void {
    this.rectangleService.getDimensions().subscribe((dimensions: Dimensions) => {
      this.width = dimensions.width;
      this.height = dimensions.height;
      this.updatePerimeter();
    });
  }

  startResize(event: MouseEvent): void {
    this.isResizing = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;

    document.addEventListener('mousemove', this.resize.bind(this));
    document.addEventListener('mouseup', this.stopResize.bind(this));
  }

  resize(event: MouseEvent): void {
    if (this.isResizing) {
      const deltaX = event.clientX - this.initialX;
      const deltaY = event.clientY - this.initialY;

      this.width += deltaX;
      this.height += deltaY;

      this.updatePerimeter();

      this.initialX = event.clientX;
      this.initialY = event.clientY;
    }
  }

  stopResize(event: MouseEvent): void {
    if (this.isResizing) {
      this.isResizing = false;
      document.removeEventListener('mousemove', this.resize.bind(this));
      document.removeEventListener('mouseup', this.stopResize.bind(this));

      this.rectangleService.updateJsonFile(this.width, this.height).subscribe((response: any)  => {
        console.log('JSON file updated successfully:', response);
      }, (error: any) => {
        console.error('Error updating JSON file:', error);
      });
    }
  }

  private updatePerimeter(): void {
    this.perimeter = 2 * (this.width + this.height);
  }
}
