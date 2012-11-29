/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="../lib/angular/angular-resource-1.0.d.ts" />

interface CheckingAccount extends ng.resource.IResource{
    Balance: number;
    Description: string;
    id: string;
    $update: ng.resource.IActionCall;
}

interface checkingAccountResource extends ng.resource.IResourceClass {
}