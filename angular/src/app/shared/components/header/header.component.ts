import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public user!: User | null;
  @Output() public logout: EventEmitter<true> = new EventEmitter();

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
  }

 
}
