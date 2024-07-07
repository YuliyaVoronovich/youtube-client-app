import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() colorButton: 'primary' | 'accent' | 'warn' | 'basic' = 'primary';

  @Input() text: string = '';

  @Input() buttonIcon: string = '';
}
