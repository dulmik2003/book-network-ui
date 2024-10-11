import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

}
