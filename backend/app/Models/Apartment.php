<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Feature;

class Apartment extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'available'];

    public function features(){
        return $this->belongsToMany(Feature::class);
    }
}
