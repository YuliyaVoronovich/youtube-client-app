import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { CustomCard } from '@store/state.model';

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [MatCardModule, ButtonComponent, IconComponent],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss',
})
export class CustomCardComponent {
  @Input({ required: true }) card!: CustomCard;
}
