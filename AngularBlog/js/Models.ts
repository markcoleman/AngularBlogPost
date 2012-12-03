/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="../lib/angular/angular-resource-1.0.d.ts" />

interface CheckingAccount extends ng.resource.IResource{
    Balance: number;
    Description: string;
    Id: string;
    $update: ng.resource.IActionCall;
    RecentTransactions: RecentTransaction[];
}

interface RecentTransaction{
    Amount: number;
    Comment: string;
    OccuredOn: Date;
}

interface checkingAccountResource extends ng.resource.IResourceClass {
}