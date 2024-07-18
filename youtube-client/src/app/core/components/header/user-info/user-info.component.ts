import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  @Output() public readonly logout = new EventEmitter<string>();

  emitLogout() {
    this.logout.emit();
  }
}
