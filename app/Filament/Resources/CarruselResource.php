<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CarruselResource\Pages;
use App\Filament\Resources\CarruselResource\RelationManagers;
use App\Models\Carrusel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CarruselResource extends Resource
{
    protected static ?string $model = Carrusel::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Textarea::make('nombre')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('descripcion')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('tipo')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('ubicacion_slug')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('activo'),
                Forms\Components\DateTimePicker::make('creado_en'),
                Forms\Components\TextInput::make('orden_seccion')
                    ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('activo')
                    ->boolean(),
                Tables\Columns\TextColumn::make('creado_en')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('orden_seccion')
                    ->numeric()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCarrusels::route('/'),
            'create' => Pages\CreateCarrusel::route('/create'),
            'edit' => Pages\EditCarrusel::route('/{record}/edit'),
        ];
    }
}
