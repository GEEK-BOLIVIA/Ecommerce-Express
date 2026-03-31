<?php

namespace App\Filament\Resources\CarruselResource\Pages;

use App\Filament\Resources\CarruselResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCarrusels extends ListRecords
{
    protected static string $resource = CarruselResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
