{{-- resources/views/admin/inventory/categories.blade.php --}}

@extends('layouts.admin')

@section('title', 'Categorías - Farmacia Cosmos')

@section('content')
    @livewire('admin.inventory.category-table')
@endsection
