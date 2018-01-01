import { NgModule } from "@angular/core";

import {
	MatButtonModule,
	MatMenuModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSidenavModule,
	MatFormFieldModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatListModule,
	MatDialogModule,
	MatSelectModule,
	MatGridListModule,
	MatTableModule
} from "@angular/material";

@NgModule({
	imports: [
		MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatListModule,
		MatDialogModule,
		MatSelectModule,
		MatGridListModule,
		MatTableModule
	],
	exports: [
		MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatListModule,
		MatDialogModule,
		MatSelectModule,
		MatGridListModule,
		MatTableModule
	]
})
export class MaterialModule {}
