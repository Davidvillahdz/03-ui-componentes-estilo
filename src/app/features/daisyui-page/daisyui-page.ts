import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Drawer } from "./components/drawer/drawer";
import { Code } from "./components/code/code";
import { Table } from "./components/table/table";
import { Card } from "./components/card/card";
import { CardResponsive } from "./components/card-responsive/card-responsive";
import { Avatar } from "./components/avatar/avatar";
import { Footer } from "./components/footer/footer";
import { Menu } from "./components/menu/menu";
import { RouterOutlet } from "@angular/router";
import { SimpsonsPageComponent } from "../simpsons-page/simpsons-page";

@Component({
  selector: 'app-daisyui-page',
  imports: [CommonModule, Drawer, Code, Table, Card, CardResponsive, Avatar, Menu, RouterOutlet, SimpsonsPageComponent],
  templateUrl: './daisyui-page.html',
  styleUrl: './daisyui-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaisyuiPage {

}
