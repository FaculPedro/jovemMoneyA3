import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardSimulationComponent } from "../credit-card-simulation/credit-card-simulation.component";
import { FinancingSimulationComponent } from "../financing-simulation/financing-simulation.component";
import { InterestComparisionComponent } from "../interest-comparision/interest-comparision.component";
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, CreditCardSimulationComponent, FinancingSimulationComponent, InterestComparisionComponent, ProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedMenu: 'cartao' | 'financiamento' | 'comparacoes' | 'perfil' = 'cartao';
}
