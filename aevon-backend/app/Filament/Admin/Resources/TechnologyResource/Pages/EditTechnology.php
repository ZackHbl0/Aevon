<?php

namespace App\Filament\Admin\Resources\TechnologyResource\Pages;

use App\Filament\Admin\Resources\TechnologyResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTechnology extends EditRecord
{
    protected static string $resource = TechnologyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
